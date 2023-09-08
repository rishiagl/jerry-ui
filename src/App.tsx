import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import Root from "./routes/Root"
import Invoice from "./routes/Invoice";
import { redirect } from "react-router-dom";

function handleRoute(route: string) {
  console.log("Button Clicked");
  const navigate = useNavigate();
  navigate(route);
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
  },
  {
    path: "invoice",
    element: <Invoice></Invoice>,
  },
]);

function App() {
  return <RouterProvider router={router} />
}

export default App;