import { useState } from "react";
import Customer from "../components/Customer";
import Product from "../components/Product";
import { CustomerType } from "../components/Customer";
import CustomerModal from "../components/CustomerModal";
import { json } from "react-router-dom";

export default function Invoice() {
  const [customer, setCustomer] = useState({
    id: 0,
    name: "Please Reload",
    phone_no: "0000000000",
    address: "Default Address",
  });

  const [productList, setproductList] = useState([
    {
      id: 0,
      name: "Base Product",
      hsn: "000000",
      tax_rate: 0,
    },
  ]);

  return (
    <div className="container">
      <h1>Invoice</h1>
      <Customer customer={customer} setCustomer={setCustomer}></Customer>
      <Product productList={productList} setProductList={setproductList}></Product>
    </div>
  );
}
