import { useEffect, useState } from "react";
import { addNewCompany } from "../../external/Company";
import { Modal } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import Select from "react-select";

interface Props {
  show: boolean;
  setShow: (value: boolean) => void;
  style: {};
}

export default function CompanyModal(props: Props) {
  const [name, setName] = useState<string>();
  const [legal_name, setLegalName] = useState<string>();
  const [phone_no, setPhone_No] = useState<string>();
  const [address, setAddress] = useState<string>();
  const [city, setCity] = useState<string>();
  const [state, setState] = useState<string>();
  const [pincode, setPincode] = useState<string>();
  const [gstn, setGstn] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [website, setWebsite] = useState<string>();
  const [bank_name, setBankName] = useState<string>();
  const [account_no, setAccountNo] = useState<string>();
  const [ifsc_code, setIfscCode] = useState<string>();
  const [upi_id, setUpiId] = useState<string>();

  const handleClose = () => props.setShow(false);

  useEffect(() => {
    setName(undefined);
    setLegalName(undefined);
    setAddress(undefined);
    setPhone_No(undefined);
    setGstn(undefined);
    setEmail(undefined);
    setWebsite(undefined);
    setCity(undefined);
    setState(undefined);
    setPincode(undefined);
    setBankName(undefined);
    setAccountNo(undefined);
    setIfscCode(undefined);
    setUpiId(undefined);
  }, [props.show]);

  const { user } = useAuth0();
  const { getAccessTokenSilently } = useAuth0();

  if (!user) {
    return null;
  }

  async function HandleSubmit() {
    if (
      name != undefined &&
      phone_no != undefined &&
      address != undefined &&
      city != undefined &&
      state != undefined &&
      pincode != undefined &&
      gstn != undefined &&
      email != undefined &&
      bank_name != undefined &&
      account_no != undefined &&
      ifsc_code != undefined &&
      upi_id != undefined
    ) {
      const accessToken = await getAccessTokenSilently();
      await addNewCompany(accessToken, {
        id: 0,
        name,
        legal_name,
        phone_no,
        address,
        city,
        state,
        pincode,
        gstn,
        email,
        website,
        bank_name,
        account_no,
        ifsc_code,
        upi_id,
        owner_email: user?.email,
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
          <Modal.Title>Create New Company</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
            <label className="form-label">Legal Name:</label>
            <input
              className="form-control"
              type="text"
              id="legal_name"
              value={legal_name || ""}
              onChange={(event) => setLegalName(event.target.value)}
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
            <label className="form-label">City:</label>
            <input
              className="form-control"
              type="text"
              id="city"
              value={city || ""}
              onChange={(event) => setCity(event.target.value)}
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
              value={pincode || ""}
              onChange={(event) => setPincode(event.target.value)}
              required
            ></input>
          </div>

          <div className="mb-3">
            <label className="form-label">Gstn:</label>
            <input
              className="form-control"
              type="text"
              id="gstn"
              value={gstn || ""}
              onChange={(event) => setGstn(event.target.value)}
              required
            ></input>
          </div>

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
            <label className="form-label">Email:</label>
            <input
              className="form-control"
              type="text"
              id="email"
              value={email || ""}
              onChange={(event) => setEmail(event.target.value)}
              required
            ></input>
          </div>

          <div className="mb-3">
            <label className="form-label">Website:</label>
            <input
              className="form-control"
              type="text"
              id="website"
              value={website || ""}
              onChange={(event) => setWebsite(event.target.value)}
              required
            ></input>
          </div>

          <div className="mb-3">
            <label className="form-label">Bank Name:</label>
            <input
              className="form-control"
              type="bank_name"
              id="bank_name"
              value={bank_name || ""}
              onChange={(event) => setBankName(event.target.value)}
              required
            ></input>
          </div>

          <div className="mb-3">
            <label className="form-label">Bank Account No:</label>
            <input
              className="form-control"
              type="text"
              id="account_no"
              value={account_no || ""}
              onChange={(event) => setAccountNo(event.target.value)}
              required
            ></input>
          </div>

          <div className="mb-3">
            <label className="form-label">IFSC Code:</label>
            <input
              className="form-control"
              type="text"
              id="ifsc_code"
              value={ifsc_code || ""}
              onChange={(event) => setIfscCode(event.target.value)}
              required
            ></input>
          </div>

          <div className="mb-3">
            <label className="form-label">Upi Id:</label>
            <input
              className="form-control"
              type="text"
              id="upi_id"
              value={upi_id || ""}
              onChange={(event) => setUpiId(event.target.value)}
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
