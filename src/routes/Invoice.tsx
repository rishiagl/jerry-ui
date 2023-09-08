import { useState } from "react";
import Customer from "../components/Customer";
import { CustomerType } from "../components/Customer";
import CustomerModal from "../components/CustomerModal";

export default function Invoice() {
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [customers, setCustomers] = useState([
    {
      name: "Rishi Agarwal",
      phone_no: "7970460076",
      address: "Sakchi, Jamshedpur",
    },
    { name: "Priya Agarwal", phone_no: "7846892983", address: "jamshedpur" },
  ]);

  function onClickNew() {
    setShowCustomerModal(true);
  }

  function addNewCustomer(customer: CustomerType) {
    const updateCustomers = [...customers, customer];
    setCustomers(updateCustomers);
    console.log(customer);
  }

  return (
    <div className="container">
      <h1>Invoice</h1>
      <CustomerModal
        show={showCustomerModal}
        setShow={setShowCustomerModal}
        onSubmit={addNewCustomer}
      ></CustomerModal>
      <Customer customerList={customers} onClickNew={onClickNew}></Customer>
    </div>
  );
}
