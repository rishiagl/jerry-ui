import { Fragment, ReactHTMLElement, useEffect, useRef, useState } from "react";
import Select from "react-select";
import CustomerModal from "./modals/customer-modal";
import { getCustomer } from "../external/Customer";
import { useAuth0 } from "@auth0/auth0-react";

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

  const { user } = useAuth0();
  const { getAccessTokenSilently } = useAuth0();

  if (!user) {
    return null;
  }

  useEffect(() => {
    let isMounted = true;

    const getCustomers = async () => {
      const accessToken = await getAccessTokenSilently();
      const { data, error } = await getCustomer(accessToken);

      if (!isMounted) {
        return;
      }

      if (data) {
        setCustomers(data);
      }

      if (error) {
        console.log("External API not working");
      }
    };

    getCustomers();

    return () => {
      isMounted = false;
    };
  }, [getAccessTokenSilently, showCustomerModal]);

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
      <div
        style={{
          borderStyle: "solid",
          borderWidth: "8px",
          borderColor: "#2979ff",
          padding: "2rem",
          borderRadius: "30px",
          marginLeft: "35%",
          marginRight: "15%",
          fontFamily: "Lucida Console",
          fontSize: "clamp(1rem, 1.5vw, 3rem)",
          textAlign: "left",
          maxWidth: "500px",
        }}
      >
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
