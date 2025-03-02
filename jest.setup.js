// Add custom Jest matchers for asserting on DOM nodes
// Learn more: https://github.com/testing-library/jest-dom
require('@testing-library/jest-dom');

// Mock window.matchMedia which is not implemented in JSDOM
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock Intl.NumberFormat to have consistent behavior in tests
global.Intl = {
  NumberFormat: jest.fn().mockImplementation((locale, options) => ({
    format: value => {
      // Simplified mock implementation for testing
      if (options?.style === 'currency' && options?.currency === 'USD') {
        const maximumFractionDigits = options?.maximumFractionDigits || 0;
        const val = Math.round(value * Math.pow(10, maximumFractionDigits)) / 
                  Math.pow(10, maximumFractionDigits);
        
        if (val < 0) {
          return `-$${Math.abs(val).toLocaleString('en-US', { 
            minimumFractionDigits: maximumFractionDigits,
            maximumFractionDigits: maximumFractionDigits
          })}`;
        }
        
        return `$${val.toLocaleString('en-US', { 
          minimumFractionDigits: maximumFractionDigits,
          maximumFractionDigits: maximumFractionDigits
        })}`;
      }
      return value.toString();
    }
  }))
};