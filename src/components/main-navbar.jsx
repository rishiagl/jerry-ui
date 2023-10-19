import Dropdown from "./dropdown";
import { useState } from "react";

export function MainNavbar(props) {
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    return (
        <nav className="">
        <div className="px-2 mx-auto bg-gray-200">
          <div className="flex justify-between">
            <div className="flex space-x-5 items-center">
              {/* Logo */}
              <div className="flex py-2 px-2">{props.tittle}</div>

              {/* Primary Nav-Bar */}
              <div className="hidden md:flex items-center space-x-3">
                <Dropdown
                  {...{
                    name: "Transaction",
                    links: [
                      { label: "invoice", href: "/transaction/invoice" },
                      { label: "payment", href: "/transaction/payments" },
                      { label: "reciept", href: "/transaction/reciepts" },
                    ],
                  }}
                ></Dropdown>
                <Dropdown
                  {...{
                    name: "Ledger",
                    links: [
                      { label: "invoice", href: "/ledger/invoice" },
                      { label: "payment", href: "/ledger/payments" },
                      { label: "reciept", href: "/ledger/reciepts" },
                    ],
                  }}
                ></Dropdown>
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
          <div className={"md:hidden py-2 " + (showMobileMenu ? "" : "hidden")}>
            <Dropdown
              {...{
                name: "Transaction",
                links: [
                  { label: "invoice", href: "/transaction/invoice" },
                  { label: "payment", href: "/transaction/payments" },
                  { label: "reciept", href: "/transaction/reciepts" },
                ],
              }}
            ></Dropdown><br></br>
            <Dropdown
              {...{
                name: "Ledger",
                links: [
                  { label: "invoice", href: "/ledger/invoice" },
                  { label: "payment", href: "/ledger/payments" },
                  { label: "reciept", href: "/ledger/reciepts" },
                ],
              }}
            ></Dropdown>
            <a
              href="/logout"
              className="block text-center py-0.5 px-2 no-underline text-gray-700 hover:text-gray-900 rounded border-2 border-gray-500"
            >
              Log Out
            </a>
          </div>
        </div>
      </nav>
    )
}