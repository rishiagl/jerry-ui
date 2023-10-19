import { useLocation, useNavigate } from "react-router-dom";
import { CompanyType } from "../components/Company";
import HorizontalLinearStepper from "../components/progress-step";
import { useState } from "react";
import { CustomerType } from "../components/Customer";
import { InvoiceItem } from "../routes/Invoice";

export function DashboardPage() {
  const navigate = useNavigate();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { state } = useLocation();
  const { company, style } = state;
  const [customer, setCustomer] = useState<CustomerType>({});
  const [invoiceItemList, setInvoiceitemList] = useState<InvoiceItem[]>([]);

  return (
    <>
      <nav className="">
        <div className="px-2 mx-auto bg-gray-200">
          <div className="flex justify-between">
            <div className="flex space-x-5 items-center">
              {/* Logo */}
              <div className="flex py-2 px-2">{company.name}</div>

              {/* Primary Nav-Bar */}
              <div className="hidden md:flex items-center space-x-3">
                <a
                  href="#"
                  className="py-2 px-2 no-underline text-gray-700 hover:text-gray-900"
                >
                  Transactions
                </a>
                <a
                  href="#"
                  className="py-2 px-2 no-underline text-gray-700 hover:text-gray-900"
                >
                  Ledger
                </a>
              </div>
            </div>
            {/* Seconday Nav-bar */}
            <div className="hidden md:flex items-center">
              <a
                href="/logout"
                className="py-0.4 px-2 no-underline text-gray-700 hover:text-gray-900 rounded border-2 border-gray-500"
              >
                Log Out
              </a>
            </div>

            {/* Mobile Nav-Bar */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => {
                  setShowMobileMenu(!showMobileMenu);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile-menu */}
          <div className={"md:hidden py-2 " + (showMobileMenu ? '' : 'hidden')}>
            <a
              href="#"
              className="block py-1 px-2 no-underline text-sm text-gray-700 hover:text-gray-900"
            >
              Transactions
            </a>
            <a
              href="#"
              className="block py-1 px-2 no-underline text-sm text-gray-700 hover:text-gray-900"
            >
              ledger
            </a>
            <a
              href="/logout"
              className="block text-center py-0.5 px-2 no-underline text-gray-700 hover:text-gray-900 rounded border-2 border-gray-500"
            >
              Log Out
            </a>
          </div>
        </div>
      </nav>

      <div className="flex py-4 item-center justify-center">
        <h1>UI not yet Implemented, Please head to Transactions</h1>
      </div>
    </>
  );
}
