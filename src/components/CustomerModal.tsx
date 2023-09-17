import { Modal, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { CustomerType } from "./Customer";
import { addNewCustomer } from "../external/Customer";

interface Props {
  show: boolean;
  setShow: (value: boolean) => void;
}

export default function CustomerModal(props: Props) {
  const [name, setName] = useState<string>();
  const [phone_no, setPhone_No] = useState<string>();
  const [address, setAddress] = useState<string>();

  const handleClose = () => props.setShow(false);

  useEffect( () => {
    setName(undefined);
    setAddress(undefined);
    setPhone_No(undefined);
  }, [props.show]
  );

  function HandleSubmit() {
    if (name != undefined && phone_no != undefined && address != undefined) {
      addNewCustomer({ id: 0, name, phone_no, address });
      handleClose();
    }
  }

  return (
    <>
      <Modal
        show={props.show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label className="form-label">Phone No:</label>
            <input
              type="text"
              id="phone_no"
              className="form-control"
              maxLength={10}
              value={phone_no || ""}
              onChange={(event) => setPhone_No(event.target.value)}
              required
            ></input>
          </div>

          <div className="mb-3">
            <label className="form-label">Name:</label>
            <input
              className="form-control"
              type="text"
              id="name"
              value={name || ""}
              onChange={(event) => setName(event.target.value)}
              required
            ></input>
          </div>

          <div className="mb-3">
            <label className="form-label">Address:</label>
            <input
              className="form-control"
              type="text"
              id="address"
              value={address || ""}
              onChange={(event) => setAddress(event.target.value)}
              required
            ></input>
          </div>

          <div className="mb-3">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={(event) => HandleSubmit()}
            >
              Submit
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
