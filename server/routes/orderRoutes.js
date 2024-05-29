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

        res.status(201).send('Order saved successfully and product quantities updated');
    } catch (error) {
        await connection.rollback();
        console.error('Error saving order:', error);
        res.status(500).send('An error occurred while saving the order and updating product quantities');
    } finally {
        connection.release();
    }
});


//display orders to admin
router.get('/orders/:orderId', async (req, res) => {
    const orderId = req.params.orderId;
    const connection = await pool.getConnection();
    try {
        const [orderDetails] = await connection.query(
            `SELECT o.Order_ID, o.Customer_Name, o.Contact_Number, o.Grand_Total, o.Delivery_Location, op.Product_ID, op.Cart_Qty
            FROM orders o
            JOIN order_product op ON o.Order_ID = op.Order_ID
            WHERE o.Order_ID = ?`,
            [orderId]
        );

        if (orderDetails.length === 0) {
            return res.status(404).send('Order not found');
        }

        res.render('orderDetails', { order: orderDetails[0] });
    } catch (error) {
        console.error('Error fetching order details:', error);
        res.status(500).send('Error fetching order details');
    } finally {
        connection.release();
    }
});

module.exports = router;