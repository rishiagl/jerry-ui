import { Fragment, ReactHTMLElement, useState } from "react";
import Select from "react-select";
import CustomerModal from "./CustomerModal";

export type CustomerType = {
  id?: number;
  name?: string;
  phone_no?: string;
  address?: string;
};

interface Props {
  customer: CustomerType;
  setCustomer: (customer: CustomerType) => void;
}

export default function Customer(props: Props) {
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [customers, setCustomers] = useState<CustomerType[]>([]);

  function getCustomers() {
    fetch("http://127.0.0.1:8080/customers")
      .then((res) => res.json())
      .then((json) => {
        setCustomers(json);
      });
  }

  function addNewCustomer(customer: CustomerType) {
    fetch("http://127.0.0.1:8080/customers", {
      method: "POST",
      body: JSON.stringify(customer),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  function PropToSelectList(
    customers: CustomerType[]
  ) {
    return customers.map(
      (opt: CustomerType) => ({
        label: opt!.phone_no,
        value: opt,
      })
    );
  }

  const m = 10;
  return (
    <Fragment>
      <CustomerModal
        show={showCustomerModal}
        setShow={setShowCustomerModal}
        onSubmit={addNewCustomer}
      ></CustomerModal>
      <div>
        <h2>
          Customer &nbsp;
          <button
            className="btn btn-primary"
            onClick={(event) => getCustomers()}
          >
            Reload
          </button>{" "}
          &nbsp;
          <button
            className="btn btn-success"
            onClick={(event) => setShowCustomerModal(true)}
          >
            New
          </button>
        </h2>
        <Select
          options={PropToSelectList(customers)}
          onChange={(opt) => props.setCustomer(opt!.value)}
        />
        <p>
          Id: {props.customer.id}
          <br/>
          Name: {props.customer.name}
          <br />
          Phone No: {props.customer.phone_no}
          <br />
          Address: {props.customer.address}
          <br />
        </p>
      </div>
    </Fragment>
  );
}
