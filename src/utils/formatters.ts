/**
 * Utility functions for formatting values
 */

/**
 * Format a number as USD currency
 * @param value The number to format
 * @returns Formatted currency string
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0, // No cents for cleaner display
  }).format(value);
};

/**
 * Format large currency values with K/M suffixes
 * @param value The number to format
 * @returns Formatted currency string with appropriate suffix
 */
export const formatLargeCurrency = (value: number): string => {
  const absValue = Math.abs(value);
  const isNegative = value < 0;
  const prefix = isNegative ? '-' : '';
  
  if (absValue >= 1000000) {
    return `${prefix}${new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 1,
    }).format(absValue / 1000000).replace('-', '')}M`;
  } else if (absValue >= 1000) {
    return `${prefix}${new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 1,
    }).format(absValue / 1000).replace('-', '')}K`;
  } else {
    return formatCurrency(value);
  }
};