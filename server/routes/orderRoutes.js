const express = require('express');
const router = express.Router();
const { pool } = require('../config/db.js');





// POST route to save order details
router.post('/saveOrder', async (req, res) => {
    const connection = await pool.getConnection();

    try {
        const { Customer_Name, Contact_Number, Delivery_Location, Notes, Grand_Total, Date, Items } = req.body;
        const items = JSON.parse(Items);

        await connection.beginTransaction();

        // Insert the order
        const orderQuery = `INSERT INTO orders (Customer_Name, Contact_Number, Delivery_Location, Notes, Grand_Total, Date) VALUES (?, ?, ?, ?, ?, ?)`;
        const [orderResult] = await connection.query(orderQuery, [Customer_Name, Contact_Number, Delivery_Location, Notes, Grand_Total, Date]);

        const orderId = orderResult.insertId;

        // Insert the ordered products and update their quantities
        for (const item of items) {
            const { Product_ID, Qty } = item;

            // Insert into order_product table
            const orderProductQuery = `INSERT INTO order_product (Order_ID, Product_ID, Cart_Qty) VALUES (?, ?, ?)`;
            await connection.query(orderProductQuery, [orderId, Product_ID, Qty]);

            // Update the quantity in the products table
            const updateProductQuery = `UPDATE product SET qty = qty - ? WHERE Product_ID = ? AND qty >= ?`;
            const [updateResult] = await connection.query(updateProductQuery, [Qty, Product_ID, Qty]);

            if (updateResult.affectedRows === 0) {
                throw new Error(`Insufficient stock for Product ID: ${Product_ID}`);
            }
        }

        await connection.commit();

        res.status(201).send('Order saved successfully and You will receive within next few hours');
    } catch (error) {
        await connection.rollback();
        console.error('Error saving order:', error);
        res.status(500).send('An error occurred while saving the order and updating product quantities');
    } finally {
        connection.release();
    }
});






router.get('/order/getallorder', async (req, res) => {
    try {
        const sql = `
            SELECT 
                o.Order_ID,
                o.Customer_Name,
                o.Contact_Number,
                o.Delivery_Location,
                o.Notes,
                o.Grand_Total,
                o.Date,
                GROUP_CONCAT(CONCAT(p.Product_Name, ' (', op.Cart_Qty, ')') SEPARATOR ', ') AS Products
            FROM 
                orders o
            JOIN 
                order_product op ON o.Order_ID = op.Order_ID
            JOIN 
                product p ON op.Product_ID = p.Product_ID
            GROUP BY 
                o.Order_ID
            ORDER BY 
                o.Date DESC
        `;
        const [results] = await pool.query(sql);
        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;
