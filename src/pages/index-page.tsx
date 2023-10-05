import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "../components/buttons/login-button";
import { LogoutButton } from "../components/buttons/logout-button";
import { SignupButton } from "../components/buttons/signup-button";

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

  return (
    <div className="container-fluid d-flex" style={backgroundStyle as React.CSSProperties}>
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
            <LogoutButton
              style={{
                padding: "10px",
                fontSize: "clamp(1.2rem, 2.5vw, 4rem)",
                textDecoration: "none",
                border: "none",
                borderRadius: "12px",
                fontFamily: "Lucida Console",
                color: "#E74E35",
              }}
            ></LogoutButton>
          </>
        )}
        {!isAuthenticated && (
          <>
            {" "}
            <LoginButton
              style={{
                padding: "10px",
                fontSize: "clamp(1.2rem, 2.5vw, 4rem)",
                textDecoration: "none",
                border: "none",
                borderRadius: "12px",
                fontFamily: "Lucida Console",
                color: "#E74E35",
              }}
            ></LoginButton>
            <SignupButton
              style={{
                padding: "10px",
                fontSize: "clamp(1.2rem, 2.5vw, 4rem)",
                backgroundColor: "#E74E35",
                textDecoration: "none",
                border: "none",
                borderRadius: "12px",
                fontFamily: "Lucida Console",
                color: "white",
              }}
            ></SignupButton>
          </>
        )}
      </div>
    </div>
  );
}
