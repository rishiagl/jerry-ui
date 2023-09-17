import { Fragment, ReactHTMLElement, useEffect, useRef, useState } from "react";
import Select from "react-select";
import CustomerModal from "./CustomerModal";
import { getCustomers } from "../external/Customer";

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

  useEffect(() => {
    getCustomers()
      .then((res) => {
        console.log(res);
        setCustomers(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [showCustomerModal]);

  function PropToSelectList(customers: CustomerType[]) {
    return customers.map((opt: CustomerType) => ({
      label: opt!.phone_no,
      value: opt,
    }));
  }

  const m = 10;
  return (
    <Fragment>
      <CustomerModal
        show={showCustomerModal}
        setShow={setShowCustomerModal}
      ></CustomerModal>
      <div>
        <h3>
          Customer &nbsp;
          <button
            className="btn btn-success"
            onClick={(event) => setShowCustomerModal(true)}
          >
            New
          </button>
        </h3>
        <Select
          options={PropToSelectList(customers)}
          onChange={(opt) => props.setCustomer(opt!.value)}
        />
        <p>
          Id: {props.customer.id}
          <br />
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
