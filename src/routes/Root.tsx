import { PDFDownloadLink } from "@react-pdf/renderer";
import { Component, MouseEventHandler } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import { InvoicePdf } from "../components/InvoicePdf";

export default function Root() {
  return (
    <div className="--bs-body-color-rgb container">
      <h1>My Choice Electronics</h1>
      <Link to="invoice">Invoice</Link><br/>
      <PDFDownloadLink document={<InvoicePdf />} fileName="somename.pdf">
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Download now!"
        }
      </PDFDownloadLink>
    </div>
  );
}
