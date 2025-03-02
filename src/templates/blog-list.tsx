import * as React from "react";
import { graphql, Link, HeadFC, PageProps } from "gatsby";
import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  SimpleGrid,
  useColorModeValue,
  VStack,
  HStack,
  Tag,
  Avatar,
  Flex,
  Button,
} from "@chakra-ui/react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const BlogHero = () => {
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
          Retire.Guru Blog
        </Heading>

        <Text
          fontSize={{ base: "md", md: "lg" }}
          color={textColor}
          maxW="3xl"
          mx="auto"
          lineHeight="1.8"
        >
          Insights, strategies, and updates to help you navigate your retirement
          journey.
        </Text>
      </Stack>
    </Box>
  );
};

const BlogPostCard = ({ post }) => {
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.300");
  const tagBg = useColorModeValue("blue.50", "blue.900");

  // Image handling removed for simplicity

  return (
    <Box
      as={Link}
      to={post.fields.slug}
      display="block"
      _hover={{ textDecoration: "none" }}
    >
      <Box
        p={6}
        h="full"
        bg={cardBg}
        borderWidth="1px"
        borderColor={borderColor}
        borderRadius="lg"
        shadow="md"
        transition="all 0.3s"
        position="relative"
        _hover={{
          transform: "translateY(-4px)",
          shadow: "lg",
          borderColor: useColorModeValue("blue.300", "blue.500"),
        }}
      >
        <VStack align="start" spacing={4}>
          {/* Featured image would go here */}

          <Heading as="h3" fontSize="xl" lineHeight="tight">
            {post.frontmatter.title}
          </Heading>

          <Text color={textColor} noOfLines={3}>
            {post.frontmatter.description || post.excerpt}
          </Text>

          {post.frontmatter.tags && (
            <HStack spacing={2} mt={2} wrap="wrap">
              {post.frontmatter.tags.map((tag) => (
                <Tag key={tag} size="sm" bg={tagBg} my={1}>
                  {tag}
                </Tag>
              ))}
            </HStack>
          )}

          <Flex justify="space-between" align="center" w="full" mt={2}>
            <Text fontSize="sm" fontWeight="medium">
              {post.frontmatter.author || "Retire.Guru Team"}
            </Text>
            <Text
              fontSize="sm"
              color={useColorModeValue("gray.500", "gray.400")}
            >
              {new Date(post.frontmatter.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Text>
          </Flex>
        </VStack>
      </Box>
    </Box>
  );
};

const BlogListTemplate = ({ data, pageContext }) => {
  const { currentPage, numPages } = pageContext;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage = currentPage - 1 === 1 ? "/blog" : `/blog/${currentPage - 1}`;
  const nextPage = `/blog/${currentPage + 1}`;
  const posts = data.allMarkdownRemark.edges;

  // Colors
  const accentColor = useColorModeValue("blue.600", "blue.300");

  return (
    <>
      <BlogHero />

      <Container maxW="6xl" py={12}>
        <VStack spacing={10} align="stretch">
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
            {posts.map(({ node }) => (
              <BlogPostCard key={node.fields.slug} post={node} />
            ))}
          </SimpleGrid>

          {numPages > 1 && (
            <Flex justify="space-between" mt={10}>
              {!isFirst && (
                <Button
                  as={Link}
                  to={prevPage}
                  colorScheme="blue"
                  variant="outline"
                >
                  ← Previous Page
                </Button>
              )}
              {!isLast && (
                <Button
                  as={Link}
                  to={nextPage}
                  colorScheme="blue"
                  variant="outline"
                  ml="auto"
                >
                  Next Page →
                </Button>
              )}
            </Flex>
          )}
        </VStack>
      </Container>
    </>
  );
};

export default BlogListTemplate;

export const Head: HeadFC = () => <title>Blog | Retire.Guru</title>;

export const pageQuery = graphql`
  query BlogListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          excerpt(pruneLength: 160)
          fields {
            slug
          }
          frontmatter {
            date
            title
            description
            author
            tags
          }
        }
      }
    }
  }
`;
