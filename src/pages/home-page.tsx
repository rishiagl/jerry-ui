import { useAuth0 } from "@auth0/auth0-react";
import Company, { CompanyType } from "../components/Company";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const backgroundStyle = {
  height: "100vh",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "Lucida Console",
};

export function HomePage() {
  const { user } = useAuth0();
  const [company, setCompany] = useState<CompanyType>({});
  const navigate = useNavigate();

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
              color: "white",
              fontSize: "clamp(2rem, 5vw, 4rem)",
            }}
          >
            Welcome! {user.name}{" "}
          </p>
        </div>
        <div className="col">
          <Company
            company={company}
            setCompany={setCompany}
            style={{
              borderStyle: "solid",
              borderWidth: "8px",
              borderColor: "#E74E35",
              padding: "2rem",
              borderRadius: "30px",
              marginLeft: "15%",
              marginRight: "15%",
              fontFamily: "Lucida Console",
              fontSize: "clamp(1rem, 1.5vw, 3rem)",
            }}
          ></Company>
          <button onClick={() => { navigate("/logout")}}>logout</button>
        </div>
      </div>
    </div>
  );
}
