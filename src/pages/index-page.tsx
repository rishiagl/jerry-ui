import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "../components/buttons/login-button";
import { SignupButton } from "../components/buttons/signup-button";
import { useNavigate } from "react-router-dom";

const backgroundStyle = {
  backgroundColor: "#E74E35",
  height: "100vh",
  alignItems: "center",
  fontFamily: "Lucida Console",
  flexDirection: "column",
  margin: "auto",
};

const logoStyle = {
  fontFamily: "Lucida Console",
  fontSize: "clamp(1.2rem, 25vw, 40rem)",
};

export function IndexPage() {
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  return (
    <div
      className="container-fluid d-flex"
      style={backgroundStyle as React.CSSProperties}
    >
      <div style={{ marginTop: "2%" }}>
        <p
          className="text-white"
          style={{ fontSize: "clamp(2rem, 1.5vw, 2rem)" }}
        >
          "A minimalist Invoicing Manager for the hustlers"
        </p>
      </div>
      <div>
        <h1 className="text-white" style={logoStyle}>
          JERRY
        </h1>
      </div>
      <div>
        {isAuthenticated && (
          <>
            <button onClick={() => { navigate("/logout")}}>logout</button>
          </>
        )}
        {!isAuthenticated && (
          <>
            {" "}
            <LoginButton className={"text-white"}></LoginButton>
            <SignupButton className={"text-white"}></SignupButton>
          </>
        )}
      </div>
    </div>
  );
}
