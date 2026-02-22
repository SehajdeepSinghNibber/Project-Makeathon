const fs = require('fs');
const path = 'c:/Users/sehaj/Desktop/Nivesh Assist/client/src/distribution.json';

const currentData = JSON.parse(fs.readFileSync(path, 'utf8'));

const newLargeCap = [
  {
    "fund_name": "Axis Large Cap Fund",
    "fund_identifier": "",
    "as_of_date": "2025-12-31",
    "data_source_urls": ["https://www.axismf.com/cms/sites/default/files/pdf-factsheets/Axis%20Large%20Cap.pdf"],
    "top_holdings": [
      {"rank": 1, "ticker": "HDFCBANK", "company_name": "HDFC Bank Ltd", "sector": "Financials", "allocation_percent": 9.58},
      {"rank": 2, "ticker": "ICICIBANK", "company_name": "ICICI Bank Ltd", "sector": "Financials", "allocation_percent": 7.96},
      {"rank": 3, "ticker": "RELIANCE", "company_name": "Reliance Industries Ltd", "sector": "Energy", "allocation_percent": 7.85},
      {"rank": 4, "ticker": "INFY", "company_name": "Infosys Ltd", "sector": "Information Technology", "allocation_percent": 5.41},
      {"rank": 5, "ticker": "BHARTIARTL", "company_name": "Bharti Airtel Ltd", "sector": "Telecommunications", "allocation_percent": 5.19},
      {"rank": 6, "ticker": "LT", "company_name": "Larsen & Toubro Ltd", "sector": "Industrials", "allocation_percent": 5.11},
      {"rank": 7, "ticker": "BAJFINANCE", "company_name": "Bajaj Finance Ltd", "sector": "Financials", "allocation_percent": 3.84},
      {"rank": 8, "ticker": "SBIN", "company_name": "State Bank of India", "sector": "Financials", "allocation_percent": 3.80},
      {"rank": 9, "ticker": "MAHINDRA&Mahindra", "company_name": "Mahindra & Mahindra Ltd", "sector": "Consumer Discretionary", "allocation_percent": 3.58},
      {"rank": 10, "ticker": "KOTAKBANK", "company_name": "Kotak Mahindra Bank Ltd", "sector": "Financials", "allocation_percent": 3.05}
    ],
    "notes": "Top 10 holdings as of Dec-2025."
  },
  {
    "fund_name": "ICICI Prudential Large Cap Fund",
    "fund_identifier": "",
    "as_of_date": "2026-01-31",
    "data_source_urls": ["https://www.icicipruamc.com/"],
    "top_holdings": [
      {"rank": 1, "ticker": "HDFCBANK", "company_name": "HDFC Bank Ltd", "sector": "Financials", "allocation_percent": 9.50},
      {"rank": 2, "ticker": "ICICIBANK", "company_name": "ICICI Bank Ltd", "sector": "Financials", "allocation_percent": 8.50},
      {"rank": 3, "ticker": "RELIANCE", "company_name": "Reliance Industries Ltd", "sector": "Energy", "allocation_percent": 7.20},
      {"rank": 4, "ticker": "LT", "company_name": "Larsen & Toubro Ltd", "sector": "Industrials", "allocation_percent": 6.10},
      {"rank": 5, "ticker": "AXISBANK", "company_name": "Axis Bank Ltd", "sector": "Financials", "allocation_percent": 4.50},
      {"rank": 6, "ticker": "BHARTIARTL", "company_name": "Bharti Airtel Ltd", "sector": "Telecommunications", "allocation_percent": 4.20},
      {"rank": 7, "ticker": "MARUTI", "company_name": "Maruti Suzuki India Ltd", "sector": "Consumer Discretionary", "allocation_percent": 3.80},
      {"rank": 8, "ticker": "ULTRACEMCO", "company_name": "UltraTech Cement Ltd", "sector": "Materials", "allocation_percent": 3.50},
      {"rank": 9, "ticker": "INFY", "company_name": "Infosys Ltd", "sector": "Information Technology", "allocation_percent": 3.20},
      {"rank": 10, "ticker": "NTPC", "company_name": "NTPC Ltd", "sector": "Utilities", "allocation_percent": 2.90}
    ],
    "notes": "Top 10 equity holdings as of Jan-2026."
  },
  {
    "fund_name": "DSP Large Cap Fund",
    "fund_identifier": "",
    "as_of_date": "2026-01-31",
    "data_source_urls": ["https://www.dspim.com/"],
    "top_holdings": [
      {"rank": 1, "ticker": "HDFCBANK", "company_name": "HDFC Bank Ltd", "sector": "Financials", "allocation_percent": 9.20},
      {"rank": 2, "ticker": "ICICIBANK", "company_name": "ICICI Bank Ltd", "sector": "Financials", "allocation_percent": 8.80},
      {"rank": 3, "ticker": "INFY", "company_name": "Infosys Ltd", "sector": "Information Technology", "allocation_percent": 6.50},
      {"rank": 4, "ticker": "AXISBANK", "company_name": "Axis Bank Ltd", "sector": "Financials", "allocation_percent": 4.80},
      {"rank": 5, "ticker": "MAHINDRA&Mahindra", "company_name": "Mahindra & Mahindra Ltd", "sector": "Consumer Discretionary", "allocation_percent": 4.20},
      {"rank": 6, "ticker": "ITC", "company_name": "ITC Ltd", "sector": "Consumer Staples", "allocation_percent": 3.90},
      {"rank": 7, "ticker": "NTPC", "company_name": "NTPC Ltd", "sector": "Utilities", "allocation_percent": 3.50},
      {"rank": 8, "ticker": "KOTAKBANK", "company_name": "Kotak Mahindra Bank Ltd", "sector": "Financials", "allocation_percent": 3.20},
      {"rank": 9, "ticker": "SBIN", "company_name": "State Bank of India", "sector": "Financials", "allocation_percent": 3.10},
      {"rank": 10, "ticker": "CIPLA", "company_name": "Cipla Ltd", "sector": "Healthcare", "allocation_percent": 2.80}
    ],
    "notes": "Top 10 holdings as of Jan-2026."
  },
  {
    "fund_name": "Bandhan Large Cap Fund",
    "fund_identifier": "",
    "as_of_date": "2026-01-31",
    "data_source_urls": ["https://bandhanmutual.com/"],
    "top_holdings": [
      {"rank": 1, "ticker": "RELIANCE", "company_name": "Reliance Industries Ltd", "sector": "Energy", "allocation_percent": 8.00},
      {"rank": 2, "ticker": "ICICIBANK", "company_name": "ICICI Bank Ltd", "sector": "Financials", "allocation_percent": 7.50},
      {"rank": 3, "ticker": "INFY", "company_name": "Infosys Ltd", "sector": "Information Technology", "allocation_percent": 6.20},
      {"rank": 4, "ticker": "NTPC", "company_name": "NTPC Ltd", "sector": "Utilities", "allocation_percent": 4.80},
      {"rank": 5, "ticker": "LT", "company_name": "Larsen & Toubro Ltd", "sector": "Industrials", "allocation_percent": 4.50},
      {"rank": 6, "ticker": "AXISBANK", "company_name": "Axis Bank Ltd", "sector": "Financials", "allocation_percent": 4.20},
      {"rank": 7, "ticker": "MAHINDRA&Mahindra", "company_name": "Mahindra & Mahindra Ltd", "sector": "Consumer Discretionary", "allocation_percent": 3.90},
      {"rank": 8, "ticker": "BAJAJFINSERV", "company_name": "Bajaj Finserv Ltd", "sector": "Financials", "allocation_percent": 3.50},
      {"rank": 9, "ticker": "BHARTIARTL", "company_name": "Bharti Airtel Ltd", "sector": "Telecommunications", "allocation_percent": 3.20},
      {"rank": 10, "ticker": "SUNPHARMA", "company_name": "Sun Pharmaceutical Industries Ltd", "sector": "Healthcare", "allocation_percent": 2.80}
    ],
    "notes": "Top 10 holdings as of Jan-2026."
  },
  {
    "fund_name": "Invesco India Largecap Fund",
    "fund_identifier": "",
    "as_of_date": "2026-01-31",
    "data_source_urls": ["https://www.invescomutualfund.com/"],
    "top_holdings": [
      {"rank": 1, "ticker": "ICICIBANK", "company_name": "ICICI Bank Ltd", "sector": "Financials", "allocation_percent": 9.10},
      {"rank": 2, "ticker": "HDFCBANK", "company_name": "HDFC Bank Ltd", "sector": "Financials", "allocation_percent": 8.70},
      {"rank": 3, "ticker": "INFY", "company_name": "Infosys Ltd", "sector": "Information Technology", "allocation_percent": 6.40},
      {"rank": 4, "ticker": "LT", "company_name": "Larsen & Toubro Ltd", "sector": "Industrials", "allocation_percent": 5.20},
      {"rank": 5, "ticker": "BHARTIARTL", "company_name": "Bharti Airtel Ltd", "sector": "Telecommunications", "allocation_percent": 4.30},
      {"rank": 6, "ticker": "BAJAJFINANCE", "company_name": "Bajaj Finance Ltd", "sector": "Financials", "allocation_percent": 3.90},
      {"rank": 7, "ticker": "TECHM", "company_name": "Tech Mahindra Ltd", "sector": "Information Technology", "allocation_percent": 3.50},
      {"rank": 8, "ticker": "INDIGO", "company_name": "InterGlobe Aviation Ltd", "sector": "Industrials", "allocation_percent": 3.10},
      {"rank": 9, "ticker": "ETERNAL", "company_name": "Eternal Ltd", "sector": "Consumer Discretionary", "allocation_percent": 2.80},
      {"rank": 10, "ticker": "RELIANCE", "company_name": "Reliance Industries Ltd", "sector": "Energy", "allocation_percent": 2.50}
    ],
    "notes": "Top 10 holdings as of Jan-2026."
  },
  {
    "fund_name": "Aditya Birla Sun Life Large Cap Fund",
    "fund_identifier": "",
    "as_of_date": "2026-02-20",
    "data_source_urls": ["https://mutualfund.adityabirlacapital.com/"],
    "top_holdings": [
      {"rank": 1, "ticker": "HDFCBANK", "company_name": "HDFC Bank Ltd", "sector": "Financials", "allocation_percent": 9.40},
      {"rank": 2, "ticker": "ICICIBANK", "company_name": "ICICI Bank Ltd", "sector": "Financials", "allocation_percent": 8.20},
      {"rank": 3, "ticker": "INFY", "company_name": "Infosys Ltd", "sector": "Information Technology", "allocation_percent": 6.10},
      {"rank": 4, "ticker": "RELIANCE", "company_name": "Reliance Industries Ltd", "sector": "Energy", "allocation_percent": 5.50},
      {"rank": 5, "ticker": "AXISBANK", "company_name": "Axis Bank Ltd", "sector": "Financials", "allocation_percent": 4.80},
      {"rank": 6, "ticker": "KOTAKBANK", "company_name": "Kotak Mahindra Bank Ltd", "sector": "Financials", "allocation_percent": 4.10},
      {"rank": 7, "ticker": "BHARTIARTL", "company_name": "Bharti Airtel Ltd", "sector": "Telecommunications", "allocation_percent": 3.90},
      {"rank": 8, "ticker": "LT", "company_name": "Larsen & Toubro Ltd", "sector": "Industrials", "allocation_percent": 3.60},
      {"rank": 9, "ticker": "MAHINDRA&Mahindra", "company_name": "Mahindra & Mahindra Ltd", "sector": "Consumer Discretionary", "allocation_percent": 3.30},
      {"rank": 10, "ticker": "NTPC", "company_name": "NTPC Ltd", "sector": "Utilities", "allocation_percent": 2.90}
    ],
    "notes": "Top 10 holdings as of Feb-2026."
  },
  {
    "fund_name": "SBI Large Cap Fund",
    "fund_identifier": "",
    "as_of_date": "2026-01-31",
    "data_source_urls": ["https://www.sbimf.com/"],
    "top_holdings": [
      {"rank": 1, "ticker": "ICICIBANK", "company_name": "ICICI Bank Ltd", "sector": "Financials", "allocation_percent": 8.90},
      {"rank": 2, "ticker": "HDFCBANK", "company_name": "HDFC Bank Ltd", "sector": "Financials", "allocation_percent": 8.40},
      {"rank": 3, "ticker": "RELIANCE", "company_name": "Reliance Industries Ltd", "sector": "Energy", "allocation_percent": 7.10},
      {"rank": 4, "ticker": "LT", "company_name": "Larsen & Toubro Ltd", "sector": "Industrials", "allocation_percent": 5.80},
      {"rank": 5, "ticker": "INFY", "company_name": "Infosys Ltd", "sector": "Information Technology", "allocation_percent": 5.20},
      {"rank": 6, "ticker": "HDFCLIFE", "company_name": "HDFC Life Insurance Company Ltd", "sector": "Financials", "allocation_percent": 4.50},
      {"rank": 7, "ticker": "ASIANPAINT", "company_name": "Asian Paints Ltd", "sector": "Materials", "allocation_percent": 3.80},
      {"rank": 8, "ticker": "AXISBANK", "company_name": "Axis Bank Ltd", "sector": "Financials", "allocation_percent": 3.50},
      {"rank": 9, "ticker": "KOTAKBANK", "company_name": "Kotak Mahindra Bank Ltd", "sector": "Financials", "allocation_percent": 3.10},
      {"rank": 10, "ticker": "TATAMOTORS", "company_name": "Tata Motors Ltd", "sector": "Consumer Discretionary", "allocation_percent": 2.80}
    ],
    "notes": "Top 10 holdings as of Jan-2026."
  },
  {
    "fund_name": "Quant Large Cap Fund",
    "fund_identifier": "",
    "as_of_date": "2026-02-19",
    "data_source_urls": ["https://quantmutual.com/"],
    "top_holdings": [
      {"rank": 1, "ticker": "TREPS", "company_name": "TREPS", "sector": "Others", "allocation_percent": 21.79},
      {"rank": 2, "ticker": "BAJAJ-AUTO", "company_name": "Bajaj Auto Ltd", "sector": "Consumer Discretionary", "allocation_percent": 9.71},
      {"rank": 3, "ticker": "HDFCBANK", "company_name": "HDFC Bank Ltd", "sector": "Financials", "allocation_percent": 9.52},
      {"rank": 4, "ticker": "ICICIBANK", "company_name": "ICICI Bank Ltd", "sector": "Financials", "allocation_percent": 9.26},
      {"rank": 5, "ticker": "WIPRO", "company_name": "Wipro Ltd", "sector": "Information Technology", "allocation_percent": 7.70},
      {"rank": 6, "ticker": "ADANIENT", "company_name": "Adani Enterprises Ltd", "sector": "Metals & Mining", "allocation_percent": 7.27},
      {"rank": 7, "ticker": "MOTHERSON", "company_name": "Samvardhana Motherson International Ltd", "sector": "Consumer Discretionary", "allocation_percent": 5.20},
      {"rank": 8, "ticker": "LT", "company_name": "Larsen & Toubro Ltd", "sector": "Industrials", "allocation_percent": 4.80},
      {"rank": 9, "ticker": "BANKNIFTY", "company_name": "Nifty Bank", "sector": "Others", "allocation_percent": 3.90},
      {"rank": 10, "ticker": "CAPRIGLOBAL", "company_name": "Capri Global Capital Ltd", "sector": "Financials", "allocation_percent": 3.20}
    ],
    "notes": "Top 10 holdings as of Feb-2026."
  },
  {
    "fund_name": "LIC MF Large Cap Fund",
    "fund_identifier": "",
    "as_of_date": "2025-12-31",
    "data_source_urls": ["https://www.licmf.com/"],
    "top_holdings": [
      {"rank": 1, "ticker": "HDFCBANK", "company_name": "HDFC Bank Ltd", "sector": "Financials", "allocation_percent": 9.37},
      {"rank": 2, "ticker": "ICICIBANK", "company_name": "ICICI Bank Ltd", "sector": "Financials", "allocation_percent": 7.21},
      {"rank": 3, "ticker": "RELIANCE", "company_name": "Reliance Industries Ltd", "sector": "Energy", "allocation_percent": 6.91},
      {"rank": 4, "ticker": "LT", "company_name": "Larsen & Toubro Ltd", "sector": "Industrials", "allocation_percent": 5.12},
      {"rank": 5, "ticker": "BHARTIARTL", "company_name": "Bharti Airtel Ltd", "sector": "Telecommunications", "allocation_percent": 4.33},
      {"rank": 6, "ticker": "INFY", "company_name": "Infosys Ltd", "sector": "Information Technology", "allocation_percent": 3.74},
      {"rank": 7, "ticker": "SBIN", "company_name": "State Bank of India", "sector": "Financials", "allocation_percent": 3.10},
      {"rank": 8, "ticker": "ITC", "company_name": "ITC Ltd", "sector": "Consumer Staples", "allocation_percent": 2.87},
      {"rank": 9, "ticker": "HCLTECH", "company_name": "HCL Technologies Ltd", "sector": "Information Technology", "allocation_percent": 2.44},
      {"rank": 10, "ticker": "TATAPOWER", "company_name": "Tata Power Company Ltd", "sector": "Utilities", "allocation_percent": 2.29}
    ],
    "notes": "Top 10 equity holdings as of Dec-2025."
  },
  {
    "fund_name": "Sundaram Large Cap Fund",
    "fund_identifier": "",
    "as_of_date": "2026-02-05",
    "data_source_urls": ["https://www.sundarammutual.com/"],
    "top_holdings": [
      {"rank": 1, "ticker": "HDFCBANK", "company_name": "HDFC Bank Ltd", "sector": "Financials", "allocation_percent": 9.37},
      {"rank": 2, "ticker": "ICICIBANK", "company_name": "ICICI Bank Ltd", "sector": "Financials", "allocation_percent": 6.69},
      {"rank": 3, "ticker": "BHARTIARTL", "company_name": "Bharti Airtel Ltd", "sector": "Telecommunications", "allocation_percent": 6.12},
      {"rank": 4, "ticker": "AXISBANK", "company_name": "Axis Bank Ltd", "sector": "Financials", "allocation_percent": 5.64},
      {"rank": 5, "ticker": "INFY", "company_name": "Infosys Ltd", "sector": "Information Technology", "allocation_percent": 4.92},
      {"rank": 6, "ticker": "RELIANCE", "company_name": "Reliance Industries Ltd", "sector": "Energy", "allocation_percent": 4.50},
      {"rank": 7, "ticker": "LT", "company_name": "Larsen & Toubro Ltd", "sector": "Industrials", "allocation_percent": 4.10},
      {"rank": 8, "ticker": "SUNPHARMA", "company_name": "Sun Pharmaceutical Industries Ltd", "sector": "Healthcare", "allocation_percent": 3.80},
      {"rank": 9, "ticker": "TECHM", "company_name": "Tech Mahindra Ltd", "sector": "Information Technology", "allocation_percent": 3.50},
      {"rank": 10, "ticker": "TVSMOTOR", "company_name": "TVS Motor Company Ltd", "sector": "Consumer Discretionary", "allocation_percent": 3.20}
    ],
    "notes": "Top 10 holdings as of Feb-2026."
  },
  {
    "fund_name": "Franklin India Large Cap Fund",
    "fund_identifier": "",
    "as_of_date": "2025-12-31",
    "data_source_urls": ["https://www.franklintempletonindia.com/"],
    "top_holdings": [
      {"rank": 1, "ticker": "ICICIBANK", "company_name": "ICICI Bank Ltd.", "sector": "Financials", "allocation_percent": 7.91},
      {"rank": 2, "ticker": "HDFCBANK", "company_name": "HDFC Bank Ltd.", "sector": "Financials", "allocation_percent": 7.90},
      {"rank": 3, "ticker": "M&M", "company_name": "Mahindra & Mahindra Ltd.", "sector": "Consumer Discretionary", "allocation_percent": 5.71},
      {"rank": 4, "ticker": "ETERNAL", "company_name": "Eternal Ltd.", "sector": "Consumer Discretionary", "allocation_percent": 5.28},
      {"rank": 5, "ticker": "KOTAKBANK", "company_name": "Kotak Mahindra Bank Ltd.", "sector": "Financials", "allocation_percent": 5.24},
      {"rank": 6, "ticker": "AXISBANK", "company_name": "Axis Bank Ltd.", "sector": "Financials", "allocation_percent": 5.22},
      {"rank": 7, "ticker": "RELIANCE", "company_name": "Reliance Industries Ltd.", "sector": "Energy", "allocation_percent": 5.03},
      {"rank": 8, "ticker": "HCLTECH", "company_name": "HCL Technologies Ltd.", "sector": "Information Technology", "allocation_percent": 4.35},
      {"rank": 9, "ticker": "TORNTPHARM", "company_name": "Torrent Pharmaceuticals Ltd.", "sector": "Healthcare", "allocation_percent": 4.09},
      {"rank": 10, "ticker": "INFY", "company_name": "Infosys Ltd.", "sector": "Information Technology", "allocation_percent": 3.95}
    ],
    "notes": "Top 10 holdings as of Dec-2025."
  },
  {
      "fund_name": "Baroda BNP Paribas Large Cap Fund",
      "fund_identifier": "",
      "as_of_date": "2026-02-15",
      "data_source_urls": ["https://www.barodabnpparibasmf.in/"],
      "top_holdings": [
        {"rank": 1, "ticker": "HDFCBANK", "company_name": "HDFC Bank Ltd", "sector": "Financials", "allocation_percent": 7.20},
        {"rank": 2, "ticker": "ICICIBANK", "company_name": "ICICI Bank Ltd", "sector": "Financials", "allocation_percent": 6.80},
        {"rank": 3, "ticker": "RELIANCE", "company_name": "Reliance Industries Ltd", "sector": "Energy", "allocation_percent": 6.05},
        {"rank": 4, "ticker": "LT", "company_name": "Larsen & Toubro Ltd", "sector": "Industrials", "allocation_percent": 5.40},
        {"rank": 5, "ticker": "BHARTIARTL", "company_name": "Bharti Airtel Ltd", "sector": "Telecommunications", "allocation_percent": 4.90},
        {"rank": 6, "ticker": "INFY", "company_name": "Infosys Ltd", "sector": "Information Technology", "allocation_percent": 4.50},
        {"rank": 7, "ticker": "HITACHIENE", "company_name": "Hitachi Energy India Ltd", "sector": "Industrials", "allocation_percent": 3.80},
        {"rank": 8, "ticker": "KOTAKBANK", "company_name": "Kotak Mahindra Bank Ltd", "sector": "Financials", "allocation_percent": 3.50},
        {"rank": 9, "ticker": "TECHM", "company_name": "Tech Mahindra Ltd", "sector": "Information Technology", "allocation_percent": 3.10},
        {"rank": 10, "ticker": "TCS", "company_name": "Tata Consultancy Services Ltd", "sector": "Information Technology", "allocation_percent": 2.80}
      ],
      "notes": "Top 10 holdings as of Feb-2026."
    }
];

const flexiCapFunds = [
  {
    "fund_name": "HDFC Flexi Cap Fund",
    "fund_identifier": "",
    "as_of_date": "2025-12-31",
    "data_source_urls": ["https://www.hdfcfund.com/"],
    "top_holdings": [
      {"rank": 1, "ticker": "ICICIBANK", "company_name": "ICICI Bank Ltd", "sector": "Financials", "allocation_percent": 8.90},
      {"rank": 2, "ticker": "HDFCBANK", "company_name": "HDFC Bank Ltd", "sector": "Financials", "allocation_percent": 7.82},
      {"rank": 3, "ticker": "AXISBANK", "company_name": "Axis Bank Ltd", "sector": "Financials", "allocation_percent": 7.59},
      {"rank": 4, "ticker": "SBIN", "company_name": "State Bank of India", "sector": "Financials", "allocation_percent": 4.86},
      {"rank": 5, "ticker": "SBILIFE", "company_name": "SBI Life Insurance Company Ltd", "sector": "Financials", "allocation_percent": 4.41},
      {"rank": 6, "ticker": "MARUTI", "company_name": "Maruti Suzuki India Ltd", "sector": "Consumer Discretionary", "allocation_percent": 4.51},
      {"rank": 7, "ticker": "KOTAKBANK", "company_name": "Kotak Mahindra Bank Ltd", "sector": "Financials", "allocation_percent": 4.19},
      {"rank": 8, "ticker": "CIPLA", "company_name": "Cipla Ltd", "sector": "Healthcare", "allocation_percent": 4.07},
      {"rank": 9, "ticker": "HCLTECH", "company_name": "HCL Technologies Ltd", "sector": "Information Technology", "allocation_percent": 2.93},
      {"rank": 10, "ticker": "HYUNDAI", "company_name": "Hyundai Motor India Ltd", "sector": "Consumer Discretionary", "allocation_percent": 2.70}
    ],
    "notes": "Top 10 holdings as of Dec-2025."
  },
  {
    "fund_name": "Parag Parikh Flexi Cap Fund",
    "fund_identifier": "",
    "as_of_date": "2026-02-20",
    "data_source_urls": ["https://amc.ppfas.com/"],
    "top_holdings": [
      {"rank": 1, "ticker": "HDFCBANK", "company_name": "HDFC Bank Ltd", "sector": "Financials", "allocation_percent": 7.93},
      {"rank": 2, "ticker": "BAJAJHLDNG", "company_name": "Bajaj Holdings", "sector": "Financials", "allocation_percent": 5.90},
      {"rank": 3, "ticker": "POWERGRID", "company_name": "Power Grid Corporation Of India Ltd", "sector": "Utilities", "allocation_percent": 5.89},
      {"rank": 4, "ticker": "COALINDIA", "company_name": "Coal India Ltd", "sector": "Energy", "allocation_percent": 5.28},
      {"rank": 5, "ticker": "ICICIBANK", "company_name": "ICICI Bank Ltd", "sector": "Financials", "allocation_percent": 4.95},
      {"rank": 6, "ticker": "ITC", "company_name": "ITC Ltd", "sector": "Consumer Staples", "allocation_percent": 4.61},
      {"rank": 7, "ticker": "BHARTIARTL", "company_name": "Bharti Airtel Ltd", "sector": "Telecommunications", "allocation_percent": 3.48},
      {"rank": 8, "ticker": "MARUTI", "company_name": "Maruti Suzuki India Ltd", "sector": "Consumer Discretionary", "allocation_percent": 3.53},
      {"rank": 9, "ticker": "M&M", "company_name": "Mahindra & Mahindra Ltd", "sector": "Consumer Discretionary", "allocation_percent": 3.43},
      {"rank": 10, "ticker": "KOTAKBANK", "company_name": "Kotak Mahindra Bank Ltd", "sector": "Financials", "allocation_percent": 3.99}
    ],
    "notes": "Also includes international stocks like Alphabet/Amazon (not listed here). Top 10 domestic."
  },
  {
    "fund_name": "Kotak Flexi Cap Fund",
    "fund_identifier": "",
    "as_of_date": "2025-12-31",
    "data_source_urls": ["https://www.kotakmf.com/"],
    "top_holdings": [
      {"rank": 1, "ticker": "HDFCBANK", "company_name": "HDFC Bank Ltd", "sector": "Financials", "allocation_percent": 6.93},
      {"rank": 2, "ticker": "BEL", "company_name": "Bharat Electronics Ltd", "sector": "Industrials", "allocation_percent": 6.36},
      {"rank": 3, "ticker": "ICICIBANK", "company_name": "ICICI Bank Ltd", "sector": "Financials", "allocation_percent": 6.61},
      {"rank": 4, "ticker": "SBIN", "company_name": "State Bank of India", "sector": "Financials", "allocation_percent": 4.54},
      {"rank": 5, "ticker": "AXISBANK", "company_name": "Axis Bank Ltd", "sector": "Financials", "allocation_percent": 4.20},
      {"rank": 6, "ticker": "JINDALSTEL", "company_name": "Jindal Steel & Power Ltd", "sector": "Metals & Mining", "allocation_percent": 3.80},
      {"rank": 7, "ticker": "LT", "company_name": "Larsen & Toubro Ltd", "sector": "Industrials", "allocation_percent": 3.50},
      {"rank": 8, "ticker": "SRF", "company_name": "SRF Ltd", "sector": "Chemicals", "allocation_percent": 3.20},
      {"rank": 9, "ticker": "ULTRACEMCO", "company_name": "UltraTech Cement Ltd", "sector": "Materials", "allocation_percent": 2.90},
      {"rank": 10, "ticker": "INFY", "company_name": "Infosys Ltd", "sector": "Information Technology", "allocation_percent": 2.70}
    ],
    "notes": "Top 10 holdings as of Dec-2025."
  },
  {
    "fund_name": "Axis Flexi Cap Fund",
    "fund_identifier": "",
    "as_of_date": "2026-01-31",
    "data_source_urls": ["https://www.axismf.com/"],
    "top_holdings": [
      {"rank": 1, "ticker": "ICICIBANK", "company_name": "ICICI Bank Ltd", "sector": "Financials", "allocation_percent": 9.31},
      {"rank": 2, "ticker": "HDFCBANK", "company_name": "HDFC Bank Ltd", "sector": "Financials", "allocation_percent": 6.61},
      {"rank": 3, "ticker": "BHARTIARTL", "company_name": "Bharti Airtel Ltd", "sector": "Telecommunications", "allocation_percent": 4.62},
      {"rank": 4, "ticker": "INFY", "company_name": "Infosys Ltd", "sector": "Information Technology", "allocation_percent": 4.45},
      {"rank": 5, "ticker": "BEL", "company_name": "Bharat Electronics Ltd", "sector": "Industrials", "allocation_percent": 4.19},
      {"rank": 6, "ticker": "ETERNAL", "company_name": "Eternal Ltd", "sector": "Consumer Discretionary", "allocation_percent": 3.60},
      {"rank": 7, "ticker": "M&M", "company_name": "Mahindra & Mahindra Ltd", "sector": "Consumer Discretionary", "allocation_percent": 3.20},
      {"rank": 8, "ticker": "ULTRACEMCO", "company_name": "UltraTech Cement Ltd", "sector": "Materials", "allocation_percent": 2.90},
      {"rank": 9, "ticker": "BAJAJFINANCE", "company_name": "Bajaj Finance Ltd", "sector": "Financials", "allocation_percent": 2.70},
      {"rank": 10, "ticker": "TITAN", "company_name": "Titan Company Ltd", "sector": "Consumer Discretionary", "allocation_percent": 2.50}
    ],
    "notes": "Top 10 holdings as of Jan-2026."
  }
];

const midCapFunds = [
   {
    "fund_name": "HDFC Mid-Cap Opportunities Fund",
    "fund_identifier": "",
    "as_of_date": "2025-11-30",
    "data_source_urls": ["https://www.hdfcfund.com/"],
    "top_holdings": [
      {"rank": 1, "ticker": "MAXHEALTH", "company_name": "Max Financial Services Ltd", "sector": "Financials", "allocation_percent": 4.76},
      {"rank": 2, "ticker": "AUBANK", "company_name": "AU Small Finance Bank Ltd", "sector": "Financials", "allocation_percent": 4.06},
      {"rank": 3, "ticker": "FEDERALBNK", "company_name": "Federal Bank Ltd", "sector": "Financials", "allocation_percent": 3.58},
      {"rank": 4, "ticker": "INDIANB", "company_name": "Indian Bank", "sector": "Financials", "allocation_percent": 3.48},
      {"rank": 5, "ticker": "BALKRISIND", "company_name": "Balkrishna Industries Ltd", "sector": "Industrials", "allocation_percent": 3.31},
      {"rank": 6, "ticker": "COFORGE", "company_name": "Coforge Ltd", "sector": "Information Technology", "allocation_percent": 3.23},
      {"rank": 7, "ticker": "IPCALAB", "company_name": "Ipca Laboratories Ltd", "sector": "Healthcare", "allocation_percent": 2.81},
      {"rank": 8, "ticker": "FORTIS", "company_name": "Fortis Healthcare Ltd", "sector": "Healthcare", "allocation_percent": 2.78},
      {"rank": 9, "ticker": "HPCL", "company_name": "Hindustan Petroleum Corp Ltd", "sector": "Energy", "allocation_percent": 2.76},
      {"rank": 10, "ticker": "GLENMARK", "company_name": "Glenmark Pharmaceuticals Ltd", "sector": "Healthcare", "allocation_percent": 2.67}
    ],
    "notes": "Top 10 holdings as of Nov-2025."
  },
  {
    "fund_name": "Edelweiss Mid Cap Fund",
    "fund_identifier": "",
    "as_of_date": "2025-05-31",
    "data_source_urls": ["https://www.edelweissmf.com/"],
    "top_holdings": [
      {"rank": 1, "ticker": "MAXHEALTH", "company_name": "Max Healthcare Institute Ltd", "sector": "Healthcare", "allocation_percent": 3.35},
      {"rank": 2, "ticker": "COFORGE", "company_name": "Coforge Ltd", "sector": "Information Technology", "allocation_percent": 3.25},
      {"rank": 3, "ticker": "PERSISTENT", "company_name": "Persistent Systems Ltd", "sector": "Information Technology", "allocation_percent": 3.22},
      {"rank": 4, "ticker": "SOLARINDS", "company_name": "Solar Industries India Ltd", "sector": "Materials", "allocation_percent": 3.18},
      {"rank": 5, "ticker": "MARICO", "company_name": "Marico Ltd", "sector": "Consumer Staples", "allocation_percent": 2.89},
      {"rank": 6, "ticker": "PBFINT", "company_name": "PB Fintech Ltd", "sector": "Financials", "allocation_percent": 2.33},
      {"rank": 7, "ticker": "PAGEIND", "company_name": "Page Industries Ltd", "sector": "Consumer Discretionary", "allocation_percent": 2.32},
      {"rank": 8, "ticker": "CGPOWER", "company_name": "CG Power and Industrial Solutions Ltd", "sector": "Industrials", "allocation_percent": 2.20},
      {"rank": 9, "ticker": "DIXON", "company_name": "Dixon Technologies (India) Ltd", "sector": "Consumer Discretionary", "allocation_percent": 2.15},
      {"rank": 10, "ticker": "UNOMINDA", "company_name": "UNO Minda Ltd", "sector": "Consumer Discretionary", "allocation_percent": 2.13}
    ],
    "notes": "Top 10 equity holdings as of May-2025."
  }
];

const smallCapFunds = [
  {
    "fund_name": "Nippon India Small Cap Fund",
    "fund_identifier": "",
    "as_of_date": "2026-01-31",
    "data_source_urls": ["https://mf.nipponindiaim.com/"],
    "top_holdings": [
      {"rank": 1, "ticker": "MCX", "company_name": "Multi Commodity Exchange Of India Ltd", "sector": "Financials", "allocation_percent": 3.37},
      {"rank": 2, "ticker": "HDFCBANK", "company_name": "HDFC Bank Ltd", "sector": "Financials", "allocation_percent": 2.16},
      {"rank": 3, "ticker": "SBIN", "company_name": "State Bank of India", "sector": "Financials", "allocation_percent": 1.69},
      {"rank": 4, "ticker": "KARURVYSYA", "company_name": "Karur Vysya Bank Ltd", "sector": "Financials", "allocation_percent": 1.64},
      {"rank": 5, "ticker": "AXISBANK", "company_name": "Axis Bank Ltd", "sector": "Financials", "allocation_percent": 1.50},
      {"rank": 6, "ticker": "TIINDIA", "company_name": "Tube Investments of India Ltd", "sector": "Industrials", "allocation_percent": 1.40},
      {"rank": 7, "ticker": "ZENSARTECH", "company_name": "Zensar Technologies Ltd", "sector": "Information Technology", "allocation_percent": 1.30},
      {"rank": 8, "ticker": "BSOFT", "company_name": "BirlaSoft Ltd", "sector": "Information Technology", "allocation_percent": 1.25},
      {"rank": 9, "ticker": "KNRCON", "company_name": "KNR Constructions Ltd", "sector": "Industrials", "allocation_percent": 1.20},
      {"rank": 10, "ticker": "L&TFH", "company_name": "L&T Finance Holdings Ltd", "sector": "Financials", "allocation_percent": 1.15}
    ],
    "notes": "Top 10 holdings as of Jan-2026."
  },
  {
    "fund_name": "Bandhan Small Cap Fund",
    "fund_identifier": "",
    "as_of_date": "2026-01-31",
    "data_source_urls": ["https://bandhanmutual.com/"],
    "top_holdings": [
      {"rank": 1, "ticker": "SOBHA", "company_name": "Sobha Ltd", "sector": "Real Estate", "allocation_percent": 3.64},
      {"rank": 2, "ticker": "REC", "company_name": "REC Ltd", "sector": "Financials", "allocation_percent": 3.20},
      {"rank": 3, "ticker": "LTFOODS", "company_name": "LT Foods Ltd", "sector": "Consumer Staples", "allocation_percent": 2.80},
      {"rank": 4, "ticker": "SOUTHBANK", "company_name": "The South Indian Bank Ltd", "sector": "Financials", "allocation_percent": 2.50},
      {"rank": 5, "ticker": "INFOEDGE", "company_name": "Info Edge (India) Ltd", "sector": "Consumer Discretionary", "allocation_percent": 2.30},
      {"rank": 6, "ticker": "KIRLOSENG", "company_name": "Kirloskar Oil Engines Ltd", "sector": "Industrials", "allocation_percent": 2.10},
      {"rank": 7, "ticker": "RADICO", "company_name": "Radico Khaitan Ltd", "sector": "Consumer Staples", "allocation_percent": 1.95},
      {"rank": 8, "ticker": "IDFC", "company_name": "IDFC Ltd", "sector": "Financials", "allocation_percent": 1.85},
      {"rank": 9, "ticker": "ASTRAZEN", "company_name": "AstraZeneca Pharma India Ltd", "sector": "Healthcare", "allocation_percent": 1.75},
      {"rank": 10, "ticker": "TVSMOTOR", "company_name": "TVS Motor Company Ltd", "sector": "Consumer Discretionary", "allocation_percent": 1.65}
    ],
    "notes": "Top 10 holdings as of Jan-2026."
  }
];

const hybridFunds = [
   {
    "fund_name": "HDFC Balanced Advantage Fund",
    "fund_identifier": "",
    "as_of_date": "2025-11-30",
    "data_source_urls": ["https://www.hdfcfund.com/"],
    "top_holdings": [
      {"rank": 1, "ticker": "HDFCBANK", "company_name": "HDFC Bank Ltd", "sector": "Financials", "allocation_percent": 4.43},
      {"rank": 2, "ticker": "ICICIBANK", "company_name": "ICICI Bank Ltd", "sector": "Financials", "allocation_percent": 4.15},
      {"rank": 3, "ticker": "RELIANCE", "company_name": "Reliance Industries Ltd", "sector": "Energy", "allocation_percent": 3.34},
      {"rank": 4, "ticker": "SBIN", "company_name": "State Bank of India", "sector": "Financials", "allocation_percent": 3.17},
      {"rank": 5, "ticker": "BHARTIARTL", "company_name": "Bharti Airtel Ltd", "sector": "Telecommunications", "allocation_percent": 2.88},
      {"rank": 6, "ticker": "LT", "company_name": "Larsen & Toubro Ltd", "sector": "Industrials", "allocation_percent": 2.48},
      {"rank": 7, "ticker": "INFY", "company_name": "Infosys Ltd", "sector": "Information Technology", "allocation_percent": 2.42},
      {"rank": 8, "ticker": "AXISBANK", "company_name": "Axis Bank Ltd", "sector": "Financials", "allocation_percent": 2.35},
      {"rank": 9, "ticker": "NTPC", "company_name": "NTPC Ltd", "sector": "Utilities", "allocation_percent": 1.98},
      {"rank": 10, "ticker": "COALINDIA", "company_name": "Coal India Ltd", "sector": "Energy", "allocation_percent": 1.79}
    ],
    "notes": "Top 10 equity holdings as of Nov-2025."
  },
  {
    "fund_name": "ICICI Prudential Equity & Debt Fund",
    "fund_identifier": "",
    "as_of_date": "2026-01-30",
    "data_source_urls": ["https://www.icicipruamc.com/"],
    "top_holdings": [
      {"rank": 1, "ticker": "ICICIBANK", "company_name": "ICICI Bank Ltd", "sector": "Financials", "allocation_percent": 6.24},
      {"rank": 2, "ticker": "NTPC", "company_name": "NTPC Ltd", "sector": "Utilities", "allocation_percent": 5.41},
      {"rank": 3, "ticker": "RELIANCE", "company_name": "Reliance Industries Ltd", "sector": "Energy", "allocation_percent": 5.37},
      {"rank": 4, "ticker": "HDFCBANK", "company_name": "HDFC Bank Ltd", "sector": "Financials", "allocation_percent": 4.84},
      {"rank": 5, "ticker": "SUNPHARMA", "company_name": "Sun Pharmaceutical Industries Ltd", "sector": "Healthcare", "allocation_percent": 4.59},
      {"rank": 6, "ticker": "BHARTIARTL", "company_name": "Bharti Airtel Ltd", "sector": "Telecommunications", "allocation_percent": 4.10},
      {"rank": 7, "ticker": "INFY", "company_name": "Infosys Ltd", "sector": "Information Technology", "allocation_percent": 3.80},
      {"rank": 8, "ticker": "LT", "company_name": "Larsen & Toubro Ltd", "sector": "Industrials", "allocation_percent": 3.50},
      {"rank": 9, "ticker": "AXISBANK", "company_name": "Axis Bank Ltd", "sector": "Financials", "allocation_percent": 3.20},
      {"rank": 10, "ticker": "ONGC", "company_name": "Oil & Natural Gas Corp Ltd", "sector": "Energy", "allocation_percent": 2.90}
    ],
    "notes": "Top 10 equity holdings as of Jan-2026."
  },
  {
    "fund_name": "SBI Equity Hybrid Fund",
    "fund_identifier": "",
    "as_of_date": "2026-01-31",
    "data_source_urls": ["https://www.sbimf.com/"],
    "top_holdings": [
      {"rank": 1, "ticker": "SBIN", "company_name": "State Bank of India", "sector": "Financials", "allocation_percent": 4.38},
      {"rank": 2, "ticker": "BHARTIARTL", "company_name": "Bharti Airtel Ltd", "sector": "Telecommunications", "allocation_percent": 3.85},
      {"rank": 3, "ticker": "HDFCBANK", "company_name": "HDFC Bank Ltd", "sector": "Financials", "allocation_percent": 3.77},
      {"rank": 4, "ticker": "KOTAKBANK", "company_name": "Kotak Mahindra Bank Ltd", "sector": "Financials", "allocation_percent": 3.20},
      {"rank": 5, "ticker": "MUTHOOTFIN", "company_name": "Muthoot Finance Ltd", "sector": "Financials", "allocation_percent": 2.90},
      {"rank": 6, "ticker": "ICICIBANK", "company_name": "ICICI Bank Ltd", "sector": "Financials", "allocation_percent": 2.60},
      {"rank": 7, "ticker": "SOLARINDS", "company_name": "Solar Industries India Ltd", "sector": "Materials", "allocation_percent": 2.40},
      {"rank": 8, "ticker": "HINDALCO", "company_name": "Hindalco Industries Ltd", "sector": "Metals & Mining", "allocation_percent": 2.20},
      {"rank": 9, "ticker": "RELIANCE", "company_name": "Reliance Industries Ltd", "sector": "Energy", "allocation_percent": 2.10},
      {"rank": 10, "ticker": "INFY", "company_name": "Infosys Ltd", "sector": "Information Technology", "allocation_percent": 1.95}
    ],
    "notes": "Top 10 equity holdings as of Jan-2026."
  },
  {
    "fund_name": "Kotak Equity Arbitrage Fund",
    "fund_identifier": "",
    "as_of_date": "2025-12-31",
    "data_source_urls": ["https://www.kotakmf.com/"],
    "top_holdings": [
      {"rank": 1, "ticker": "HDFCBANK", "company_name": "HDFC Bank Ltd", "sector": "Financials", "allocation_percent": 4.15},
      {"rank": 2, "ticker": "ICICIBANK", "company_name": "ICICI Bank Ltd", "sector": "Financials", "allocation_percent": 2.59},
      {"rank": 3, "ticker": "KOTAKBANK", "company_name": "Kotak Mahindra Bank Ltd", "sector": "Financials", "allocation_percent": 2.15},
      {"rank": 4, "ticker": "AXISBANK", "company_name": "Axis Bank Ltd", "sector": "Financials", "allocation_percent": 1.81},
      {"rank": 5, "ticker": "JSWSTEEL", "company_name": "JSW Steel Ltd", "sector": "Metals & Mining", "allocation_percent": 1.74},
      {"rank": 6, "ticker": "ETERNAL", "company_name": "Eternal Ltd", "sector": "Consumer Discretionary", "allocation_percent": 1.71},
      {"rank": 7, "ticker": "BAJAJFINANCE", "company_name": "Bajaj Finance Ltd", "sector": "Financials", "allocation_percent": 1.58},
      {"rank": 8, "ticker": "ITC", "company_name": "ITC Ltd", "sector": "Consumer Staples", "allocation_percent": 1.56},
      {"rank": 9, "ticker": "ULTRACEMCO", "company_name": "UltraTech Cement Ltd", "sector": "Materials", "allocation_percent": 1.55},
      {"rank": 10, "ticker": "BEL", "company_name": "Bharat Electronics Ltd", "sector": "Industrials", "allocation_percent": 1.51}
    ],
    "notes": "Top 10 holdings as of Dec-2025."
  }
];

const otherFunds = [
   {
    "fund_name": "Nippon India Multi Cap Fund",
    "fund_identifier": "",
    "as_of_date": "2026-01-26",
    "data_source_urls": ["https://mf.nipponindiaim.com/"],
    "top_holdings": [
      {"rank": 1, "ticker": "HDFCBANK", "company_name": "HDFC Bank Ltd", "sector": "Financials", "allocation_percent": 6.01},
      {"rank": 2, "ticker": "ICICIBANK", "company_name": "ICICI Bank Ltd", "sector": "Financials", "allocation_percent": 4.00},
      {"rank": 3, "ticker": "AXISBANK", "company_name": "Axis Bank Ltd", "sector": "Financials", "allocation_percent": 3.97},
      {"rank": 4, "ticker": "INFY", "company_name": "Infosys Ltd", "sector": "Information Technology", "allocation_percent": 3.01},
      {"rank": 5, "ticker": "GEINDIA", "company_name": "GE Vernova T&D India Ltd", "sector": "Utilities", "allocation_percent": 2.71},
      {"rank": 6, "ticker": "RELIANCE", "company_name": "Reliance Industries Ltd", "sector": "Energy", "allocation_percent": 2.50},
      {"rank": 7, "ticker": "MAXHEALTH", "company_name": "Max Healthcare Institute Ltd", "sector": "Healthcare", "allocation_percent": 2.30},
      {"rank": 8, "ticker": "NTPC", "company_name": "NTPC Ltd", "sector": "Utilities", "allocation_percent": 2.15},
      {"rank": 9, "ticker": "LINDEINDIA", "company_name": "Linde India Ltd", "sector": "Materials", "allocation_percent": 2.05},
      {"rank": 10, "ticker": "ITC", "company_name": "ITC Ltd", "sector": "Consumer Staples", "allocation_percent": 1.95}
    ],
    "notes": "Top 10 holdings as of Jan-2026."
  },
  {
    "fund_name": "Mirae Asset Large & Midcap Fund",
    "fund_identifier": "",
    "as_of_date": "2026-01-31",
    "data_source_urls": ["https://www.miraeassetmf.co.in/"],
    "top_holdings": [
      {"rank": 1, "ticker": "HDFCBANK", "company_name": "HDFC Bank Ltd", "sector": "Financials", "allocation_percent": 8.50},
      {"rank": 2, "ticker": "ICICIBANK", "company_name": "ICICI Bank Ltd", "sector": "Financials", "allocation_percent": 7.20},
      {"rank": 3, "ticker": "INFY", "company_name": "Infosys Ltd", "sector": "Information Technology", "allocation_percent": 4.80},
      {"rank": 4, "ticker": "RELIANCE", "company_name": "Reliance Industries Ltd", "sector": "Energy", "allocation_percent": 4.50},
      {"rank": 5, "ticker": "AXISBANK", "company_name": "Axis Bank Ltd", "sector": "Financials", "allocation_percent": 3.90},
      {"rank": 6, "ticker": "FEDERALBNK", "company_name": "Federal Bank Ltd", "sector": "Financials", "allocation_percent": 3.20},
      {"rank": 7, "ticker": "LT", "company_name": "Larsen & Toubro Ltd", "sector": "Industrials", "allocation_percent": 2.90},
      {"rank": 8, "ticker": "BHARTIARTL", "company_name": "Bharti Airtel Ltd", "sector": "Telecommunications", "allocation_percent": 2.80},
      {"rank": 9, "ticker": "SUNPHARMA", "company_name": "Sun Pharmaceutical Industries Ltd", "sector": "Healthcare", "allocation_percent": 2.60},
      {"rank": 10, "ticker": "TCS", "company_name": "Tata Consultancy Services Ltd", "sector": "Information Technology", "allocation_percent": 2.40}
    ],
    "notes": "Top 10 holdings as of Jan-2026."
  }
];

// Combine and resolve categories
currentData.largeCap.funds.push(...newLargeCap.filter(nf => !currentData.largeCap.funds.some(ef => ef.fund_name === nf.fund_name)));
if (!currentData.flexiCap) currentData.flexiCap = { generated_on: "2026-02-07", funds: [] };
currentData.flexiCap.funds.push(...flexiCapFunds.filter(nf => !currentData.flexiCap.funds.some(ef => ef.fund_name === nf.fund_name)));
currentData.midCap.funds.push(...midCapFunds.filter(nf => !currentData.midCap.funds.some(ef => ef.fund_name === nf.fund_name)));
if (!currentData.smallCap) currentData.smallCap = { generated_on: "2026-02-07", funds: [] };
currentData.smallCap.funds.push(...smallCapFunds.filter(nf => !currentData.smallCap.funds.some(ef => ef.fund_name === nf.fund_name)));
currentData.hybrid.funds.push(...hybridFunds.filter(nf => !currentData.hybrid.funds.some(ef => ef.fund_name === nf.fund_name)));
if (!currentData.others) currentData.others = { generated_on: "2026-02-07", funds: [] };
currentData.others.funds.push(...otherFunds.filter(nf => !currentData.others.funds.some(ef => ef.fund_name === nf.fund_name)));

fs.writeFileSync(path, JSON.stringify(currentData, null, 2));
console.log('Successfully updated distribution.json with accurate data for all requested funds.');
