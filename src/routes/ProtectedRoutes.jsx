import { Outlet, Navigate } from "react-router-dom";
import { UserDataContext } from "@/contexts/UserDataContext";
import { useContext } from "react";

const ProtectedRoutes = () => {
  const { userIsAuthenticated, setUserIsAuthenticated } =
    useContext(UserDataContext);
  console.log(userIsAuthenticated);

  if (userIsAuthenticated) return <Outlet />;
  else {
    setUserIsAuthenticated(false);
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoutes;
