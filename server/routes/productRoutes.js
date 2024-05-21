const express = require('express');
const router = express.Router();
const multer = require('multer');
// const db = require('../config/db.js');
const { pool } = require('../config/db.js');
const path = require('path');

// const productController = require('../controllers/productController');

// router.get('/', productController.getAllProducts);
// router.get('/:id', productController.getProductById);
// router.post('/', productController.createProduct);
// router.put('/:id', productController.updateProduct);
// router.delete('/:id', productController.deleteProduct);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Uploads/Biscuits&snacks');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.post('/AddProducts', upload.single('ProductImage'), async (req, res) => {
    console.log("Route Hit");
    console.log("Received data:", req.body);
    try {
        const { ProductName, ProductPrice, ProductExpiryDate, ProductCategory } = req.body;
        console.log("Received file:", req.file);
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }
        const ProductImage = req.file.filename;
        const sql = 'INSERT INTO product (Product_Name,  Product_Category, Price, Expiry_Date, ProductImage) VALUES (?, ?, ?, ?, ?)';
        const [result] = await pool.query(sql, [ProductName, ProductCategory, ProductPrice, ProductExpiryDate, ProductImage]);
        res.json({ success: true, message: 'Product added successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Handle displaying products for different categories dynamically
router.get('/AdminProductList/${categoryId}', async (req, res) => {
    
    const categoryId = req.params.category;
    try {
        const sql = `SELECT Product_ID, Product_Name, Price, Expiry_Date, ProductImage FROM product WHERE Category_ID = ?`;
        const [results] = await pool.query(sql, [category]);
        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});


// Handle deleting products for different categories dynamically
router.delete('/AdminProductList/:category/:id', async (req, res) => {
    
    const { category, id } = req.params;
    try {
        const sql = 'DELETE FROM product WHERE Product_ID = ? AND Category_ID = ?';
        const [result] = await pool.query(sql, [id, category]);
        // Your existing code for deleting products
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Add routes for editing products dynamically based on category

// Add routes for displaying products to customers dynamically based on category

// Add endpoint to fetch expired products for a specific category

// //Delete Biscuits & snacks products
// router.delete('/AdminBiscuits/:id', async (req, res) => {
//     const { id } = req.params;
//     try {
//         const sql = 'DELETE FROM product WHERE Product_ID = ?';
//         const [result] = await pool.query(sql, [id]);
//         if (result.affectedRows === 0) {
//             return res.status(404).json({ success: false, message: 'Product not found' });
//         }
//         res.json({ success: true, message: 'Product deleted successfully' });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ success: false, message: 'Internal server error' });
//     }
// });

//Display Frozen foods types in admin side
// router.get('/AdminFrozen', async (req, res) => {
//     console.log("Accessing /AdminFrozen route");
//     try {
//         const sql = 'SELECT Product_ID, Product_Name, Price, Expiry_Date, ProductImage FROM product WHERE Product_Category = "Frozen Foods"';
//         const [results] = await pool.query(sql);
//         res.json(results);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ success: false, message: 'Internal server error' });
//     }
// });

//Delete Frozen foods products
// router.delete('/AdminFrozen/:id', async (req, res) => {
//     const { id } = req.params;
//     try {
//         const sql = 'DELETE FROM product WHERE Product_ID = ?';
//         const [result] = await pool.query(sql, [id]);
//         if (result.affectedRows === 0) {
//             return res.status(404).json({ success: false, message: 'Product not found' });
//         }
//         res.json({ success: true, message: 'Product deleted successfully' });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ success: false, message: 'Internal server error' });
//     }
// });

// //Display Beverages & Dairy Products  foods types in admin side
// router.get('/AdminBeverages', async (req, res) => {
//     console.log("Accessing /AdminBeverages route");
//     try {
//         const sql = 'SELECT Product_ID, Product_Name, Price, Expiry_Date, ProductImage FROM product WHERE Product_Category = "Beverages & Dairy Product"';
//         const [results] = await pool.query(sql);
//         res.json(results);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ success: false, message: 'Internal server error' });
//     }
// });

//Delete Beverages & Dairy Products 
// router.delete('/AdminBeverages/:id', async (req, res) => {
//     const { id } = req.params;
//     try {
//         const sql = 'DELETE FROM product WHERE Product_ID = ?';
//         const [result] = await pool.query(sql, [id]);
//         if (result.affectedRows === 0) {
//             return res.status(404).json({ success: false, message: 'Product not found' });
//         }
//         res.json({ success: true, message: 'Product deleted successfully' });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ success: false, message: 'Internal server error' });
//     }
// });

//Display Pasta & Cereals food type in admin side
// router.get('/AdminPasta', async (req, res) => {
//     console.log("Accessing /AdminPasta route");
//     try {
//         const sql = 'SELECT Product_ID, Product_Name, Price, Expiry_Date, ProductImage FROM product WHERE Product_Category = "Pasta & Cereals"';
//         const [results] = await pool.query(sql);
//         res.json(results);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ success: false, message: 'Internal server error' });
//     }
// });

//Delete Pasta & Cereals food type
// router.delete('/AdminPasta/:id', async (req, res) => {
//     const { id } = req.params;
//     try {
//         const sql = 'DELETE FROM product WHERE Product_ID = ?';
//         const [result] = await pool.query(sql, [id]);
//         if (result.affectedRows === 0) {
//             return res.status(404).json({ success: false, message: 'Product not found' });
//         }
//         res.json({ success: true, message: 'Product deleted successfully' });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ success: false, message: 'Internal server error' });
//     }
// });

// getting each product details to Edit product form
router.get('/EditProduct/:category/:productId', async (req, res) => {
    console.log("Accessing /productRoutes route");
    const { category, productId } = req.params;
    const sql = `SELECT Product_Name, Product_Category, Price, Expiry_Date, ProductImage FROM product WHERE Product_ID = ? AND Product_Category = ?`;
    try {
        const [results] = await pool.query(sql, [productId, category]);
        if (results.length === 0) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.json(results[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// updating product details
router.put('/EditProduct/:category/:productId', upload.single('ProductImage'), async (req, res) => {
    const { category, productId } = req.params;
    const { ProductName, ProductPrice, ProductExpiryDate, ProductCategory } = req.body;
    let ProductImage = req.file ? req.file.filename : null;

    try {
        let sql, params;
        if (ProductImage) {
            sql = 'UPDATE product SET Product_Name = ?, Product_Category = ?, Price = ?, Expiry_Date = ?, ProductImage = ? WHERE Product_ID = ? AND Product_Category = ?';
            params = [ProductName, ProductCategory, ProductPrice, ProductExpiryDate, ProductImage, productId, category];
        } else {
            sql = 'UPDATE product SET Product_Name = ?, Product_Category = ?, Price = ?, Expiry_Date = ? WHERE Product_ID = ? AND Product_Category = ?';
            params = [ProductName, ProductCategory, ProductPrice, ProductExpiryDate, productId, category];
        }

        const [result] = await pool.query(sql, params);
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Product not found or no changes made' });
        }
        res.json({ success: true, message: 'Product updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});


//Displaying items in the Biscuits & snacks category to customer
// router.get('/Biscuits', async (req, res) => {
//     console.log("Biscuits route hit");
//     try {
//         const sql = 'SELECT  Product_Name, Price, ProductImage FROM product WHERE Product_Category = "Biscuits & Snacks"';
//         const [results] = await pool.query(sql);
//         res.json(results);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ success: false, message: 'Internal server error' });
//     }
// });


//Displaying items in the Beverages and dairy products  to customer
// router.get('/Beverages', async (req, res) => {
//     console.log("Beverages route hit");
//     try {
//         const sql = 'SELECT  Product_Name, Price, ProductImage FROM product WHERE Product_Category = "Beverages & Dairy Product"';
//         const [results] = await pool.query(sql);
//         res.json(results);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ success: false, message: 'Internal server error' });
//     }
// });


//Displaying items in the Frozen foods category to customer
// router.get('/Frozenfoods', async (req, res) => {
//     console.log("Frozen foods route hit");
//     try {
//         const sql = 'SELECT  Product_Name, Price, ProductImage FROM product WHERE Product_Category = "Frozen Foods"';
//         const [results] = await pool.query(sql);
//         res.json(results);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ success: false, message: 'Internal server error' });
//     }
// });


//Displaying items in the Pasta & cereals category to customer
// router.get('/Pasta', async (req, res) => {
//     console.log("Pasta route hit");
//     try {
//         const sql = 'SELECT  Product_Name, Price, ProductImage FROM product WHERE Product_Category = "Pasta & Cereals"';
//         const [results] = await pool.query(sql);
//         res.json(results);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ success: false, message: 'Internal server error' });
//     }
// });

// Endpoint to fetch expired products
router.get('/ProductInventory', (req, res) => {
    const currentDate = new Date().toISOString().slice(0, 10); // Format current date to YYYY-MM-DD
    const query = `
        SELECT Product_Name , Product_ID, Expiry_Date FROM product
         WHERE Expiry_Date < ?`;
    console.log("Fetching expired products, current date:", currentDate);

    pool.query(query, [currentDate], (err, results) => {
        if (err) {
            console.error('Error fetching expired products:', err);
            res.status(500).send('Failed to fetch expired products');
        } else {
            console.log("Expired products fetched:", results);
            res.json(results);
        }
    });
});

module.exports = router;

