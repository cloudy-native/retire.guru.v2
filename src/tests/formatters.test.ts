import { formatCurrency, formatLargeCurrency } from '../utils/formatters';

describe('formatCurrency', () => {
  test('formats integers correctly', () => {
    expect(formatCurrency(1234)).toBe('$1,234');
    expect(formatCurrency(0)).toBe('$0');
    expect(formatCurrency(1000000)).toBe('$1,000,000');
  });

  test('handles negative numbers', () => {
    expect(formatCurrency(-1234)).toBe('-$1,234');
  });

  test('rounds to whole numbers', () => {
    expect(formatCurrency(1234.56)).toBe('$1,235');
    expect(formatCurrency(1234.49)).toBe('$1,234');
  });
});

describe('formatLargeCurrency', () => {
  test('handles numbers less than 1000', () => {
    expect(formatLargeCurrency(123)).toBe('$123');
    expect(formatLargeCurrency(999)).toBe('$999');
  });

  test('formats numbers between 1000 and 999999 with K suffix', () => {
    expect(formatLargeCurrency(1000)).toBe('$1.0K');
    expect(formatLargeCurrency(12345)).toBe('$12.3K');
    expect(formatLargeCurrency(999999)).toBe('$1,000.0K');
  });

  test('formats numbers 1000000 and above with M suffix', () => {
    expect(formatLargeCurrency(1000000)).toBe('$1.0M');
    expect(formatLargeCurrency(1234567)).toBe('$1.2M');
    expect(formatLargeCurrency(9876543)).toBe('$9.9M');
  });

  test('handles negative numbers', () => {
    expect(formatLargeCurrency(-1234)).toBe('-$1.2K');
    expect(formatLargeCurrency(-1234567)).toBe('-$1.2M');
  });
});