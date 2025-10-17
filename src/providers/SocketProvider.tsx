import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

import type { PropsWithChildren } from "react";
import type { SocketContextValue } from "../contexts/SocketContext";

import SocketContext from "../contexts/SocketContext";

import { useAppSelector } from "../hooks/redux";
import { selectToken } from "../features/auth/selectors";

export const SocketProvider = ({ children }: PropsWithChildren) => {
  const token = useAppSelector(selectToken);
  const socketRef = useRef<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const messageQueueRef = useRef<Array<{ event: string; payload?: any; cb?: (...args: any[]) => void }>>([]);

  useEffect(() => {
    if (!token) {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
      setConnected(false);
      return;
    }

    if (socketRef.current && socketRef.current.connected) {
      return;
    }

    const origin = import.meta.env.VITE_BASE_BACKEND_URL;
    const path = import.meta.env.VITE_SOCKET_PATH;

    const socket = io(origin, {
      path,
      transports: ["polling"],
      auth: { token },
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      setConnected(true);
      flushQueuedMessages();
    });

    socket.on("disconnect", () => {
      setConnected(false);
    });

    socket.on("connect_error", (err) => {
      console.warn("Socket connect error:", err);
    });

    // opcional: log de eventos entrantes (útil en dev)
    socket.onAny((ev, ...args) => {
      console.debug("[Socket] event", ev, args);
    });

    return () => {
      socket.off();
      socket.disconnect();
      socketRef.current = null;
    };
  }, [token]);

  const sendMessage = (event: string, payload?: any, cb?: (...args: any[]) => void) => {
    const socket = socketRef.current;
    if (!socket || !socket.connected) {
      messageQueueRef.current.push({ event, payload, cb });
      return;
    }
    socket.emit(event, payload, cb);
  };

  const flushQueuedMessages = () => {
    const socket = socketRef.current;
    if (!socket || !socket.connected) return;
    while (messageQueueRef.current.length > 0) {
      const m = messageQueueRef.current.shift()!;
      socket.emit(m.event, m.payload, m.cb);
    }
  };

  const joinRoom = (roomId: number) => sendMessage("join_room", { roomId });
  const leaveRoom = (roomId: number) => sendMessage("leave_room", { roomId });

  const on = (event: string, cb: (...args: any[]) => void) => {
    socketRef.current?.on(event, cb);
  };
  const off = (event: string, cb?: (...args: any[]) => void) => {
    if (cb) socketRef.current?.off(event, cb);
    else socketRef.current?.off(event);
  };

  const reconnectWithToken = (newToken: string) => {
    if (!socketRef.current) return;
    (socketRef.current as any).auth = { token: newToken };
    socketRef.current.disconnect();
    socketRef.current.connect();
  };

  const value: SocketContextValue = {
    socket: socketRef.current,
    connected,
    sendMessage,
    joinRoom,
    leaveRoom,
    on,
    off,
    flushQueuedMessages,
    reconnectWithToken,
  };

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};
