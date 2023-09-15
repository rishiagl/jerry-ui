import { useState } from "react";
import Customer from "../components/Customer";
import Product, { ProductType } from "../components/Product";
import { CustomerType } from "../components/Customer";
import CustomerModal from "../components/CustomerModal";
import { json } from "react-router-dom";

export type InvoiceItem = {
  product: ProductType;
  qty?: number;
  rate?: number;
}
export default function Invoice() {
  const [customer, setCustomer] = useState<CustomerType>({});

  const [invoiceItemList, setInvoiceitemList] =
    useState<InvoiceItem[]>([]);

  return (
    <div className="container">
      <h1>Invoice</h1>
      <Customer customer={customer} setCustomer={setCustomer}></Customer>
      <Product
        invoiceItemList={invoiceItemList}
        setInvoiceItemList={setInvoiceitemList}
      ></Product>
    </div>
  );
}
