import { useState } from "react";
import Customer from "../components/Customer";
import Product, { ProductType } from "../components/Product";
import { CustomerType } from "../components/Customer";
import CustomerModal from "../components/CustomerModal";
import { useNavigate } from "react-router-dom";
import { addInvoice } from "../external/Invoice";

export type InvoiceItem = {
  product: ProductType;
  qty?: number;
  rate?: number;
};
export default function Invoice() {
  const [customer, setCustomer] = useState<CustomerType>({});

  const [invoiceItemList, setInvoiceitemList] = useState<InvoiceItem[]>([]);

  const navigate = useNavigate();
  const handleBack = () => navigate("/");
  const handleSubmit = () => {addInvoice(customer, invoiceItemList)};

  return (
    <div className="container">
      <h1>
        Invoice&nbsp;
        <button className="btn btn-primary" onClick={handleSubmit}>
          submit
        </button>
        &nbsp;
        <button
          className="btn btn-danger"
          onClick={handleBack}
        >
          back
        </button>
      </h1>
      <Customer customer={customer} setCustomer={setCustomer}></Customer>
      <Product
        invoiceItemList={invoiceItemList}
        setInvoiceItemList={setInvoiceitemList}
      ></Product>
    </div>
  );
}
