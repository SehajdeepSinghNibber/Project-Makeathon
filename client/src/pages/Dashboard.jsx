import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  VStack,
  HStack,
  Grid,
  GridItem,
  Card,
  Select,
  CardBody,
  Button,
  FormControl,
  FormLabel,
  Input,
  Alert,
  AlertIcon,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useColorModeValue,
  Spinner,
  Divider,
  IconButton,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  useToast,
  SimpleGrid,
  Icon,
} from "@chakra-ui/react";
import { FiTrendingUp, FiActivity, FiPieChart, FiShield } from "react-icons/fi";
import { DeleteIcon, AddIcon, CloseIcon } from "@chakra-ui/icons";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import api from "../services/api.js";
import { color } from "framer-motion";
import distributionData from "../data/distribution.json";

const Dashboard = () => {
  const [funds, setFunds] = useState([]);
  const [newFund, setNewFund] = useState({ name: "", amount: "" });
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const toast = useToast();
  const cardBg = useColorModeValue("black", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const inputBg = useColorModeValue("black", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.300");
  const statBg = useColorModeValue("gray.50", "gray.700");

  const COLORS = [
    "#e94560",
    "#00bfa5",
    "#0f3460",
    "#ff6b6b",
    "#ffc107",
    "#6c757d",
    "#1e90ff",
    "#ff1493",
    "#00ced1",
    "#ff8c00",
    "#32cd32",
    "#9932cc",
    "#dc143c",
    "#8b4513",
    "#00fa9a",
  ];

  useEffect(() => {
    fetchFunds();
    fetchPortfolioData();
  }, []);

  const fetchFunds = async () => {
    try {
      const response = await api.get("/funds");
      setFunds(response.data.funds || []);
    } catch (err) {
      console.error("Error fetching funds:", err);
    }
  };

  const fetchPortfolioData = async () => {
    setLoading(true);
    try {
      const response = await api.get("/portfolio/analyze");
      setPortfolioData(response.data);
    } finally {
      setLoading(false);
    }
  };

  const handleAddFund = async (e) => {
    e.preventDefault();
    try {
      await api.post("/funds", newFund);
      setNewFund({ name: "", amount: "" });
      setShowAddForm(false);
      fetchFunds();

      toast({
        title: "Fund Added Successfully",
        description: `${newFund.name} has been added to your portfolio.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      setError("Failed to add fund");
      toast({
        title: "Error Adding Fund",
        description: "Failed to add fund. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDeleteFund = async (fundId, fundName) => {
    try {
      await api.delete(`/funds/${fundId}`);
      fetchFunds();
      fetchPortfolioData();
      toast({
        title: "Fund Removed",
        description: `${fundName} has been removed from your portfolio.`,
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      setError("Failed to delete fund");
      toast({
        title: "Error Removing Fund",
        description: "Failed to remove fund. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const totalInvestment = funds.reduce((sum, fund) => sum + fund.amount, 0);

  if (loading && !portfolioData) {
    return (
      <Container maxW="container.xl" py={12}>
        <VStack spacing={4}>
          <Spinner size="xl" color="brand.500" />
          <Text fontSize="lg" color={textColor}>
            Analyzing your portfolio...
          </Text>
        </VStack>
      </Container>
    );
  }

  const json_data = distributionData;

  const largeCapFunds = json_data.largeCap.funds.map((fund) => fund.fund_name);

  const midCapFunds = json_data.midCap.funds.map((fund) => fund.fund_name);

  const hybridFunds = json_data.hybrid.funds.map((fund) => fund.fund_name);

  const fundNamesByCategory = {
    largeCap: json_data.largeCap.funds.map((f) => f.fund_name),
    midCap: json_data.midCap.funds.map((f) => f.fund_name),
    hybrid: json_data.hybrid.funds.map((f) => f.fund_name),
  };

  // Get aggregated sector data from all funds in user's portfolio
  const getAllPortfolioSectorData = () => {
    const sectorMap = {};

    // Iterate through all user's funds
    funds.forEach((userFund) => {
      // Find the fund details in json_data
      let fundDetails = null;
      Object.values(json_data).forEach((category) => {
        if (category.funds && Array.isArray(category.funds)) {
          const found = category.funds.find(
            (f) => f.fund_name === userFund.name,
          );
          if (found) {
            fundDetails = found;
          }
        }
      });

      // If fund details found, aggregate its holdings
      if (
        fundDetails &&
        fundDetails.top_holdings &&
        Array.isArray(fundDetails.top_holdings)
      ) {
        fundDetails.top_holdings.forEach((holding) => {
          const sector = holding.sector;
          const allocation = holding.allocation_percent;

          if (sectorMap[sector]) {
            sectorMap[sector] += allocation;
          } else {
            sectorMap[sector] = allocation;
          }
        });
      }
    });

    if (Object.keys(sectorMap).length === 0) {
      return [];
    }

    // Calculate total to normalize percentages
    const total = Object.values(sectorMap).reduce((sum, val) => sum + val, 0);

    // Convert to array format and normalize to sum to 100%
    return Object.entries(sectorMap)
      .map(([name, value]) => ({
        name,
        value: parseFloat(((value / total) * 100).toFixed(2)),
      }))
      .sort((a, b) => b.value - a.value);
  };

  // Get aggregated company exposure data from all funds in user's portfolio
  const getAllPortfolioCompanyData = () => {
    const companyMap = {};

    // Iterate through all user's funds
    funds.forEach((userFund) => {
      // Find the fund details in json_data
      let fundDetails = null;
      Object.values(json_data).forEach((category) => {
        if (category.funds && Array.isArray(category.funds)) {
          const found = category.funds.find(
            (f) => f.fund_name === userFund.name,
          );
          if (found) {
            fundDetails = found;
          }
        }
      });

      // If fund details found, aggregate its holdings
      if (
        fundDetails &&
        fundDetails.top_holdings &&
        Array.isArray(fundDetails.top_holdings)
      ) {
        fundDetails.top_holdings.forEach((holding) => {
          const companyName = holding.company_name;
          const allocation = holding.allocation_percent;

          if (companyMap[companyName]) {
            companyMap[companyName] += allocation;
          } else {
            companyMap[companyName] = allocation;
          }
        });
      }
    });

    if (Object.keys(companyMap).length === 0) {
      return [];
    }

    // Calculate total to normalize percentages
    const total = Object.values(companyMap).reduce((sum, val) => sum + val, 0);

    // Convert to array format and normalize to sum to 100%
    return Object.entries(companyMap)
      .map(([name, value]) => ({
        name,
        exposure: parseFloat(((value / total) * 100).toFixed(2)),
      }))
      .sort((a, b) => b.exposure - a.exposure);
  };

  const companyChartData = getAllPortfolioCompanyData();

  const sectorChartData = getAllPortfolioSectorData();

  return (
    <VStack spacing={8} align="stretch" pb={10}>
      {/* 4 Stats Cards */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        <StatCard
          label="Total Investment"
          value={`₹${totalInvestment.toLocaleString()}`}
          icon={FiTrendingUp}
          color="brand.500"
        />
        <StatCard
          label="Active Funds"
          value={funds.length}
          icon={FiActivity}
          color="orange.400"
        />
      </SimpleGrid>

      {error && (
        <Alert status="error" borderRadius="xl">
          <AlertIcon />
          {error}
        </Alert>
      )}

      {/* Main Content Grid */}
      <Grid templateColumns={{ base: "1fr", lg: "repeat(3, 1fr)" }} gap={6}>
        {/* Recent Activity / Funds Table */}
        <GridItem colSpan={{ base: 1, lg: 2 }}>
          <Card h="full">
            <CardBody p={6}>
              <Flex justify="space-between" align="center" mb={6}>
                <Heading size="md">Your Portfolio</Heading>
                <Button
                  colorScheme="brand"
                  size="sm"
                  leftIcon={<AddIcon />}
                  onClick={() => setShowAddForm(!showAddForm)}
                  borderRadius="full"
                  color="white"
                >
                  Add Fund
                </Button>
              </Flex>

              {showAddForm && (
                <Box
                  mb={6}
                  p={4}
                  bg="gray.50"
                  borderRadius="xl"
                  border="1px"
                  borderColor="gray.100"
                >
                  <form onSubmit={handleAddFund}>
                    <VStack spacing={4} align="stretch">
                      <FormControl isRequired>
                        <FormLabel
                          fontSize="xs"
                          fontWeight="700"
                          color={"gray"}
                        >
                          Select Mutual Fund
                        </FormLabel>
                        <Select
                          placeholder="Search funds..."
                          value={newFund.name}
                          _placeholder={{ color: "gray" }}
                          onChange={(e) =>
                            setNewFund({ ...newFund, name: e.target.value })
                          }
                          bg="white"
                          color="black"
                        >
                          {[
                            ...fundNamesByCategory.largeCap,
                            ...fundNamesByCategory.midCap,
                            ...fundNamesByCategory.hybrid,
                          ].map((fund) => (
                            <option key={fund} value={fund}>
                              {fund}
                            </option>
                          ))}
                        </Select>
                      </FormControl>
                      <FormControl isRequired>
                        <FormLabel
                          fontSize="xs"
                          fontWeight="700"
                          color={"gray"}
                        >
                          Amount (₹)
                        </FormLabel>
                        <Input
                          color="gray"
                          type="number"
                          value={newFund.amount}
                          onChange={(e) =>
                            setNewFund({ ...newFund, amount: e.target.value })
                          }
                          bg="white"
                          _placeholder={{ color: "gray" }}
                          placeholder="e.g. 50000"
                        />
                      </FormControl>
                      <HStack>
                        <Button
                          type="submit"
                          colorScheme="brand"
                          size="sm"
                          w="full"
                          color="white"
                        >
                          Add Fund
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          w="full"
                          onClick={() => setShowAddForm(false)}
                        >
                          Cancel
                        </Button>
                      </HStack>
                    </VStack>
                  </form>
                </Box>
              )}

              {funds.length > 0 ? (
                <Box overflowX="auto">
                  <Table variant="simple" size="sm" color="gray.900">
                    <Thead>
                      <Tr>
                        <Th>Fund Name</Th>
                        <Th isNumeric>Amount</Th>
                        <Th isNumeric>%</Th>
                        <Th></Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {funds.map((fund) => (
                        <Tr key={fund._id}>
                          <Td fontWeight="600">{fund.name}</Td>
                          <Td isNumeric>₹{fund.amount.toLocaleString()}</Td>
                          <Td isNumeric>
                            {((fund.amount / totalInvestment) * 100).toFixed(1)}
                            %
                          </Td>
                          <Td isNumeric>
                            <IconButton
                              aria-label="Remove fund"
                              icon={<DeleteIcon />}
                              colorScheme="red"
                              variant="ghost"
                              size="xs"
                              onClick={() =>
                                handleDeleteFund(fund._id, fund.name)
                              }
                            />
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Box>
              ) : (
                <VStack py={10} color="gray.400">
                  <Text>Portfolio is empty</Text>
                  <Text fontSize="xs">
                    Start by adding your first mutual fund
                  </Text>
                </VStack>
              )}
            </CardBody>
          </Card>
        </GridItem>

        {/* Sector Allocation Side Card */}
        <GridItem colSpan={1}>
          <Card h="full">
            <CardBody p={6}>
              <Heading size="md" color="black" mb={6}>
                Sector Allocation
              </Heading>
              {sectorChartData.length > 0 ? (
                <Flex align="center" justify="space-between" h="250px">
                  <Box flex="1.2" h="100%">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={sectorChartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={45}
                          outerRadius={65}
                          paddingAngle={4}
                          dataKey="value"
                        >
                          {sectorChartData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            borderRadius: "12px",
                            border: "none",
                            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                          }}
                          formatter={(value) => `${value.toFixed(1)}%`}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </Box>
                  <VStack align="stretch" flex="1" spacing={3} pl={2}>
                    {sectorChartData.slice(0, 6).map((sector, idx) => (
                      <Flex
                        key={sector.name}
                        justify="space-between"
                        align="center"
                        fontSize="11px"
                      >
                        <HStack spacing={2} overflow="hidden">
                          <Box
                            minW="8px"
                            h="8px"
                            borderRadius="full"
                            bg={COLORS[idx % COLORS.length]}
                          />
                          <Text
                            fontWeight="600"
                            color="black"
                            whiteSpace="nowrap"
                            overflow="hidden"
                            textOverflow="ellipsis"
                          >
                            {sector.name}
                          </Text>
                        </HStack>
                        <Text color="gray.500" fontWeight="700" ml={1}>
                          {sector.value.toFixed(0)}%
                        </Text>
                      </Flex>
                    ))}
                  </VStack>
                </Flex>
              ) : (
                <VStack h="full" justify="center" py={10}>
                  <Text fontSize="sm" color="gray.400">
                    No data available
                  </Text>
                </VStack>
              )}
            </CardBody>
          </Card>
        </GridItem>

        {/* Top Company Exposures - Full Width */}
        <GridItem colSpan={{ base: 1, lg: 3 }}>
          <Card>
            <CardBody p={6}>
              <Heading color="black" size="md" mb={6}>
                Top Company Exposures
              </Heading>
              {companyChartData.length > 0 ? (
                <Box h="400px">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={companyChartData.slice(0, 8)}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#E2E8F0"
                      />
                      <XAxis
                        dataKey="name"
                        fontSize={10}
                        fontWeight="600"
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        fontSize={10}
                        fontWeight="600"
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(val) => `${val}%`}
                      />
                      <Tooltip
                        cursor={{ fill: "#F1F5F9" }}
                        contentStyle={{
                          borderRadius: "12px",
                          border: "none",
                          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                        }}
                        formatter={(value) => `${value.toFixed(2)}%`}
                      />
                      <Bar dataKey="exposure" radius={[4, 4, 0, 0]}>
                        {companyChartData.slice(0, 8).map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              ) : (
                <VStack py={10}>
                  <Text fontSize="sm" color="gray.400">
                    Add funds to view analytics
                  </Text>
                </VStack>
              )}
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </VStack>
  );
};

// Stats Card Component
const StatCard = ({ label, value, icon, color }) => (
  <Card variant="elevated">
    <CardBody p={6}>
      <Flex align="center" gap={4}>
        <Box p={3} borderRadius="xl" bg={`${color}10`} color={color}>
          <Icon as={icon} w={6} h={6} />
        </Box>
        <Box>
          <Text
            fontSize="xs"
            fontWeight="700"
            color="gray.700"
            textTransform="uppercase"
            letterSpacing="widest"
          >
            {label}
          </Text>
          <Text fontSize="2xl" fontWeight="800" color="gray.900">
            {value}
          </Text>
        </Box>
      </Flex>
    </CardBody>
  </Card>
);

export default Dashboard;
