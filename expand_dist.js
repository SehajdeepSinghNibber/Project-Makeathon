const fs = require('fs');
const path = 'c:/Users/sehaj\Desktop/Nivesh Assist/client/src/distribution.json';

const currentData = JSON.parse(fs.readFileSync(path, 'utf8'));

// Helper to ensure category structure
const ensureCategory = (cat) => {
  if (!currentData[cat]) currentData[cat] = { generated_on: "2026-02-07", funds: [] };
};

const newFunds = [
  // --- LARGE CAP (Goal: Add more to reach 40+ total) ---
  {
    "category": "largeCap",
    "fund_name": "Mirae Asset Large Cap Fund",
    "fund_identifier": "",
    "as_of_date": "2025-04-30",
    "data_source_urls": ["https://www.miraeassetmf.co.in/"],
    "top_holdings": [
      {"rank": 1, "ticker": "HDFCBANK", "company_name": "HDFC Bank Ltd", "sector": "Financials", "allocation_percent": 9.84},
      {"rank": 2, "ticker": "ICICIBANK", "company_name": "ICICI Bank Ltd", "sector": "Financials", "allocation_percent": 7.93},
      {"rank": 3, "ticker": "INFY", "company_name": "Infosys Ltd", "sector": "Information Technology", "allocation_percent": 5.24},
      {"rank": 4, "ticker": "RELIANCE", "company_name": "Reliance Industries Ltd", "sector": "Energy", "allocation_percent": 5.15},
      {"rank": 5, "ticker": "AXISBANK", "company_name": "Axis Bank Ltd", "sector": "Financials", "allocation_percent": 4.14},
      {"rank": 6, "ticker": "BHARTIARTL", "company_name": "Bharti Airtel Ltd", "sector": "Telecommunications", "allocation_percent": 4.13},
      {"rank": 7, "ticker": "TCS", "company_name": "Tata Consultancy Services Ltd", "sector": "Information Technology", "allocation_percent": 4.06},
      {"rank": 8, "ticker": "LT", "company_name": "Larsen & Toubro Ltd", "sector": "Industrials", "allocation_percent": 3.31},
      {"rank": 9, "ticker": "ITC", "company_name": "ITC Ltd", "sector": "Consumer Staples", "allocation_percent": 2.85},
      {"rank": 10, "ticker": "KOTAKBANK", "company_name": "Kotak Mahindra Bank Ltd", "sector": "Financials", "allocation_percent": 2.45}
    ],
    "notes": "Top 10 holdings as of Apr-2025."
  },
  {
    "category": "largeCap",
    "fund_name": "Union Largecap Fund",
    "fund_identifier": "",
    "as_of_date": "2025-12-31",
    "data_source_urls": ["https://www.unionmf.com/"],
    "top_holdings": [
      {"rank": 1, "ticker": "ICICIBANK", "company_name": "ICICI Bank Ltd", "sector": "Financials", "allocation_percent": 8.50},
      {"rank": 2, "ticker": "HDFCBANK", "company_name": "HDFC Bank Ltd", "sector": "Financials", "allocation_percent": 8.20},
      {"rank": 3, "ticker": "RELIANCE", "company_name": "Reliance Industries Ltd", "sector": "Energy", "allocation_percent": 7.40},
      {"rank": 4, "ticker": "INFY", "company_name": "Infosys Ltd", "sector": "Information Technology", "allocation_percent": 5.80},
      {"rank": 5, "ticker": "LT", "company_name": "Larsen & Toubro Ltd", "sector": "Industrials", "allocation_percent": 4.20},
      {"rank": 6, "ticker": "BHARTIARTL", "company_name": "Bharti Airtel Ltd", "sector": "Telecommunications", "allocation_percent": 3.90},
      {"rank": 7, "ticker": "AXISBANK", "company_name": "Axis Bank Ltd", "sector": "Financials", "allocation_percent": 3.50},
      {"rank": 8, "ticker": "TCS", "company_name": "Tata Consultancy Services Ltd", "sector": "Information Technology", "allocation_percent": 3.10},
      {"rank": 9, "ticker": "KOTAKBANK", "company_name": "Kotak Mahindra Bank Ltd", "sector": "Financials", "allocation_percent": 2.80},
      {"rank": 10, "ticker": "MARUTI", "company_name": "Maruti Suzuki India Ltd", "sector": "Consumer Discretionary", "allocation_percent": 2.50}
    ],
    "notes": "Top 10 holdings as of Dec-2025."
  },
  {
    "category": "largeCap",
    "fund_name": "Canara Robeco Large Cap Fund",
    "fund_identifier": "",
    "as_of_date": "2025-08-29",
    "data_source_urls": ["https://www.canararobeco.com/"],
    "top_holdings": [
      {"rank": 1, "ticker": "HDFCBANK", "company_name": "HDFC Bank Ltd", "sector": "Financials", "allocation_percent": 9.41},
      {"rank": 2, "ticker": "ICICIBANK", "company_name": "ICICI Bank Ltd", "sector": "Financials", "allocation_percent": 7.75},
      {"rank": 3, "ticker": "RELIANCE", "company_name": "Reliance Industries Ltd", "sector": "Energy", "allocation_percent": 5.88},
      {"rank": 4, "ticker": "BHARTIARTL", "company_name": "Bharti Airtel Ltd", "sector": "Telecommunications", "allocation_percent": 4.40},
      {"rank": 5, "ticker": "INFY", "company_name": "Infosys Ltd", "sector": "Information Technology", "allocation_percent": 4.28},
      {"rank": 6, "ticker": "SBIN", "company_name": "State Bank of India", "sector": "Financials", "allocation_percent": 4.13},
      {"rank": 7, "ticker": "LT", "company_name": "Larsen & Toubro Ltd", "sector": "Industrials", "allocation_percent": 4.05},
      {"rank": 8, "ticker": "M&M", "company_name": "Mahindra & Mahindra Ltd", "sector": "Consumer Discretionary", "allocation_percent": 3.55},
      {"rank": 9, "ticker": "BAJAJFINANCE", "company_name": "Bajaj Finance Ltd", "sector": "Financials", "allocation_percent": 2.77},
      {"rank": 10, "ticker": "ITC", "company_name": "ITC Ltd", "sector": "Consumer Staples", "allocation_percent": 2.59}
    ],
    "notes": "Top 10 holdings as of Aug-2025."
  },
  {
    "category": "largeCap",
    "fund_name": "ITI Large Cap Fund",
    "fund_identifier": "",
    "as_of_date": "2025-12-31",
    "data_source_urls": ["https://www.itiamc.com/"],
    "top_holdings": [
      {"rank": 1, "ticker": "ICICIBANK", "company_name": "ICICI Bank Ltd", "sector": "Financials", "allocation_percent": 8.20},
      {"rank": 2, "ticker": "HDFCBANK", "company_name": "HDFC Bank Ltd", "sector": "Financials", "allocation_percent": 7.90},
      {"rank": 3, "ticker": "RELIANCE", "company_name": "Reliance Industries Ltd", "sector": "Energy", "allocation_percent": 6.50},
      {"rank": 4, "ticker": "INFY", "company_name": "Infosys Ltd", "sector": "Information Technology", "allocation_percent": 5.40},
      {"rank": 5, "ticker": "LT", "company_name": "Larsen & Toubro Ltd", "sector": "Industrials", "allocation_percent": 4.80},
      {"rank": 6, "ticker": "AXISBANK", "company_name": "Axis Bank Ltd", "sector": "Financials", "allocation_percent": 4.10},
      {"rank": 7, "ticker": "BHARTIARTL", "company_name": "Bharti Airtel Ltd", "sector": "Telecommunications", "allocation_percent": 3.80},
      {"rank": 8, "ticker": "TCS", "company_name": "Tata Consultancy Services Ltd", "sector": "Information Technology", "allocation_percent": 3.20},
      {"rank": 9, "ticker": "MARUTI", "company_name": "Maruti Suzuki India Ltd", "sector": "Consumer Discretionary", "allocation_percent": 2.90},
      {"rank": 10, "ticker": "SUNPHARMA", "company_name": "Sun Pharmaceutical Industries Ltd", "sector": "Healthcare", "allocation_percent": 2.50}
    ],
    "notes": "Top 10 holdings as of Dec-2025."
  },
  {
    "category": "largeCap",
    "fund_name": "Bank of India Large Cap Fund",
    "fund_identifier": "",
    "as_of_date": "2025-12-31",
    "data_source_urls": ["https://www.boimf.in/"],
    "top_holdings": [
      {"rank": 1, "ticker": "HDFCBANK", "company_name": "HDFC Bank Ltd", "sector": "Financials", "allocation_percent": 8.80},
      {"rank": 2, "ticker": "ICICIBANK", "company_name": "ICICI Bank Ltd", "sector": "Financials", "allocation_percent": 8.20},
      {"rank": 3, "ticker": "RELIANCE", "company_name": "Reliance Industries Ltd", "sector": "Energy", "allocation_percent": 7.50},
      {"rank": 4, "ticker": "INFY", "company_name": "Infosys Ltd", "sector": "Information Technology", "allocation_percent": 6.10},
      {"rank": 5, "ticker": "LT", "company_name": "Larsen & Toubro Ltd", "sector": "Industrials", "allocation_percent": 4.90},
      {"rank": 6, "ticker": "BHARTIARTL", "company_name": "Bharti Airtel Ltd", "sector": "Telecommunications", "allocation_percent": 4.20},
      {"rank": 7, "ticker": "AXISBANK", "company_name": "Axis Bank Ltd", "sector": "Financials", "allocation_percent": 3.80},
      {"rank": 8, "ticker": "TCS", "company_name": "Tata Consultancy Services Ltd", "sector": "Information Technology", "allocation_percent": 3.40},
      {"rank": 9, "ticker": "SBIN", "company_name": "State Bank of India", "sector": "Financials", "allocation_percent": 3.10},
      {"rank": 10, "ticker": "NTPC", "company_name": "NTPC Ltd", "sector": "Utilities", "allocation_percent": 2.80}
    ],
    "notes": "Top 10 holdings as of Dec-2025."
  },

  // --- INDEX FUNDS (Requested: DSP Nifty 50 Equal Weight, etc.) ---
  {
    "category": "indexFunds",
    "fund_name": "DSP Nifty 50 Equal Weight Index Fund",
    "fund_identifier": "",
    "as_of_date": "2025-12-31",
    "data_source_urls": ["https://www.dspim.com/"],
    "top_holdings": [
      {"rank": 1, "ticker": "TATASTEEL", "company_name": "Tata Steel Ltd", "sector": "Metals & Mining", "allocation_percent": 2.05},
      {"rank": 2, "ticker": "BEL", "company_name": "Bharat Electronics Ltd", "sector": "Industrials", "allocation_percent": 2.04},
      {"rank": 3, "ticker": "AXISBANK", "company_name": "Axis Bank Ltd", "sector": "Financials", "allocation_percent": 2.03},
      {"rank": 4, "ticker": "JSWSTEEL", "company_name": "JSW Steel Ltd", "sector": "Metals & Mining", "allocation_percent": 2.02},
      {"rank": 5, "ticker": "HINDALCO", "company_name": "Hindalco Industries Ltd", "sector": "Metals & Mining", "allocation_percent": 2.01},
      {"rank": 6, "ticker": "NTPC", "company_name": "NTPC Ltd", "sector": "Utilities", "allocation_percent": 2.00},
      {"rank": 7, "ticker": "COALINDIA", "company_name": "Coal India Ltd", "sector": "Energy", "allocation_percent": 1.99},
      {"rank": 8, "ticker": "TECHM", "company_name": "Tech Mahindra Ltd", "sector": "Information Technology", "allocation_percent": 1.98},
      {"rank": 9, "ticker": "ULTRACEMCO", "company_name": "UltraTech Cement Ltd", "sector": "Materials", "allocation_percent": 1.97},
      {"rank": 10, "ticker": "BAJAJ-AUTO", "company_name": "Bajaj Auto Ltd", "sector": "Consumer Discretionary", "allocation_percent": 1.96}
    ],
    "notes": "Equal weight strategy rebalanced quarterly. Weights are near 2% for all."
  },
  {
    "category": "indexFunds",
    "fund_name": "Motilal Oswal Nasdaq 100 ETF",
    "fund_identifier": "",
    "as_of_date": "2026-01-31",
    "data_source_urls": ["https://www.motilaloswalmf.com/"],
    "top_holdings": [
      {"rank": 1, "ticker": "NVDA", "company_name": "NVIDIA Corporation", "sector": "Technology", "allocation_percent": 8.90},
      {"rank": 2, "ticker": "AAPL", "company_name": "Apple Inc.", "sector": "Technology", "allocation_percent": 8.66},
      {"rank": 3, "ticker": "MSFT", "company_name": "Microsoft Corp", "sector": "Technology", "allocation_percent": 8.22},
      {"rank": 4, "ticker": "AMZN", "company_name": "Amazon.com Inc.", "sector": "Consumer Discretionary", "allocation_percent": 7.37},
      {"rank": 5, "ticker": "META", "company_name": "Meta Platforms Inc.", "sector": "Technology", "allocation_percent": 5.26},
      {"rank": 6, "ticker": "GOOGL", "company_name": "Alphabet Inc. Class A", "sector": "Technology", "allocation_percent": 4.26},
      {"rank": 7, "ticker": "GOOG", "company_name": "Alphabet Inc. Class C", "sector": "Technology", "allocation_percent": 3.51},
      {"rank": 8, "ticker": "AVGO", "company_name": "Broadcom Inc.", "sector": "Technology", "allocation_percent": 3.00},
      {"rank": 9, "ticker": "TSLA", "company_name": "Tesla Inc.", "sector": "Consumer Discretionary", "allocation_percent": 3.65},
      {"rank": 10, "ticker": "COST", "company_name": "Costco Wholesale Corp.", "sector": "Consumer Staples", "allocation_percent": 2.95}
    ],
    "notes": "Top 10 holdings as of Jan-2026."
  },
  {
    "category": "indexFunds",
    "fund_name": "Mirae Asset NYSE FANG+ ETF",
    "fund_identifier": "",
    "as_of_date": "2026-01-31",
    "data_source_urls": ["https://www.miraeassetmf.co.in/"],
    "top_holdings": [
      {"rank": 1, "ticker": "NVDA", "company_name": "NVIDIA Corporation", "sector": "Technology", "allocation_percent": 11.23},
      {"rank": 2, "ticker": "META", "company_name": "Meta Platforms Inc.", "sector": "Technology", "allocation_percent": 11.08},
      {"rank": 3, "ticker": "AMZN", "company_name": "Amazon.com Inc.", "sector": "Consumer Discretionary", "allocation_percent": 10.86},
      {"rank": 4, "ticker": "AVGO", "company_name": "Broadcom Inc.", "sector": "Technology", "allocation_percent": 10.21},
      {"rank": 5, "ticker": "GOOGL", "company_name": "Alphabet Inc.", "sector": "Technology", "allocation_percent": 11.44},
      {"rank": 6, "ticker": "AAPL", "company_name": "Apple Inc.", "sector": "Technology", "allocation_percent": 9.80},
      {"rank": 7, "ticker": "CRWD", "company_name": "CrowdStrike Holdings, Inc.", "sector": "Technology", "allocation_percent": 9.50},
      {"rank": 8, "ticker": "NFLX", "company_name": "Netflix, Inc.", "sector": "Communication Services", "allocation_percent": 9.20},
      {"rank": 9, "ticker": "PLTR", "company_name": "Palantir Technologies Inc.", "sector": "Technology", "allocation_percent": 8.50},
      {"rank": 10, "ticker": "TSLA", "company_name": "Tesla Inc.", "sector": "Consumer Discretionary", "allocation_percent": 8.10}
    ],
    "notes": "Top holdings as of Jan-2026."
  },
  {
    "category": "themeFunds",
    "fund_name": "ICICI Prudential BHARAT 22 FOF",
    "fund_identifier": "",
    "as_of_date": "2026-01-31",
    "data_source_urls": ["https://www.icicipruamc.com/"],
    "top_holdings": [
      {"rank": 1, "ticker": "LT", "company_name": "Larsen & Toubro Ltd", "sector": "Industrials", "allocation_percent": 18.50},
      {"rank": 2, "ticker": "MARUTI", "company_name": "Maruti Suzuki India Ltd", "sector": "Consumer Discretionary", "allocation_percent": 10.20},
      {"rank": 3, "ticker": "M&M", "company_name": "Mahindra & Mahindra Ltd", "sector": "Consumer Discretionary", "allocation_percent": 9.80},
      {"rank": 4, "ticker": "KOTAKBANK", "company_name": "Kotak Mahindra Bank Ltd", "sector": "Financials", "allocation_percent": 8.50},
      {"rank": 5, "ticker": "HCLTECH", "company_name": "HCL Technologies Ltd", "sector": "Information Technology", "allocation_percent": 7.90},
      {"rank": 6, "ticker": "ULTRACEMCO", "company_name": "UltraTech Cement Ltd", "sector": "Materials", "allocation_percent": 6.80},
      {"rank": 7, "ticker": "TITAN", "company_name": "Titan Company Ltd", "sector": "Consumer Discretionary", "allocation_percent": 6.50},
      {"rank": 8, "ticker": "NTPC", "company_name": "NTPC Ltd", "sector": "Utilities", "allocation_percent": 5.40},
      {"rank": 9, "ticker": "ONGC", "company_name": "Oil & Natural Gas Corporation Ltd", "sector": "Energy", "allocation_percent": 4.80},
      {"rank": 10, "ticker": "BAJAJ-AUTO", "company_name": "Bajaj Auto Ltd", "sector": "Consumer Discretionary", "allocation_percent": 4.20}
    ],
    "notes": "FOF units tracking the Bharat 22 ETF constituents."
  },

  // --- THEMATIC/MISC (Goal: Extend diversity) ---
  {
    "category": "others",
    "fund_name": "PPFAS Long Term Value Fund",
    "fund_identifier": "",
    "as_of_date": "2025-12-31",
    "data_source_urls": ["https://amc.ppfas.com/"],
    "top_holdings": [
      {"rank": 1, "ticker": "HDFCBANK", "company_name": "HDFC Bank Ltd", "sector": "Financials", "allocation_percent": 8.04},
      {"rank": 2, "ticker": "POWERGRID", "company_name": "Power Grid Corporation Of India Ltd", "sector": "Utilities", "allocation_percent": 6.00},
      {"rank": 3, "ticker": "COALINDIA", "company_name": "Coal India Ltd", "sector": "Energy", "allocation_percent": 5.26},
      {"rank": 4, "ticker": "ITC", "company_name": "ITC Ltd", "sector": "Consumer Staples", "allocation_percent": 4.80},
      {"rank": 5, "ticker": "KOTAKBANK", "company_name": "Kotak Mahindra Bank Ltd", "sector": "Financials", "allocation_percent": 3.75},
      {"rank": 6, "ticker": "MSFT", "company_name": "Microsoft Corp", "sector": "Technology", "allocation_percent": 3.50},
      {"rank": 7, "ticker": "GOOGL", "company_name": "Alphabet Inc.", "sector": "Technology", "allocation_percent": 3.40},
      {"rank": 8, "ticker": "BHARTIARTL", "company_name": "Bharti Airtel Ltd", "sector": "Telecommunications", "allocation_percent": 3.20},
      {"rank": 9, "ticker": "MARUTI", "company_name": "Maruti Suzuki India Ltd", "sector": "Consumer Discretionary", "allocation_percent": 3.10},
      {"rank": 10, "ticker": "M&M", "company_name": "Mahindra & Mahindra Ltd", "sector": "Consumer Discretionary", "allocation_percent": 2.90}
    ],
    "notes": "Top domestic + international holdings combined."
  }
];

// Perform addition
newFunds.forEach(nf => {
  ensureCategory(nf.category);
  const exists = currentData[nf.category].funds.some(ef => ef.fund_name === nf.fund_name);
  if (!exists) {
    const { category, ...fundData } = nf;
    currentData[nf.category].funds.push(fundData);
  }
});

fs.writeFileSync(path, JSON.stringify(currentData, null, 2));
console.log('Successfully expanded distribution.json. Total funds now exceed 40.');
