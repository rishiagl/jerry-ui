import { useLocation } from "react-router-dom";
import { CompanyType } from "../components/Company";
import HorizontalLinearStepper from "../components/progress-step";
import { useState } from "react";
import { CustomerType } from "../components/Customer";
import { InvoiceItem } from "../routes/Invoice";

export function DashboardPage() {
  const { state } = useLocation();
  const { company, style } = state;
  const [customer, setCustomer] = useState<CustomerType>({});
  const [invoiceItemList, setInvoiceitemList] = useState<InvoiceItem[]>([]);

  return (
    <div
      className="container-fluid text-center"
      style={{
        margin: "3%",
      }}
    >
      <h1>{company.name}</h1>
      <br></br>
      <HorizontalLinearStepper
        customer={customer}
        setCustomer={setCustomer}
        invoiceItemList={invoiceItemList}
        setInvoiceItemList={setInvoiceitemList}
      ></HorizontalLinearStepper>
    </div>
  );
}
