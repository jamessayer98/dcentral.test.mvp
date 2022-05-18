import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

type PublicRouteProps = {
  children: React.ReactNode;
};

export const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate("/", { replace: true, state: { from: location } });
    } else {
      setVerified(true);
    }
  }, [auth.isAuthenticated, location, navigate]);

  if (!verified) {
    return null;
  }

  return <>{children}</>;
};
