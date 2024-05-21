const express = require('express');
const router = express.Router();
const { pool } = require('../config/db.js');
const path = require('path');

// Add a new category
router.post('/categoryRoutes/category', async (req, res) => {
    const { name } = req.body;

    try {
        const result = await pool.query('INSERT INTO productcategory (Category_Name) VALUES ($1) RETURNING *', [name]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error adding category');
    }
});

// Update a category
router.put('/categoryRoutes/category/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const result = await pool.query('UPDATE productcategory SET Category_Name = $1 WHERE Category_ID = $2 RETURNING *', [name, id]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating category');
    }
})


    module.exports = router;