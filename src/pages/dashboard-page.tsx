import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { CustomerType } from "../components/Customer";
import { InvoiceItem } from "../routes/Invoice";
import { MainNavbar } from "../components/main-navbar";

export function DashboardPage() {
  const { state } = useLocation();
  const { company, style } = state;

  return (
    <>
      <MainNavbar tittle={company.name}></MainNavbar>
      <div className="flex py-4 item-center justify-center">
        <h1>UI not yet Implemented, Please head to Transactions</h1>
      </div>
    </>
  );
}
