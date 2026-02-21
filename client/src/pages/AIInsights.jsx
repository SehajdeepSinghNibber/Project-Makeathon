import { useState, useEffect } from "react";
import {
  Box,
  Container,
  VStack,
  HStack,
  Card,
  CardBody,
  CardHeader,
  Button,
  Heading,
  Text,
  Alert,
  AlertIcon,
  Select,
  Input,
  Spinner,
  Badge,
  Progress,
  SimpleGrid,
  List,
  ListItem,
  ListIcon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useColorModeValue,
} from "@chakra-ui/react";
import { CheckCircleIcon, WarningIcon, InfoIcon } from "@chakra-ui/icons";
import api from "../services/api";





/* ============================
   STAT CARD
   ============================ */
const StatCard = ({ label, value, color }) => (
  <Card bg={`${color}.50`} borderColor={`${color}.200`} borderWidth={1}>
    <CardBody>
      <Text
        fontSize="xs"
        color="gray.800"
        textTransform="uppercase"
        letterSpacing="wide"
      >
        {label}
      </Text>
      <Text fontSize="2xl" fontWeight="bold" color={`${color}.700`} mt={2}>
        {value}
      </Text>
    </CardBody>
  </Card>
);

/* ============================
   WARNING CARD
   ============================ */
const WarningCard = ({ warning }) => {
  const severityColor =
    {
      critical: "red",
      high: "orange",
      medium: "yellow",
      low: "blue",
    }[warning.severity] || "gray";

  return (
    <Box
      borderLeftWidth={4}
      borderLeftColor={`${severityColor}.500`}
      pl={4}
      py={3}
      bg={`${severityColor}.50`}
      rounded="md"
    >
      <Text fontWeight="bold" color={`${severityColor}.700`} mb={2}>
        {warning.title}
      </Text>
      <Text fontSize="sm" mb={3}>
        {warning.message}
      </Text>
      {warning.actionItems && (
        <VStack spacing={1} align="stretch">
          {warning.actionItems.map((item, idx) => (
            <Text key={idx} fontSize="xs" color="gray.700">
              • {item}
            </Text>
          ))}
        </VStack>
      )}
    </Box>
  );
};

/* ============================
   SECTOR BAR
   ============================ */
const SectorBar = ({ sector }) => {
  const getColor = (value) => {
    if (value > 40) return "red";
    if (value > 30) return "orange";
    if (value > 20) return "yellow";
    return "green";
  };

  return (
    <Box>
      <HStack justify="space-between" mb={1}>
        <Text fontWeight="medium" fontSize="sm">
          {sector.name}
        </Text>
        <Text
          fontSize="sm"
          fontWeight="bold"
          color={`${getColor(sector.value)}.600`}
        >
          {sector.value}%
        </Text>
      </HStack>
      <Progress
        value={sector.value}
        colorScheme={getColor(sector.value)}
        size="sm"
        rounded="full"
      />
    </Box>
  );
};

/* ============================
   SCENARIO BOX
   ============================ */
const ScenarioBox = ({ scenario, status }) => (
  <Card borderTopWidth={4} borderTopColor={`${status}.500`}>
    <CardBody>
      <Text fontWeight="bold" fontSize="sm" mb={2}>
        {scenario.description}
      </Text>
      <Text fontSize="2xl" fontWeight="bold" color={`${status}.600`} mb={2}>
        {scenario.impact}
      </Text>
      <Text fontSize="xs" color="gray.600">
        <strong>Mitigation:</strong> {scenario.mitigation}
      </Text>
    </CardBody>
  </Card>
);




// const AIInsights = () => {
//   const [userType, setUserType] = useState(null);
//   const [answers, setAnswers] = useState({
//     hasInsurance: "",
//     hasEmergencyFund: "",
//     monthlyInvestment: "",
//     riskAppetite: "",
//     investmentHorizon: "",
//   });

//   const [portfolioData, setPortfolioData] = useState(null);
//   const [analysisResult, setAnalysisResult] = useState(null);
//   const [insights, setInsights] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const warningBg = useColorModeValue("red.50", "red.900");
//   const successBg = useColorModeValue("green.50", "green.900");
//   const infoBg = useColorModeValue("blue.50", "blue.900");
// }
  /* ============================
   EXISTING USER INSIGHTS
   ============================ */
const ExistingUserInsights = ({ insights }) => (
  <VStack spacing={8} align="stretch">
    {/* Portfolio Health */}
    <Card variant="outline" borderColor="blue.100" bg="blue.50">
      <CardBody p={8}>
        <Heading size="md" mb={4} color="blue.900">Portfolio Health Summary</Heading>
        <Text color="blue.800" lineHeight="tall">{insights.portfolioHealth}</Text>
      </CardBody>
    </Card>

    {/* Risk Warnings */}
    {insights.riskWarnings && insights.riskWarnings.length > 0 && (
      <Card borderLeftWidth={4} borderLeftColor="red.500">
        <CardBody p={8}>
          <Heading size="md" mb={6}>Risk Analysis</Heading>
          <VStack spacing={4} align="stretch">
            {insights.riskWarnings.map((warning, idx) => (
              <Box key={idx} p={4} bg="red.50" borderRadius="xl">
                <Text fontWeight="bold" color="red.700" mb={1}>{warning.title}</Text>
                <Text fontSize="sm" color="gray.700">{warning.message}</Text>
              </Box>
            ))}
          </VStack>
        </CardBody>
      </Card>
    )}

    {/* Fund Recommendations */}
    {insights.fundRecommendations && (
      <Card borderLeftWidth={4} borderLeftColor="cyan.500">
        <CardBody p={8}>
          <Heading size="md" mb={6}>Strategic Rebalancing</Heading>
          <Text mb={6} fontSize="lg">{insights.fundRecommendations}</Text>
          {insights.fundRecommendationsDetail && insights.fundRecommendationsDetail.length > 0 && (
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
              {insights.fundRecommendationsDetail.map((rec, idx) => (
                <Box key={idx} p={6} border="1px" borderColor="gray.100" borderRadius="2xl" bg="white">
                  <Badge colorScheme="cyan" mb={3}>{rec.fundType}</Badge>
                  <Heading size="sm" mb={2}>{rec.sector}</Heading>
                  <Text fontSize="sm" mb={3}><strong>Rec:</strong> {rec.recommendation}</Text>
                  <Text fontSize="sm" color="gray.500"><strong>Why:</strong> {rec.rationale}</Text>
                </Box>
              ))}
            </SimpleGrid>
          )}
        </CardBody>
      </Card>
    )}

    {/* Adjustments */}
    {insights.suggestedAdjustments && (
      <Card bg="white" color="black">
        <CardBody p={8}>
          <Heading size="md" mb={4} color="black">Next Steps & Action Plan</Heading>
          <Text opacity={0.9} lineHeight="tall">{insights.suggestedAdjustments}</Text>
        </CardBody>
      </Card>
    )}

    {/* Disclaimer */}
    <Alert status="info" borderRadius="2xl" variant="subtle">
      <AlertIcon />
      <Box>
        <Text fontWeight="bold" mb={1}>AI Disclaimer</Text>
        <Text fontSize="xs">Suggestive analysis based on current holdings. Consult a professional advisor before investing.</Text>
      </Box>
    </Alert>
  </VStack>
);

/* ============================
   NEW USER INSIGHTS
   ============================ */
const NewUserInsights = ({ insights }) => (
  <VStack spacing={8} align="stretch">
    <Card variant="outline" borderColor="green.100" bg="green.50">
      <CardBody p={8}>
        <Heading size="md" mb={4} color="green.900">Financial Readiness Assessment</Heading>
        <Text color="green.800" lineHeight="tall">{insights.financialReadiness}</Text>
      </CardBody>
    </Card>

    {insights.priorityChecklist && (
      <Card>
        <CardBody p={8}>
          <Heading size="md" mb={6}>✓ Priority Checklist</Heading>
          <VStack spacing={4} align="stretch">
            {insights.priorityChecklist?.map((item, idx) => (
              <HStack key={idx} align="start" spacing={3}>
                <CheckCircleIcon color="green.500" mt={1} />
                <Text fontWeight="600">{item}</Text>
              </HStack>
            ))}
          </VStack>
        </CardBody>
      </Card>
    )}

    {insights.investmentGuidance && (
      <Card borderLeftWidth={4} borderLeftColor="blue.500">
        <CardBody p={8}>
          <Heading size="md" mb={4}>Strategic Investment Guidance</Heading>
          <Text lineHeight="tall">{insights.investmentGuidance}</Text>
        </CardBody>
      </Card>
    )}

    {insights.nextSteps && (
      <Card bg="gray.900" color="white">
        <CardBody p={8}>
          <Heading size="md" mb={4} color="white">📋 Your Personalized Action Plan</Heading>
          <Text lineHeight="tall" opacity={0.9}>{insights.nextSteps}</Text>
        </CardBody>
      </Card>
    )}
  </VStack>
);

/* ============================
   PORTFOLIO ANALYSIS DISPLAY
   ============================ */
const PortfolioAnalysisDisplay = ({ analysis }) => {
  if (!analysis) return null;

  const { summary, sectorAnalysis, companyAnalysis, warnings } = analysis;

  return (
    <VStack spacing={6} align="stretch">
      {/* SUMMARY CARDS */}
      <SimpleGrid columns={{ base: 1, md: 4 }} spacing={4}>
        <StatCard
          label="Total Investment"
          value={`₹${(summary.totalInvestment / 100000).toFixed(2)}L`}
          color="blue"
        />
        <StatCard label="Funds" value={summary.fundCount} color="purple" />
        <StatCard
          label="Diversification Score"
          value={`${summary.diversificationScore}%`}
          color={
            summary.diversificationScore > 70
              ? "green"
              : summary.diversificationScore > 50
                ? "orange"
                : "red"
          }
        />
        <StatCard label="Risk Level" value={summary.riskLevel} color="red" />
      </SimpleGrid>

      {/* WARNINGS */}
      {warnings && warnings.length > 0 && (
        <Card borderColor="red.300" borderLeftWidth={4}>
          <CardHeader>
            <Heading size="md" color="red.600">
              Risk Alerts ({warnings.length})
            </Heading>
          </CardHeader>
          <CardBody>
            <VStack spacing={4} align="stretch">
              {warnings.map((warning, idx) => (
                <WarningCard key={idx} warning={warning} />
              ))}
            </VStack>
          </CardBody>
        </Card>
      )}

      {/* SECTOR ANALYSIS */}
      {sectorAnalysis && (
        <Card>
          <CardHeader>
            <Heading size="md">Sector-wise Distribution</Heading>
          </CardHeader>
          <CardBody>
            <VStack spacing={4} align="stretch">
              {sectorAnalysis.exposure?.map((sector, idx) => (
                <SectorBar key={idx} sector={sector} />
              ))}
            </VStack>
          </CardBody>
        </Card>
      )}

      {/* COMPANY ANALYSIS */}
      {companyAnalysis?.topHoldings && (
        <Card>
          <CardHeader>
            <Heading size="md">Top 10 Holdings</Heading>
          </CardHeader>
          <CardBody>
            <VStack spacing={3} align="stretch">
              {companyAnalysis.topHoldings.map((holding, idx) => (
                <HStack
                  key={idx}
                  justify="space-between"
                  borderBottomWidth={1}
                  pb={2}
                >
                  <Text fontWeight="medium">{holding.name}</Text>
                  <Badge
                    colorScheme={holding.percentage > 10 ? "red" : "green"}
                  >
                    {holding.percentage}%
                  </Badge>
                </HStack>
              ))}
            </VStack>
          </CardBody>
        </Card>
      )}
    </VStack>
  );
};



const AIInsights = () => {
  const [userType, setUserType] = useState(null);
  const [answers, setAnswers] = useState({
    hasInsurance: "",
    hasEmergencyFund: "",
    monthlyInvestment: "",
    riskAppetite: "",
    investmentHorizon: "",
  });

  const [portfolioData, setPortfolioData] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const warningBg = useColorModeValue("red.50", "red.900");
  const successBg = useColorModeValue("green.50", "green.900");
  const infoBg = useColorModeValue("blue.50", "blue.900");

  /* ============================
     FETCH PORTFOLIO (EXISTING USER)
     ============================ */
  useEffect(() => {
    if (userType === "existing") {
      setLoading(true);
      api
        .get("/portfolio/analyze")
        .then((res) => {
          setPortfolioData(res.data);
          setError("");
        })
        .catch((err) => {
          setPortfolioData(null);
          setError("Failed to fetch portfolio data. Please try again.");
        })
        .finally(() => setLoading(false));
    }
  }, [userType]);

  /* ============================
     ANALYZE PORTFOLIO
     ============================ */
  const analyzePortfolio = async () => {
    setLoading(true);
    setError("");
    setAnalysisResult(null);
    setInsights(null);

    try {
      // Get AI insights with analysis
      // Backend will fetch funds and perform detailed analysis automatically
      const aiRes = await api.post(
        "/ai/insights",
        {
          userType: "existing",
        },
        {
          timeout: 20000,
        },
      );

      console.log("AI Insights:", aiRes.data);
      setInsights(aiRes.data);
    } catch (err) {
      console.error("Error:", err);
      setError(
        err?.response?.data?.message ||
          "Unable to analyze portfolio. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  /* ============================
     GENERATE NEW INVESTOR INSIGHTS
     ============================ */
  const generateNewInvestorInsights = async () => {
    setLoading(true);
    setError("");
    setInsights(null);

    try {
      const res = await api.post(
        "/ai/insights",
        {
          userType: "new",
          answers,
        },
        {
          timeout: 20000,
        },
      );

      setInsights(res.data);
    } catch (err) {
      console.error("AI Insights error:", err);
      setError(
        err?.response?.data?.message ||
          "Unable to generate insights. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  /* ============================
     VALIDATION
     ============================ */
  const isNewUserReady =
    answers.hasInsurance &&
    answers.hasEmergencyFund &&
    answers.monthlyInvestment &&
    answers.riskAppetite &&
    answers.investmentHorizon;

  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={8} align="stretch">
        {/* ERROR MESSAGE */}
        {error && (
          <Alert status="error" variant="left-accent">
            <AlertIcon />
            <Box>
              <Text fontWeight="bold">Error</Text>
              <Text fontSize="sm">{error}</Text>
            </Box>
          </Alert>
        )}

        {/* ============================
            STEP 1 – USER TYPE
           ============================ */}
        {/* ============================
            STEP 1 – USER TYPE
           ============================ */}
        {!userType && (
          <Card>
            <CardBody textAlign="center" py={16} px={8}>
              <VStack spacing={8}>
                <Box>
                  <Heading size="xl" mb={3} letterSpacing="tight">Portfolio Intelligence</Heading>
                  <Text fontSize="lg" color="gray.600">
                    Get deep AI-driven insights into your mutual fund investments.
                  </Text>
                </Box>
                
                <VStack spacing={4} w="full" maxW="md">
                  <Button
                    size="lg"
                    colorScheme="brand"
                    h="72px"
                    w="full"
                    fontSize="md"
                    onClick={() => setUserType("existing")}
                    leftIcon={<InfoIcon />}
                    color="white"
                  >
                    Yes, Analyze My Portfolio
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    h="72px"
                    w="full"
                    fontSize="md"
                    onClick={() => setUserType("new")}
                    bg="gray.50"
                    color="black"
                  >
                    No, I'm New to Investing
                  </Button>
                </VStack>
              </VStack>
            </CardBody>
          </Card>
        )}

        {/* ============================
            NEW INVESTOR FORM
           ============================ */}
        {userType === "new" && !insights && (
          <Card>
            <CardBody p={{ base: 6, md: 10 }}>
              <VStack spacing={10} align="stretch">
                <Box>
                  <Heading size="lg" mb={2} letterSpacing="tight">
                    Investment Foundation
                  </Heading>
                  <Text color="gray.500">
                    Provide your financial details to receive personalized AI-driven guidance.
                  </Text>
                </Box>
                
                <SimpleGrid columns={{ base: 1, md: 2 }} gap={10} alignItems="start">
                  <VStack align="stretch" spacing={6}>
                    <Box>
                      <Text fontWeight="700" fontSize="sm" mb={3} color="gray.700">Insurance Coverage</Text>
                      <Select
                        placeholder="Select status"
                        value={answers.hasInsurance}
                        onChange={(e) => setAnswers({ ...answers, hasInsurance: e.target.value })}
                        size="md"
                        bg="white"
                      >
                        <option value="Yes, I have both Health and Life Insurance">Both Health and Life Insurance</option>
                        <option value="Yes, I have Health Insurance">Health Insurance Only</option>
                        <option value="Yes, I have Life Insurance">Life Insurance Only</option>
                        <option value="no">None</option>
                      </Select>
                    </Box>

                    <Box>
                      <Text fontWeight="700" fontSize="sm" mb={3} color="gray.700">Financial Safety Net</Text>
                      <Select
                        placeholder="Emergency fund status"
                        value={answers.hasEmergencyFund}
                        onChange={(e) => setAnswers({ ...answers, hasEmergencyFund: e.target.value })}
                        size="md"
                        bg="white"
                      >
                        <option value="yes">Yes (6+ months savings)</option>
                        <option value="no">No, still building</option>
                      </Select>
                    </Box>

                    <Box>
                      <Text fontWeight="700" fontSize="sm" mb={3} color="gray.700">Risk Profile</Text>
                      <Select
                        placeholder="Choose risk level"
                        value={answers.riskAppetite}
                        onChange={(e) => setAnswers({ ...answers, riskAppetite: e.target.value })}
                        size="md"
                        bg="white"
                      >
                        <option value="low">Low - Prefer stability</option>
                        <option value="moderate">Moderate - Balanced</option>
                        <option value="high">High - Growth focus</option>
                      </Select>
                    </Box>
                  </VStack>

                  <VStack align="stretch" spacing={6}>
                    <Box>
                      <Text fontWeight="700" fontSize="sm" mb={3} color="gray.700">Monthly Investment Budget</Text>
                      <Input
                        type="number"
                        placeholder="Amount in ₹"
                        value={answers.monthlyInvestment}
                        onChange={(e) => setAnswers({ ...answers, monthlyInvestment: e.target.value })}
                        size="md"
                        bg="white"
                      />
                    </Box>

                    <Box>
                      <Text fontWeight="700" fontSize="sm" mb={3} color="gray.700">Time Horizon</Text>
                      <Select
                        placeholder="How long will you invest?"
                        value={answers.investmentHorizon}
                        onChange={(e) => setAnswers({ ...answers, investmentHorizon: e.target.value })}
                        size="md"
                        bg="white"
                      >
                        <option value="short-term">Short term (1-3 years)</option>
                        <option value="medium-term">Medium term (3-7 years)</option>
                        <option value="long-term">Long term (7+ years)</option>
                      </Select>
                    </Box>

                    <Box pt={8}>
                      <Button
                        size="lg"
                        h="14"
                        onClick={generateNewInvestorInsights}
                        isDisabled={!isNewUserReady || loading}
                        width="full"
                        colorScheme="brand"
                        fontSize="md"
                      >
                        {loading ? <Spinner size="sm" mr={2} /> : null}
                        Get Strategic Advice
                      </Button>
                    </Box>
                  </VStack>
                </SimpleGrid>

                {!isNewUserReady && (
                  <Alert variant="subtle" status="info" borderRadius="2xl">
                    <AlertIcon />
                    Complete all fields to unlock your personalized AI investment strategy.
                  </Alert>
                )}
              </VStack>
            </CardBody>
          </Card>
        )}

        {/* ============================
            EXISTING INVESTOR CTA
           ============================ */}
        {userType === "existing" && !analysisResult && !insights && (
          <Card>
            <CardBody p={10}>
              <VStack spacing={10} align="stretch">
                <Box>
                  <Heading size="lg" mb={2} letterSpacing="tight">Portfolio Deep-Dive</Heading>
                  <Text color="gray.500">Uncover hidden risks and optimize your current mutual fund holdings.</Text>
                </Box>

                <SimpleGrid columns={{ base: 1, md: 2 }} gap={10}>
                  <Box>
                    <Heading size="sm" mb={6}>What we analyze:</Heading>
                    <List spacing={4}>
                      <ListItem>
                        <HStack align="start">
                          <ListIcon as={CheckCircleIcon} color="brand.500" mt={1} />
                          <Box>
                            <Text fontWeight="700">Sector Congestion</Text>
                            <Text fontSize="sm" color="gray.500">Identify if too many funds are bet on the same industry.</Text>
                          </Box>
                        </HStack>
                      </ListItem>
                      <ListItem>
                        <HStack align="start">
                          <ListIcon as={CheckCircleIcon} color="brand.500" mt={1} />
                          <Box>
                            <Text fontWeight="700">Stock Overlap</Text>
                            <Text fontSize="sm" color="gray.500">See if you hold same companies across multiple funds.</Text>
                          </Box>
                        </HStack>
                      </ListItem>
                      <ListItem>
                        <HStack align="start">
                          <ListIcon as={CheckCircleIcon} color="brand.500" mt={1} />
                          <Box>
                            <Text fontWeight="700">Risk Assessment</Text>
                            <Text fontSize="sm" color="gray.500">Analyze performance headwinds from sector-specific volatility.</Text>
                          </Box>
                        </HStack>
                      </ListItem>
                    </List>
                  </Box>

                  <VStack justify="center" p={8} bg="gray.50" borderRadius="2xl" border="1px" borderColor="gray.100">
                    <Button
                      colorScheme="brand"
                      size="lg"
                      h="72px"
                      w="full"
                      onClick={analyzePortfolio}
                      isDisabled={!portfolioData || loading}
                      mb={4}
                      color="white"
                    >
                      {loading ? <Spinner size="sm" mr={2} /> : null}
                      Run Intelligence Analysis
                    </Button>
                    <Text fontSize="xs" color="gray.400" textAlign="center">
                      AI will process your portfolio structure based on your current holdings.
                    </Text>
                  </VStack>
                </SimpleGrid>
              </VStack>
            </CardBody>
          </Card>
        )}

        {/* ============================
            LOADING
           ============================ */}
        {loading && !analysisResult && !insights && (
          <Card>
            <CardBody textAlign="center" py={12}>
              <VStack spacing={4}>
                <Spinner size="xl" color="brand.500" />
                <Text>Analyzing your portfolio and generating insights...</Text>
              </VStack>
            </CardBody>
          </Card>
        )}

        {/* ============================
            EXISTING USER ANALYSIS RESULTS
           ============================ */}
        {userType === "existing" && analysisResult && (
          <PortfolioAnalysisDisplay analysis={analysisResult} />
        )}

        {/* ============================
            AI INSIGHTS - EXISTING USER
           ============================ */}
        {userType === "existing" && insights && (
          <ExistingUserInsights insights={insights} />
        )}

        {/* ============================
            AI INSIGHTS - NEW USER
           ============================ */}
        {userType === "new" && insights && (
          <NewUserInsights insights={insights} />
        )}
      </VStack>
    </Container>
  );
};

export default AIInsights