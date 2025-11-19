import { useAuth } from "@/hooks/use-auth";
import type { ReactNode } from "react";
import { Navigate } from "react-router";

export default function ProtectedRoute({ children }:{
  children: ReactNode
}) {
  const { session, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!session) return <Navigate to="/auth/login" replace />;

  return children;
}
