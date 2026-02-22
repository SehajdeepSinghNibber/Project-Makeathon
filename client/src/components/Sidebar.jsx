import React from "react";
import {
  Box,
  Flex,
  Icon,
  Link,
  Text,
  VStack,
  Heading,
  HStack,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import logo from "../public/Gemini_Generated_Image_3nfx7p3nfx7p3nfx (1).png";
import {
  FiHome,
  FiTrendingUp,
  FiPieChart,
  FiSettings,
  FiUser,
  FiActivity,
} from "react-icons/fi";

const NavItem = ({ icon, children, active, href }) => {
  const activeBg = "brand.50";
  const activeColor = "brand.500";

  return (
    <Link
      href={href}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
      w="full"
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="xl"
        role="group"
        cursor="pointer"
        bg={active ? activeBg : "transparent"}
        color={active ? activeColor : "gray.600"}
        fontWeight={active ? "700" : "600"}
        _hover={{
          bg: activeBg,
          color: activeColor,
        }}
        transition="all 0.2s"
      >
        {icon && <Icon mr="4" fontSize="18" as={icon} />}
        {children}
      </Flex>
    </Link>
  );
};

const Sidebar = ({ currentPath }) => {
  return (
    <Box
      transition="margin-left 0.3s ease"
      bg="white"
      borderRight="1px"
      borderRightColor="gray.100"
      w={{ base: "full", md: 64 }}
      pos="fixed"
      h="full"
      display={{ base: "none", md: "block" }}
      zIndex="sticky"
    >
      <VStack h="full" spacing={0} align="stretch">
        <Flex
          px={8}
          h="72px"
          align="center"
          borderBottom="1px"
          borderBottomColor="gray.50"
          mb={6}
        >
          <Link href="/" _hover={{ textDecoration: "none" }}>
            <Image
              src={logo}
              alt="Nivesh Assist Logo"
              h="40px"
              objectFit="contain"
              cursor="pointer"
            />
          </Link>
        </Flex>
        <VStack spacing={1} align="stretch" px={3} flex={1}>
          <NavItem
            icon={FiHome}
            active={currentPath === "/dashboard"}
            href="/dashboard"
          >
            Dashboard
          </NavItem>
          <NavItem
            icon={FiActivity}
            active={currentPath === "/insights"}
            href="/insights"
          >
            AI Insights
          </NavItem>
          <NavItem
            icon={FiPieChart}
            active={currentPath === "/advice"}
            href="/advice"
          >
            Expert Advice
          </NavItem>
          <NavItem
            icon={FiTrendingUp}
            active={currentPath === "/compare"}
            href="/compare"
          >
            Compare MFs
          </NavItem>
        </VStack>

        <VStack
          spacing={1}
          align="stretch"
          p={3}
          borderTop="1px"
          borderColor="gray.50"
          mb={4}
        >
          <NavItem icon={FiUser} href="#">
            Profile
          </NavItem>
          <NavItem icon={FiSettings} href="#">
            Settings
          </NavItem>
        </VStack>
      </VStack>
    </Box>
  );
};

export default Sidebar;
