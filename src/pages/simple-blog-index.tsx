import React from "react";
import { Link, graphql } from "gatsby";
import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";

const SimpleBlogIndex = ({ data }) => {
  const posts = data.allMarkdownRemark.nodes;
  const accentColor = useColorModeValue("blue.600", "blue.300");

  if (posts.length === 0) {
    return (
      <Container maxW="4xl" py={10}>
        <Heading as="h1" mb={6}>
          Blog
        </Heading>
        <p>No blog posts found.</p>
      </Container>
    );
  }

  return (
    <Container maxW="4xl" py={10}>
      <Heading as="h1" mb={6} color={accentColor}>
        Blog
      </Heading>

      <VStack spacing={8} align="stretch">
        {posts.map((post) => {
          const title = post.frontmatter.title || post.fields.slug;

          return (
            <Box
              key={post.fields.slug}
              p={5}
              shadow="md"
              borderWidth="1px"
              borderRadius="lg"
            >
              <Heading as="h2" size="md" mb={3}>
                <Link to={post.fields.slug}>{title}</Link>
              </Heading>
              <Text mb={3} fontSize="sm" color="gray.500">
                {post.frontmatter.date}
              </Text>
              <Text>{post.frontmatter.description || post.excerpt}</Text>
            </Box>
          );
        })}
      </VStack>
    </Container>
  );
};

export default SimpleBlogIndex;

export const pageQuery = graphql`
  {
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        excerpt(pruneLength: 120)
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`;
