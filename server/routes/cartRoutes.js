const express = require('express');
const router = express.Router();
const { pool } = require('../config/db.js');

// Add or update cart item
router.post('/addOrUpdateCart', async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        // Fetch the stock quantity of the product
        const stockQuery = `
      SELECT qty FROM product WHERE Product_ID = ?
    `;
        const [stockRows] = await pool.query(stockQuery, [productId]);
        const stockQuantity = stockRows[0].qty;

        // Validate the requested quantity
        if (quantity > stockQuantity) {
            return res.status(400).send('Invalid quantity. Exceeds stock quantity.');
        }

        const query = `
            INSERT INTO cart (ID, Product_ID, Qty) 
            VALUES (?, ?, ?) 
            ON DUPLICATE KEY UPDATE Qty = VALUES(Qty)
        `;

    

        await pool.query(query, [userId, productId, quantity]);
        
        res.status(200).send('Cart updated successfully');
    } catch (error) {
        console.error('Failed to update cart:', error);
        res.status(500).send('Error updating cart');
    }
});

// // Get all cart items for a user
router.get('/cart/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;

        const query = `
            SELECT cart.*, product.*
            FROM cart
            JOIN product ON cart.Product_ID = product.Product_ID
            WHERE cart.ID = ?
        `;

        const [rows] = await pool.query(query, [userId]);
        res.json(rows);
    } catch (error) {
        console.error('Failed to get cart items:', error);
        res.status(500).send('Error getting cart items');
    }
});

// Update cart item quantity
router.put('/cart/:userId/:productId', async (req, res) => {
    try {
        const { userId, productId } = req.params;
        const { quantity } = req.body;

        // Fetch the stock quantity of the product
        const stockQuery = `
      SELECT qty FROM product WHERE Product_ID = ?
    `;
        const [stockRows] = await pool.query(stockQuery, [productId]);
        const stockQuantity = stockRows[0].qty;

        // Validate the requested quantity
        if (quantity > stockQuantity) {
            return res.status(400).send('Invalid quantity. Exceeds stock quantity.');
        }


        const query = `
            UPDATE cart 
            SET Qty = ? 
            WHERE ID = ? AND Product_ID = ?
        `;

        await pool.query(query, [quantity, userId, productId]);
        
        res.status(200).send('Cart item updated successfully');
    } catch (error) {
        console.error('Failed to update cart item:', error);
        res.status(500).send('Error updating cart item');
    }
});

// Delete cart item
router.delete('/cart/:userId/:productId', async (req, res) => {
    try {
        const { userId, productId } = req.params;

        const query = `
            DELETE FROM cart 
            WHERE ID = ? AND Product_ID = ?
        `;

        await pool.query(query, [userId, productId]);
        
        res.status(200).send('Cart item deleted successfully');
    } catch (error) {
        console.error('Failed to delete cart item:', error);
        res.status(500).send('Error deleting cart item');
    }
});

module.exports = router;
