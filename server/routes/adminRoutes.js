const express = require('express');
const app = express();
const { pool } = require('../config/db.js');
const path = require('path');


router.get('/api/chartsData', (req, res) => {
    const { productId } = req.params;
    try {
        // Assuming data is an object with topProductsData, ordersData, revenueData, and slowProductsData properties
        const { topProductsData, ordersData, revenueData, slowProductsData } = data;

        res.json({ topProductsData, ordersData, revenueData, slowProductsData });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
