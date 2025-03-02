import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { ChartContainer, FormNumberInput } from '../utils/components';

describe('ChartContainer', () => {
  test('renders children correctly', () => {
    render(
      <ChakraProvider>
        <ChartContainer>
          <div data-testid="chart-content">Chart Content</div>
        </ChartContainer>
      </ChakraProvider>
    );
    
    // Just check that the children render properly
    const content = screen.getByTestId('chart-content');
    expect(content).toBeInTheDocument();
    expect(content.textContent).toBe('Chart Content');
  });
});

describe('FormNumberInput', () => {
  const mockOnChange = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test('renders with correct props', () => {
    render(
      <ChakraProvider>
        <FormNumberInput
          value={100}
          onChange={mockOnChange}
          helperText="Test helper text"
          placeholder="Test placeholder"
          min={0}
          max={1000}
          step={10}
        />
      </ChakraProvider>
    );
    
    // Check input field
    const input = screen.getByPlaceholderText('Test placeholder');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('100');
    
    // Check helper text
    const helperText = screen.getByText('Test helper text');
    expect(helperText).toBeInTheDocument();
  });
  
  test('calls onChange with correct values when input changes', () => {
    render(
      <ChakraProvider>
        <FormNumberInput
          value={100}
          onChange={mockOnChange}
          helperText="Test helper text"
        />
      </ChakraProvider>
    );
    
    const input = screen.getByRole('spinbutton');
    
    // Update input value
    fireEvent.change(input, { target: { value: '250' } });
    
    // Check that onChange was called with correct values
    expect(mockOnChange).toHaveBeenCalledWith('250', 250);
  });
  
  test('handles empty input correctly', () => {
    render(
      <ChakraProvider>
        <FormNumberInput
          value={100}
          onChange={mockOnChange}
          helperText="Test helper text"
        />
      </ChakraProvider>
    );
    
    const input = screen.getByRole('spinbutton');
    
    // Clear input value
    fireEvent.change(input, { target: { value: '' } });
    
    // Should call onChange with empty string and 0
    expect(mockOnChange).toHaveBeenCalledWith('', 0);
  });
});