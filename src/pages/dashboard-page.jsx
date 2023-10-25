import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { MainNavbar } from "../components/main-navbar";

export function DashboardPage() {
  const [company, setCompany] = useState({});
  const navigate = useNavigate()

  useEffect(() => {
      const company = JSON.parse(localStorage.getItem('company'));
      if (company) {
       setCompany(company);
      }
      else {
        navigate("/pagenotfound")
    }
    }, []);
  
  return (
    <>
      <MainNavbar tittle={company.name}></MainNavbar>
      <div className="flex py-4 item-center justify-center">
        <h1>UI not yet Implemented, Please head to Transactions</h1>
      </div>
    </>
  );
}
