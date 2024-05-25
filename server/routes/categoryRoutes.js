const express = require("express");
const router = express.Router();
const { pool } = require("../config/db.js");

// Add a new category
router.post("/category", async (req, res) => {
	const { Product_Category, Category_Desc } = req.body;
	try {
		const result = await pool.query(
			"INSERT INTO productcategory (Product_Category, Category_Desc) VALUES (?, ?)",
			[Product_Category, Category_Desc]
		);
		res.json({ success: true, category: { id: result.insertId, Product_Category, Category_Desc } });
	} catch (err) {
		console.error(err);
		res.status(500).send("Error adding category");
	}
});

// Update a category
router.put("/category/:id", async (req, res) => {
	const { id } = req.params;
	const { name } = req.body;
	try {
		const result = await pool.query(
			"UPDATE productcategory SET Category_Name = ? WHERE Category_ID = ?",
			[name, id]
		);
		res.json(result[0]);
	} catch (err) {
		console.error(err);
		res.status(500).send("Error updating category");
	}
});

router.get("/categories", async (req, res) => {
	try {
		const [rows] = await pool.query("SELECT * FROM productcategory");
		res.json(rows); // Return only the rows, not the metadata
	} catch (err) {
		console.error(err);
		res.status(500).send("Error fetching categories");
	}
});

router.get("/category/:categoryId", async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        const [rows] = await pool.query('SELECT * FROM productcategory WHERE Category_ID = ?', [categoryId]);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching category data");
    }
});

module.exports = router;
