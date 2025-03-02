/**
 * Reusable UI components
 */

import React from "react";
import {
  Box,
  BoxProps,
  FormControl,
  FormHelperText,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import { FormNumberInputProps } from "./types";

/**
 * A container for charts with responsive sizing
 */
export interface ChartContainerProps extends BoxProps {
  children: React.ReactNode;
  height?: number;
}

export const ChartContainer: React.FC<ChartContainerProps> = ({
  children,
  height = 300,
  ...boxProps
}) => {
  return (
    <Box height={`${height}px`} width="100%" {...boxProps}>
      {children}
    </Box>
  );
};

/**
 * A form component for number inputs with formatting and validation
 */
export const FormNumberInput: React.FC<FormNumberInputProps> = ({
  value,
  onChange,
  helperText,
  placeholder,
  min,
  max,
  step,
}) => {
  const handleChange = (valueAsString: string, valueAsNumber: number) => {
    // If the field is empty, pass the empty string and prevent NaN
    if (valueAsString === "") {
      onChange(valueAsString, 0);
    } else {
      onChange(valueAsString, valueAsNumber);
    }
  };

  return (
    <FormControl>
      <NumberInput
        value={value || ""}
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
        keepWithinRange={true}
        clampValueOnBlur={true}
      >
        <NumberInputField placeholder={placeholder} />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};