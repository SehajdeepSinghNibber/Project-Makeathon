const express = require("express");
const fs = require("fs/promises");
const path = require("path");

const router = express.Router();

let cachedFunds = null;

const loadFunds = async () => {
  if (cachedFunds) {
    return cachedFunds;
  }

  const datasetPath = path.join(__dirname, "..", "funds.json");
  const raw = await fs.readFile(datasetPath, "utf-8");
  cachedFunds = JSON.parse(raw);
  return cachedFunds;
};

router.get("/list", async (req, res) => {
  try {
    const funds = await loadFunds();
    const summarized = funds.map((fund) => ({
      scheme_name: fund.scheme_name,
      category: fund.category,
      benchmark: fund.benchmark,
      riskometer_scheme: fund.riskometer_scheme,
      riskometer_benchmark: fund.riskometer_benchmark,
      return_1y_regular: fund.return_1y_regular,
      return_3y_regular: fund.return_3y_regular,
      return_5y_regular: fund.return_5y_regular,
      nav: fund.nav,
      aum: fund.aum,
    }));

    res.json({ funds: summarized });
  } catch (error) {
    console.error("Compare list error:", error);
    res.status(500).json({ message: "Unable to load fund list" });
  }
});

router.post("/details", async (req, res) => {
  try {
    const { schemes } = req.body || {};

    if (!Array.isArray(schemes) || schemes.length === 0) {
      return res.status(400).json({ message: "Provide an array of scheme names to compare." });
    }

    if (schemes.length > 5) {
      return res.status(400).json({ message: "You can compare up to 5 funds." });
    }

    const normalizedSchemes = schemes
      .map((name) => (typeof name === "string" ? name.trim().toLowerCase() : ""))
      .filter(Boolean);

    if (!normalizedSchemes.length) {
      return res.status(400).json({ message: "Scheme names must be non-empty strings." });
    }

    const funds = await loadFunds();

    const matches = funds.filter((fund) =>
      normalizedSchemes.includes(fund.scheme_name?.trim().toLowerCase())
    );

    const missing = schemes.filter((name) => {
      const normalized = typeof name === "string" ? name.trim().toLowerCase() : "";
      return !matches.find(
        (fund) => fund.scheme_name?.trim().toLowerCase() === normalized
      );
    });

    res.json({ funds: matches, missing });
  } catch (error) {
    console.error("Compare details error:", error);
    res.status(500).json({ message: "Unable to load comparison data" });
  }
});

module.exports = router;
