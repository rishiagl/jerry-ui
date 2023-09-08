import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import { CustomerType } from "./Customer";

interface Props {
  show: boolean;
  setShow: (value: boolean) => void;
  onSubmit: (customer: CustomerType) => void;
}

export default function CustomerModal(props: Props) {
  const [name, setName] = useState("");
  const [phone_no, setPhone_No] = useState("");
  const [address, setAddress] = useState("");

  const handleClose = () => props.setShow(false);

  function HandleSubmit() {
    props.onSubmit({ name, phone_no, address });
    handleClose();
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
              value={phone_no}
              onChange={(event) => setPhone_No(event.target.value)}
            ></input>
          </div>

          <div className="mb-3">
            <label className="form-label">Name:</label>
            <input
              className="form-control"
              type="text"
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            ></input>
          </div>

          <div className="mb-3">
            <label className="form-label">Address:</label>
            <input
              className="form-control"
              type="text"
              id="address"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
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
