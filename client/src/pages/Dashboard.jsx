import React, { useState, useEffect } from 'react'
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
  Icon
} from '@chakra-ui/react'
import { FiTrendingUp, FiActivity, FiPieChart, FiShield } from 'react-icons/fi'
import { DeleteIcon, AddIcon, CloseIcon } from '@chakra-ui/icons'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import api from '../services/api.js'
import { color } from 'framer-motion'

const Dashboard = () => {
  const [funds, setFunds] = useState([])
  const [newFund, setNewFund] = useState({ name: '', amount: '' })
  const [portfolioData, setPortfolioData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)

  const toast = useToast()
  const cardBg = useColorModeValue('black', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const inputBg = useColorModeValue('black', 'gray.700')
  const textColor = useColorModeValue('gray.700', 'gray.300')
  const statBg = useColorModeValue('gray.50', 'gray.700')

  const COLORS = ['#e94560', '#00bfa5', '#0f3460', '#ff6b6b', '#ffc107', '#6c757d', '#1e90ff', '#ff1493', '#00ced1', '#ff8c00', '#32cd32', '#9932cc', '#dc143c', '#8b4513', '#00fa9a']

  useEffect(() => {
    fetchFunds()
    fetchPortfolioData()
  }, [])

  const fetchFunds = async () => {
    try {
      const response = await api.get('/funds')
      setFunds(response.data.funds || [])
    } catch (err) {
      console.error('Error fetching funds:', err)
    }
  }

  const fetchPortfolioData = async () => {
    setLoading(true)
    try {
      const response = await api.get('/portfolio/analyze')
      setPortfolioData(response.data)
    } finally {
      setLoading(false)
    }
  }

  const handleAddFund = async (e) => {
    e.preventDefault()
    try {
      await api.post('/funds', newFund)
      setNewFund({ name: '', amount: '' })
      setShowAddForm(false)
      fetchFunds()

      toast({
        title: 'Fund Added Successfully',
        description: `${newFund.name} has been added to your portfolio.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (err) {
      setError('Failed to add fund')
      toast({
        title: 'Error Adding Fund',
        description: 'Failed to add fund. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const handleDeleteFund = async (fundId, fundName) => {
    try {
      await api.delete(`/funds/${fundId}`)
      fetchFunds()
      fetchPortfolioData()
      toast({
        title: 'Fund Removed',
        description: `${fundName} has been removed from your portfolio.`,
        status: 'info',
        duration: 3000,
        isClosable: true,
      })
    } catch (err) {
      setError('Failed to delete fund')
      toast({
        title: 'Error Removing Fund',
        description: 'Failed to remove fund. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const totalInvestment = funds.reduce((sum, fund) => sum + fund.amount, 0)

  if (loading && !portfolioData) {
    return (
      <Container maxW="container.xl" py={12}>
        <VStack spacing={4}>
          <Spinner size="xl" color="brand.500" />
          <Text fontSize="lg" color={textColor}>Analyzing your portfolio...</Text>
        </VStack>
      </Container>
    )
  }

const json_data = {
  largeCap: {
    generated_on: "2026-02-07",
    funds: [
      {
        fund_name: "HDFC Top 100 Fund",
        fund_identifier: "",
        as_of_date: "2025-07-31",
        data_source_urls: ["https://files.hdfcfund.com/s3fs-public/Others/2025-08/Fund%20Facts%20-%20HDFC%20Large%20Cap%20Fund_August%2025.pdf"],
        top_holdings: [
          {rank: 1, ticker: "HDFCBANK", company_name: "HDFC Bank Ltd", sector: "Financials", allocation_percent: 10.13},
          {rank: 2, ticker: "ICICIBANK", company_name: "ICICI Bank Ltd", sector: "Financials", allocation_percent: 10.11},
          {rank: 3, ticker: "BHARTIARTL", company_name: "Bharti Airtel Ltd", sector: "Telecommunications", allocation_percent: 5.99},
          {rank: 4, ticker: "RELIANCE", company_name: "Reliance Industries Ltd", sector: "Energy", allocation_percent: 4.91},
          {rank: 5, ticker: "KOTAKBANK", company_name: "Kotak Mahindra Bank Ltd", sector: "Financials", allocation_percent: 3.81},
          {rank: 6, ticker: "NTPC", company_name: "NTPC Ltd", sector: "Utilities", allocation_percent: 3.73},
          {rank: 7, ticker: "INFY", company_name: "Infosys Ltd", sector: "Information Technology", allocation_percent: 3.41},
          {rank: 8, ticker: "AMBUJACEM", company_name: "Ambuja Cements Ltd", sector: "Materials", allocation_percent: 3.08},
          {rank: 9, ticker: "AXISBANK", company_name: "Axis Bank Ltd", sector: "Financials", allocation_percent: 3.00},
          {rank: 10, ticker: "TATAMOTORS", company_name: "Tata Motors Ltd", sector: "Consumer Discretionary", allocation_percent: 3.00}
        ],
        notes: "Top 10 equity holdings as of Jul-2025."
      },
      {
        fund_name: "ICICI Prudential Bluechip Fund",
        fund_identifier: "",
        as_of_date: "2025-02-28",
        data_source_urls: ["https://bsmedia.business-standard.com/_media/bs/data/general-file-upload/2025-04/Fund%20Review%20-%20ICICI%20Pru%20Bluechip.pdf"],
        top_holdings: [
          {rank: 1, ticker: "HDFCBANK", company_name: "HDFC Bank Ltd", sector: "Financials", allocation_percent: 9.98},
          {rank: 2, ticker: "ICICIBANK", company_name: "ICICI Bank Ltd", sector: "Financials", allocation_percent: 8.11},
          {rank: 3, ticker: "LT", company_name: "Larsen & Toubro Ltd", sector: "Industrials", allocation_percent: 6.18},
          {rank: 4, ticker: "RELIANCE", company_name: "Reliance Industries Ltd", sector: "Energy", allocation_percent: 4.67},
          {rank: 5, ticker: "BHARTIARTL", company_name: "Bharti Airtel Ltd", sector: "Telecommunications", allocation_percent: 4.67},
          {rank: 6, ticker: "INFY", company_name: "Infosys Ltd", sector: "Information Technology", allocation_percent: 4.65},
          {rank: 7, ticker: "MARUTI", company_name: "Maruti Suzuki India Ltd", sector: "Consumer Discretionary", allocation_percent: 4.61},
          {rank: 8, ticker: "AXISBANK", company_name: "Axis Bank Ltd", sector: "Financials", allocation_percent: 4.10},
          {rank: 9, ticker: "ULTRACEMCO", company_name: "UltraTech Cement Ltd", sector: "Materials", allocation_percent: 4.08},
          {rank: 10, ticker: "SUNPHARMA", company_name: "Sun Pharmaceuticals Industries Ltd", sector: "Healthcare", allocation_percent: 2.71}
        ],
        notes: "Top 10 equity holdings as of Feb-2025."
      },
      {
        fund_name: "SBI Bluechip Fund",
        fund_identifier: "",
        as_of_date: "2025-12-31",
        data_source_urls: ["https://mf.sbi/Portfolios/equity/Factsheet_SBI_Large_Cap_Fund_Dec2025.pdf"],
        top_holdings: [
          {rank: 1, ticker: "HDFCBANK", company_name: "HDFC Bank Ltd", sector: "Financials", allocation_percent: 7.22},
          {rank: 2, ticker: "ICICIBANK", company_name: "ICICI Bank Ltd", sector: "Financials", allocation_percent: 6.97},
          {rank: 3, ticker: "RELIANCE", company_name: "Reliance Industries Ltd", sector: "Energy", allocation_percent: 6.89},
          {rank: 4, ticker: "LT", company_name: "Larsen & Toubro Ltd", sector: "Industrials", allocation_percent: 5.41},
          {rank: 5, ticker: "ASIANPAINT", company_name: "Asian Paints Ltd", sector: "Materials", allocation_percent: 4.11},
          {rank: 6, ticker: "INFY", company_name: "Infosys Ltd", sector: "Information Technology", allocation_percent: 3.88},
          {rank: 7, ticker: "KOTAKBANK", company_name: "Kotak Mahindra Bank Ltd", sector: "Financials", allocation_percent: 3.62},
          {rank: 8, ticker: "SBIN", company_name: "State Bank of India", sector: "Financials", allocation_percent: 3.36},
          {rank: 9, ticker: "DIVISLAB", company_name: "Divi's Laboratories Ltd", sector: "Healthcare", allocation_percent: 3.13},
          {rank: 10, ticker: "AXISBANK", company_name: "Axis Bank Ltd", sector: "Financials", allocation_percent: 3.12}
        ],
        notes: "Top 10 equity holdings as of Dec-2025."
      },
      {
        fund_name: "Axis Bluechip Fund",
        fund_identifier: "",
        as_of_date: "2025-12-31",
        data_source_urls: ["https://www.axismf.com/cms/sites/default/files/pdf-factsheets/Axis%20Large%20Cap.pdf"],
        top_holdings: [
          {rank: 1, ticker: "HDFCBANK", company_name: "HDFC Bank Ltd", sector: "Financials", allocation_percent: 9.58},
          {rank: 2, ticker: "ICICIBANK", company_name: "ICICI Bank Ltd", sector: "Financials", allocation_percent: 7.96},
          {rank: 3, ticker: "RELIANCE", company_name: "Reliance Industries Ltd", sector: "Energy", allocation_percent: 7.85},
          {rank: 4, ticker: "INFY", company_name: "Infosys Ltd", sector: "Information Technology", allocation_percent: 5.41},
          {rank: 5, ticker: "BHARTIARTL", company_name: "Bharti Airtel Ltd", sector: "Telecommunications", allocation_percent: 5.19},
          {rank: 6, ticker: "LT", company_name: "Larsen & Toubro Ltd", sector: "Industrials", allocation_percent: 5.11},
          {rank: 7, ticker: "BAJFINANCE", company_name: "Bajaj Finance Ltd", sector: "Financials", allocation_percent: 3.84},
          {rank: 8, ticker: "SBIN", company_name: "State Bank of India", sector: "Financials", allocation_percent: 3.80},
          {rank: 9, ticker: "MAHINDRA&Mahindra", company_name: "Mahindra & Mahindra Ltd", sector: "Consumer Discretionary", allocation_percent: 3.58},
          {rank: 10, ticker: "KOTAKBANK", company_name: "Kotak Mahindra Bank Ltd", sector: "Financials", allocation_percent: 3.05}
        ],
        notes: "Top 10 equity holdings as of Dec-2025."
      },
      {
        fund_name: "Mirae Asset Large Cap Fund",
        fund_identifier: "",
        as_of_date: "2025-04-30",
        data_source_urls: ["https://www.miraeassetmf.co.in/docs/default-source/fachsheet/active-factsheet---may-2025.pdf"],
        top_holdings: [
          {rank: 1, ticker: "HDFCBANK", company_name: "HDFC Bank Ltd", sector: "Financials", allocation_percent: 9.84},
          {rank: 2, ticker: "ICICIBANK", company_name: "ICICI Bank Ltd", sector: "Financials", allocation_percent: 7.93},
          {rank: 3, ticker: "INFY", company_name: "Infosys Ltd", sector: "Information Technology", allocation_percent: 5.24},
          {rank: 4, ticker: "RELIANCE", company_name: "Reliance Industries Ltd", sector: "Energy", allocation_percent: 5.15},
          {rank: 5, ticker: "AXISBANK", company_name: "Axis Bank Ltd", sector: "Financials", allocation_percent: 4.14},
          {rank: 6, ticker: "BHARTIARTL", company_name: "Bharti Airtel Ltd", sector: "Telecommunications", allocation_percent: 4.13},
          {rank: 7, ticker: "TCS", company_name: "Tata Consultancy Services Ltd", sector: "Information Technology", allocation_percent: 4.06},
          {rank: 8, ticker: "LT", company_name: "Larsen & Toubro Ltd", sector: "Industrials", allocation_percent: 3.31},
          {rank: 9, ticker: "ITC", company_name: "ITC Ltd", sector: "Consumer Staples", allocation_percent: 2.85},
          {rank: 10, ticker: "KOTAKBANK", company_name: "Kotak Mahindra Bank Ltd", sector: "Financials", allocation_percent: 2.45}
        ],
        notes: "Top 10 equity holdings as of Apr-2025."
      },
      {
        fund_name: "Kotak Bluechip Fund",
        fund_identifier: "",
        as_of_date: "2025-04-30",
        data_source_urls: ["https://www.kotakmf.com/factsheet/May_2025/kotak/BLUECHIP.html"],
        top_holdings: [
          {rank: 1, ticker: "ICICIBANK", company_name: "ICICI Bank Ltd", sector: "Financials", allocation_percent: 7.65},
          {rank: 2, ticker: "HDFCBANK", company_name: "HDFC Bank Ltd", sector: "Financials", allocation_percent: 7.13},
          {rank: 3, ticker: "RELIANCE", company_name: "Reliance Industries Ltd", sector: "Energy", allocation_percent: 6.48},
          {rank: 4, ticker: "INFY", company_name: "Infosys Ltd", sector: "Information Technology", allocation_percent: 4.29},
          {rank: 5, ticker: "BHARTIARTL", company_name: "Bharti Airtel Ltd", sector: "Telecommunications", allocation_percent: 3.50},
          {rank: 6, ticker: "AXISBANK", company_name: "Axis Bank Ltd", sector: "Financials", allocation_percent: 3.18},
          {rank: 7, ticker: "SBIN", company_name: "State Bank of India", sector: "Financials", allocation_percent: 3.08},
          {rank: 8, ticker: "MAHINDRA&Mahindra", company_name: "Mahindra & Mahindra Ltd", sector: "Consumer Discretionary", allocation_percent: 3.06},
          {rank: 9, ticker: "ITC", company_name: "ITC Ltd", sector: "Consumer Staples", allocation_percent: 2.77},
          {rank: 10, ticker: "SUNPHARMA", company_name: "Sun Pharmaceuticals Industries Ltd", sector: "Healthcare", allocation_percent: 2.56}
        ],
        notes: "Top 10 equity holdings as of Apr-2025."
      },
      {
        fund_name: "Nippon India Large Cap Fund",
        fund_identifier: "",
        as_of_date: "2025-04-30",
        data_source_urls: ["https://mf.nipponindiaim.com/FundsAndPerformance/ProductNotes/NipponIndia-Large-Cap-Fund-Apr-2025.pdf"],
        top_holdings: [
          {rank: 1, ticker: "HDFCBANK", company_name: "HDFC Bank Ltd", sector: "Financials", allocation_percent: 9.00},
          {rank: 2, ticker: "RELIANCE", company_name: "Reliance Industries Ltd", sector: "Energy", allocation_percent: 7.45},
          {rank: 3, ticker: "ICICIBANK", company_name: "ICICI Bank Ltd", sector: "Financials", allocation_percent: 6.11},
          {rank: 4, ticker: "AXISBANK", company_name: "Axis Bank Ltd", sector: "Financials", allocation_percent: 4.92},
          {rank: 5, ticker: "LT", company_name: "Larsen & Toubro Ltd", sector: "Industrials", allocation_percent: 3.71},
          {rank: 6, ticker: "SBIN", company_name: "State Bank of India", sector: "Financials", allocation_percent: 3.52},
          {rank: 7, ticker: "BAJFINANCE", company_name: "Bajaj Finance Ltd", sector: "Financials", allocation_percent: 3.39},
          {rank: 8, ticker: "INFY", company_name: "Infosys Ltd", sector: "Information Technology", allocation_percent: 2.57},
          {rank: 9, ticker: "NTPC", company_name: "NTPC Ltd", sector: "Utilities", allocation_percent: 2.56},
          {rank: 10, ticker: "TATAPOWER", company_name: "Tata Power Co Ltd", sector: "Utilities", allocation_percent: 2.18}
        ],
        notes: "Top 10 equity holdings as of Apr-2025."
      },
      {
        fund_name: "UTI Mastershare Unit Scheme",
        fund_identifier: "",
        as_of_date: "2025-07-08",
        data_source_urls: ["https://www.mysiponline.com/mutual-fund/portfolio-of-uti-mastershare-unit-scheme/equity-holdings"],
        top_holdings: [
          {rank: 1, ticker: "HDFCBANK", company_name: "HDFC Bank Ltd", sector: "Financials", allocation_percent: 9.77},
          {rank: 2, ticker: "ICICIBANK", company_name: "ICICI Bank Ltd", sector: "Financials", allocation_percent: 8.28},
          {rank: 3, ticker: "INFY", company_name: "Infosys Ltd", sector: "Information Technology", allocation_percent: 5.35},
          {rank: 4, ticker: "RELIANCE", company_name: "Reliance Industries Ltd", sector: "Energy", allocation_percent: 4.63},
          {rank: 5, ticker: "BHARTIARTL", company_name: "Bharti Airtel Ltd", sector: "Telecommunications", allocation_percent: 4.31},
          {rank: 6, ticker: "BAJFINANCE", company_name: "Bajaj Finance Ltd", sector: "Financials", allocation_percent: 4.07},
          {rank: 7, ticker: "KOTAKBANK", company_name: "Kotak Mahindra Bank Ltd", sector: "Financials", allocation_percent: 3.94},
          {rank: 8, ticker: "DMART", company_name: "Avenue Supermarts Ltd", sector: "Consumer Discretionary", allocation_percent: 3.42},
          {rank: 9, ticker: "AXISBANK", company_name: "Axis Bank Ltd", sector: "Financials", allocation_percent: 3.37},
          {rank: 10, ticker: "LT", company_name: "Larsen & Toubro Ltd", sector: "Industrials", allocation_percent: 3.08}
        ],
        notes: "Top 10 equity holdings as of Jul-2025."
      },
      {
        fund_name: "Canara Robeco Bluechip Equity Fund",
        fund_identifier: "",
        as_of_date: "2025-08-29",
        data_source_urls: ["https://www.canararobeco.com/wp-content/uploads/2025/09/Canara-factsheet-as-on-August-2025.pdf"],
        top_holdings: [
          {rank: 1, ticker: "HDFCBANK", company_name: "HDFC Bank Ltd", sector: "Financials", allocation_percent: 9.41},
          {rank: 2, ticker: "ICICIBANK", company_name: "ICICI Bank Ltd", sector: "Financials", allocation_percent: 7.75},
          {rank: 3, ticker: "RELIANCE", company_name: "Reliance Industries Ltd", sector: "Energy", allocation_percent: 5.88},
          {rank: 4, ticker: "BHARTIARTL", company_name: "Bharti Airtel Ltd", sector: "Telecommunications", allocation_percent: 4.40},
          {rank: 5, ticker: "INFY", company_name: "Infosys Ltd", sector: "Information Technology", allocation_percent: 4.28},
          {rank: 6, ticker: "SBIN", company_name: "State Bank of India", sector: "Financials", allocation_percent: 4.13},
          {rank: 7, ticker: "LT", company_name: "Larsen & Toubro Ltd", sector: "Industrials", allocation_percent: 4.05},
          {rank: 8, ticker: "MAHINDRA&Mahindra", company_name: "Mahindra & Mahindra Ltd", sector: "Consumer Discretionary", allocation_percent: 3.55},
          {rank: 9, ticker: "BAJFINANCE", company_name: "Bajaj Finance Ltd", sector: "Financials", allocation_percent: 2.77},
          {rank: 10, ticker: "ITC", company_name: "ITC Ltd", sector: "Consumer Staples", allocation_percent: 2.59}
        ],
        notes: "Top 10 equity holdings as of Aug-2025."
      },
      {
        fund_name: "DSP Top 100 Equity Fund",
        fund_identifier: "",
        as_of_date: "",
        data_source_urls: [],
        top_holdings: [],
        notes: "Data not found."
      }
    ]
  },
  midCap: {
    generated_on: "2026-02-07",
    funds: [
      {
        fund_name: "Axis Midcap Fund",
        fund_identifier: "",
        as_of_date: "2025-09-30",
        data_source_urls: ["https://www.axismf.com/cms/sites/default/files/pdf-factsheets/20220727001-Axis%20Midcap%20Fund%20(October_2025)%20-%20DP.pdf"],
        top_holdings: [
          {rank: 1, ticker: "FEDERALBNK", company_name: "Federal Bank Ltd", sector: "Financials", allocation_percent: 4.10},
          {rank: 2, ticker: "COROMANDEL", company_name: "Coromandel International Ltd", sector: "Materials", allocation_percent: 2.70},
          {rank: 3, ticker: "SCHAEFFLER", company_name: "Schaeffler India Ltd", sector: "Industrials", allocation_percent: 2.50},
          {rank: 4, ticker: "DIXON", company_name: "Dixon Technologies (India) Ltd", sector: "Consumer Discretionary", allocation_percent: 2.50},
          {rank: 5, ticker: "BHARTIHEX", company_name: "Bharti Hexacom Ltd", sector: "Telecommunications", allocation_percent: 2.30},
          {rank: 6, ticker: "GEINDIA", company_name: "GE Vernova T&D India Ltd", sector: "Utilities", allocation_percent: 2.20},
          {rank: 7, ticker: "IHCL", company_name: "The Indian Hotels Company Ltd", sector: "Consumer Discretionary", allocation_percent: 2.10},
          {rank: 8, ticker: "JKCEMENT", company_name: "JK Cement Ltd", sector: "Materials", allocation_percent: 2.10},
          {rank: 9, ticker: "UNOMINDA", company_name: "UNO Minda Ltd", sector: "Consumer Discretionary", allocation_percent: 2.10},
          {rank: 10, ticker: "FORTIS", company_name: "Fortis Healthcare Ltd", sector: "Healthcare", allocation_percent: 2.00}
        ],
        notes: "Top 10 equity holdings as of Sep-2025."
      },
      {
        fund_name: "HDFC Mid-Cap Opportunities Fund",
        fund_identifier: "",
        as_of_date: "2025-06-30",
        data_source_urls: ["https://files.hdfcfund.com/s3fs-public/Others/2025-07/Fund%20Facts%20-%20HDFC%20Mid-Cap%20Fund_July%2025.pdf"],
        top_holdings: [
          {rank: 1, ticker: "MAX", company_name: "Max Financial Services Ltd", sector: "Financials", allocation_percent: 5.02},
          {rank: 2, ticker: "COFORGE", company_name: "Coforge Ltd", sector: "Information Technology", allocation_percent: 3.44},
          {rank: 3, ticker: "FEDERALBNK", company_name: "Federal Bank Ltd", sector: "Financials", allocation_percent: 3.24},
          {rank: 4, ticker: "AUBANK", company_name: "AU Small Finance Bank Ltd", sector: "Financials", allocation_percent: 2.97},
          {rank: 5, ticker: "HINDOIL", company_name: "Hindustan Petroleum Corp Ltd", sector: "Energy", allocation_percent: 2.89},
          {rank: 6, ticker: "INDIANB", company_name: "Indian Bank", sector: "Financials", allocation_percent: 2.82},
          {rank: 7, ticker: "IPCALAB", company_name: "Ipca Laboratories Ltd", sector: "Healthcare", allocation_percent: 2.80},
          {rank: 8, ticker: "BALKRISIND", company_name: "Balkrishna Industries Ltd", sector: "Industrials", allocation_percent: 2.76},
          {rank: 9, ticker: "FORTIS", company_name: "Fortis Healthcare Ltd", sector: "Healthcare", allocation_percent: 2.41},
          {rank: 10, ticker: "PERSISTENT", company_name: "Persistent Systems Ltd", sector: "Information Technology", allocation_percent: 2.40}
        ],
        notes: "Top 10 equity holdings as of Jun-2025."
      },
      {
        fund_name: "Kotak Emerging Equity Fund",
        fund_identifier: "",
        as_of_date: "2025-04-30",
        data_source_urls: ["https://www.kotakmf.com/factsheet/May_2025/kotak/EMERGING-EQUITY-SCHEME.html"],
        top_holdings: [
          {rank: 1, ticker: "SOLARINDS", company_name: "Solar Industries India Ltd", sector: "Materials", allocation_percent: 3.33},
          {rank: 2, ticker: "FORTIS", company_name: "Fortis Healthcare Ltd", sector: "Healthcare", allocation_percent: 3.27},
          {rank: 3, ticker: "IPCALAB", company_name: "Ipca Laboratories Ltd", sector: "Healthcare", allocation_percent: 3.03},
          {rank: 4, ticker: "MPHASIS", company_name: "Mphasis Ltd", sector: "Information Technology", allocation_percent: 2.99},
          {rank: 5, ticker: "GEINDIA", company_name: "GE Vernova T&D India Ltd", sector: "Utilities", allocation_percent: 2.97},
          {rank: 6, ticker: "DIXON", company_name: "Dixon Technologies (India) Ltd", sector: "Consumer Discretionary", allocation_percent: 2.65},
          {rank: 7, ticker: "OBEROIRLTY", company_name: "Oberoi Realty Ltd", sector: "Real Estate", allocation_percent: 2.62},
          {rank: 8, ticker: "JKCEMENT", company_name: "JK Cement Ltd", sector: "Materials", allocation_percent: 2.49},
          {rank: 9, ticker: "COROMANDEL", company_name: "Coromandel International Ltd", sector: "Materials", allocation_percent: 2.45},
          {rank: 10, ticker: "OFSS", company_name: "Oracle Financial Services Software Ltd", sector: "Information Technology", allocation_percent: 2.42}
        ],
        notes: "Top 10 equity holdings as of May-2025."
      },
      {
        fund_name: "Mirae Asset Midcap Fund",
        fund_identifier: "",
        as_of_date: "2025-11-28",
        data_source_urls: ["https://www.miraeassetmf.co.in/docs/default-source/fachsheet/active-factsheet---december-2025.pdf"],
        top_holdings: [
          {rank: 1, ticker: "LUPIN", company_name: "Lupin Ltd", sector: "Healthcare", allocation_percent: 3.21},
          {rank: 2, ticker: "FEDERALBNK", company_name: "Federal Bank Ltd", sector: "Financials", allocation_percent: 3.20},
          {rank: 3, ticker: "BHARATFORG", company_name: "Bharat Forge Ltd", sector: "Industrials", allocation_percent: 3.04},
          {rank: 4, ticker: "DELHIVERY", company_name: "Delhivery Ltd", sector: "Industrials", allocation_percent: 2.85},
          {rank: 5, ticker: "HEROMOTOCO", company_name: "Hero MotoCorp Ltd", sector: "Consumer Discretionary", allocation_percent: 2.71},
          {rank: 6, ticker: "TATACOMM", company_name: "Tata Communications Ltd", sector: "Telecommunications", allocation_percent: 2.63},
          {rank: 7, ticker: "PRESTIGE", company_name: "Prestige Estates Projects Ltd", sector: "Real Estate", allocation_percent: 2.58},
          {rank: 8, ticker: "L&TFH", company_name: "L&T Finance Holdings Ltd", sector: "Financials", allocation_percent: 2.47},
          {rank: 9, ticker: "CUMMINSIND", company_name: "Cummins India Ltd", sector: "Industrials", allocation_percent: 2.41},
          {rank: 10, ticker: "INDUSINDBK", company_name: "IndusInd Bank Ltd", sector: "Financials", allocation_percent: 2.30}
        ],
        notes: "Top 10 equity holdings as of Nov-2025."
      },
      {
        fund_name: "PGIM India Midcap Opportunities Fund",
        fund_identifier: "",
        as_of_date: "2025-12-31",
        data_source_urls: ["https://mywealthgrowth.com/mutual-funds/portfolio-of-pgim-india-midcap-opportunities-fund/equity-holdings"],
        top_holdings: [
          {rank: 1, ticker: "UNOMINDA", company_name: "UNO Minda Ltd", sector: "Consumer Discretionary", allocation_percent: 2.78},
          {rank: 2, ticker: "MUTHOOTFIN", company_name: "Muthoot Finance Ltd", sector: "Financials", allocation_percent: 2.64},
          {rank: 3, ticker: "JKCEMENT", company_name: "JK Cement Ltd", sector: "Materials", allocation_percent: 2.47},
          {rank: 4, ticker: "MAX", company_name: "Max Financial Services Ltd", sector: "Financials", allocation_percent: 2.47},
          {rank: 5, ticker: "ZOMATO", company_name: "Zomato Ltd", sector: "Consumer Discretionary", allocation_percent: 2.25},
          {rank: 6, ticker: "DIXON", company_name: "Dixon Technologies (India) Ltd", sector: "Consumer Discretionary", allocation_percent: 2.18},
          {rank: 7, ticker: "PRESTIGE", company_name: "Prestige Estates Projects Ltd", sector: "Real Estate", allocation_percent: 2.09},
          {rank: 8, ticker: "TVSMOTOR", company_name: "TVS Motor Company Ltd", sector: "Consumer Discretionary", allocation_percent: 2.08},
          {rank: 9, ticker: "ABCAPITAL", company_name: "Aditya Birla Capital Ltd", sector: "Financials", allocation_percent: 2.04},
          {rank: 10, ticker: "MCX", company_name: "Multi Commodity Exchange of India Ltd", sector: "Financials", allocation_percent: 1.99}
        ],
        notes: "Top 10 equity holdings as of Dec-2025."
      },
      {
        fund_name: "Edelweiss Mid Cap Fund",
        fund_identifier: "",
        as_of_date: "2025-05-31",
        data_source_urls: ["https://www.edelweissmf.com/Files/downloads/Product%20Collateral/Factsheet/2025/Jun/published/Edelweiss_Mid_Cap_Fund_15062025_121723_PM.pdf"],
        top_holdings: [
          {rank: 1, ticker: "MAXHEALTH", company_name: "Max Healthcare Institute Ltd", sector: "Healthcare", allocation_percent: 3.35},
          {rank: 2, ticker: "COFORGE", company_name: "Coforge Ltd", sector: "Information Technology", allocation_percent: 3.25},
          {rank: 3, ticker: "PERSISTENT", company_name: "Persistent Systems Ltd", sector: "Information Technology", allocation_percent: 3.22},
          {rank: 4, ticker: "SOLARINDS", company_name: "Solar Industries India Ltd", sector: "Materials", allocation_percent: 3.18},
          {rank: 5, ticker: "MARICO", company_name: "Marico Ltd", sector: "Consumer Staples", allocation_percent: 2.89},
          {rank: 6, ticker: "PBFINT", company_name: "PB Fintech Ltd", sector: "Financials", allocation_percent: 2.33},
          {rank: 7, ticker: "PAGEIND", company_name: "Page Industries Ltd", sector: "Consumer Discretionary", allocation_percent: 2.32},
          {rank: 8, ticker: "CGPOWER", company_name: "CG Power and Industrial Solutions Ltd", sector: "Industrials", allocation_percent: 2.20},
          {rank: 9, ticker: "DIXON", company_name: "Dixon Technologies (India) Ltd", sector: "Consumer Discretionary", allocation_percent: 2.15},
          {rank: 10, ticker: "UNOMINDA", company_name: "UNO Minda Ltd", sector: "Consumer Discretionary", allocation_percent: 2.13}
        ],
        notes: "Top 10 equity holdings as of May-2025."
      }
    ]
  },
  hybrid: {
    generated_on: "2026-02-07",
    funds: [
      {
        fund_name: "HDFC Balanced Advantage Fund",
        fund_identifier: "118968",
        as_of_date: "2025-12-31",
        data_source_urls: ["https://files.hdfcfund.com/s3fs-public/Others/2026-02/Fund%20Facts%20-%20HDFC%20Balanced%20Advantage%20Fund_January%2026.pdf"],
        top_holdings: [
          {rank: 1, ticker: "HDFCBANK", company_name: "HDFC Bank Ltd.", sector: "Financials", allocation_percent: 4.53},
          {rank: 2, ticker: "ICICIBANK", company_name: "ICICI Bank Ltd.", sector: "Financials", allocation_percent: 4.00},
          {rank: 3, ticker: "RELIANCE", company_name: "Reliance Industries Ltd.", sector: "Energy", allocation_percent: 3.35},
          {rank: 4, ticker: "SBIN", company_name: "State Bank of India", sector: "Financials", allocation_percent: 3.18},
          {rank: 5, ticker: "BHARTIARTL", company_name: "Bharti Airtel Ltd.", sector: "Telecommunications", allocation_percent: 2.88},
          {rank: 6, ticker: "LT", company_name: "Larsen & Toubro Ltd.", sector: "Industrials", allocation_percent: 2.48},
          {rank: 7, ticker: "INFY", company_name: "Infosys Ltd.", sector: "Information Technology", allocation_percent: 2.43},
          {rank: 8, ticker: "AXISBANK", company_name: "Axis Bank Ltd.", sector: "Financials", allocation_percent: 2.33},
          {rank: 9, ticker: "NTPC", company_name: "NTPC Ltd.", sector: "Utilities", allocation_percent: 2.00},
          {rank: 10, ticker: "COALINDIA", company_name: "Coal India Ltd.", sector: "Energy", allocation_percent: 1.90}
        ],
        notes: "Only equity holdings included; sector labels per AMFI classification"
      },
      {
        fund_name: "ICICI Prudential Balanced Advantage Fund",
        fund_identifier: "117949",
        as_of_date: "2025-12-31",
        data_source_urls: ["https://digitalfactsheet.icicipruamc.com/fact/icici-prudential-balanced-advantage-fund.php"],
        top_holdings: [
          {rank: 1, ticker: "TVSMOTOR", company_name: "TVS Motor Company Ltd.", sector: "Consumer Discretionary", allocation_percent: 5.48},
          {rank: 2, ticker: "ICICIBANK", company_name: "ICICI Bank Ltd.", sector: "Financials", allocation_percent: 4.21},
          {rank: 3, ticker: "HDFCBANK", company_name: "HDFC Bank Ltd.", sector: "Financials", allocation_percent: 4.02},
          {rank: 4, ticker: "INFY", company_name: "Infosys Ltd.", sector: "Information Technology", allocation_percent: 3.58},
          {rank: 5, ticker: "RELIANCE", company_name: "Reliance Industries Ltd.", sector: "Energy", allocation_percent: 3.53},
          {rank: 6, ticker: "LT", company_name: "Larsen & Toubro Ltd.", sector: "Industrials", allocation_percent: 2.48},
          {rank: 7, ticker: "BHARTIARTL", company_name: "Bharti Airtel Ltd.", sector: "Telecommunications", allocation_percent: 2.20},
          {rank: 8, ticker: "MARUTI", company_name: "Maruti Suzuki India Ltd.", sector: "Consumer Discretionary", allocation_percent: 1.80},
          {rank: 9, ticker: "AXISBANK", company_name: "Axis Bank Ltd.", sector: "Financials", allocation_percent: 1.76},
          {rank: 10, ticker: "INDIGO", company_name: "InterGlobe Aviation Ltd.", sector: "Industrials", allocation_percent: 1.61}
        ],
        notes: "Only equity holdings included; sector labels per AMFI classification"
      },
      {
        fund_name: "Axis Balanced Advantage Fund",
        fund_identifier: "118014",
        as_of_date: "2025-12-31",
        data_source_urls: ["https://www.axismf.com/mutual-funds/hybrid-balance-funds/axis-balanced-advantage-fund/direct"],
        top_holdings: [
          {rank: 1, ticker: "HDFCBANK", company_name: "HDFC Bank Ltd.", sector: "Financials", allocation_percent: 5.22},
          {rank: 2, ticker: "RELIANCE", company_name: "Reliance Industries Ltd.", sector: "Energy", allocation_percent: 4.80},
          {rank: 3, ticker: "SBIN", company_name: "State Bank of India", sector: "Financials", allocation_percent: 4.08},
          {rank: 4, ticker: "SHRIRAMFIN", company_name: "Shriram Finance Ltd.", sector: "Financials", allocation_percent: 3.82},
          {rank: 5, ticker: "INFY", company_name: "Infosys Ltd.", sector: "Information Technology", allocation_percent: 3.66},
          {rank: 6, ticker: "ICICIBANK", company_name: "ICICI Bank Ltd.", sector: "Financials", allocation_percent: 3.53},
          {rank: 7, ticker: "LT", company_name: "Larsen & Toubro Ltd.", sector: "Industrials", allocation_percent: 2.66},
          {rank: 8, ticker: "MUTHOOTFIN", company_name: "Muthoot Finance Ltd.", sector: "Financials", allocation_percent: 2.44},
          {rank: 9, ticker: "M&M", company_name: "Mahindra & Mahindra Ltd.", sector: "Consumer Discretionary", allocation_percent: 1.98}
        ],
        notes: "Only 9 equities disclosed (excl. GOI bonds); sector labels per AMFI classification"
      },
      {
        fund_name: "Mirae Asset Large Cap Fund",
        fund_identifier: "INF769K01010",
        as_of_date: "2025-12-31",
        data_source_urls: ["https://www.miraeassetmf.co.in/funds/large-cap-fund"],
        top_holdings: [
          {rank: 1, ticker: "HDFCBANK", company_name: "HDFC Bank Ltd.", sector: "Financials", allocation_percent: 9.63},
          {rank: 2, ticker: "ICICIBANK", company_name: "ICICI Bank Ltd.", sector: "Financials", allocation_percent: 7.95},
          {rank: 3, ticker: "INFY", company_name: "Infosys Ltd.", sector: "Information Technology", allocation_percent: 5.33},
          {rank: 4, ticker: "RELIANCE", company_name: "Reliance Industries Ltd.", sector: "Energy", allocation_percent: 5.08},
          {rank: 5, ticker: "BHARTIARTL", company_name: "Bharti Airtel Ltd.", sector: "Telecommunications", allocation_percent: 4.32},
          {rank: 6, ticker: "ITC", company_name: "ITC Ltd.", sector: "Consumer Staples", allocation_percent: 4.21},
          {rank: 7, ticker: "LT", company_name: "Larsen & Toubro Ltd.", sector: "Industrials", allocation_percent: 3.72},
          {rank: 8, ticker: "TCS", company_name: "TCS Ltd.", sector: "Information Technology", allocation_percent: 3.54},
          {rank: 9, ticker: "AXISBANK", company_name: "Axis Bank Ltd.", sector: "Financials", allocation_percent: 3.24},
          {rank: 10, ticker: "SBIN", company_name: "State Bank of India", sector: "Financials", allocation_percent: 2.88}
        ],
        notes: "Only equity holdings included; sector labels per AMFI classification"
      },
      {
        fund_name: "Kotak Balanced Advantage Fund",
        fund_identifier: "INF174KA1186",
        as_of_date: "2025-12-31",
        data_source_urls: ["https://www.kotakmf.com/mutual-funds/hybrid-funds/kotak-balanced-advantage-fund"],
        top_holdings: [
          {rank: 1, ticker: "RELIANCE", company_name: "Reliance Industries Ltd.", sector: "Energy", allocation_percent: 3.99},
          {rank: 2, ticker: "ICICIBANK", company_name: "ICICI Bank Ltd.", sector: "Financials", allocation_percent: 3.88},
          {rank: 3, ticker: "HDFCBANK", company_name: "HDFC Bank Ltd.", sector: "Financials", allocation_percent: 3.53},
          {rank: 4, ticker: "SBIN", company_name: "State Bank of India", sector: "Financials", allocation_percent: 2.56},
          {rank: 5, ticker: "INFY", company_name: "Infosys Ltd.", sector: "Information Technology", allocation_percent: 2.44},
          {rank: 6, ticker: "BHARTIARTL", company_name: "Bharti Airtel Ltd.", sector: "Telecommunications", allocation_percent: 2.21},
          {rank: 7, ticker: "LT", company_name: "Larsen & Toubro Ltd.", sector: "Industrials", allocation_percent: 2.02},
          {rank: 8, ticker: "MPHASIS", company_name: "Mphasis Ltd.", sector: "Information Technology", allocation_percent: 1.81},
          {rank: 9, ticker: "M&M", company_name: "Mahindra & Mahindra Ltd.", sector: "Consumer Discretionary", allocation_percent: 1.69},
          {rank: 10, ticker: "ITC", company_name: "ITC Ltd.", sector: "Consumer Staples", allocation_percent: 1.68}
        ],
        notes: "Only equity holdings included; sector labels per AMFI classification"
      },
      {
        fund_name: "Franklin India Focused Equity Fund",
        fund_identifier: "INF090I01IY0",
        as_of_date: "2025-12-31",
        data_source_urls: ["https://www.franklintempletonindia.com/"],
        top_holdings: [
          {rank: 1, ticker: "HDFCBANK", company_name: "HDFC Bank Ltd.", sector: "Financials", allocation_percent: 9.56},
          {rank: 2, ticker: "ICICIBANK", company_name: "ICICI Bank Ltd.", sector: "Financials", allocation_percent: 7.64},
          {rank: 3, ticker: "TCS", company_name: "TCS Ltd.", sector: "Information Technology", allocation_percent: 6.59},
          {rank: 4, ticker: "AXISBANK", company_name: "Axis Bank Ltd.", sector: "Financials", allocation_percent: 6.52},
          {rank: 5, ticker: "BHARTIARTL", company_name: "Bharti Airtel Ltd.", sector: "Telecommunications", allocation_percent: 6.12},
          {rank: 6, ticker: "RELIANCE", company_name: "Reliance Industries Ltd.", sector: "Energy", allocation_percent: 5.96},
          {rank: 7, ticker: "ETERNAL", company_name: "Eternal Ltd.", sector: "Consumer Discretionary", allocation_percent: 5.17},
          {rank: 8, ticker: "MARUTI", company_name: "Maruti Suzuki India Ltd.", sector: "Consumer Discretionary", allocation_percent: 4.07},
          {rank: 9, ticker: "SUNPHARMA", company_name: "Sun Pharmaceutical Industries Ltd.", sector: "Healthcare", allocation_percent: 4.01},
          {rank: 10, ticker: "CIPLA", company_name: "Cipla Ltd.", sector: "Healthcare", allocation_percent: 4.00}
        ],
        notes: "Only equity holdings included; sector labels per AMFI classification"
      },
      {
        fund_name: "UTI Balanced Advantage Fund",
        fund_identifier: "121213",
        as_of_date: "2025-12-31",
        data_source_urls: ["https://www.utimf.com/mutual-funds/uti-balanced-advantage-fund"],
        top_holdings: [
          {rank: 1, ticker: "HDFCBANK", company_name: "HDFC Bank Ltd.", sector: "Financials", allocation_percent: 8.31},
          {rank: 2, ticker: "ICICIBANK", company_name: "ICICI Bank Ltd.", sector: "Financials", allocation_percent: 5.04},
          {rank: 3, ticker: "BHARTIARTL", company_name: "Bharti Airtel Ltd.", sector: "Telecommunications", allocation_percent: 4.29},
          {rank: 4, ticker: "INFY", company_name: "Infosys Ltd.", sector: "Information Technology", allocation_percent: 3.46},
          {rank: 5, ticker: "RELIANCE", company_name: "Reliance Industries Ltd.", sector: "Energy", allocation_percent: 3.39},
          {rank: 6, ticker: "BAJFINANCE", company_name: "Bajaj Finance Ltd.", sector: "Financials", allocation_percent: 2.95},
          {rank: 7, ticker: "MARUTI", company_name: "Maruti Suzuki India Ltd.", sector: "Consumer Discretionary", allocation_percent: 2.47},
          {rank: 8, ticker: "KOTAKBANK", company_name: "Kotak Mahindra Bank Ltd.", sector: "Financials", allocation_percent: 2.40},
          {rank: 9, ticker: "LT", company_name: "Larsen & Toubro Ltd.", sector: "Industrials", allocation_percent: 2.34},
          {rank: 10, ticker: "TCS", company_name: "TCS Ltd.", sector: "Information Technology", allocation_percent: 1.95}
        ],
        notes: "Only equity holdings included; sector labels per AMFI classification"
      },
      {
        fund_name: "UTI Banking & Financial Services Fund",
        fund_identifier: "INF789F01356",
        as_of_date: "2025-12-31",
        data_source_urls: ["https://www.utimf.com/mutual-funds/uti-banking-financial-services-fund"],
        top_holdings: [
          {rank: 1, ticker: "ICICIBANK", company_name: "ICICI Bank Ltd.", sector: "Financials", allocation_percent: 18.00},
          {rank: 2, ticker: "HDFCBANK", company_name: "HDFC Bank Ltd.", sector: "Financials", allocation_percent: 15.60},
          {rank: 3, ticker: "KOTAKBANK", company_name: "Kotak Mahindra Bank Ltd.", sector: "Financials", allocation_percent: 8.76},
          {rank: 4, ticker: "AXISBANK", company_name: "Axis Bank Ltd.", sector: "Financials", allocation_percent: 8.50},
          {rank: 5, ticker: "SBIN", company_name: "State Bank of India", sector: "Financials", allocation_percent: 6.04},
          {rank: 6, ticker: "BAJFINANCE", company_name: "Bajaj Finance Ltd.", sector: "Financials", allocation_percent: 5.71},
          {rank: 7, ticker: "SHRIRAMFIN", company_name: "Shriram Finance Ltd.", sector: "Financials", allocation_percent: 3.60},
          {rank: 8, ticker: "KARURVYSYA", company_name: "Karur Vysya Bank Ltd.", sector: "Financials", allocation_percent: 3.25},
          {rank: 9, ticker: "MAXFIN", company_name: "Max Financial Services Ltd.", sector: "Financials", allocation_percent: 2.90},
          {rank: 10, ticker: "UJJIVANSFB", company_name: "Ujjivan SFB Ltd.", sector: "Financials", allocation_percent: 2.51}
        ],
        notes: "Only equity holdings included; sector labels per AMFI classification"
      },
      {
        fund_name: "Aditya Birla Sun Life Balanced Advantage Fund",
        fund_identifier: "131670",
        as_of_date: "2025-12-31",
        data_source_urls: ["https://mutualfund.adityabirlacapital.com"],
        top_holdings: [
          {rank: 1, ticker: "ICICIBANK", company_name: "ICICI Bank Ltd.", sector: "Financials", allocation_percent: 4.84},
          {rank: 2, ticker: "TATASTEEL", company_name: "Tata Steel Ltd.", sector: "Materials", allocation_percent: 4.54},
          {rank: 3, ticker: "INFY", company_name: "Infosys Ltd.", sector: "Information Technology", allocation_percent: 3.65},
          {rank: 4, ticker: "HDFCBANK", company_name: "HDFC Bank Ltd.", sector: "Financials", allocation_percent: 3.55},
          {rank: 5, ticker: "HDFC", company_name: "Housing Development Finance Corp Ltd.", sector: "Financials", allocation_percent: 2.60},
          {rank: 6, ticker: "BHARTIARTL", company_name: "Bharti Airtel Ltd.", sector: "Telecommunications", allocation_percent: 2.51},
          {rank: 7, ticker: "ADANIPORTS", company_name: "Adani Ports & SEZ Ltd.", sector: "Industrials", allocation_percent: 2.34},
          {rank: 8, ticker: "ITC", company_name: "ITC Ltd.", sector: "Consumer Staples", allocation_percent: 1.92},
          {rank: 9, ticker: "RELIANCE", company_name: "Reliance Industries Ltd.", sector: "Energy", allocation_percent: 1.88},
          {rank: 10, ticker: "SBIN", company_name: "State Bank of India", sector: "Financials", allocation_percent: 1.87}
        ],
        notes: "Only equity holdings included; sector labels per AMFI classification"
      },
      {
        fund_name: "Nippon India Pharma Fund",
        fund_identifier: "INF204K01968",
        as_of_date: "2025-12-31",
        data_source_urls: ["https://mf.nipponindiaim.com/FundsAndPerformance/ProductNotes/NipponIndia-Pharma-Fund-Dec-2025.pdf"],
        top_holdings: [
          {rank: 1, ticker: "SUNPHARMA", company_name: "Sun Pharmaceutical Industries Ltd.", sector: "Healthcare", allocation_percent: 13.02},
          {rank: 2, ticker: "LUPIN", company_name: "Lupin Ltd.", sector: "Healthcare", allocation_percent: 7.36},
          {rank: 3, ticker: "DIVISLAB", company_name: "Divi's Laboratories Ltd.", sector: "Healthcare", allocation_percent: 6.58},
          {rank: 4, ticker: "CIPLA", company_name: "Cipla Ltd.", sector: "Healthcare", allocation_percent: 6.39},
          {rank: 5, ticker: "DRREDDY", company_name: "Dr. Reddy's Laboratories Ltd.", sector: "Healthcare", allocation_percent: 6.02},
          {rank: 6, ticker: "APOLLOHOSP", company_name: "Apollo Hospitals Enterprise Ltd.", sector: "Healthcare", allocation_percent: 5.53},
          {rank: 7, ticker: "VIJAYA", company_name: "Vijaya Diagnostic Centre Ltd.", sector: "Healthcare", allocation_percent: 3.71},
          {rank: 8, ticker: "MEDPLUS", company_name: "MedPlus Health Services Ltd.", sector: "Healthcare", allocation_percent: 3.54},
          {rank: 9, ticker: "AJANTPHARM", company_name: "Ajanta Pharma Ltd.", sector: "Healthcare", allocation_percent: 3.21},
          {rank: 10, ticker: "SAILIFE", company_name: "Sai Life Sciences Ltd.", sector: "Healthcare", allocation_percent: 2.81}
        ],
        notes: "Pharma sectoral fund; only equity holdings included"
      },
      {
        fund_name: "Franklin India Large Cap Fund (Erstwhile Bluechip Fund)",
        fund_identifier: "121500",
        as_of_date: "2025-12-31",
        data_source_urls: ["https://www.franklintempletonindia.com/fund-details/fund-overview/4614/franklin-india-large-cap-fund-erstwhile-franklin-india-bluechip-fund"],
        top_holdings: [
          {rank: 1, ticker: "ICICIBANK", company_name: "ICICI Bank Ltd.", sector: "Financials", allocation_percent: 7.91},
          {rank: 2, ticker: "HDFCBANK", company_name: "HDFC Bank Ltd.", sector: "Financials", allocation_percent: 7.90},
          {rank: 3, ticker: "M&M", company_name: "Mahindra & Mahindra Ltd.", sector: "Consumer Discretionary", allocation_percent: 5.71},
          {rank: 4, ticker: "ETERNAL", company_name: "Eternal Ltd.", sector: "Consumer Discretionary", allocation_percent: 5.28},
          {rank: 5, ticker: "KOTAKBANK", company_name: "Kotak Mahindra Bank Ltd.", sector: "Financials", allocation_percent: 5.24},
          {rank: 6, ticker: "AXISBANK", company_name: "Axis Bank Ltd.", sector: "Financials", allocation_percent: 5.22},
          {rank: 7, ticker: "RELIANCE", company_name: "Reliance Industries Ltd.", sector: "Energy", allocation_percent: 5.03},
          {rank: 8, ticker: "HCLTECH", company_name: "HCL Technologies Ltd.", sector: "Information Technology", allocation_percent: 4.35},
          {rank: 9, ticker: "TORNTPHARM", company_name: "Torrent Pharmaceuticals Ltd.", sector: "Healthcare", allocation_percent: 4.09},
          {rank: 10, ticker: "INFY", company_name: "Infosys Ltd.", sector: "Information Technology", allocation_percent: 3.95}
        ],
        notes: "Only equity holdings included; sector labels per AMFI classification"
      }
    ]
  }
};

const largeCapFunds = json_data.largeCap.funds.map(
  (fund) => fund.fund_name
);

const midCapFunds = json_data.midCap.funds.map(
  (fund) => fund.fund_name
);

const hybridFunds = json_data.hybrid.funds.map(
  (fund) => fund.fund_name
);

const fundNamesByCategory = {
  largeCap: json_data.largeCap.funds.map(f => f.fund_name),
  midCap: json_data.midCap.funds.map(f => f.fund_name),
  hybrid: json_data.hybrid.funds.map(f => f.fund_name),
};

// Get aggregated sector data from all funds in user's portfolio
const getAllPortfolioSectorData = () => {
  const sectorMap = {};
  
  // Iterate through all user's funds
  funds.forEach(userFund => {
    // Find the fund details in json_data
    let fundDetails = null;
    Object.values(json_data).forEach(category => {
      if (category.funds && Array.isArray(category.funds)) {
        const found = category.funds.find(f => f.fund_name === userFund.name);
        if (found) {
          fundDetails = found;
        }
      }
    });
    
    // If fund details found, aggregate its holdings
    if (fundDetails && fundDetails.top_holdings && Array.isArray(fundDetails.top_holdings)) {
      fundDetails.top_holdings.forEach(holding => {
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
  return Object.entries(sectorMap).map(([name, value]) => ({
    name,
    value: parseFloat(((value / total) * 100).toFixed(2))
  })).sort((a, b) => b.value - a.value);
};

// Get aggregated company exposure data from all funds in user's portfolio
const getAllPortfolioCompanyData = () => {
  const companyMap = {};
  
  // Iterate through all user's funds
  funds.forEach(userFund => {
    // Find the fund details in json_data
    let fundDetails = null;
    Object.values(json_data).forEach(category => {
      if (category.funds && Array.isArray(category.funds)) {
        const found = category.funds.find(f => f.fund_name === userFund.name);
        if (found) {
          fundDetails = found;
        }
      }
    });
    
    // If fund details found, aggregate its holdings
    if (fundDetails && fundDetails.top_holdings && Array.isArray(fundDetails.top_holdings)) {
      fundDetails.top_holdings.forEach(holding => {
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
  return Object.entries(companyMap).map(([name, value]) => ({
    name,
    exposure: parseFloat(((value / total) * 100).toFixed(2))
  })).sort((a, b) => b.exposure - a.exposure);
};

const companyChartData = getAllPortfolioCompanyData();

const sectorChartData = getAllPortfolioSectorData();

  return (
    <VStack spacing={8} align="stretch" pb={10}>
      {/* 4 Stats Cards */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
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
        <StatCard 
          label="Portfolio Growth" 
          value="+12.5%" 
          icon={FiPieChart}
          color="green.400"
        />
        <StatCard 
          label="Risk Assessment" 
          value="Medium" 
          icon={FiShield}
          color="purple.400"
        />
      </SimpleGrid>

      {error && (
        <Alert status="error" borderRadius="xl">
          <AlertIcon />
          {error}
        </Alert>
      )}

      {/* Main Content Grid */}
      <Grid templateColumns={{ base: '1fr', lg: 'repeat(3, 1fr)' }} gap={6}>
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
                <Box mb={6} p={4} bg="gray.50" borderRadius="xl" border="1px" borderColor="gray.100">
                  <form onSubmit={handleAddFund}>
                    <VStack spacing={4} align="stretch">
                      <FormControl isRequired>
                        <FormLabel fontSize="xs" fontWeight="700" color={"gray"}>Select Mutual Fund</FormLabel>
                        <Select
                          placeholder="Search funds..."
                          value={newFund.name}
                          _placeholder={{ color: "gray" }}
                          onChange={(e) => setNewFund({ ...newFund, name: e.target.value })}
                          bg="white"
                          color="black"
                        >
                          {[...fundNamesByCategory.largeCap, ...fundNamesByCategory.midCap, ...fundNamesByCategory.hybrid].map((fund) => (
                            <option key={fund} value={fund}>{fund}</option>
                          ))}
                        </Select>
                      </FormControl>
                      <FormControl isRequired>
                        <FormLabel fontSize="xs" fontWeight="700" color={"gray"}>Amount (₹)</FormLabel>
                        <Input
                          color="gray"  
                          type="number"
                          value={newFund.amount}
                          onChange={(e) => setNewFund({ ...newFund, amount: e.target.value })}
                          bg="white"
                          _placeholder={{color:"gray"}}
                          placeholder="e.g. 50000"
                        />
                      </FormControl>
                      <HStack>
                        <Button type="submit" colorScheme="brand" size="sm" w="full" color="white">Add Fund</Button>
                        <Button variant="ghost" size="sm" w="full" onClick={() => setShowAddForm(false)}>Cancel</Button>
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
                          <Td isNumeric>{((fund.amount / totalInvestment) * 100).toFixed(1)}%</Td>
                          <Td isNumeric>
                            <IconButton
                              aria-label="Remove fund"
                              icon={<DeleteIcon />}
                              colorScheme="red"
                              variant="ghost"
                              size="xs"
                              onClick={() => handleDeleteFund(fund._id, fund.name)}
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
                  <Text fontSize="xs">Start by adding your first mutual fund</Text>
                </VStack>
              )}
            </CardBody>
          </Card>
        </GridItem>

        {/* Sector Allocation Side Card */}
        <GridItem colSpan={1}>
          <Card h="full">
            <CardBody p={6}>
              <Heading size="md" color="black" mb={6}>Sector Allocation</Heading>
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
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                          formatter={(value) => `${value.toFixed(1)}%`}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </Box>
                  <VStack align="stretch" flex="1" spacing={3} pl={2}>
                    {sectorChartData.slice(0, 6).map((sector, idx) => (
                      <Flex key={sector.name} justify="space-between" align="center" fontSize="11px">
                        <HStack spacing={2} overflow="hidden">
                          <Box minW="8px" h="8px" borderRadius="full" bg={COLORS[idx % COLORS.length]} />
                          <Text fontWeight="600" color="black" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
                            {sector.name}
                          </Text>
                        </HStack>
                        <Text color="gray.500" fontWeight="700" ml={1}>{sector.value.toFixed(0)}%</Text>
                      </Flex>
                    ))}
                  </VStack>
                </Flex>
              ) : (
                <VStack h="full" justify="center" py={10}>
                  <Text fontSize="sm" color="gray.400">No data available</Text>
                </VStack>
              )}
            </CardBody>
          </Card>
        </GridItem>

        {/* Top Company Exposures - Full Width */}
        <GridItem colSpan={{ base: 1, lg: 3 }}>
          <Card>
            <CardBody p={6}>
              <Heading color="black" size="md" mb={6}>Top Company Exposures</Heading>
              {companyChartData.length > 0 ? (
                <Box h="400px">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={companyChartData.slice(0, 8)}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
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
                        cursor={{ fill: '#F1F5F9' }}
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                        formatter={(value) => `${value.toFixed(2)}%`}
                      />
                      <Bar dataKey="exposure" radius={[4, 4, 0, 0]}>
                        {companyChartData.slice(0, 8).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              ) : (
                <VStack py={10}>
                  <Text fontSize="sm" color="gray.400">Add funds to view analytics</Text>
                </VStack>
              )}
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </VStack>
  )
}

// Stats Card Component
const StatCard = ({ label, value, icon, color }) => (
  <Card variant="elevated">
    <CardBody p={6}>
      <Flex align="center" gap={4}>
        <Box p={3} borderRadius="xl" bg={`${color}10`} color={color}>
          <Icon as={icon} w={6} h={6} />
        </Box>
        <Box>
          <Text fontSize="xs" fontWeight="700" color="gray.700" textTransform="uppercase" letterSpacing="widest">
            {label}
          </Text>
          <Text fontSize="2xl" fontWeight="800" color="gray.900">
            {value}
          </Text>
        </Box>
      </Flex>
    </CardBody>
  </Card>
)

export default Dashboard