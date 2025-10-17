import { useContext } from "react";

import SocketContext from "../contexts/SocketContext";
import type { SocketContextValue } from "../contexts/SocketContext";

export default function useSocket(): SocketContextValue {
  const ctx = useContext(SocketContext);
  if (!ctx) throw new Error("useSocket must be used within a SocketProvider");
  return ctx;
}
