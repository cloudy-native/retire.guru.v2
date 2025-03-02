import { calculateScenario, prepareChartData, updateFinancialParam } from '../utils/calculators';
import { FinancialParams } from '../utils/types';

describe('updateFinancialParam', () => {
  test('updates a specific parameter correctly', () => {
    const initialParams: FinancialParams = {
      inflationRatePercent: 2.4,
      initialBalance: 100000,
      desiredMonthlyIncome: 3000,
      socialSecurity: 1500,
      colaAdjustment: 2.3,
      investmentReturn: 6.0
    };

    const updatedParams = updateFinancialParam(initialParams, 'initialBalance', 150000);
    
    expect(updatedParams).toEqual({
      ...initialParams,
      initialBalance: 150000
    });

    // Original object shouldn't be modified
    expect(initialParams.initialBalance).toBe(100000);
  });
});

describe('calculateScenario', () => {
  const mockParams: FinancialParams = {
    inflationRatePercent: 3.0,
    initialBalance: 500000,
    desiredMonthlyIncome: 4000,
    socialSecurity: 2000,
    colaAdjustment: 2.0,
    investmentReturn: 5.0
  };

  beforeAll(() => {
    // Mock Date to return a fixed date
    const OriginalDate = global.Date;
    const mockDate = new Date(2025, 0, 1); // January 1, 2025
    
    // @ts-ignore - this is a common way to mock Date in Jest
    global.Date = jest.fn(() => mockDate);
    global.Date.UTC = OriginalDate.UTC;
    global.Date.parse = OriginalDate.parse;
    global.Date.now = jest.fn(() => mockDate.getTime());
  });

  afterAll(() => {
    // Restore original Date
    // @ts-ignore
    global.Date = Date;
  });

  test('calculates first year correctly', () => {
    const result = calculateScenario(mockParams, 1);
    
    expect(result.length).toBe(1);
    const firstYear = result[0];
    
    // First year
    expect(firstYear.year).toBe(2025);
    expect(firstYear.ssMonthly).toBe(2000);
    expect(firstYear.requiredFrom401kMonthly).toBe(2000); // 4000 - 2000
    expect(firstYear.totalMonthlyIncome).toBe(4000);
    expect(firstYear.startingBalance).toBe(500000);
    
    // Calculate yearly return (5% of 500,000)
    const yearlyReturn = 500000 * 0.05;
    expect(firstYear.yearlyReturn).toBe(yearlyReturn);
    
    // Calculate ending balance (starting + return - yearly withdrawals)
    const yearlyWithdrawal = 2000 * 12;
    const endingBalance = 500000 + yearlyReturn - yearlyWithdrawal;
    expect(firstYear.endingBalance).toBe(endingBalance);
    
    // Calculate withdrawal rate (yearly withdrawal / starting balance * 100)
    const withdrawalRate = ((yearlyWithdrawal / 500000) * 100).toFixed(2);
    expect(firstYear.withdrawalRate).toBe(withdrawalRate);
  });

  test('handles funds depletion cases', () => {
    // Set up parameters that will deplete quickly
    const depletingParams: FinancialParams = {
      ...mockParams,
      initialBalance: 30000,      // Very small balance
      desiredMonthlyIncome: 10000, // Very high withdrawal
      investmentReturn: 2.0       // Very low return
    };
    
    const result = calculateScenario(depletingParams, 10);
    
    // With these parameters, we expect the funds to be insufficient
    // Check the final year to see if the ending balance is 0 or very small relative to the initial balance
    const finalYear = result[result.length - 1];
    expect(finalYear.endingBalance).toBeLessThan(depletingParams.initialBalance * 0.5);
    
    // Verify that the withdrawal rates are extremely high (unsustainable)
    const earlyYear = result[0];
    expect(parseFloat(earlyYear.withdrawalRate)).toBeGreaterThan(20); // >20% withdrawal rate is unsustainable
  });
});

describe('prepareChartData', () => {
  test('transforms scenario data to chart data format', () => {
    const currentYear = new Date().getFullYear();
    const scenarioData = [
      {
        year: currentYear,
        ssMonthly: 2000,
        requiredFrom401kMonthly: 2000,
        totalMonthlyIncome: 4000,
        startingBalance: 500000,
        yearlyReturn: 25000,
        endingBalance: 500000,
        withdrawalRate: "4.80"
      },
      {
        year: currentYear + 1,
        ssMonthly: 2040,
        requiredFrom401kMonthly: 2060,
        totalMonthlyIncome: 4100,
        startingBalance: 500000,
        yearlyReturn: 25000,
        endingBalance: 450000,
        withdrawalRate: "4.94"
      }
    ];
    
    const result = prepareChartData(scenarioData, 2);
    
    expect(result.length).toBe(2);
    expect(result[0]).toEqual({ year: currentYear, Balance: 500000 });
    expect(result[1]).toEqual({ year: currentYear + 1, Balance: 450000 });
  });
  
  test('handles years beyond scenario data with zero balance', () => {
    const currentYear = new Date().getFullYear();
    const scenarioData = [
      {
        year: currentYear,
        ssMonthly: 2000,
        requiredFrom401kMonthly: 2000,
        totalMonthlyIncome: 4000,
        startingBalance: 500000,
        yearlyReturn: 25000,
        endingBalance: 500000,
        withdrawalRate: "4.80"
      }
    ];
    
    // Ask for 3 years of chart data when we only have 1 year of scenario data
    const result = prepareChartData(scenarioData, 3);
    
    expect(result.length).toBe(3);
    expect(result[0]).toEqual({ year: currentYear, Balance: 500000 });
    expect(result[1]).toEqual({ year: currentYear + 1, Balance: 0 });
    expect(result[2]).toEqual({ year: currentYear + 2, Balance: 0 });
  });
});