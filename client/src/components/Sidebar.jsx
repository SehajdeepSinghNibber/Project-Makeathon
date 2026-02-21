import React from 'react';
import {
  Box,
  Flex,
  Icon,
  Link,
  Text,
  VStack,
  Heading,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  FiHome,
  FiTrendingUp,
  FiPieChart,
  FiSettings,
  FiUser,
  FiActivity,
} from 'react-icons/fi';

const NavItem = ({ icon, children, active, href }) => {
  const activeBg = 'brand.50';
  const activeColor = 'brand.500';
  
  return (
    <Link
      href={href}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
      w="full"
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="xl"
        role="group"
        cursor="pointer"
        bg={active ? activeBg : 'transparent'}
        color={active ? activeColor : 'gray.600'}
        fontWeight={active ? '700' : '600'}
        _hover={{
          bg: activeBg,
          color: activeColor,
        }}
        transition="all 0.2s"
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="18"
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

const Sidebar = ({ currentPath }) => {
  return (
    <Box
      transition="3s ease"
      bg="white"
      borderRight="1px"
      borderRightColor="gray.100"
      w={{ base: 'full', md: 64 }}
      pos="fixed"
      h="full"
      display={{ base: 'none', md: 'block' }}
    >
      <VStack h="full" spacing={0} align="stretch" py={8}>
        <Flex px={8} mb={10} align="center">
          <Heading size="md" color="brand.500" fontWeight="800">
            Nivesh Assist
          </Heading>
        </Flex>

        <VStack spacing={2} align="stretch" flex={1}>
          <NavItem icon={FiHome} active={currentPath === '/dashboard'} href="/dashboard">
            Dashboard
          </NavItem>
          <NavItem icon={FiActivity} active={currentPath === '/insights'} href="/insights">
            AI Insights
          </NavItem>
          <NavItem icon={FiPieChart} active={currentPath === '/advice'} href="/advice">
            Expert Advice
          </NavItem>
          <NavItem icon={FiTrendingUp} href="#">
             Analytics
          </NavItem>
        </VStack>

        <VStack spacing={2} align="stretch" pt={8} borderTop="1px" borderColor="gray.100">
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
