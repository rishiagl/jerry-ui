import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainNavbar } from "../../components/main-navbar";
import { CompanyType } from "../../components/Company";

export function SalesLedger() {
  const [company, setCompany] = useState<CompanyType>({});
  const navigate = useNavigate();

  useEffect(() => {
    const company = JSON.parse(localStorage.getItem("company") || "{}");
    if (company) {
      setCompany(company);
    } else {
      navigate("/pagenotfound");
    }
  }, []);
  return (
    <>
      <div className="lg:h-[calc(100vh-40px)]">
        <MainNavbar tittle={company.name}></MainNavbar>
        <div className="p-3 w-full h-full bg-slate-600">
            <div className="flex flex-col lg:flex-row w-full h-full p-2 bg-slate-300 lg:space-x-2 rounded-lg">
                <div className="flex lg:w-1/2 bg-slate-100 rounded">
                    Analysis
                </div>
                <div className="flex lg:w-1/2 bg-slate-100 rounded">
                    Ledger
                </div>
            </div>
        </div>
      </div>
    </>
  );
}
