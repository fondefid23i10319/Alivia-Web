import { createContext } from "react";
import { Socket } from "socket.io-client";

export type SocketContextValue = {
  socket: Socket | null;
  connected: boolean;
  sendMessage: (event: string, payload?: any, cb?: (...args: any[]) => void) => void;
  joinRoom: (roomId: number) => void;
  leaveRoom: (roomId: number) => void;
  on: (event: string, cb: (...args: any[]) => void) => void;
  off: (event: string, cb?: (...args: any[]) => void) => void;
  flushQueuedMessages: () => void;
  reconnectWithToken: (newToken: string) => void;
};

const SocketContext = createContext<SocketContextValue | undefined>(undefined);

export default SocketContext;
