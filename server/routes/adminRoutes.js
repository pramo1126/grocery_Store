const express = require('express');
const router = express.Router();
const { pool } = require('../config/db.js');

router.get('/chartsData', async (req, res) => {
    try {
        // Fetch top products data
        const topProductsQuery = `SELECT Product_Name, SUM(Cart_Qty) as TotalSold 
        FROM order_product 
        JOIN product ON order_product.Product_ID = product.Product_ID 
        GROUP BY Product_Name 
        ORDER BY TotalSold DESC 
        LIMIT 5`;
        const topProductsResult = await pool.query(topProductsQuery);
        const topProductsRows = topProductsResult[0];
        const topProductsData = {
            labels: topProductsRows.map(row => row.Product_Name),
            datasets: [{
                data: topProductsRows.map(row => row.TotalSold),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
            }]
        };

        // Fetch orders data for the last 7 days
        const ordersQuery = `SELECT DATE_SUB(DATE(NOW()), INTERVAL num DAY) AS OrderDate, 
               COUNT(orders.Order_ID) AS OrderCount 
        FROM (
            SELECT 0 AS num UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3
            UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6
        ) AS nums
        LEFT JOIN orders ON DATE(orders.Date) = DATE_SUB(DATE(NOW()), INTERVAL num DAY)
        GROUP BY OrderDate 
        ORDER BY OrderDate`;
        const ordersResult = await pool.query(ordersQuery);
        const ordersRows = ordersResult[0];
        const ordersData = {
            labels: ordersRows.map(row => formatDate(row.OrderDate)),
            datasets: [{
                label: 'Number of Orders',
                data: ordersRows.map(row => row.OrderCount),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        };

        // Fetch revenue data for the last 7 days
        const revenueQuery = `SELECT DATE_SUB(DATE(NOW()), INTERVAL num DAY) AS OrderDate, 
               SUM(orders.Grand_Total) AS TotalRevenue 
        FROM (
            SELECT 0 AS num UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3
            UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6
        ) AS nums
        LEFT JOIN orders ON DATE(orders.Date) = DATE_SUB(DATE(NOW()), INTERVAL num DAY)
        GROUP BY OrderDate 
        ORDER BY OrderDate`;
        const revenueResult = await pool.query(revenueQuery);
        const revenueRows = revenueResult[0];
        const revenueData = {
            labels: revenueRows.map(row => formatDate(row.OrderDate)),
            datasets: [{
                label: 'Revenue',
                data: revenueRows.map(row => row.TotalRevenue),
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            }]
        };

       

        router.post('/revenue', async (req, res) => {
            try {
                const { startDate, endDate } = req.body;

                // Query to fetch the total revenue between the selected start and end dates
                const query = `
      SELECT p.Product_Name, SUM(op.Cart_Qty) as quantity, p.Price, SUM(op.Cart_Qty * p.Price) as total
      FROM order_product op
      JOIN orders o ON op.Order_ID = o.Order_ID
      JOIN product p ON op.Product_ID = p.Product_ID
      WHERE DATE(o.Date) BETWEEN ? AND ?
      GROUP BY p.Product_ID
    `;

                const result = await pool.query(query, [startDate, endDate]);
                const revenueDetails = result[0];
                const totalRevenue = revenueDetails.reduce((acc, item) => acc + item.total, 0);

                res.json({ revenueDetails, totalRevenue });

            } catch (error) {
                console.error('Error generating report:', error);
                res.status(500).send('Failed to generate report');
            }
        });
        

        // Fetch slow products data limited to the top 5 items
        const slowProductsQuery = `SELECT Product_Name, SUM(Cart_Qty) as TotalSold 
                                   FROM order_product 
                                   JOIN product ON order_product.Product_ID = product.Product_ID 
                                   GROUP BY Product_Name 
                                   ORDER BY TotalSold ASC 
                                   LIMIT 5`;
        const slowProductsResult = await pool.query(slowProductsQuery);
        const slowProductsRows = slowProductsResult[0];
        const slowProductsData = {
            labels: slowProductsRows.map(row => row.Product_Name),
            datasets: [{
                data: slowProductsRows.map(row => row.TotalSold),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
            }]
        };

        // Fetch category-wise items
        const categoryWiseItemsQuery = `SELECT pc.Product_Category, SUM(p.qty) as TotalQty 
        FROM product p
        JOIN productcategory pc ON p.Category_ID = pc.Category_ID 
        GROUP BY pc.Product_Category`;
        const categoryWiseItemsResult = await pool.query(categoryWiseItemsQuery);
        const categoryWiseItemsRows = categoryWiseItemsResult[0];
        const categoryWiseItemsData = {
            labels: categoryWiseItemsRows.map(row => row.Product_Category),
            datasets: [{
                data: categoryWiseItemsRows.map(row => row.TotalQty),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
            }]
        };

        // Fetch total users
        const totalCustomersQuery = `SELECT COUNT(*) as TotalCustomers FROM users`;
        const totalCustomersResult = await pool.query(totalCustomersQuery);
        const totalCustomers = totalCustomersResult[0][0].TotalCustomers;

        // Fetch total items
        const totalItemsQuery = `SELECT SUM(qty) as TotalItems FROM product`;
        const totalItemsResult = await pool.query(totalItemsQuery);
        const totalItems = totalItemsResult[0][0].TotalItems;

        res.json({
            topProductsData,
            ordersData,
            revenueData,
            slowProductsData,
            totalCustomers,
            totalItems,
            categoryWiseItems: categoryWiseItemsData
        });

    } catch (error) {
        console.error('Error fetching chart data:', error);
        res.status(500).send('Failed to fetch chart data');
    }
});

// Helper function to format date to 'YYYY-MM-DD'
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

module.exports = router;
