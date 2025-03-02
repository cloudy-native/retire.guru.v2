import {
  Alert,
  AlertIcon,
  Box,
  Card,
  CardBody,
  CardHeader,
  Container,
  Heading,
  ListItem,
  OrderedList,
  Stack,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { HeadFC, PageProps } from "gatsby";
import * as React from "react";

const HelpPageHero = () => {
  const bgGradient = useColorModeValue(
    "linear(to-b, blue.50, white)",
    "linear(to-b, gray.900, gray.800)"
  );

  const accentColor = useColorModeValue("blue.600", "blue.300");
  const textColor = useColorModeValue("gray.700", "gray.100");

  return (
    <Box
      bg={useColorModeValue("blue.50", "gray.900")}
      bgGradient={bgGradient}
      pt={16}
      pb={10}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
    >
      <Stack spacing={6} textAlign="center">
        <Heading
          as="h1"
          fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
          fontWeight="bold"
          color={accentColor}
          lineHeight="1.2"
        >
          How to Use the Retirement Calculator
        </Heading>

        <Text
          fontSize={{ base: "md", md: "lg" }}
          color={textColor}
          maxW="3xl"
          mx="auto"
          lineHeight="1.8"
        >
          A comprehensive guide to using our retirement calculator to plan your
          financial future with confidence.
        </Text>
      </Stack>
    </Box>
  );
};

const HelpSection = ({ title, children }) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const headingColor = useColorModeValue("blue.600", "blue.300");

  return (
    <Card
      p={5}
      shadow="md"
      borderWidth="1px"
      borderRadius="lg"
      bg={bgColor}
      borderColor={borderColor}
      mb={6}
    >
      <CardHeader p={0} pb={2}>
        <Heading as="h2" size="lg" color={headingColor}>
          {title}
        </Heading>
      </CardHeader>
      <CardBody p={0} pt={2}>
        {children}
      </CardBody>
    </Card>
  );
};

const HelpPage: React.FC<PageProps> = () => {
  const textColor = useColorModeValue("gray.700", "gray.300");

  return (
    <>
      <HelpPageHero />

      <Container maxW="6xl" py={12}>
        <VStack spacing={10} align="stretch">
          <HelpSection title="Getting Started">
            <Text fontSize="md" lineHeight="tall" mb={4} color={textColor}>
              Our retirement calculator is designed to help you understand how
              your retirement savings might last through your golden years. By
              exploring different scenarios, you can make informed decisions
              about Social Security claiming strategies and withdrawal rates.
            </Text>

            <Alert status="info" mb={4}>
              <AlertIcon />
              For the most accurate results, gather information about your
              current retirement savings, expected Social Security benefits, and
              desired monthly income in retirement before using the calculator.
            </Alert>
          </HelpSection>

          <HelpSection title="Step 1: Enter Your Financial Information">
            <Text fontSize="md" lineHeight="tall" mb={4} color={textColor}>
              Begin by entering your current retirement savings and desired
              monthly income in the "Your Money" section at the top of the
              calculator.
            </Text>

            <OrderedList spacing={2} pl={5} mb={4}>
              <ListItem>
                <Text fontWeight="bold">Starting Balance:</Text> Enter your
                current total retirement savings across all accounts (401(k),
                IRA, etc.).
              </ListItem>
              <ListItem>
                <Text fontWeight="bold">Monthly Income Goal:</Text> Enter how
                much monthly income you'd like to have in retirement.
              </ListItem>
            </OrderedList>
          </HelpSection>

          <HelpSection title="Step 2: Understand the Balance Projection Chart">
            <Text fontSize="md" lineHeight="tall" mb={4} color={textColor}>
              The Balance Projection chart shows how your retirement savings may
              change over time based on three different Social Security claiming
              scenarios:
            </Text>

            <OrderedList spacing={2} pl={5} mb={4}>
              <ListItem>
                <Text fontWeight="bold">Age 62:</Text> Claiming Social Security
                early (reduced benefits).
              </ListItem>
              <ListItem>
                <Text fontWeight="bold">FRA (Full Retirement Age):</Text>{" "}
                Claiming at your full retirement age (typically 66-67 for most
                people).
              </ListItem>
              <ListItem>
                <Text fontWeight="bold">Age 70:</Text> Delayed claiming
                (increased benefits).
              </ListItem>
            </OrderedList>

            <Text fontSize="md" lineHeight="tall" mb={4} color={textColor}>
              You can toggle between viewing all scenarios at once or focusing
              on a single scenario using the buttons and switch above the chart.
              When lines in the chart reach zero, this indicates your savings
              would be depleted at that point in time.
            </Text>
          </HelpSection>

          <HelpSection title="Step 3: Review the Detailed Projection Table">
            <Text fontSize="md" lineHeight="tall" mb={4} color={textColor}>
              Below the chart, you'll find a detailed year-by-year breakdown of
              your retirement finances for the selected scenario. This table
              shows:
            </Text>

            <OrderedList spacing={2} pl={5} mb={4}>
              <ListItem>
                <Text fontWeight="bold">Social Security Monthly Income:</Text>{" "}
                Your projected monthly benefit, increasing with cost-of-living
                adjustments.
              </ListItem>
              <ListItem>
                <Text fontWeight="bold">401(k) Monthly Withdrawal:</Text> How
                much you'll need to withdraw from savings to meet your income
                goal.
              </ListItem>
              <ListItem>
                <Text fontWeight="bold">Total Monthly Income:</Text> Combined
                income from Social Security and retirement savings.
              </ListItem>
              <ListItem>
                <Text fontWeight="bold">401(k) Balance:</Text> Your remaining
                retirement savings at the end of each year.
              </ListItem>
              <ListItem>
                <Text fontWeight="bold">Withdrawal Rate:</Text> The percentage
                of your savings you're withdrawing annually. The "4% rule"
                suggests keeping this under 4% for sustainability.
              </ListItem>
            </OrderedList>
          </HelpSection>

          <HelpSection title="Step 4: Customize Economic Assumptions">
            <Text fontSize="md" lineHeight="tall" mb={4} color={textColor}>
              For more personalized projections, you can adjust the economic
              assumptions in the "The Economy" section:
            </Text>

            <OrderedList spacing={2} pl={5} mb={4}>
              <ListItem>
                <Text fontWeight="bold">Inflation Rate:</Text> The expected
                annual rate of price increases (defaults to 2.4%).
              </ListItem>
              <ListItem>
                <Text fontWeight="bold">COLA Adjustment:</Text> Social
                Security's annual cost-of-living adjustment (defaults to 2.3%).
              </ListItem>
              <ListItem>
                <Text fontWeight="bold">Investment Return:</Text> Expected
                annual return on your retirement investments (defaults to 8%).
              </ListItem>
            </OrderedList>

            <Alert status="info" mb={4}>
              <AlertIcon />
              Consider using more conservative investment return assumptions
              (5-6%) if your portfolio becomes more conservative in retirement.
            </Alert>
          </HelpSection>

          <HelpSection title="Step 5: Enter Your Social Security Benefits">
            <Text fontSize="md" lineHeight="tall" mb={4} color={textColor}>
              In the "Social Security" section, you can customize your expected
              Social Security benefits:
            </Text>

            <OrderedList spacing={2} pl={5} mb={4}>
              <ListItem>
                <Text fontWeight="bold">Age 62 Benefit:</Text> Your estimated
                monthly benefit if claiming at age 62.
              </ListItem>
              <ListItem>
                <Text fontWeight="bold">Full Retirement Age Benefit:</Text> Your
                estimated monthly benefit at your full retirement age.
              </ListItem>
              <ListItem>
                <Text fontWeight="bold">Age 70 Benefit:</Text> Your estimated
                monthly benefit if delaying until age 70.
              </ListItem>
            </OrderedList>

            <Text fontSize="md" lineHeight="tall" mb={4} color={textColor}>
              You can find your personalized benefit estimates by creating an
              account at{" "}
              <Text
                as="a"
                color="blue.500"
                href="https://www.ssa.gov/myaccount/"
                target="_blank"
                rel="noopener noreferrer"
              >
                ssa.gov
              </Text>
              . Use these figures for the most accurate projections.
            </Text>
          </HelpSection>

          <HelpSection title="Interpreting the Results">
            <Text fontSize="md" lineHeight="tall" mb={4} color={textColor}>
              When analyzing your retirement projections, pay attention to these
              key indicators:
            </Text>

            <OrderedList spacing={2} pl={5} mb={4}>
              <ListItem>
                <Text fontWeight="bold">Longevity of Your Savings:</Text> How
                long your money lasts across different scenarios.
              </ListItem>
              <ListItem>
                <Text fontWeight="bold">Withdrawal Rates:</Text> Rates over 4%
                (marked with a warning icon) may not be sustainable long-term.
              </ListItem>
              <ListItem>
                <Text fontWeight="bold">Social Security Impact:</Text> How
                different claiming ages affect your overall financial picture.
              </ListItem>
            </OrderedList>

            <Text fontSize="md" lineHeight="tall" mb={4} color={textColor}>
              If your savings aren't lasting as long as you'd hope, consider
              adjusting your:
            </Text>
            <OrderedList spacing={2} pl={5} mb={4}>
              <ListItem>Monthly income goal (reducing expenses)</ListItem>
              <ListItem>Social Security claiming strategy</ListItem>
              <ListItem>
                Investment allocation to potentially increase returns (with
                added risk)
              </ListItem>
              <ListItem>
                Working longer to increase savings before retirement
              </ListItem>
            </OrderedList>
          </HelpSection>

          <Alert status="warning">
            <AlertIcon />
            Remember that this calculator provides projections based on
            consistent returns and inflation rates, while real-world conditions
            will vary. Consider consulting with a financial advisor to develop a
            comprehensive retirement strategy tailored to your specific
            situation.
          </Alert>
        </VStack>
      </Container>
    </>
  );
};

export default HelpPage;

export const Head: HeadFC = () => (
  <title>Help | Retirement Calculator Guide | Retire.Guru</title>
);
