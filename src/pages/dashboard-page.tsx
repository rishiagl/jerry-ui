import { useLocation } from "react-router-dom";
import { CompanyType } from "../components/Company";
import HorizontalLinearStepper from "./progress-step";

export function DashboardPage() {
  const { state } = useLocation();
  const { company, style } = state;

  return (
      <HorizontalLinearStepper></HorizontalLinearStepper>
  );
}
