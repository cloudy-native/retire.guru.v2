import { Container } from "@chakra-ui/react";
import type { HeadFC, PageProps } from "gatsby";
import * as React from "react";
import RetirementCalculator from "../components/RetirementCalculator";
import RetirementHero from "../components/RetirementHero";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Container maxW={"6xl"}>
      <RetirementHero />
      <RetirementCalculator />
    </Container>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
