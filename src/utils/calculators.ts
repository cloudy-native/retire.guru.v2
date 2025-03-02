/**
 * Financial calculation utilities
 */

import { ChartData, FinancialParams, ScenarioRow } from "./types";

/**
 * Calculates retirement scenario based on financial parameters
 * @param financialParams Financial parameters for calculation
 * @param years Number of years to calculate (default: 30)
 * @returns Array of scenario data by year
 */
export const calculateScenario = (
  financialParams: FinancialParams,
  years = 30
): ScenarioRow[] => {
  const results: ScenarioRow[] = [];
  const {
    initialBalance,
    desiredMonthlyIncome,
    socialSecurity,
    colaAdjustment,
    inflationRatePercent,
    investmentReturn,
  } = financialParams;

  const currentYear = new Date().getFullYear();

  // Monthly figures
  let monthlySSBenefit = socialSecurity;
  let requiredMonthlyIncome = desiredMonthlyIncome;
  let requiredFrom401k = requiredMonthlyIncome - monthlySSBenefit;
  let balance = initialBalance;

  for (let year = 0; year < years; year++) {
    const yearlySSBenefit = monthlySSBenefit * 12;
    const yearlyFrom401k = requiredFrom401k * 12;
    const totalYearlyIncome = yearlySSBenefit + yearlyFrom401k;
    const yearlyReturn = (balance * investmentReturn) / 100.0;
    const yearEndBalance = balance + yearlyReturn - yearlyFrom401k;

    results.push({
      year: currentYear + year,
      ssMonthly: monthlySSBenefit,
      requiredFrom401kMonthly: requiredFrom401k,
      totalMonthlyIncome: monthlySSBenefit + requiredFrom401k,
      startingBalance: balance,
      yearlyReturn: yearlyReturn,
      endingBalance: yearEndBalance > 0 ? yearEndBalance : 0,
      withdrawalRate: ((yearlyFrom401k / balance) * 100).toFixed(2),
    });

    // Update for next year
    monthlySSBenefit *= 1 + colaAdjustment / 100.0; // Apply COLA
    requiredMonthlyIncome *= 1 + inflationRatePercent / 100.0; // Adjust income for inflation
    requiredFrom401k = requiredMonthlyIncome - monthlySSBenefit;
    balance = yearEndBalance;

    // If balance goes negative, mark as depleted
    if (balance < 0) {
      for (let i = year + 1; i < years; i++) {
        results.push({
          year: currentYear + i,
          ssMonthly:
            monthlySSBenefit * Math.pow(1 + colaAdjustment / 100.0, i - year),
          requiredFrom401kMonthly: 0,
          totalMonthlyIncome:
            monthlySSBenefit * Math.pow(1 + colaAdjustment / 100.0, i - year),
          startingBalance: 0,
          yearlyReturn: 0,
          endingBalance: 0,
          withdrawalRate: "0.00",
        });
      }
      break;
    }
  }

  return results;
};

/**
 * Prepares chart data from scenario data
 * @param scenarioData Scenario calculation results
 * @param years Number of years to include (default: 30)
 * @returns Array of chart data points
 */
export const prepareChartData = (
  scenarioData: ScenarioRow[],
  years = 30
): ChartData[] => {
  const chartData: ChartData[] = [];
  const currentYear = new Date().getFullYear();

  for (let i = 0; i < years; i++) {
    chartData.push({
      year: currentYear + i,
      Balance: i < scenarioData.length ? scenarioData[i].endingBalance : 0,
    });
  }

  return chartData;
};

/**
 * Updates a specific parameter in the financial parameters
 * @param currentParams Current financial parameters
 * @param param Parameter key to update
 * @param value New value
 * @returns Updated financial parameters
 */
export const updateFinancialParam = <K extends keyof FinancialParams>(
  currentParams: FinancialParams,
  param: K,
  value: number
): FinancialParams => {
  return {
    ...currentParams,
    [param]: value,
  };
};
