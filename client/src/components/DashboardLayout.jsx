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
      <Box ml={{ base: 0, md: 64 }}>
        <Topbar />
        <Box p={8}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
