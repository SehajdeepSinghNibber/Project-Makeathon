import React from 'react';
import {
  Flex,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  Avatar,
  VStack,
  Text,
  Box,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiSearch, FiBell, FiChevronDown } from 'react-icons/fi';
import { useAuth } from '../utils/authContext';

const Topbar = () => {
  const { user, logout } = useAuth();

  return (
    <Flex
      ml={{ base: 0, md: 64 }}
      px={8}
      height="20"
      alignItems="center"
      bg="white"
      borderBottomWidth="1px"
      borderBottomColor="gray.100"
      justifyContent="space-between"
      pos="sticky"
      top="0"
    >
      <InputGroup maxW="md" display={{ base: 'none', md: 'flex' }}>
        <InputLeftElement pointerEvents="none">
          <FiSearch color="gray" />
        </InputLeftElement>
        <Input 
          color="black"
          placeholder="Search your investments..." 
          bg="gray.50" 
          _placeholder={{ color: "gray" }}
          border="none" 
          borderRadius="xl"
          _focus={{ bg: 'white', border: '1px', borderColor: 'brand.500' }}
        />
      </InputGroup>

      <HStack spacing={6}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
          color="gray.500"
          borderRadius="full"
        />
        <Menu>
          <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
            <HStack spacing={4}>
              <Avatar
                size={'sm'}
                src={''}
                name={user?.name}
                bg="brand.500"
              />
              <VStack
                display={{ base: 'none', md: 'flex' }}
                alignItems="flex-start"
                spacing="1px"
                ml="2"
              >
                <Text color="black" fontSize="sm" fontWeight="700">
                  {user?.name || 'User'}
                </Text>
                <Text fontSize="xs" color="gray.500">
                  Premium Member
                </Text>
              </VStack>
              <Box display={{ base: 'none', md: 'flex' }}>
                <FiChevronDown />
              </Box>
            </HStack>
          </MenuButton>
          <MenuList
            bg="white"
            borderColor="gray.200"
            borderRadius="xl"
            boxShadow="xl"
            p={2}
          >
            <MenuItem borderRadius="lg" _hover={{ bg: 'brand.50', color: 'brand.500' }}>Profile</MenuItem>
            <MenuItem borderRadius="lg" _hover={{ bg: 'brand.50', color: 'brand.500' }}>Settings</MenuItem>
            <MenuItem borderRadius="lg" _hover={{ bg: 'brand.50', color: 'brand.500' }}>Billing</MenuItem>
            <MenuDivider />
            <MenuItem 
              onClick={logout} 
              borderRadius="lg" 
              color="red.500"
              _hover={{ bg: 'red.50' }}
            >
              Sign out
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  );
};

export default Topbar;
