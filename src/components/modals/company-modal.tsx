import { useEffect, useState } from "react";
import { addNewCompany } from "../../external/Company";
import { Modal } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

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
  const [gstn, setGstn] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [website, setWebsite] = useState<string>();

  const handleClose = () => props.setShow(false);

  useEffect(() => {
    setName(undefined);
    setLegalName(undefined);
    setAddress(undefined);
    setPhone_No(undefined);
    setGstn(undefined);
    setEmail(undefined);
    setWebsite(undefined);
  }, [props.show]);

  const { user } = useAuth0();
  const { getAccessTokenSilently } = useAuth0();

  if (!user) {
    return null;
  }

  async function HandleSubmit() {
    if (name != undefined && phone_no != undefined && address != undefined) {
      const accessToken = await getAccessTokenSilently();
      await addNewCompany(accessToken, {
        id: 0,
        name,
        legal_name,
        phone_no,
        address,
        gstn,
        email,
        website,
        owner_email: user?.email,
      });
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
