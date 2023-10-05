import { Fragment, useEffect, useState } from "react";
import { getCompanyById } from "../external/Company";
import Select from "react-select";
import CompanyModal from "./AddCompanyModal";
import { useNavigate } from "react-router-dom";
import { getCompanyUsersByEmail } from "../external/CompanyUsers";
import { useAuth0 } from "@auth0/auth0-react";

export type CompanyType = {
  id?: number;
  name?: string;
  legal_name?: string;
  address?: string;
  gstn?: string;
  phone_no?: string;
  email?: string;
  website?: string;
  owner_email?: string;
};

export type CompanyUsersType = {
    id?: number;
    company_id?: number;
    company_name?: string;
    user_email?: string; 
}

interface Props {
  company: CompanyType;
  setCompany: (company: CompanyType) => void;
  style: {};
}

export default function Company(props: Props) {
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [companies, setCompanies] = useState<CompanyUsersType[]>([]);
  const navigate = useNavigate();

  const { user } = useAuth0();
  const { getAccessTokenSilently } = useAuth0();

  if (!user) {
    return null;
  }
  
  useEffect(() => {
    let isMounted = true;

    const getCompanies = async () => {

      const accessToken = await getAccessTokenSilently();
      const { data, error } = await getCompanyUsersByEmail(accessToken, user.email);

      if (!isMounted) {
        return;
      }

      if (data) {
        setCompanies(data);
      }

      if (error) {
        console.log("External API not working");
      }
    };

    getCompanies();

    return () => {
      isMounted = false;
    };
  }, [getAccessTokenSilently, showCompanyModal]);

  const handleGo = () => {
    if(props.company.id != undefined)
    {
        navigate("/dashboard", {state: {company: props.company, style: {}}});
    }

  }

  const handleSelect = async(companyUser: CompanyUsersType) => {

    const accessToken = getAccessTokenSilently();
    const { data, error } = await getCompanyById(accessToken, companyUser.company_id);
    if(data){
      props.setCompany(data)
    }
    if(error){
      console.log(error)
    }
  }
  
  function PropToSelectList(companies: CompanyUsersType[]) {
    return companies.map((opt: CompanyUsersType) => ({
      label: opt!.company_name,
      value: opt,
    }));
  }

  const m = 10;
  return (
    <Fragment>
      <CompanyModal
        show={showCompanyModal}
        setShow={setShowCompanyModal}
        style={{}}
      ></CompanyModal>
      <div style={props.style}>
        <h1 style={{color: "#E74E35"}}>
          Select Company
        </h1>
        <Select
          options={PropToSelectList(companies)}
          onChange={(opt) => handleSelect(opt!.value)}
        />
        <button
            onClick={handleGo}
            style={{
                marginTop: "10px",
                paddingLeft: "40px",
                paddingRight: "40px",
                fontSize: "clamp(1rem, 2vw, 3rem)",
                textDecoration: "none",
                border: "none",
                borderRadius: "12px",
                fontFamily: "Lucida Console",
                color: "white",
                backgroundColor: "#E74E35",
                borderStyle: "solid"
              }}
          >
            Go
          </button><br/>
        <a
            onClick={(event) => setShowCompanyModal(true)}
            style={{
                fontSize: "clamp(1rem, 1vw, 3rem)",
                fontFamily: "Lucida Console",
                color: "#E74E35",
              }}
          >
            Create New?
          </a>
      </div>
    </Fragment>
  );
}

