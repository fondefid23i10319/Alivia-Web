import type { ReactNode } from "react";

import Unauthorized from "../../pages/Error/Unauthorized";

import { useAppSelector } from "../../hooks/redux";
import { selectRole } from "../../features/auth/selectors";

export default function RequireRole({
  role,
  children,
}: {
  role: "patient" | "professional";
  children: ReactNode;
}) {
  const userRole = useAppSelector(selectRole);
  if (userRole === role) return children;
  return <Unauthorized />;
}
