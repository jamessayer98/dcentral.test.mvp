import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

type AuthenticatedProps = {
  children: React.ReactNode;
};

export const Authenticated: React.FC<AuthenticatedProps> = ({ children }) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/login", { replace: true, state: { from: location } });
    } else {
      setVerified(true);
    }
  }, [auth.isAuthenticated, location, navigate]);

  if (!verified) {
    return null;
  }

  return <>{children}</>;
};
