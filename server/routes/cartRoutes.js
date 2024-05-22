const express = require('express');
const router = express.Router();
const { pool } = require('../config/db.js');

// Endpoint to add or update items in the cart
router.post('/addOrUpdateCart', async (req, res) => {
    const { userId, productId, quantity } = req.body;
    const query = `
        INSERT INTO cart (ID, Product_ID, Qty) 
        VALUES (?, ?, ?) 
        ON DUPLICATE KEY UPDATE Qty = ?
    `;
    try {
        pool.query(query, [userId, productId, quantity, quantity], (err, result) => {
            if (err) {
                console.error('Failed to update cart:', err);
                return res.status(500).send('Error updating cart');
            }
            res.status(200).send('Cart updated successfully');
        });
    } catch (error) {
        console.error('Failed to update cart:', error);
        res.status(500).send('Error updating cart');
    }
});

// Endpoint to get cart items for a user
router.get('/getCartItems', async (req, res) => {
    const { userId } = req.query;

    const query = `
        SELECT c.Cart_Id, c.ID, c.Product_ID, c.Qty, p.Product_Name, p.Price
        FROM cart c
        JOIN product p ON c.Product_ID = p.Product_ID
        WHERE c.ID = ?
    `;

    try {
        pool.query(query, [userId], (err, results) => {
            if (err) {
                console.error('Failed to fetch cart items:', err);
                return res.status(500).send('Error fetching cart items');
            }
            res.status(200).json(results);
        });
    } catch (error) {
        console.error('Error on server:', error);
        res.status(500).send('Server error');
    }
});

// Endpoint to remove a cart item
router.delete('/removeCartItem', async (req, res) => {
    const { cartId } = req.query;

    const query = `
        DELETE FROM cart
        WHERE Cart_Id = ?
    `;

    try {
        pool.query(query, [cartId], (err, result) => {
            if (err) {
                console.error('Failed to remove cart item:', err);
                return res.status(500).send('Error removing cart item');
            }
            res.status(200).send('Cart item removed successfully');
        });
    } catch (error) {
        console.error('Error on server:', error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
