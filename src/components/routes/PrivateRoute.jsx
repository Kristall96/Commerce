import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Spinner from "../ui/Spinner";
const PrivateRoute = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <Spinner message="Checking access..." />;

  return user ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
