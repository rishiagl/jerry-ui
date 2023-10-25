import { Modal, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { addNewCustomer } from "../../external/Customer";
import { useAuth0 } from "@auth0/auth0-react";
import Select from "react-select";

interface Props {
  show: boolean;
  setShow: (value: boolean) => void;
}

export default function CustomerModal(props: Props) {
  const [name, setName] = useState<string>();
  const [phone_no, setPhone_No] = useState<string>();
  const [address, setAddress] = useState<string>();
  const [state, setState] = useState<string>();
  const [pincode, setPincode] = useState<string>();

  const handleClose = () => props.setShow(false);

  useEffect(() => {
    setName(undefined);
    setAddress(undefined);
    setPhone_No(undefined);
    setState(undefined);
    setPincode(undefined);
  }, [props.show]);

  const { getAccessTokenSilently } = useAuth0();

  async function HandleSubmit() {
    if (
      name != undefined &&
      phone_no != undefined &&
      address != undefined &&
      state != undefined && pincode?.length == 6
    ) {
      const accessToken = await getAccessTokenSilently();
      await addNewCustomer(accessToken, {
        id: 0,
        name,
        phone_no,
        address,
        state,
        pincode,
      });
      handleClose();
    }
  }

  function PropToSelectStateList() {
    let state = [
      "Andhra Pradesh",
      "Arunachal Pradesh",
      "Assam",
      "Bihar",
      "Chhattisgarh",
      "Goa",
      "Gujarat",
      "Haryana",
      "Himachal Pradesh",
      "Jammu and Kashmir",
      "Jharkhand",
      "Karnataka",
      "Kerala",
      "Madhya Pradesh",
      "Maharashtra",
      "Manipur",
      "Meghalaya",
      "Mizoram",
      "Nagaland",
      "Odisha",
      "Punjab",
      "Rajasthan",
      "Sikkim",
      "Tamil Nadu",
      "Telangana",
      "Tripura",
      "Uttarakhand",
      "Uttar Pradesh",
      "West Bengal",
      "Andaman and Nicobar Islands",
      "Chandigarh",
      "Dadra and Nagar Haveli",
      "Daman and Diu",
      "Delhi",
      "Lakshadweep",
      "Puducherry",
    ];

    return state.map((opt: string) => ({
      label: opt,
      value: opt,
    }));
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
          <form>
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
                maxLength={20}
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
                maxLength={50}
                value={address || ""}
                onChange={(event) => setAddress(event.target.value)}
                required
              ></input>
            </div>

            <div className="mb-3">
              <label className="form-label">State:</label>
              <Select
                options={PropToSelectStateList()}
                onChange={(opt) => setState(opt!.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">pincode:</label>
              <input
                className="form-control"
                type="text"
                id="pincode"
                maxLength={6}
                minLength={6}
                value={pincode || ""}
                onChange={(event) => setPincode(event.target.value)}
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
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
