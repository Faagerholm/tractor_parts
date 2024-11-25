const express = require('express');
const Product = require('../models/product');

const router = express.Router();

// GET: Search products
// GET: Search products
router.get('/search', async (req, res) => {
  try {
    const { query } = req.query; // Extract the search query from URL parameters
    const regex = new RegExp(query, 'i'); // Case-insensitive regex for partial matching

    // Search across multiple fields
    const results = await Product.find({
      $or: [
        { name: regex },
        { number: regex }, // Assuming this corresponds to "OEM Numbers"
        { price: regex },
        { site: regex },
      ],
    }).limit(50); // Limit the results to 50 items

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving data', details: err.message });
  }
});

module.exports = router;
