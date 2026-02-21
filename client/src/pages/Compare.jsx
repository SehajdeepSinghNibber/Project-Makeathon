import React, { useState, useEffect,useMemo } from 'react';
import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Button,
  Card,
  CardBody,
  Badge,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Flex,
  useColorModeValue,
  Tag,
  TagLabel,
  TagCloseButton,
  Tooltip,
  SimpleGrid,
  Icon,
  Spinner,
} from '@chakra-ui/react';
import { FiPlus, FiTrash2, FiInfo, FiTrendingUp, FiArrowRight, FiCheckCircle, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { SearchIcon } from '@chakra-ui/icons';

const DEFAULT_METRICS = {
  "Large Cap": { risk: "Very High", returns_1y: 28.5, returns_3y: 17.2, returns_5y: 15.4, expense_ratio: 0.95, rating: 4, min_investment: 500 },
  "Mid Cap": { risk: "Very High", returns_1y: 38.2, returns_3y: 22.4, returns_5y: 19.8, expense_ratio: 0.75, rating: 4, min_investment: 500 },
  "Hybrid": { risk: "High", returns_1y: 22.4, returns_3y: 14.2, returns_5y: 13.1, expense_ratio: 1.10, rating: 3, min_investment: 100 },
  "Pharma": { risk: "Very High", returns_1y: 35.1, returns_3y: 16.5, returns_5y: 18.2, expense_ratio: 0.85, rating: 4, min_investment: 500 },
  "Banking": { risk: "Very High", returns_1y: 24.8, returns_3y: 12.4, returns_5y: 11.2, expense_ratio: 0.98, rating: 3, min_investment: 500 }
};

const METRICS = [
  { key: 'category', label: 'Category' },
  { key: 'risk', label: 'Risk Level' },
  { key: 'nav', label: 'NAV (₹)', isNumeric: true },
  { key: 'returns_1y', label: '1Y Return (%)', isNumeric: true, highlightBest: 'highest' },
  { key: 'returns_3y', label: '3Y Return (%)', isNumeric: true, highlightBest: 'highest' },
  { key: 'returns_5y', label: '5Y Return (%)', isNumeric: true, highlightBest: 'highest' },
  { key: 'expense_ratio', label: 'Expense Ratio (%)', isNumeric: true, highlightBest: 'lowest' },
  { key: 'aum', label: 'AUM' },
  { key: 'fund_manager', label: 'Fund Manager' },
  { key: 'min_investment', label: 'Min Investment (₹)', isNumeric: true },
];

/* ============================
   INNER COMPONENTS
   ============================ */

const EmptyState = ({ onSelect }) => (
  <Card variant="outline" borderStyle="dashed" py={20} textAlign="center" borderRadius="3xl">
    <CardBody>
      <VStack spacing={6}>
        <Box p={6} bg="brand.50" borderRadius="full">
          <Icon as={FiTrendingUp} fontSize="4xl" color="brand.500" />
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

const CompareSelector = ({ selectedFunds, onAdd, onRemove, availableFunds }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = React.useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredFunds = useMemo(() => {
    const unselected = availableFunds.filter(f => 
      !selectedFunds.find(sf => sf.fund_name === f.fund_name)
    );
    
    if (!searchTerm) return unselected.slice(0, 10);
    
    return unselected.filter(f => 
      f.fund_name.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 20);
  }, [availableFunds, searchTerm, selectedFunds]);

  return (
    <Box position="relative" w="full" ref={menuRef}>
      <VStack align="stretch" spacing={4}>
        <Box>
          <Text mb={2} fontSize="sm" fontWeight="bold" color="gray.600">Select Funds to Compare ({selectedFunds.length}/5)</Text>
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
              animation="fadeIn 0.2s ease-in-out"
            >
              <Box p={2} bg="gray.50" borderBottom="1px" borderColor="gray.100">
                <Text fontSize="xs" fontWeight="bold" color="gray.400" px={2}>
                  {searchTerm ? `Search Results (${filteredFunds.length})` : 'Popular Funds'}
                </Text>
              </Box>
              {filteredFunds.length > 0 ? (
                filteredFunds.map(fund => (
                  <Box
                    key={fund.fund_name}
                    px={4}
                    py={3}
                    cursor="pointer"
                    _hover={{ bg: 'brand.50' }}
                    onClick={() => {
                      onAdd(fund);
                      setSearchTerm('');
                      setIsMenuOpen(false);
                    }}
                    transition="background 0.2s"
                  >
                    <HStack justify="space-between">
                      <VStack align="start" spacing={0}>
                        <Text fontWeight="bold" fontSize="sm" color="gray.700">{fund.fund_name}</Text>
                        <Text fontSize="xs" color="gray.500">{fund.category}</Text>
                      </VStack>
                      <Badge colorScheme="brand" variant="subtle" borderRadius="md">
                        {fund.returns_3y.toFixed(1)}% 3Y
                      </Badge>
                    </HStack>
                  </Box>
                ))
              ) : (
                <Box px={4} py={3}>
                  <Text fontSize="sm" color="gray.500">No available funds found</Text>
                </Box>
              )}
            </Box>
          )}
        </Box>

        {selectedFunds.length > 0 && (
          <HStack wrap="wrap" spacing={3}>
            {selectedFunds.map(fund => (
              <Tag
                key={fund.fund_name}
                size="lg"
                borderRadius="full"
                variant="subtle"
                colorScheme="brand"
                px={4}
                py={2}
              >
                <TagLabel fontWeight="bold">{fund.fund_name}</TagLabel>
                <TagCloseButton onClick={() => onRemove(fund)} />
              </Tag>
            ))}
          </HStack>
        )}
      </VStack>
    </Box>
  );
};

const CompareTable = ({ selectedFunds, onRemove }) => {
  const borderColor = useColorModeValue('gray.100', 'gray.700');
  const stickyBg = useColorModeValue('white', 'gray.800');

  const findBestValue = (key, type) => {
    if (selectedFunds.length < 2 || !type) return null;
    const values = selectedFunds.map(f => f[key]).filter(v => typeof v === 'number');
    if (values.length === 0) return null;
    if (type === 'highest') return Math.max(...values);
    if (type === 'lowest') return Math.min(...values);
    return null;
  };

  return (
    <Box overflowX="auto" pb={4}>
      <Table variant="simple" sx={{ borderCollapse: 'separate', borderSpacing: '0 8px' }}>
        <Thead>
          <Tr>
            <Th width="250px" position="sticky" left={0} bg={stickyBg} zIndex={10} borderBottom="none" textTransform="none" fontSize="md" backgroundColor="white" color="black">
              Key Metrics
            </Th>
            {selectedFunds.map(fund => (
              <Th key={fund.fund_name} minW="280px" borderBottom="none" textAlign="center">
                <VStack spacing={3} p={4} bg="brand.50" borderRadius="2xl" position="relative">
                  <IconButton
                    icon={<FiTrash2 />}
                    size="xs"
                    colorScheme="red"
                    variant="ghost"
                    position="absolute"
                    top={2}
                    right={2}
                    onClick={() => onRemove(fund)}
                    aria-label="Remove fund"
                    _hover={{ bg: 'red.100' }}
                  />
                  <Heading size="xs" textAlign="center" lineHeight="shorter" noOfLines={2} px={4}>{fund.fund_name}</Heading>
                  <Badge colorScheme="brand" variant="solid" borderRadius="full" px={3} >{fund.category}</Badge>
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
                <Td position="sticky" left={0} bg={stickyBg} zIndex={10} fontWeight="bold" color="gray.600" borderBottom="1px" borderColor={borderColor} backgroundColor="white" color="black">
                  {metric.label}
                </Td>
                {selectedFunds.map(fund => {
                  const value = fund[metric.key];
                  const isBest = bestValue !== null && value === bestValue;
                  return (
                    <Td key={fund.fund_name} textAlign="center" borderBottom="1px" borderColor={borderColor}>
                      <HStack justify="center" spacing={2}>
                        <Text fontWeight={isBest ? "bold" : "medium"} color={isBest ? "brand.600" : "gray.800"} fontSize="sm">
                          {typeof value === 'number' ? 
                            (metric.key === 'nav' || metric.key === 'min_investment' ? 
                              `₹${value.toLocaleString('en-IN')}` : 
                              `${value.toFixed(2)}${metric.key.includes('returns') || metric.key === 'expense_ratio' ? '%' : ''}`
                            ) : value
                          }
                        </Text>
                        {isBest && (
                          <Tooltip label={`Best in ${metric.label}`}>
                            <Box color="green.500"><FiCheckCircle size={14} /></Box>
                          </Tooltip>
                        )}
                      </HStack>
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
          <Tr>
            <Td position="sticky" left={0} bg={stickyBg} zIndex={10} fontWeight="bold" color="gray.600" borderBottom="none" verticalAlign="top" pt={6} backgroundColor="white" color="black">Top Holdings</Td>
            {selectedFunds.map(fund => (
              <Td key={fund.fund_name} borderBottom="none" verticalAlign="top" pt={6}>
                <VStack align="center" spacing={2}>
                  {fund.top_holdings?.slice(0, 5).map((holding, i) => (
                    <Tooltip key={i} label={`${holding.sector} - ${holding.allocation_percent}%`}>
                      <Text fontSize="xs" color="gray.500" bg="gray.50" px={3} py={1} borderRadius="full" w="full" textAlign="center" border="1px" borderColor="gray.100" cursor="help">
                        {typeof holding === 'string' ? holding : holding.company_name}
                      </Text>
                    </Tooltip>
                  ))}
                </VStack>
              </Td>
            ))}
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
};

const ComparePage = () => {
  const [selectedFunds, setSelectedFunds] = useState([]);
  const [rawFunds, setRawFunds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFunds = async () => {
      try {
        const response = await fetch('/distribution.json');
        const text = await response.text();
        
        // Parse multi-block JSON: { "funds": [...] } { "funds": [...] }
        const blocks = text.split(/}\s*\n\s*{/).map((block, idx) => {
          let cleaned = block.trim();
          if (!cleaned.startsWith('{')) cleaned = '{' + cleaned;
          if (!cleaned.endsWith('}')) cleaned = cleaned + '}';
          try {
            return JSON.parse(cleaned);
          } catch (e) {
            console.error('Error parsing JSON block at index', idx, e);
            return null;
          }
        }).filter(Boolean);

        const merged = blocks.flatMap(b => b.funds || b.allFunds || (Array.isArray(b) ? b : []));
        setRawFunds(merged);
      } catch (err) {
        console.error('Failed to load distribution.json:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFunds();
  }, []);

  // Memoize enriched funds to handle distribution.json format variations
  const availableFunds = useMemo(() => {
    if (!rawFunds.length) return [];
    
    const enriched = rawFunds.map((fund, idx) => {
      let category = "Large Cap";
      const fundName = fund.fund_name.toLowerCase();
      if (fundName.includes('midcap') || fundName.includes('emerging')) category = "Mid Cap";
      else if (fundName.includes('balanced') || fundName.includes('hybrid')) category = "Hybrid";
      else if (fundName.includes('pharma')) category = "Pharma";
      else if (fundName.includes('banking')) category = "Banking";

      const defaults = DEFAULT_METRICS[category] || DEFAULT_METRICS["Large Cap"];
      
      return {
        ...fund,
        category,
        risk: defaults.risk,
        // Deterministic mock values based on fund name
        nav: parseFloat((50 + (fund.fund_name.length * 1.5) % 950).toFixed(2)),
        returns_1y: defaults.returns_1y + ((fund.fund_name.charCodeAt(0) % 10) - 5) * 0.5,
        returns_3y: defaults.returns_3y + ((fund.fund_name.charCodeAt(1) % 10) - 5) * 0.4,
        returns_5y: defaults.returns_5y + ((fund.fund_name.charCodeAt(2) % 10) - 5) * 0.3,
        expense_ratio: defaults.expense_ratio + ((fund.fund_name.charCodeAt(3) % 10) - 5) * 0.02,
        aum: `${(20 + (fund.fund_name.length * 2) % 60).toFixed(1)}K Cr`,
        fund_manager: ["Rahul Baijal", "Anish Tawakley", "Sohini Andani", "Chirag Setalvad", "Shreyash Devalkar"][idx % 5],
        rating: defaults.rating,
        min_investment: defaults.min_investment,
        top_holdings: fund.top_holdings || []
      };
    });

    // Deduplicate by name
    return Array.from(new Map(enriched.map(item => [item.fund_name, item])).values());
  }, [rawFunds]);

  const handleAddFund = (fund) => {
    if (selectedFunds.length < 5) {
      setSelectedFunds(prev => [...prev, fund]);
    }
  };

  const handleRemoveFund = (fund) => {
    setSelectedFunds(prev => prev.filter(f => f.fund_name !== fund.fund_name));
  };

  if (loading) {
    return (
      <Container maxW="container.xl" py={20}>
        <Flex justify="center" align="center" direction="column">
          <Spinner size="xl" color="brand.500" thickness="4px" />
          <Text mt={4} color="gray.500" fontWeight="medium">Loading fund data from distribution...</Text>
        </Flex>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <VStack align="start" spacing={1}>
          <Heading size="xl" letterSpacing="tight" color="gray.800">Compare Mutual Funds</Heading>
          <Text color="gray.500" fontSize="lg">Analyze and compare high-performing funds to boost your portfolio.</Text>
        </VStack>

        <Card borderRadius="2xl" boxShadow="sm" overflow="visible" variant="outline">
          <CardBody p={8}>
            <CompareSelector 
              selectedFunds={selectedFunds} 
              onAdd={handleAddFund} 
              onRemove={handleRemoveFund}
              availableFunds={availableFunds}
            />
          </CardBody>
        </Card>

        {selectedFunds.length === 0 ? (
          <EmptyState onSelect={() => document.querySelector('input')?.focus()} />
        ) : (
          <VStack align="stretch" spacing={6}>
            {selectedFunds.length < 2 && (
              <Box p={4} bg="brand.50" borderRadius="xl" border="1px" borderColor="brand.200">
                <HStack>
                  <Icon as={FiInfo} color="brand.500" />
                  <Text fontSize="sm" color="brand.700" fontWeight="medium">Select at least one more fund to enable side-by-side comparison.</Text>
                </HStack>
              </Box>
            )}
            
            <Card borderRadius="2xl" boxShadow="md" overflow="hidden" variant="outline">
              <CardBody p={0}>
                <Box p={8}>
                  {selectedFunds.length >= 2 ? (
                    <CompareTable selectedFunds={selectedFunds} onRemove={handleRemoveFund} />
                  ) : (
                    <Box textAlign="center" py={10}>
                      <Text color="gray.400" fontSize="md">Ready to compare? Add another fund!</Text>
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
                    {selectedFunds.length >= 2 ? (
                      `Comparing ${selectedFunds.length} funds. ${selectedFunds.sort((a, b) => b.returns_3y - a.returns_3y)[0].fund_name} leads with a ${selectedFunds.sort((a, b) => b.returns_3y - a.returns_3y)[0].returns_3y.toFixed(2)}% 3-year return.`
                    ) : (
                      "Add more funds to generate a summary analysis."
                    )}
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
                    A lower Expense Ratio can significantly impact long-term wealth. Look for the <FiCheckCircle style={{display:'inline', color:'#48BB78'}} /> icon in the table to see the best value.
                  </Text>
                </CardBody>
              </Card>
            </SimpleGrid>
          </VStack>
        )}
      </VStack>
    </Container>
  );
};

export default ComparePage;
