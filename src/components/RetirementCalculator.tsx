import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Alert,
  AlertIcon,
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Tooltip as ChakraTooltip,
  Flex,
  Heading,
  SimpleGrid,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  calculateScenario,
  ChartContainer,
  ChartData,
  FinancialParams,
  formatCurrency,
  formatLargeCurrency,
  FormNumberInput,
  prepareChartData,
  ScenarioRow,
  updateFinancialParam,
} from "../utils";

// ======== Component: MoneyInputCard ========
interface MoneyInputCardProps {
  initialBalance: number;
  desiredMonthlyIncome: number;
  socialSecurity: number;
  onChangeInitialBalance: (
    valueAsString: string,
    valueAsNumber: number
  ) => void;
  onChangeDesiredMonthlyIncome: (
    valueAsString: string,
    valueAsNumber: number
  ) => void;
  onChangeSocialSecurity: (
    valueAsString: string,
    valueAsNumber: number
  ) => void;
}

const MoneyInputCard: React.FC<MoneyInputCardProps> = ({
  initialBalance,
  desiredMonthlyIncome,
  socialSecurity,
  onChangeInitialBalance,
  onChangeDesiredMonthlyIncome,
  onChangeSocialSecurity,
}) => {
  return (
    <Card
      bgColor={useColorModeValue("blue.50", "blue.950")}
      boxShadow="lg"
      borderColor={useColorModeValue("blue.100", "blue.900")}
      borderWidth="1px"
    >
      <CardHeader>
        <Heading size={"lg"}>Your Financials</Heading>
        <Text>Enter your retirement details to see projections.</Text>
      </CardHeader>

      <CardBody>
        <SimpleGrid columns={3} spacing={10}>
          <FormNumberInput
            value={initialBalance}
            onChange={onChangeInitialBalance}
            placeholder="Enter starting balance..."
            helperText="Current 401(k) or retirement savings balance"
            step={10000}
          />

          <FormNumberInput
            value={socialSecurity}
            onChange={onChangeSocialSecurity}
            placeholder="Enter Social Security..."
            helperText="Your expected monthly Social Security benefit"
            step={1}
          />

          <FormNumberInput
            value={desiredMonthlyIncome}
            onChange={onChangeDesiredMonthlyIncome}
            placeholder="Enter total monthly income..."
            helperText="Total monthly income needed in retirement"
            step={100}
          />
        </SimpleGrid>
      </CardBody>
    </Card>
  );
};

// ======== Component: WithdrawalPreviewCard ========
interface WithdrawalPreviewCardProps {
  scenarioData: ScenarioRow[];
  currentYear: number;
}

const WithdrawalPreviewCard: React.FC<WithdrawalPreviewCardProps> = ({
  scenarioData,
  currentYear,
}) => {
  const previewYears = [0, 1, 4, 9]; // Years 1, 2, 5, 10 (index 0-based)

  return (
    <Card
      bgColor={useColorModeValue("teal.50", "teal.950")}
      boxShadow="lg"
      borderColor={useColorModeValue("teal.100", "teal.900")}
      borderWidth="1px"
    >
      <CardHeader>
        <Heading size={"lg"}>Income Preview</Heading>
        <Text mb={2}>Your projected income for key retirement years.</Text>
        <Text fontSize="sm" color={useColorModeValue("gray.600", "gray.400")}>
          Social Security increases with COLA each year • Monthly goal rises
          with inflation • 401(k) withdrawal is the difference • Balance grows
          with investment returns •{" "}
          <Box as="span" fontWeight="medium">
            ⚠️ Warning appears when withdrawal rate exceeds 4% rule
          </Box>
        </Text>
      </CardHeader>

      <CardBody>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={4}>
          {previewYears.map((yearIndex) => {
            // Check if we have data for this year
            if (yearIndex < scenarioData.length) {
              const data = scenarioData[yearIndex];
              const yearNumber = yearIndex + 1; // Convert to 1-based for display

              return (
                <Box
                  key={yearIndex}
                  p={4}
                  borderWidth="1px"
                  borderRadius="lg"
                  borderColor={useColorModeValue("teal.200", "teal.800")}
                  bgColor={useColorModeValue("white", "gray.800")}
                >
                  <Heading size="md" mb={3}>
                    Year {yearNumber} ({currentYear + yearIndex})
                  </Heading>
                  <VStack align="start" spacing={2} width="100%">
                    <Box width="100%">
                      <Text fontWeight="bold">Monthly Goal:</Text>
                      <Text fontSize="lg">
                        {formatCurrency(data.totalMonthlyIncome)}
                      </Text>
                    </Box>
                    <Box width="100%">
                      <Text fontWeight="bold">Social Security:</Text>
                      <Text fontSize="lg">
                        {formatCurrency(data.ssMonthly)}
                      </Text>
                    </Box>
                    <Box width="100%">
                      <Text fontWeight="bold">401(k) Withdrawal:</Text>
                      <Flex alignItems="center">
                        <VStack align="flex-start" spacing={0}>
                          <Text fontSize="lg">
                            {formatCurrency(data.requiredFrom401kMonthly)}
                          </Text>
                          <Text
                            fontSize="xs"
                            color={
                              parseFloat(data.withdrawalRate) > 4
                                ? "orange.500"
                                : "gray.500"
                            }
                          >
                            {data.withdrawalRate}% withdrawal rate
                          </Text>
                        </VStack>
                        {parseFloat(data.withdrawalRate) > 4 && (
                          <ChakraTooltip
                            label={`This withdrawal rate (${data.withdrawalRate}%) is higher than the recommended 4% safe withdrawal rate.`}
                            placement="top"
                          >
                            <Box
                              as="span"
                              color="orange.500"
                              ml={2}
                              fontSize="lg"
                            >
                              ⚠️
                            </Box>
                          </ChakraTooltip>
                        )}
                      </Flex>
                    </Box>
                    <Box width="100%">
                      <Text fontWeight="bold">401(k) Balance:</Text>
                      <Text fontSize="lg">
                        {formatLargeCurrency(data.endingBalance)}
                      </Text>
                    </Box>
                  </VStack>
                </Box>
              );
            }

            // If no data for this year (funds depleted), show empty state
            return (
              <Box
                key={yearIndex}
                p={4}
                borderWidth="1px"
                borderRadius="lg"
                borderColor={useColorModeValue("red.200", "red.800")}
                bgColor={useColorModeValue("white", "gray.800")}
              >
                <Heading size="md" mb={3}>
                  Year {yearIndex + 1} ({currentYear + yearIndex})
                </Heading>
                <Box width="100%">
                  <Text color="red.500" fontSize="lg">
                    Retirement funds depleted
                  </Text>
                </Box>
              </Box>
            );
          })}
        </SimpleGrid>
      </CardBody>
    </Card>
  );
};

// ======== Component: BalanceProjectionCard ========
interface BalanceProjectionCardProps {
  chartData: ChartData[];
  inflationRatePercent: number;
  colaAdjustment: number;
  investmentReturn: number;
  socialSecurity: number;
}

const BalanceProjectionCard: React.FC<BalanceProjectionCardProps> = ({
  chartData,
  inflationRatePercent,
  colaAdjustment,
  investmentReturn,
  socialSecurity,
}) => {
  return (
    <Card
      bgColor={useColorModeValue("green.50", "green.950")}
      boxShadow="lg"
      borderColor={useColorModeValue("green.100", "green.900")}
      borderWidth="1px"
    >
      <CardHeader>
        <Heading size={"lg"}>Savings Projection</Heading>
        <Text>
          This chart shows your 401(k) balance over time. Adjust your inputs to
          see how they affect your long-term savings.
        </Text>
      </CardHeader>
      <CardBody>
        <VStack spacing={4} align="stretch">
          <ChartContainer>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="year"
                  label={{
                    value: "Year",
                    position: "insideBottomRight",
                    offset: -10,
                  }}
                />
                <YAxis
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  label={{
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const colorMode = useColorModeValue("light", "dark");
                      const tooltipStyles = {
                        backgroundColor:
                          colorMode === "dark" ? "#1A202C" : "#FFFFFF",
                        border: `1px solid ${colorMode === "dark" ? "#2D3748" : "#E2E8F0"}`,
                        color: colorMode === "dark" ? "#FFFFFF" : "#1A202C",
                        padding: "10px",
                        borderRadius: "4px",
                        boxShadow:
                          "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
                      };

                      return (
                        <div style={tooltipStyles}>
                          <p
                            style={{ fontWeight: "bold", marginBottom: "5px" }}
                          >
                            Year: {label}
                          </p>
                          {payload.map((entry, index) => (
                            <p
                              key={index}
                              style={{ color: entry.color, margin: "2px 0" }}
                            >
                              <span style={{ fontWeight: 600 }}>
                                {entry.name}:
                              </span>{" "}
                              {formatCurrency(entry.value as number)}
                            </p>
                          ))}
                          <p
                            style={{
                              fontSize: "0.8em",
                              marginTop: "5px",
                              opacity: 0.8,
                            }}
                          >
                            {payload[0]?.value > 0
                              ? "Retirement savings balance at year end"
                              : "Retirement savings depleted"}
                          </p>
                        </div>
                      );
                    }

                    return null;
                  }}
                />
                <Legend />
                <Line
                  dataKey="Balance"
                  stroke="#8884d8"
                  strokeWidth={3}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </VStack>
      </CardBody>
      <CardFooter>
        <Alert status="info" fontSize="sm">
          <AlertIcon />
          Assumptions: Inflation {inflationRatePercent}%, COLA {colaAdjustment}
          %, Investment return {investmentReturn}%, Social Security{" "}
          {formatCurrency(socialSecurity)}/month
        </Alert>
      </CardFooter>
    </Card>
  );
};

// ======== Component: DetailedProjectionCard ========
interface DetailedProjectionCardProps {
  scenarioData: ScenarioRow[];
}

const DetailedProjectionCard: React.FC<DetailedProjectionCardProps> = ({
  scenarioData,
}) => {
  return (
    <Box px={4}>
      <Text mb={2} fontSize="sm">
        All income figures are monthly. A negative withdrawal rate means you're
        adding to savings.
      </Text>

      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Year</Th>
              <Th isNumeric>Social Security</Th>
              <Th isNumeric>401(k) Draw</Th>
              <Th isNumeric>Total</Th>
              <Th isNumeric>Balance</Th>
              <Th isNumeric>Rate</Th>
            </Tr>
          </Thead>
          <Tbody>
            {scenarioData.slice(0, 30).map((row, index) => (
              <Tr key={index}>
                <Td isNumeric>{row.year}</Td>
                <Td isNumeric>{formatCurrency(row.ssMonthly)}</Td>
                <Td isNumeric>{formatCurrency(row.requiredFrom401kMonthly)}</Td>
                <Td isNumeric>{formatCurrency(row.totalMonthlyIncome)}</Td>
                <Td isNumeric>{formatCurrency(row.endingBalance)}</Td>
                <Td isNumeric>
                  <ChakraTooltip
                    label={`This withdrawal rate (${row.withdrawalRate}%) is ${parseFloat(row.withdrawalRate) <= 4 ? "within" : "higher than"} the recommended 4% safe withdrawal rate.`}
                    placement="top"
                  >
                    <Box
                      as="span"
                      position="relative"
                      _hover={{
                        textDecoration: "underline",
                        cursor: "help",
                      }}
                    >
                      {row.withdrawalRate}%
                      {parseFloat(row.withdrawalRate) > 4 && (
                        <Box as="span" color="orange.500" ml={1} fontSize="sm">
                          ⚠️
                        </Box>
                      )}
                    </Box>
                  </ChakraTooltip>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

// ======== Component: EconomyInputCard ========
interface EconomyInputCardProps {
  inflationRatePercent: number;
  colaAdjustment: number;
  investmentReturn: number;
  onChangeInflationRatePercent: (
    valueAsString: string,
    valueAsNumber: number
  ) => void;
  onChangeColaAdjustment: (
    valueAsString: string,
    valueAsNumber: number
  ) => void;
  onChangeInvestmentReturn: (
    valueAsString: string,
    valueAsNumber: number
  ) => void;
}

const EconomyInputCard: React.FC<EconomyInputCardProps> = ({
  inflationRatePercent,
  colaAdjustment,
  investmentReturn,
  onChangeInflationRatePercent,
  onChangeColaAdjustment,
  onChangeInvestmentReturn,
}) => {
  return (
    <Card
      colorScheme=""
      bgColor={useColorModeValue("yellow.50", "yellow.950")}
      boxShadow="lg"
      borderColor={useColorModeValue("yellow.100", "yellow.900")}
      borderWidth="1px"
    >
      <CardHeader>
        <Heading size={"lg"}>Economic Assumptions</Heading>
        <Text mb={2}>
          Adjust these values to match your expectations for inflation, Social
          Security increases, and investment returns.
        </Text>
        <Text fontSize="sm" color={useColorModeValue("gray.600", "gray.400")}>
          The 20-year rate of inflation is 2.4%, while Social Security
          cost-of-living adjustment (COLA) is 2.3%. The S&P500 yields 10.3% in
          the same period, while bond yields are in the 4.3-4.7% range. Common
          guidance is a 60/40 stocks/bonds mix, which puts the 20-year return at
          8%.
        </Text>
      </CardHeader>

      <CardBody>
        <SimpleGrid columns={3} spacing={10}>
          <FormNumberInput
            value={inflationRatePercent}
            onChange={onChangeInflationRatePercent}
            placeholder="Enter inflation rate..."
            helperText="Rate of inflation (%)"
            min={0}
            max={100}
            step={0.1}
          />

          <FormNumberInput
            value={colaAdjustment}
            onChange={onChangeColaAdjustment}
            placeholder="Enter COLA adjustment..."
            helperText="SSA cost-of-living adjustment (COLA) (%)"
            min={0}
            max={100}
            step={0.1}
          />

          <FormNumberInput
            value={investmentReturn}
            onChange={onChangeInvestmentReturn}
            placeholder="Enter return rate..."
            helperText="Expected investment return (%)"
            min={0}
            max={100}
            step={0.1}
          />
        </SimpleGrid>
      </CardBody>
    </Card>
  );
};

// ======== Component: SocialSecurityInputCard ========
interface SocialSecurityInputCardProps {
  ssMonthlyAt62: number;
  ssMonthlyAtFRA: number;
  ssMonthlyAt70: number;
  onChangeSsMonthlyAt62: (valueAsString: string, valueAsNumber: number) => void;
  onChangeSsMonthlyAtFRA: (
    valueAsString: string,
    valueAsNumber: number
  ) => void;
  onChangeSsMonthlyAt70: (valueAsString: string, valueAsNumber: number) => void;
}

const SocialSecurityInputCard: React.FC<SocialSecurityInputCardProps> = ({
  ssMonthlyAt62,
  ssMonthlyAtFRA,
  ssMonthlyAt70,
  onChangeSsMonthlyAt62,
  onChangeSsMonthlyAtFRA,
  onChangeSsMonthlyAt70,
}) => {
  return (
    <Card
      bgColor={useColorModeValue("pink.50", "pink.950")}
      boxShadow="lg"
      borderColor={useColorModeValue("pink.100", "pink.900")}
      borderWidth="1px"
    >
      <CardHeader>
        <Heading size={"lg"}>Social Security</Heading>
        <Text>Adjust the current Social Security limits as necessary.</Text>
        <br />
        <Alert status="info">
          <AlertIcon />
          Try setting, say, the FRA number to your specific Social Security
          payment amount. Then look at the FRA line in the graph, and switch the
          table view to FRA too. That will tailor all calculations specific to
          you.
        </Alert>
      </CardHeader>

      <CardBody>
        <SimpleGrid columns={3} spacing={10}>
          <FormNumberInput
            value={ssMonthlyAt62}
            onChange={onChangeSsMonthlyAt62}
            placeholder="SS benefit at age 62..."
            helperText="Age 62"
          />
          <FormNumberInput
            value={ssMonthlyAtFRA}
            onChange={onChangeSsMonthlyAtFRA}
            placeholder="SS benefit at FRA..."
            helperText="Full Retirement Age"
          />
          <FormNumberInput
            value={ssMonthlyAt70}
            onChange={onChangeSsMonthlyAt70}
            placeholder="SS benefit at age 70..."
            helperText="Age 70"
          />
        </SimpleGrid>
      </CardBody>
    </Card>
  );
};

// ======== Main Component: RetirementCalculator ========
const RetirementCalculator = (): JSX.Element => {
  // State for financial parameters
  const [financialParams, setFinancialParams] = useState<FinancialParams>({
    inflationRatePercent: 2.4,
    initialBalance: 100000,
    desiredMonthlyIncome: 3000,
    socialSecurity: 3627,
    colaAdjustment: 2.3,
    investmentReturn: 8,
  });

  const [selectedScenario] = useState<ScenarioOption>("default");

  // Current parameters based on user input
  const currentYear = new Date().getFullYear();

  // Calculate our scenario
  const scenarioData = calculateScenario(financialParams);

  // Prepare chart data
  const chartData = prepareChartData(scenarioData);

  // Handler for updating financial parameters
  const handleUpdateParam = <K extends keyof FinancialParams>(
    param: K,
    value: number
  ) => {
    setFinancialParams((prev) => updateFinancialParam(prev, param, value));
  };

  // No longer needed since we only have one scenario
  // const handleScenarioClick = (option: ScenarioOption) => {
  //   setSelectedScenario(option);
  // };

  return (
    <>
      <VStack width="100%" align="stretch" spacing={8} py={4}>
        <MoneyInputCard
          initialBalance={financialParams.initialBalance}
          desiredMonthlyIncome={financialParams.desiredMonthlyIncome}
          socialSecurity={financialParams.socialSecurity}
          onChangeInitialBalance={(_, value) =>
            handleUpdateParam("initialBalance", value)
          }
          onChangeDesiredMonthlyIncome={(_, value) =>
            handleUpdateParam("desiredMonthlyIncome", value)
          }
          onChangeSocialSecurity={(_, value) =>
            handleUpdateParam("socialSecurity", value)
          }
        />

        <WithdrawalPreviewCard
          scenarioData={scenarioData}
          currentYear={currentYear}
        />

        <Box>
          <Accordion allowToggle>
            <AccordionItem
              border="none"
              boxShadow="sm"
              borderRadius="lg"
              mb={2}
            >
              <h2>
                <AccordionButton
                  py={4}
                  borderTopRadius="lg"
                  bg={useColorModeValue("gray.100", "gray.600")}
                  _hover={{ bg: useColorModeValue("gray.200", "gray.500") }}
                >
                  <Box as="span" flex="1" textAlign="left" fontWeight="bold">
                    View Detailed 30-Year Projection
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} px={0}>
                <DetailedProjectionCard scenarioData={scenarioData} />
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem border="none" boxShadow="sm" borderRadius="lg">
              <h2>
                <AccordionButton
                  py={4}
                  borderTopRadius="lg"
                  bg={useColorModeValue("gray.100", "gray.600")}
                  _hover={{ bg: useColorModeValue("gray.200", "gray.500") }}
                >
                  <Box as="span" flex="1" textAlign="left" fontWeight="bold">
                    View Savings Projection Chart
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} px={0}>
                <BalanceProjectionCard
                  chartData={chartData}
                  inflationRatePercent={financialParams.inflationRatePercent}
                  colaAdjustment={financialParams.colaAdjustment}
                  investmentReturn={financialParams.investmentReturn}
                  socialSecurity={financialParams.socialSecurity}
                />
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>

        <EconomyInputCard
          inflationRatePercent={financialParams.inflationRatePercent}
          colaAdjustment={financialParams.colaAdjustment}
          investmentReturn={financialParams.investmentReturn}
          onChangeInflationRatePercent={(_, value) =>
            handleUpdateParam("inflationRatePercent", value)
          }
          onChangeColaAdjustment={(_, value) =>
            handleUpdateParam("colaAdjustment", value)
          }
          onChangeInvestmentReturn={(_, value) =>
            handleUpdateParam("investmentReturn", value)
          }
        />

        {/* Social Security inputs are now handled in the Money card, so this card is hidden 
        <SocialSecurityInputCard
          ssMonthlyAt62={financialParams.ssMonthlyAt62}
          ssMonthlyAtFRA={financialParams.ssMonthlyAtFRA}
          ssMonthlyAt70={financialParams.ssMonthlyAt70}
          onChangeSsMonthlyAt62={(_, value) => updateFinancialParam('ssMonthlyAt62', value)}
          onChangeSsMonthlyAtFRA={(_, value) => updateFinancialParam('ssMonthlyAtFRA', value)}
          onChangeSsMonthlyAt70={(_, value) => updateFinancialParam('ssMonthlyAt70', value)}
        />
        */}
      </VStack>
    </>
  );
};

export default RetirementCalculator;
