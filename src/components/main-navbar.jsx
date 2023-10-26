import Dropdown from "./dropdown";
import { useState } from "react";

export function MainNavbar(props) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <nav className="">
      <div className="px-2 mx-auto bg-slate-600">
        <div className="flex justify-between bg-slate-600">
          <div className="flex space-x-5 items-center">
            {/* Logo */}
            <div className="flex py-2 px-2">
              <a href="/dashboard" className="no-underline hover:font-bold text-white">
                {props.tittle}
              </a>
            </div>

            {/* Primary Nav-Bar */}
            <div className="hidden md:flex items-center space-x-3">
              <a
                href="/invoice"
                className="py-2 px-1 no-underline hover:font-bold text-white rounded"
              >
                Invoice</a>
              <Dropdown
                {...{
                  name: "Ledger",
                  links: [
                    { label: "Sales", href: "/ledger/Sales" },
                    { label: "Customer", href: "/ledger/Customer" },
                  ],
                }}
              ></Dropdown>
              <a
                href="/home"
                className="py-2 px-1 no-underline hover:font-bold text-white"
              >
                Home</a>
              <a
                href="/logout"
                className="py-2 px-1 no-underline hover:font-bold text-white"
              >
                Settings</a>
            </div>
          </div>
          {/* Seconday Nav-bar */}
          <div className="hidden md:flex items-center">
            <a
              href="/logout"
              className="py-0.4 px-2 no-underline hover:font-bold text-white rounded border-2 border-slate-200"
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
              <svg class="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile-menu */}
        <div className={"md:hidden py-2 " + (showMobileMenu ? "" : "hidden")}>
          <a
            href="/invoice"
            className="py-2 px-1 no-underline hover:font-bold text-white rounded"
          >
            Invoice</a><br></br>
          <Dropdown
            {...{
              name: "Ledger",
              links: [
                { label: "Sales", href: "/ledger/Sales" },
                { label: "Customer", href: "/ledger/Customer" },
              ],
            }}
          ></Dropdown><br></br>
          <a
            href="/home"
            className="block py-1 px-1 no-underline hover:font-bold text-white rounded"
          >
            Home</a>
          <a
            href="/logout"
            className="block py-1 px-1 no-underline hover:font-bold text-white rounded"
          >
            Settings</a>
          <a
            href="/logout"
            className="block text-center py-0.5 px-2 no-underline hover:font-bold text-white rounded border-2 border-slate-200"
          >
            Log Out
          </a>
        </div>
      </div>
    </nav>
  )
}