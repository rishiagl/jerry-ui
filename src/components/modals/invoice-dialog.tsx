import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void,
  company_name: string,
  invoice_no: string,
};
export default function InvoiceDialog(props: Props) {
  const cancelButtonRef = useRef(null);
  const navigate = useNavigate();
  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={props.setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="flex justify-center bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Invoice Added Successfuly
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                            Please either download or print for future reference
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                            Invoice No: {props.invoice_no}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 flex flex-row justify-end sm:px-6">
                <button
                    type="button"
                    className="bg-slate-900 rounded px-4 py-2 m-1 text-white"
                    onClick={() => {
                    }}
                    ref={cancelButtonRef}
                  >
                    Download
                  </button>
                  <button
                    type="button"
                    className="bg-slate-700 rounded px-4 py-2 m-1 text-white"
                    onClick={() => { 
                    }}
                    ref={cancelButtonRef}
                  >
                    Print
                  </button>
                  <button
                    type="button"
                    className="bg-slate-500 rounded pl-4 pr-4 pt-2 pb-2 text-white m-1"
                    onClick={() => {
                        navigate(0)
                    }}
                  >
                    Back
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}