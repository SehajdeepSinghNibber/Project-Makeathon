import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { useLocation } from 'react-router-dom';

const DashboardLayout = ({ children }) => {
  const location = useLocation();

  return (
    <Box minH="100vh" bg="gray.50">
      <Sidebar currentPath={location.pathname} />
      <Box ml={{ base: 0, md: 64 }} minH="100vh" display="flex" flexDirection="column">
        <Topbar />
        <Box 
          as="main" 
          flex="1" 
          p={{ base: 4, md: 8, lg: 10 }}
          mx="auto"
          w="full"
          maxW="1440px"
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
