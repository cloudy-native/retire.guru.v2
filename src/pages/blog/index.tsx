import {
  Avatar,
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Stack,
  Tag,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { Link as GatsbyLink, HeadFC, PageProps } from "gatsby";
import * as React from "react";

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

interface BlogPostCardProps {
  title: string;
  excerpt: string;
  date: string;
  author: {
    name: string;
    avatar?: string;
  };
  slug: string;
  tags?: string[];
  isFeatured?: boolean;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({
  title,
  excerpt,
  date,
  author,
  slug,
  tags = [],
  isFeatured = false,
}) => {
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.300");
  const tagBg = useColorModeValue("blue.50", "blue.900");

  return (
    <Box
      as={GatsbyLink}
      to={slug}
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
        {isFeatured && (
          <Tag
            position="absolute"
            top={3}
            right={3}
            colorScheme="blue"
            size="sm"
          >
            Featured
          </Tag>
        )}

        <VStack align="start" spacing={4}>
          <Heading as="h3" fontSize="xl" lineHeight="tight">
            {title}
          </Heading>

          <Text color={textColor} noOfLines={3}>
            {excerpt}
          </Text>

          <HStack spacing={2} mt={2} wrap="wrap">
            {tags.map((tag) => (
              <Tag key={tag} size="sm" bg={tagBg} my={1}>
                {tag}
              </Tag>
            ))}
          </HStack>

          <Flex justify="space-between" align="center" w="full" mt={2}>
            <HStack>
              <Avatar name={author.name} src={author.avatar} size="xs" />
              <Text fontSize="sm" fontWeight="medium">
                {author.name}
              </Text>
            </HStack>
            <Text
              fontSize="sm"
              color={useColorModeValue("gray.500", "gray.400")}
            >
              {date}
            </Text>
          </Flex>
        </VStack>
      </Box>
    </Box>
  );
};

// Blog posts data - for now we'll use static data
// Since we're having issues with the useStaticQuery approach
const blogPosts: BlogPostCardProps[] = [
  {
    title: "Why We Created Retire.Guru",
    excerpt:
      "Our journey to building accessible retirement planning tools that empower everyday people to take control of their financial future.",
    date: "February 27, 2024",
    author: {
      name: "Alex Morgan",
    },
    slug: "/blog/why-we-created-retire-guru",
    tags: ["Company", "Mission", "Retirement Planning"],
    isFeatured: true,
  },
  {
    title: "Understanding the 4% Rule in Retirement",
    excerpt:
      "A deep dive into the widely cited retirement withdrawal strategy, its origins, limitations, and how to apply it to your own situation.",
    date: "February 15, 2024",
    author: {
      name: "Jamie Rivera",
    },
    slug: "/blog/understanding-the-4-percent-rule",
    tags: ["Withdrawals", "Strategy", "Financial Planning"],
  },
];

const BlogPage: React.FC<PageProps> = () => {
  // Using the static data defined above

  return (
    <>
      <BlogHero />

      <Container maxW="6xl" py={12}>
        <VStack spacing={10} align="stretch">
          {blogPosts.length === 0 ? (
            <Text textAlign="center" fontSize="lg">
              No blog posts found. Check back soon!
            </Text>
          ) : (
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
              {blogPosts.map((post) => (
                <BlogPostCard key={post.slug} {...post} />
              ))}
            </SimpleGrid>
          )}
        </VStack>
      </Container>
    </>
  );
};

export default BlogPage;

export const Head: HeadFC = () => <title>Blog | Retire.Guru</title>;
