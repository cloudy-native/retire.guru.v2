/**
 * Common type definitions
 */

export interface ScenarioRow {
  year: number;
  ssMonthly: number;
  requiredFrom401kMonthly: number;
  totalMonthlyIncome: number;
  startingBalance: number;
  yearlyReturn: number;
  endingBalance: number;
  withdrawalRate: string;
}

export type ScenarioOption = "default";

export interface ChartData {
  year: number;
  Balance: number;
}

export interface FinancialParams {
  inflationRatePercent: number;
  initialBalance: number;
  desiredMonthlyIncome: number;
  socialSecurity: number;
  colaAdjustment: number;
  investmentReturn: number;
}

export interface FormNumberInputProps {
  value: number;
  onChange: (valueAsString: string, valueAsNumber: number) => void;
  helperText: string;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
}