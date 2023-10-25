import Dropdown from "./dropdown";
import { useState } from "react";

export function MainNavbar(props) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <nav className="">
      <div className="px-2 mx-auto bg-stone-200">
        <div className="flex justify-between">
          <div className="flex space-x-5 items-center">
            {/* Logo */}
            <div className="flex py-2 px-2">
              <a href="/dashboard" className="no-underline text-stone-700 hover:text-stone-900">
                {props.tittle}
              </a>
            </div>

            {/* Primary Nav-Bar */}
            <div className="hidden md:flex items-center space-x-3">
              <a
                href="/invoice"
                className="py-2 px-1 no-underline text-stone-700 hover:text-stone-900 rounded"
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
                className="py-2 px-1 no-underline text-stone-700 hover:text-stone-900 rounded"
              >
                Home</a>
              <a
                href="/logout"
                className="py-2 px-1 no-underline text-stone-700 hover:text-stone-900 rounded"
              >
                Settings</a>
            </div>
          </div>
          {/* Seconday Nav-bar */}
          <div className="hidden md:flex items-center">
            <a
              href="/logout"
              className="py-0.4 px-2 no-underline text-stone-700 hover:text-stone-900 rounded border-2 border-stone-500"
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
          <a
            href="/invoice"
            className="py-2 px-1 no-underline text-stone-700 hover:text-stone-900 rounded"
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
            className="block py-1 px-1 no-underline text-stone-700 hover:text-stone-900 rounded"
          >
            Home</a>
          <a
            href="/logout"
            className="block py-1 px-1 no-underline text-stone-700 hover:text-stone-900 rounded"
          >
            Settings</a>
          <a
            href="/logout"
            className="block text-center py-0.5 px-2 no-underline text-stone-700 hover:text-stone-900 rounded border-2 border-stone-500"
          >
            Log Out
          </a>
        </div>
      </div>
    </nav>
  )
}