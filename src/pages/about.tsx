import {
  Avatar,
  Box,
  Container,
  Flex,
  Heading,
  Icon,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { HeadFC, PageProps } from "gatsby";
import * as React from "react";
import {
  FaCalculator,
  FaChartLine,
  FaHandHoldingUsd,
  FaRegLightbulb,
} from "react-icons/fa";

const AboutHero = () => {
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
          About Retire.Guru
        </Heading>

        <Text
          fontSize={{ base: "md", md: "lg" }}
          color={textColor}
          maxW="3xl"
          mx="auto"
          lineHeight="1.8"
        >
          Empowering your retirement journey with clarity, confidence, and
          innovative financial tools.
        </Text>
      </Stack>
    </Box>
  );
};

const Feature = ({ title, text, icon }) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Box
      p={5}
      shadow="md"
      borderWidth="1px"
      borderRadius="lg"
      bg={bgColor}
      borderColor={borderColor}
      transition="transform 0.3s"
      _hover={{
        transform: "translateY(-5px)",
        shadow: "lg",
      }}
    >
      <Flex
        w={16}
        h={16}
        align="center"
        justify="center"
        color={useColorModeValue("blue.500", "blue.300")}
        rounded="full"
        bg={useColorModeValue("blue.50", "blue.900")}
        mb={4}
      >
        <Icon as={icon} w={8} h={8} />
      </Flex>
      <Heading fontSize="xl" mb={2}>
        {title}
      </Heading>
      <Text color={useColorModeValue("gray.600", "gray.400")}>{text}</Text>
    </Box>
  );
};

const TeamMember = ({ name, role, bio, avatar }) => {
  return (
    <Box textAlign="center" p={6}>
      <Avatar
        size="xl"
        name={name}
        src={avatar}
        mb={4}
        border="4px solid"
        borderColor={useColorModeValue("blue.50", "blue.900")}
      />
      <Heading fontSize="xl" mb={1}>
        {name}
      </Heading>
      <Text
        fontWeight="bold"
        fontSize="sm"
        mb={3}
        color={useColorModeValue("blue.600", "blue.300")}
      >
        {role}
      </Text>
      <Text fontSize="sm" color={useColorModeValue("gray.600", "gray.400")}>
        {bio}
      </Text>
    </Box>
  );
};

const AboutPage: React.FC<PageProps> = () => {
  const textColor = useColorModeValue("gray.700", "gray.300");
  const sectionBg = useColorModeValue("gray.50", "gray.800");

  return (
    <>
      <AboutHero />

      <Container maxW="6xl" py={12}>
        <VStack spacing={12}>
          {/* Our Mission */}
          <Box w="full">
            <Heading
              as="h2"
              size="lg"
              mb={6}
              textAlign="center"
              color={useColorModeValue("blue.600", "blue.300")}
            >
              Our Mission
            </Heading>

            <Text
              fontSize="lg"
              lineHeight="tall"
              textAlign="center"
              maxW="3xl"
              mx="auto"
              color={textColor}
            >
              At Retire.Guru, we believe that everyone deserves a secure and
              fulfilling retirement. Our mission is to demystify retirement
              planning through intuitive tools, data-driven insights, and
              accessible financial education.
            </Text>
          </Box>

          {/* What Sets Us Apart */}
          <Box w="full" py={10} bg={sectionBg} borderRadius="lg">
            <Container maxW="5xl">
              <Heading
                as="h2"
                size="lg"
                mb={10}
                textAlign="center"
                color={useColorModeValue("blue.600", "blue.300")}
              >
                What Sets Us Apart
              </Heading>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <Feature
                  icon={FaCalculator}
                  title="Intelligent Calculators"
                  text="Our sophisticated financial tools go beyond basic math to provide nuanced retirement insights tailored to your unique situation."
                />
                <Feature
                  icon={FaChartLine}
                  title="Visual Analytics"
                  text="Complex financial concepts translated into intuitive visuals that help you understand your retirement trajectory at a glance."
                />
                <Feature
                  icon={FaHandHoldingUsd}
                  title="Holistic Planning"
                  text="We consider all aspects of retirement finances - from Social Security optimization to healthcare costs and longevity risk."
                />
                <Feature
                  icon={FaRegLightbulb}
                  title="Educational Approach"
                  text="Empowering you with knowledge through clear explanations that build your financial confidence for independent decision-making."
                />
              </SimpleGrid>
            </Container>
          </Box>

          {/* Our Story */}
          <Box w="full" my={6}>
            <Heading
              as="h2"
              size="lg"
              mb={6}
              textAlign="center"
              color={useColorModeValue("blue.600", "blue.300")}
            >
              Our Story
            </Heading>

            <Text fontSize="md" lineHeight="tall" mb={4} color={textColor}>
              Retire.Guru was founded by a team of financial technologists who
              saw firsthand how traditional retirement planning tools often fell
              short. With backgrounds spanning finance, technology, and data
              science, our founders set out to create tools that would bring
              clarity to complex retirement questions.
            </Text>

            <Text fontSize="md" lineHeight="tall" mb={4} color={textColor}>
              What began as a simple calculator has evolved into a comprehensive
              platform that helps people understand their retirement options
              with unprecedented clarity. We're proud that our tools have helped
              thousands of individuals optimize their Social Security claiming
              strategies, determine sustainable withdrawal rates, and find
              confidence in their retirement plans.
            </Text>

            <Text fontSize="md" lineHeight="tall" color={textColor}>
              Today, we continue to refine our calculators based on the latest
              research and user feedback, always with the goal of making
              retirement planning more accessible, accurate, and actionable for
              everyone.
            </Text>
          </Box>

          {/* Meet the Team */}
          <Box w="full" py={10} bg={sectionBg} borderRadius="lg">
            <Heading
              as="h2"
              size="lg"
              mb={10}
              textAlign="center"
              color={useColorModeValue("blue.600", "blue.300")}
            >
              Meet the Team
            </Heading>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
              <TeamMember
                name="Alex Morgan"
                role="Founder & Financial Strategist"
                bio="Former retirement advisor with 15+ years of experience helping clients navigate complex retirement decisions."
                avatar=""
              />
              <TeamMember
                name="Jamie Rivera"
                role="Lead Developer"
                bio="Financial technology expert specializing in creating accessible tools that translate complex financial concepts into actionable insights."
                avatar=""
              />
              <TeamMember
                name="Taylor Chen"
                role="Data Scientist"
                bio="Researcher focused on retirement longevity modeling and optimizing withdrawal strategies across various market conditions."
                avatar=""
              />
            </SimpleGrid>
          </Box>
        </VStack>
      </Container>
    </>
  );
};

export default AboutPage;

export const Head: HeadFC = () => <title>About Us | Retire.Guru</title>;
