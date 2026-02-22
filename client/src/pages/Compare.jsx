import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Alert,
  AlertIcon,
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  SimpleGrid,
  Spinner,
  Table,
  Tag,
  TagCloseButton,
  TagLabel,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  FiArrowRight,
  FiBarChart2,
  FiCheckCircle,
  FiChevronDown,
  FiChevronUp,
  FiInfo,
  FiPlus,
  FiTrash2,
} from "react-icons/fi";
import { SearchIcon } from "@chakra-ui/icons";
import api from "../services/api";

const METRICS = [
  { key: "category", label: "Category" },
  { key: "benchmark", label: "Benchmark" },
  { key: "nav", label: "NAV (₹)", type: "currency", isNumeric: true },
  { key: "equity_percentage", label: "Equity Allocation (%)", suffix: "%", isNumeric: true, highlightBest: "highest" },
  { key: "debt_percentage", label: "Debt Allocation (%)", suffix: "%", isNumeric: true, highlightBest: "lowest" },
  { key: "return_1y_regular", label: "1Y Return (%)", suffix: "%", isNumeric: true, highlightBest: "highest" },
  { key: "return_1y_benchmark", label: "1Y Benchmark (%)", suffix: "%", isNumeric: true },
  { key: "information_ratio_1y", label: "Information Ratio (1Y)", isNumeric: true, highlightBest: "highest" },
  { key: "return_3y_regular", label: "3Y Return (%)", suffix: "%", isNumeric: true, highlightBest: "highest" },
  { key: "return_3y_benchmark", label: "3Y Benchmark (%)", suffix: "%", isNumeric: true },
  { key: "information_ratio_3y", label: "Information Ratio (3Y)", isNumeric: true, highlightBest: "highest" },
  { key: "return_5y_regular", label: "5Y Return (%)", suffix: "%", isNumeric: true, highlightBest: "highest" },
  { key: "return_5y_benchmark", label: "5Y Benchmark (%)", suffix: "%", isNumeric: true },
  { key: "information_ratio_5y", label: "Information Ratio (5Y)", isNumeric: true, highlightBest: "highest" },
  { key: "return_10y_regular", label: "10Y Return (%)", suffix: "%", isNumeric: true, highlightBest: "highest" },
  { key: "return_10y_benchmark", label: "10Y Benchmark (%)", suffix: "%", isNumeric: true },
  { key: "information_ratio_10y", label: "Information Ratio (10Y)", isNumeric: true, highlightBest: "highest" },
  { key: "return_since_launch_regular", label: "Since Launch Return (%)", suffix: "%", isNumeric: true, highlightBest: "highest" },
  { key: "return_since_launch_benchmark", label: "Since Launch Benchmark (%)", suffix: "%", isNumeric: true },
  { key: "riskometer_scheme", label: "Scheme Risk" },
  { key: "riskometer_benchmark", label: "Benchmark Risk" },
  { key: "aum", label: "AUM (₹ Cr)" },
];

const sanitizeNumber = (value) => {
  if (value === null || value === undefined || value === "") return null;
  if (typeof value === "number") return value;
  const parsed = parseFloat(value);
  return Number.isNaN(parsed) ? null : parsed;
};

const formatMetricValue = (value, metric) => {
  if (value === null || value === undefined || value === "") return "—";

  if (metric?.type === "currency") {
    const num = sanitizeNumber(value);
    if (num !== null) {
      return `₹${num.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
    }
  }

  if (metric?.suffix === "%") {
    const num = sanitizeNumber(value);
    if (num !== null) {
      return `${num.toFixed(2)}%`;
    }
  }

  if (typeof value === "number") {
    return Number.isInteger(value) ? value : value.toFixed(4);
  }

  return value;
};

const formatRawLabel = (key) =>
  key
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

const formatRawValue = (value) => {
  if (value === null || value === undefined || value === "") return "—";
  if (typeof value === "number") {
    return Number.isInteger(value) ? value : value.toFixed(4);
  }
  return value;
};

const EmptyState = ({ onSelect }) => (
  <Card variant="outline" borderStyle="dashed" py={20} textAlign="center" borderRadius="3xl">
    <CardBody>
      <VStack spacing={6}>
        <Box p={6} bg="brand.50" borderRadius="full">
          <Icon as={FiBarChart2} fontSize="4xl" color="brand.500" />
        </Box>
        <VStack spacing={2}>
          <Heading size="lg">Compare Mutual Funds</Heading>
          <Text color="gray.500" maxW="md">
            Select up to 5 funds to see a side-by-side comparison of their performance, risk, and other key metrics.
          </Text>
        </VStack>
        <Button
          leftIcon={<FiPlus />}
          colorScheme="brand"
          size="lg"
          onClick={onSelect}
          color="white"
        >
          Add Funds to Compare
        </Button>
      </VStack>
    </CardBody>
  </Card>
);

const CompareSelector = ({ selectedSchemes, onAdd, onRemove, availableFunds }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredFunds = useMemo(() => {
    const unselected = availableFunds.filter(
      (fund) => !selectedSchemes.includes(fund.scheme_name)
    );

    if (!searchTerm) {
      return unselected;
    }

    return unselected.filter((fund) =>
      fund.scheme_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [availableFunds, searchTerm, selectedSchemes]);

  const selectedMeta = useMemo(
    () =>
      selectedSchemes.map(
        (name) =>
          availableFunds.find((fund) => fund.scheme_name === name) || {
            scheme_name: name,
            category: "—",
          }
      ),
    [selectedSchemes, availableFunds]
  );

  return (
    <Box position="relative" w="full" ref={menuRef}>
      <VStack align="stretch" spacing={4}>
        <Box>
          <Text mb={2} fontSize="sm" fontWeight="bold" color="gray.600">
            Select Funds to Compare ({selectedSchemes.length}/5)
          </Text>
          <InputGroup size="lg">
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Search or select funds..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setIsMenuOpen(true);
              }}
              onFocus={() => setIsMenuOpen(true)}
              bg="white"
              borderRadius="xl"
              pr="4.5rem"
            />
            <InputRightElement width="4.5rem">
              <IconButton
                h="1.75rem"
                size="sm"
                variant="ghost"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                icon={<Icon as={isMenuOpen ? FiChevronUp : FiChevronDown} />}
                aria-label="Toggle dropdown"
              />
            </InputRightElement>
          </InputGroup>

          {isMenuOpen && (
            <Box
              position="absolute"
              top="100%"
              left={0}
              right={0}
              mt={2}
              bg="white"
              boxShadow="2xl"
              borderRadius="xl"
              zIndex={1100}
              maxH="300px"
              overflowY="auto"
              border="1px"
              borderColor="gray.100"
            >
              <Box p={2} bg="gray.50" borderBottom="1px" borderColor="gray.100">
                <Text fontSize="xs" fontWeight="bold" color="gray.400" px={2}>
                  {searchTerm ? `Search Results (${filteredFunds.length})` : "Popular Funds"}
                </Text>
              </Box>
              {filteredFunds.length > 0 ? (
                filteredFunds.map((fund) => (
                  <Box
                    key={fund.scheme_name}
                    px={4}
                    py={3}
                    cursor="pointer"
                    _hover={{ bg: "brand.50" }}
                    onClick={() => {
                      onAdd(fund);
                      setSearchTerm("");
                      setIsMenuOpen(false);
                    }}
                  >
                    <HStack justify="space-between">
                      <VStack align="start" spacing={0}>
                        <Text fontWeight="bold" fontSize="sm" color="gray.700">
                          {fund.scheme_name}
                        </Text>
                        <Text fontSize="xs" color="gray.500">{fund.category}</Text>
                      </VStack>
                      {typeof fund.return_3y_regular === "number" && (
                        <Badge colorScheme="brand" variant="subtle" borderRadius="md">
                          {fund.return_3y_regular.toFixed(1)}% 3Y
                        </Badge>
                      )}
                    </HStack>
                  </Box>
                ))
              ) : (
                <Box px={4} py={3}>
                  <Text fontSize="sm" color="gray.500">
                    No available funds found
                  </Text>
                </Box>
              )}
            </Box>
          )}
        </Box>

        {selectedMeta.length > 0 && (
          <HStack wrap="wrap" spacing={3}>
            {selectedMeta.map((fund) => (
              <Tag
                key={fund.scheme_name}
                size="lg"
                borderRadius="full"
                variant="subtle"
                colorScheme="brand"
                px={4}
                py={2}
              >
                <TagLabel fontWeight="bold">{fund.scheme_name}</TagLabel>
                <TagCloseButton onClick={() => onRemove(fund.scheme_name)} />
              </Tag>
            ))}
          </HStack>
        )}
      </VStack>
    </Box>
  );
};

const CompareTable = ({ selectedFunds, onRemove }) => {
  const borderColor = useColorModeValue("gray.100", "gray.700");
  const stickyBg = useColorModeValue("white", "gray.800");

  const findBestValue = (key, type) => {
    if (selectedFunds.length < 2 || !type) return null;
    const values = selectedFunds
      .map((fund) => sanitizeNumber(fund[key]))
      .filter((value) => value !== null);
    if (values.length === 0) return null;
    if (type === "highest") return Math.max(...values);
    if (type === "lowest") return Math.min(...values);
    return null;
  };

  return (
    <Box overflowX="auto" pb={4}>
      <Table variant="simple" sx={{ borderCollapse: "separate", borderSpacing: "0 8px" }}>
        <Thead>
          <Tr>
            <Th
              width="250px"
              position="sticky"
              left={0}
              bg={stickyBg}
              zIndex={10}
              borderBottom="none"
              textTransform="none"
              fontSize="md"
              backgroundColor="white"
              color="black"
            >
              Key Metrics
            </Th>
            {selectedFunds.map((fund) => (
              <Th key={fund.scheme_name} minW="280px" borderBottom="none" textAlign="center">
                <VStack spacing={3} p={4} bg="brand.50" borderRadius="2xl" position="relative">
                  <IconButton
                    icon={<FiTrash2 />}
                    size="xs"
                    colorScheme="red"
                    variant="ghost"
                    position="absolute"
                    top={2}
                    right={2}
                    onClick={() => onRemove(fund.scheme_name)}
                    aria-label="Remove fund"
                    _hover={{ bg: "red.100" }}
                  />
                  <Heading size="xs" textAlign="center" lineHeight="shorter" noOfLines={2} px={4}>
                    {fund.scheme_name}
                  </Heading>
                  <Badge colorScheme="brand" variant="solid" borderRadius="full" px={3}>
                    {fund.category}
                  </Badge>
                </VStack>
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {METRICS.map((metric) => {
            const bestValue = findBestValue(metric.key, metric.highlightBest);
            return (
              <Tr key={metric.key}>
                <Td
                  position="sticky"
                  left={0}
                  bg={stickyBg}
                  zIndex={10}
                  fontWeight="bold"
                  color="gray.600"
                  borderBottom="1px"
                  borderColor={borderColor}
                  backgroundColor="white"
                >
                  {metric.label}
                </Td>
                {selectedFunds.map((fund) => {
                  const value = fund[metric.key];
                  const numericValue = sanitizeNumber(value);
                  const isBest =
                    bestValue !== null &&
                    numericValue !== null &&
                    numericValue === bestValue;
                  return (
                    <Td key={fund.scheme_name} textAlign="center" borderBottom="1px" borderColor={borderColor}>
                      <HStack justify="center" spacing={2}>
                        <Text
                          fontWeight={isBest ? "bold" : "medium"}
                          color={isBest ? "brand.600" : "gray.800"}
                          fontSize="sm"
                        >
                          {formatMetricValue(value, metric)}
                        </Text>
                        {isBest && (
                          <Tooltip label={`Best in ${metric.label}`}>
                            <Box color="green.500">
                              <FiCheckCircle size={14} />
                            </Box>
                          </Tooltip>
                        )}
                      </HStack>
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
};

const FullFundDetails = ({ funds }) => {
  if (!funds.length) return null;

  return (
    <Card borderRadius="2xl" boxShadow="sm" variant="outline">
      <CardHeader pb={0}>
        <Heading size="md">Complete Fund Data</Heading>
        <Text color="gray.500" fontSize="sm" fontWeight="medium">
          Every field sourced from the AMC disclosure file
        </Text>
      </CardHeader>
      <CardBody>
        <SimpleGrid columns={{ base: 1, lg: Math.min(2, funds.length) }} spacing={6}>
          {funds.map((fund) => (
            <Box key={fund.scheme_name} border="1px" borderColor="gray.100" borderRadius="xl" p={5} bg="white">
              <Heading size="sm" mb={3} color="gray.800">
                {fund.scheme_name}
              </Heading>
              <VStack align="stretch" spacing={2}>
                {Object.entries(fund)
                  .sort(([a], [b]) => a.localeCompare(b))
                  .map(([key, value]) => (
                    <HStack key={key} justify="space-between" align="baseline">
                      <Text fontSize="xs" fontWeight="bold" color="gray.500">
                        {formatRawLabel(key)}
                      </Text>
                      <Text fontSize="sm" color="gray.800" maxW="60%" textAlign="right">
                        {formatRawValue(value)}
                      </Text>
                    </HStack>
                  ))}
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      </CardBody>
    </Card>
  );
};

const ComparePage = () => {
  const [availableFunds, setAvailableFunds] = useState([]);
  const [selectedSchemes, setSelectedSchemes] = useState([]);
  const [selectedFunds, setSelectedFunds] = useState([]);
  const [listLoading, setListLoading] = useState(true);
  const [compareLoading, setCompareLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFundList = async () => {
      try {
        const { data } = await api.get("/compare/list");
        setAvailableFunds(data.funds || []);
        setError("");
      } catch (err) {
        console.error("Failed to load fund list:", err);
        setError("Unable to load the fund list. Please refresh the page.");
      } finally {
        setListLoading(false);
      }
    };

    fetchFundList();
  }, []);

  useEffect(() => {
    if (!selectedSchemes.length) {
      setSelectedFunds([]);
      setCompareLoading(false);
      return;
    }

    const fetchDetails = async () => {
      setCompareLoading(true);
      try {
        const { data } = await api.post("/compare/details", {
          schemes: selectedSchemes,
        });
        const ordered = selectedSchemes
          .map((name) =>
            (data.funds || []).find(
              (fund) => fund.scheme_name.toLowerCase() === name.toLowerCase()
            )
          )
          .filter(Boolean);
        setSelectedFunds(ordered);
        setError("");
      } catch (err) {
        console.error("Failed to load comparison data:", err);
        setError(
          err?.response?.data?.message ||
            "Unable to load comparison data. Please modify your selection and try again."
        );
      } finally {
        setCompareLoading(false);
      }
    };

    fetchDetails();
  }, [selectedSchemes]);

  const handleAddFund = (fund) => {
    if (!fund || selectedSchemes.includes(fund.scheme_name)) {
      return;
    }
    if (selectedSchemes.length >= 5) {
      return;
    }
    setSelectedSchemes((prev) => [...prev, fund.scheme_name]);
  };

  const handleRemoveFund = (schemeName) => {
    setSelectedSchemes((prev) => prev.filter((name) => name !== schemeName));
  };

  if (listLoading) {
    return (
      <Container maxW="container.xl" py={20}>
        <Flex justify="center" align="center" direction="column">
          <Spinner size="xl" color="brand.500" thickness="4px" />
          <Text mt={4} color="gray.500" fontWeight="medium">
            Loading the latest fund list...
          </Text>
        </Flex>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <VStack align="start" spacing={1}>
          <Heading size="xl" letterSpacing="tight" color="gray.800">
            Compare Mutual Funds
          </Heading>
          <Text color="gray.500" fontSize="lg">
            Analyze and compare high-performing funds to boost your portfolio.
          </Text>
        </VStack>

        {error && (
          <Alert status="error" borderRadius="xl">
            <AlertIcon />
            <Text fontSize="sm">{error}</Text>
          </Alert>
        )}

        <Card borderRadius="2xl" boxShadow="sm" overflow="visible" variant="outline">
          <CardBody p={8}>
            <CompareSelector
              selectedSchemes={selectedSchemes}
              onAdd={handleAddFund}
              onRemove={handleRemoveFund}
              availableFunds={availableFunds}
            />
          </CardBody>
        </Card>

        {selectedSchemes.length === 0 ? (
          <EmptyState onSelect={() => document.querySelector("input")?.focus()} />
        ) : (
          <VStack align="stretch" spacing={6}>
            {selectedSchemes.length < 2 && (
              <Box p={4} bg="brand.50" borderRadius="xl" border="1px" borderColor="brand.200">
                <HStack>
                  <Icon as={FiInfo} color="brand.500" />
                  <Text fontSize="sm" color="brand.700" fontWeight="medium">
                    Select at least one more fund to enable side-by-side comparison.
                  </Text>
                </HStack>
              </Box>
            )}

            <Card borderRadius="2xl" boxShadow="md" overflow="hidden" variant="outline">
              <CardBody p={0}>
                <Box p={8}>
                  {compareLoading && (
                    <Flex justify="center" align="center" py={10}>
                      <Spinner size="lg" color="brand.500" mr={3} />
                      <Text color="gray.500">Fetching comparison data...</Text>
                    </Flex>
                  )}
                  {!compareLoading && selectedFunds.length >= 2 ? (
                    <CompareTable selectedFunds={selectedFunds} onRemove={handleRemoveFund} />
                  ) : (
                    <Box textAlign="center" py={10}>
                      <Text color="gray.400" fontSize="md">
                        Ready to compare? Add another fund!
                      </Text>
                    </Box>
                  )}
                </Box>
              </CardBody>
            </Card>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <Card borderRadius="2xl" variant="subtle" bg="white" border="1px" borderColor="gray.100">
                <CardBody p={6}>
                  <HStack spacing={4} mb={4}>
                    <Box p={2} bg="brand.50" borderRadius="lg">
                      <Icon as={FiArrowRight} color="brand.500" />
                    </Box>
                    <Heading size="sm">Quick Analysis</Heading>
                  </HStack>
                  <Text fontSize="sm" color="gray.600" lineHeight="tall">
                    {selectedFunds.length >= 2
                      ? (() => {
                          const ranked = selectedFunds
                            .filter((fund) => sanitizeNumber(fund.return_3y_regular) !== null)
                            .sort(
                              (a, b) =>
                                sanitizeNumber(b.return_3y_regular) -
                                sanitizeNumber(a.return_3y_regular)
                            );
                          if (!ranked.length) {
                            return "Comparison ready. The selected funds will appear as soon as their data is available.";
                          }
                          const leader = ranked[0];
                          const leaderReturn = sanitizeNumber(leader.return_3y_regular);
                          return `Comparing ${selectedFunds.length} funds. ${leader.scheme_name} leads with a ${leaderReturn?.toFixed(2)}% 3-year return.`;
                        })()
                      : "Add more funds to generate a summary analysis."}
                  </Text>
                </CardBody>
              </Card>
              <Card borderRadius="2xl" variant="subtle" bg="white" border="1px" borderColor="gray.100">
                <CardBody p={6}>
                  <HStack spacing={4} mb={4}>
                    <Box p={2} bg="green.50" borderRadius="lg">
                      <Icon as={FiCheckCircle} color="green.500" />
                    </Box>
                    <Heading size="sm">Smart Tip</Heading>
                  </HStack>
                  <Text fontSize="sm" color="gray.600" lineHeight="tall">
                    A diversified return profile beats chasing a single metric. Look for the
                    <FiCheckCircle style={{ display: "inline", color: "#48BB78", margin: "0 4px" }} />
                    icon in the table to spot the strongest metric for each row.
                  </Text>
                </CardBody>
              </Card>
            </SimpleGrid>

            {selectedFunds.length > 0 && <FullFundDetails funds={selectedFunds} />}
          </VStack>
        )}
      </VStack>
    </Container>
  );
};

export default ComparePage;
