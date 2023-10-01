import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

export const LoginButton = ({style}) => {
  const { loginWithRedirect } = useAuth0();
  console.log(style);
  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/home",
      },
    });
  };

  return (
    <button style={style} onClick={handleLogin}>
      Log In
    </button>
  );
};