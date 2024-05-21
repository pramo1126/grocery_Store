const express = require('express');
const router = express.Router();
// const multer = require('multer');
// const db = require('../config/db.js');
const { pool } = require('../config/db.js');
const path = require('path');

// Endpoint to add items to the cart
router.post('/addProductsCart', async (req, res) => {
    const { userId, productId, quantity } = req.body;
    const query = `
        INSERT INTO cart (ID, Product_ID, Qty) 
        VALUES (?, ?, ?) 
        ON DUPLICATE KEY UPDATE Qty = Qty + ?
    `;
    try {
        const result = await 
         db.query(query, [userId, productId, quantity, quantity], (err, result) => {
            if (err) {
                throw err;
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
    const { userId } = req.query;  // Assuming you pass userId as a query parameter

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

router.post('/updateCartItem', async (req, res) => {
    const { cartId, newQuantity } = req.body;

    const query = `
        UPDATE cart
        SET Quantity = ?
        WHERE Cart_Id = ?
    `;

    try {
        pool.query(query, [newQuantity, cartId], (err, result) => {
            if (err) {
                console.error('Failed to update cart item:', err);
                return res.status(500).send('Error updating cart item');
            }
            res.status(200).send('Cart item updated successfully');
        });
    } catch (error) {
        console.error('Error on server:', error);
        res.status(500).send('Server error');
    }
});


router.delete('/removeCartItem', async (req, res) => {
    const { cartId } = req.query;  // Assuming cartId is passed as a query parameter

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