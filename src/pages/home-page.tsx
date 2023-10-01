import { useAuth0 } from "@auth0/auth0-react";

const backgroundStyle = {
  height: "100vh",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "Lucida Console",
};

export function HomePage() {
  const { user } = useAuth0();

  if (!user) {
    return null;
  }
  return (
    <div className="container-fluid">
      <div className="row text-center" style={backgroundStyle}>
        <div
          className="col"
          style={{
            height: "100vh",
            alignItems: "center",
            backgroundColor: "#E74E35",
            borderRadius: "8px",
            position: "relative",
          }}
        >
          <p
            style={{
              position: "absolute",
              top: "40%",
              color: "white", fontSize: "clamp(2rem, 5vw, 4rem)"
            }}
          >
            Welcome! {user.name}{" "}
          </p>
        </div>
        <div className="col">
            
        </div>
      </div>
    </div>
  );
}
