import { Fragment, ReactHTMLElement, useState } from "react";
import Select from "react-select";

export type CustomerType = {
  name: string;
  phone_no: string;
  address: string;
};

interface Props {
  customerList: CustomerType[];
  onClickNew: () => void;
}

export default function Customer(props: Props) {
  const [customerState, setCustomerState] = useState({
    name: "",
    phone_no: "",
    address: "",
  });

  function PropToSelectList(
    customers: { name: string; phone_no: string; address: string }[]
  ) {
    return customers.map(
      (opt: { name: string; phone_no: string; address: string }) => ({
        label: opt!.phone_no,
        value: opt,
      })
    );
  }

  const m = 10;
  return (
    <Fragment>
      <div>
        <h2>
          Customer &nbsp;
          <button
            className="btn btn-success"
            onClick={(event) => props.onClickNew()}
          >
            New
          </button>
        </h2>
        <Select
          options={PropToSelectList(props.customerList)}
          onChange={(opt) => setCustomerState(opt!.value)}
        />
        <p>
          Name: {customerState.name}
          <br />
          Phone No: {customerState.phone_no}
          <br />
          Address: {customerState.address}
          <br />
        </p>
      </div>
    </Fragment>
  );
}
