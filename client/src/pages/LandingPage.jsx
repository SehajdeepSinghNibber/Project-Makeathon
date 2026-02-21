import React from "react";
import {
  Box,
  Divider,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  SimpleGrid,
  Image,
  Link,
  VStack,
  HStack,
  chakra,
  shouldForwardProp,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion, isValidMotionProp } from "framer-motion";
import logo from "../public/Gemini_Generated_Image_3nfx7p3nfx7p3nfx (1).png";
import {
  FiCheckCircle,
  FiShield,
  FiArrowRight,
  FiLock,
  FiBarChart2,
  FiSmartphone,
  FiTrendingUp,
  FiUserCheck,
  FiUser,
} from "react-icons/fi";

const MotionBox = chakra(motion.div, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

const MotionStack = chakra(motion.div, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

const LandingPage = () => {
  const bg = "white";
  const sectionBg = "gray.50";
  const textColor = "gray.800";
  const headingColor = "gray.900";
  const brandColor = "brand.500";

  return (
    <Box bg={bg} overflowX="hidden">
      {/* 1️⃣ Navbar */}
      <Box
        as="nav"
        position="fixed"
        top="0"
        w="full"
        zIndex="1000"
        bg="white"
        borderBottom="1px"
        borderColor="gray.100"
        py={4}
      >
        <Container maxW="container.xl">
          <Flex align="center" justify="space-between">
            <HStack spacing={10}>
              <Image
                src={logo}
                alt="Nivesh Assist Logo"
                h="40px"
                objectFit="contain"
              />
              <HStack spacing={8} display={{ base: "none", lg: "flex" }}>
                <Link
                  href="/dashboard"
                  fontWeight="600"
                  fontSize="sm"
                  color={headingColor}
                  _hover={{ color: brandColor }}
                >
                  Dashboard
                </Link>
                <Link
                  fontWeight="600"
                  fontSize="sm"
                  color={headingColor}
                  _hover={{ color: brandColor }}
                >
                  Security
                </Link>
                <Link
                  fontWeight="600"
                  fontSize="sm"
                  color={headingColor}
                  _hover={{ color: brandColor }}
                >
                  Pricing
                </Link>
              </HStack>
            </HStack>

            <HStack spacing={4}>
              <Button
                as="a"
                href="/login"
                variant="ghost"
                fontWeight="700"
                size="sm"
              >
                Log In
              </Button>
              <Button
                as="a"
                href="/signup"
                colorScheme="brand"
                borderRadius="full"
                px={6}
                size="sm"
                fontWeight="700"
                color="white"
              >
                Sign Up
              </Button>
            </HStack>
          </Flex>
        </Container>
      </Box>

      {/* 2️⃣ Hero Section */}
      <Box
        pt={{ base: 0, md: 36  }}
        pb={{ base: 20, md: 32 }}
        position="relative"
        bg="white"
      >
        <Container maxW="container.xl">
          <SimpleGrid
            columns={{ base: 1, md: 2 }}
            spacing={10}
            alignItems="center"
          >
            <MotionStack
              spacing={8}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Heading
                as="h1"
                size="3xl"
                fontWeight="800"
                color={headingColor}
                lineHeight="1.1"
                letterSpacing="tight"
              >
                <chakra.span color="black">Detect risk early</chakra.span>
                <br />
                <chakra.span color="brand.500">Decide smarter</chakra.span>
              </Heading>
              <Text fontSize="xl" color={textColor} maxW="lg" lineHeight="tall">
                One-stop solution for all your investments. Empowering investors
                through Transparent Information, AI Insights and Professional
                Support.
              </Text>
              <Stack direction={{ base: "column", sm: "row" }} spacing={4}>
                <Button
                  colorScheme="brand"
                  size="lg"
                  px={10}
                  h="14"
                  fontSize="md"
                  fontWeight="700"
                  _hover={{ transform: "translateY(-2px)" }}
                >
                  Get Started
                </Button>
                <Button
                  variant="outline"
                  colorScheme="brand"
                  size="lg"
                  px={10}
                  h="14"
                  fontSize="md"
                  fontWeight="700"
                  color={"brand.500"}
                >
                  Learn More
                </Button>
              </Stack>
            </MotionStack>

            <MotionBox
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              position="relative"
            >
              <Box
                position="absolute"
                top="-20%"
                right="-10%"
                w="120%"
                h="120%"
                bg="brand.50"
                borderRadius="full"
                filter="blur(80px)"
                zIndex="-1"
              />
              <Image
                src="https://media.licdn.com/dms/image/v2/D4E10AQEncOKdMnN7Og/image-shrink_1280/B4EZoQ4xOxKYAM-/0/1761219909859?e=2147483647&v=beta&t=Hcrudz6ZnGG1gO_DiKse_fAiKLgRXd4z8nXtkp1eAyk"
                alt="Hero Image"
                borderRadius="3xl"
              />
            </MotionBox>
          </SimpleGrid>
        </Container>
      </Box>

      {/* 3️⃣ Trusted By Section */}
      {/* <Box py={16} bg="white" borderY="1px" borderColor="gray.100"> */}
      {/*   <Container maxW="container.xl"> */}
      {/*     <VStack spacing={10}> */}
      {/*       <Text fontWeight="bold" color="gray.400" textTransform="uppercase" letterSpacing="widest" fontSize="xs"> */}
      {/*         Trusted by leading institutions worldwide */}
      {/*       </Text> */}
      {/*       <HStack spacing={{ base: 8, md: 16 }} wrap="wrap" justify="center" opacity="0.6" filter="grayscale(1)"> */}
      {/*         <Heading size="md" color="gray.600">FORBES</Heading> */}
      {/*         <Heading size="md" color="gray.600">TECHCRUNCH</Heading> */}
      {/*         <Heading size="md" color="gray.600">WIRED</Heading> */}
      {/*         <Heading size="md" color="gray.600">BLOOMBERG</Heading> */}
      {/*         <Heading size="md" color="gray.600">THE VERGE</Heading> */}
      {/*       </HStack> */}
      {/*     </VStack> */}
      {/*   </Container> */}
      {/* </Box> */}
      {/**/}
      {/* 4️⃣ Features Section */}
      <Box py={24} bg={sectionBg}>
        <Container maxW="container.xl">
          <VStack spacing={16}>
            <VStack spacing={4} textAlign="center">
              <Heading size="2xl" fontWeight="800" color="brand.500">
                Our Analysis, Your Investments
              </Heading>
              <Text fontSize="lg" color={textColor} maxW="2xl">
                Powerful tools that make managing your money better, simpler and
                risk-proof.
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
              {[
                {
                  title: "Portfolio Analyser",
                  desc: "Identifying overlapping sectors and stock concentration ",
                  icon: FiBarChart2,
                },
                {
                  title: "AI Insights",
                  desc: "Personalized recommendations to help you make smarter investment choices.",
                  icon: FiTrendingUp,
                },
                {
                  title: "Professional Support",
                  desc: "Consult NISM certified, AMFI registered investment advisors",
                  icon: FiUser,
                },
              ].map((feature, idx) => (
                <MotionBox
                  key={idx}
                  p={10}
                  bg="white"
                  borderRadius="2xl"
                  boxShadow="sm"
                  border="1px"
                  borderColor="gray.100"
                  whileHover={{ y: -10, boxShadow: "xl" }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Icon
                    as={feature.icon}
                    w={10}
                    h={10}
                    color="brand.500"
                    mb={6}
                  />
                  <Heading size="md" mb={4} color="black">
                    {feature.title}
                  </Heading>
                  <Text color={textColor} lineHeight="tall">
                    {feature.desc}
                  </Text>
                </MotionBox>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* 5️⃣ Security Section */}
      <Box py={24} bg="white">
        <Container maxW="container.xl">
          <SimpleGrid
            columns={{ base: 1, md: 2 }}
            spacing={20}
            alignItems="center"
          >
            <MotionBox
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Box
                p={10}
                bg="brand.500"
                borderRadius="3xl"
                color="white"
                boxShadow="2xl"
              >
                <VStack align="start" spacing={6}>
                  <Icon as={FiShield} w={12} h={12} />
                  <Heading size="xl" fontWeight="800">
                    Enterprise-grade security for everyone.
                  </Heading>
                  <Text fontSize="lg" opacity="0.9" color="white">
                    We use the same technology as the world's leading banks to
                    keep your data safe.
                  </Text>
                  <VStack align="start" spacing={4}>
                    <HStack>
                      <Icon as={FiCheckCircle} />
                      <Text fontWeight="600" color="white">
                        256-bit AES Encryption
                      </Text>
                    </HStack>
                    <HStack>
                      <Icon as={FiCheckCircle} />
                      <Text fontWeight="600" color="white">
                        Multi-factor Authentication
                      </Text>
                    </HStack>
                    <HStack>
                      <Icon as={FiCheckCircle} />
                      <Text fontWeight="600" color="white">
                        24/7 Fraud Monitoring
                      </Text>
                    </HStack>
                  </VStack>
                </VStack>
              </Box>
            </MotionBox>

            <VStack align="start" spacing={8}>
              <Heading size="2xl" fontWeight="800" color="black">
                Your security is our top priority.
              </Heading>
              <Text fontSize="lg" color={textColor} lineHeight="tall">
                We're committed to protecting your money and your data. From the
                moment you sign up, our advanced security systems are working to
                keep you safe.
              </Text>
              <Button
                variant="link"
                color="brand.500"
                size="lg"
                fontWeight="700"
                rightIcon={<FiArrowRight />}
              >
                Learn about our security
              </Button>
            </VStack>
          </SimpleGrid>
        </Container>
      </Box>

      {/* 6️⃣ CTA Banner */}
      <Box py={24} bg="white">
        <Container maxW="container.lg">
          <MotionBox
            bg="brand.50"
            p={{ base: 12, md: 20 }}
            borderRadius="3xl"
            textAlign="center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <VStack spacing={8}>
              <Heading size="2xl" fontWeight="800" color="gray.800">
                Ready to transform your finances?
              </Heading>
              <Text fontSize="xl" color={textColor} maxW="2xl">
                Join over 400 million users worldwide who trust Nivesh Assist
                for their daily financial needs.
              </Text>
              <Button
                colorScheme="brand"
                color="white"
                size="lg"
                px={12}
                h="16"
                borderRadius="full"
                fontSize="lg"
                fontWeight="800"
              >
                Create your free account
              </Button>
            </VStack>
          </MotionBox>
        </Container>
      </Box>

      {/* 7️⃣ Footer */}
      <Box py={16} bg="white" borderTop="1px" borderColor="gray.100">
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 2, md: 4, lg: 5 }} spacing={12} mb={16}>
            <Stack colSpan={{ base: 2, lg: 2 }} spacing={6}>
              <Image
                src={logo}
                alt="Nivesh Assist Logo"
                h="35px"
                w="auto"
                objectFit="contain"
              />
              <Text fontSize="sm" color={textColor} maxW="xs">
                \n Empowering your financial future with modern tools and\n
                enterprise-grade security.\n{" "}
              </Text>
            </Stack>
            <Stack spacing={4}>
              <Text fontWeight="700" fontSize="sm">
                Products
              </Text>
              <Link fontSize="sm" color={textColor}>
                Personal
              </Link>
              <Link fontSize="sm" color={textColor}>
                Business
              </Link>
              <Link fontSize="sm" color={textColor}>
                Investments
              </Link>
            </Stack>
            <Stack spacing={4}>
              <Text fontWeight="700" fontSize="sm">
                Company
              </Text>
              <Link fontSize="sm" color={textColor}>
                About Us
              </Link>
              <Link fontSize="sm" color={textColor}>
                Careers
              </Link>
              <Link fontSize="sm" color={textColor}>
                Press
              </Link>
            </Stack>
            <Stack spacing={4}>
              <Text fontWeight="700" fontSize="sm">
                Legal
              </Text>
              <Link fontSize="sm" color={textColor}>
                Privacy
              </Link>
              <Link fontSize="sm" color={textColor}>
                Terms
              </Link>
              <Link fontSize="sm" color={textColor}>
                Security
              </Link>
            </Stack>
          </SimpleGrid>
          <Divider mb={8} />
          <Flex
            justify="space-between"
            align="center"
            direction={{ base: "column", md: "row" }}
            gap={4}
          >
            <Text fontSize="xs" color="gray.400">
              © 2026 Nivesh Assist. All rights reserved.
            </Text>
            <HStack spacing={6}>
              <Link fontSize="xs" color="gray.400">
                Accessibility
              </Link>
              <Link fontSize="xs" color="gray.400">
                Cookies
              </Link>
              <Link fontSize="xs" color="gray.400">
                Contact
              </Link>
            </HStack>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};

// const Divider = ({ ...props }) => (
//   <Box h="1px" bg="gray.100" w="full" {...props} />
// );

export default LandingPage;
