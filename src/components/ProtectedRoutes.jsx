import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { Spinner } from "./Spinner";
import styled from "styled-components";
import { useEffect } from "react";

// const FullPage = styled.div`
//   height: 100vh;
//   background-color: grey;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

function ProtectedRoutes({ children }) {
  const navigate = useNavigate();
  // 1 load the authenticated user
  const { isPending, isAuthenticated } = useUser();

  // 2. if there is no authenticated user re-direct to the login page
  useEffect(
    function () {
      if (!isAuthenticated && !isPending) navigate("/signin");
    },
    [isAuthenticated, navigate, isPending]
  );

  // 3. while that is happening show a spinner
  if (isPending)
    return (
      // <FullPage>
      <Spinner />
      // </FullPage>
    );

  // 4 if there is a user render the app
  if (isAuthenticated) {
    return children;
    // return <Outlet />;
  }

  // if (isAuthenticated) return children;

  // return children ? <Navigate to="/signin" /> : <Outlet />;
}

export default ProtectedRoutes;
