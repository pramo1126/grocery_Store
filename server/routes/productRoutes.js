// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const { pool } = require('../config/db.js');
// const path = require('path');

// // Configure multer for file uploads
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'Uploads/Biscuits&snacks');
//     },
//     filename: (req, file, cb) => {
//         cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
//     }
// });
// const upload = multer({ storage: storage });

// // Add a new product
// router.post('/product', upload.single('ProductImage'), async (req, res) => {
//     try {
//         const { ProductName, Category_ID, ProductPrice, ProductExpiryDate } = req.body;
//         if (!req.file) {
//             return res.status(400).json({ success: false, message: 'No file uploaded' });
//         }
//         const ProductImage = req.file.filename;
//         const sql = 'INSERT INTO product (Product_Name, Category_ID, Price, Expiry_Date, ProductImage) VALUES (?, ?, ?, ?, ?)';
//         const [result] = await pool.query(sql, [ProductName, Category_ID, ProductPrice, ProductExpiryDate,  ProductImage]);
//         res.json({ success: true, product: { id: result.insertId, ProductName, Category_ID, ProductPrice, ProductExpiryDate, ProductImage } });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ success: false, message: 'Internal server error' });
//     }
// });

// // Update a product
// router.put('/product/:id', upload.single('ProductImage'), async (req, res) => {
//     const { id } = req.params;
//     const { ProductName, ProductPrice, ProductExpiryDate, Category_ID } = req.body;
//     let ProductImage = req.file ? req.file.filename : null;

//     try {
//         let sql, params;
//         if (ProductImage) {
//             sql = 'UPDATE product SET Product_Name = ?, Category_ID = ?, Price = ?, Expiry_Date = ?, ProductImage = ? WHERE Product_ID = ?';
//             params = [ProductName, Category_ID, ProductPrice, ProductExpiryDate, ProductImage, id];
//         } else {
//             sql = 'UPDATE product SET Product_Name = ?, Category_ID = ?, Price = ?, Expiry_Date = ? WHERE Product_ID = ?';
//             params = [ProductName, Category_ID, ProductPrice, ProductExpiryDate, id];
//         }

//         const [result] = await pool.query(sql, params);
//         if (result.affectedRows === 0) {
//             return res.status(404).json({ success: false, message: 'Product not found or no changes made' });
//         }
//         res.json({ success: true, message: 'Product updated successfully' });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ success: false, message: 'Internal server error' });
//     }
// });

// // Get all products by category ID
// router.get('/products/:categoryId', async (req, res) => {
//     const { categoryId } = req.params;
//     try {
//         const sql = 'SELECT Product_ID, Product_Name, Price, Expiry_Date, ProductImage FROM product WHERE Category_ID = ?';
//         const [results] = await pool.query(sql, [categoryId]);
//         res.json(results);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ success: false, message: 'Internal server error' });
//     }
// });

// // Get a specific product by ID
// router.get('/product/:productId', async (req, res) => {
//     const { productId } = req.params;
//     try {
//         const sql = 'SELECT Product_Name, Category_ID, Price, Expiry_Date, ProductImage FROM product WHERE Product_ID = ?';
//         const [results] = await pool.query(sql, [productId]);
//         if (results.length === 0) {
//             return res.status(404).json({ success: false, message: 'Product not found' });
//         }
//         res.json(results[0]);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ success: false, message: 'Internal server error' });
//     }
// });

// // Delete a product
// router.delete('/product/:productId', async (req, res) => {
//     const { productId } = req.params;
//     try {
//         const sql = 'DELETE FROM product WHERE Product_ID = ?';
//         const [result] = await pool.query(sql, [productId]);
//         if (result.affectedRows === 0) {
//             return res.status(404).json({ success: false, message: 'Product not found' });
//         }
//         res.json({ success: true, message: 'Product deleted successfully' });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ success: false, message: 'Internal server error' });
//     }
// });

// // Get expired products
// // router.get('/expired-products', (req, res) => {
// //     const currentDate = new Date().toISOString().slice(0, 10);
// //     const query = 'SELECT Product_Name, Product_ID, Expiry_Date FROM product WHERE Expiry_Date < ?';

// //     pool.query(query, [currentDate], (err, results) => {
// //         if (err) {
// //             console.error('Error fetching expired products:', err);
// //             res.status(500).send('Failed to fetch expired products');
// //         } else {
// //             res.json(results);
// //         }
// //     });
// // });

// router.get('/expired-products', (req, res) => {
//     const currentDate = new Date();
//     const expiryDate = new Date(currentDate.getTime() + 10 * 24 * 60 * 60 * 1000); // 10 days from now

//     const query = `
//         SELECT 
//             Product_Name, 
//             Product_ID, 
//             Expiry_Date,
//             CASE 
//                 WHEN Expiry_Date < ? THEN 'Expired'
//                 WHEN Expiry_Date BETWEEN ? AND ? THEN CONCAT('Expires in ', DATEDIFF(Expiry_Date, ?), ' days')
//                 ELSE 'Expires in more than 10 days'
//             END AS ExpiryStatus
//         FROM product
//         WHERE Expiry_Date < ?
//     `;

//     const params = [expiryDate, currentDate, expiryDate, currentDate, expiryDate];

//     pool.query(query, params, (err, results) => {
//         if (err) {
//             console.error('Error fetching expired products:', err);
//             res.status(500).send('Failed to fetch expired products');
//         } else {
//             const expiredProducts = results.filter(product => product.ExpiryStatus === 'Expired');
//             const productsExpiringSoon = results.filter(product => product.ExpiryStatus !== 'Expired');

//             res.json({ expiredProducts, productsExpiringSoon });
//         }
//     });
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const multer = require('multer');
const { pool } = require('../config/db.js');
const path = require('path');


// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Uploads/Biscuits&snacks');
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});
const upload = multer({ storage: storage });


// Add a new product
router.post('/product', upload.single('ProductImage'), async (req, res) => {
    try {
        const { ProductName, ProductPrice, ProductExpiryDate, Category_ID, ProductQty, ReorderLevel } = req.body;
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }
        const ProductImage = req.file.filename;
        const sql = 'INSERT INTO product (Product_Name, Category_ID, Price, Expiry_Date, ProductImage, Qty, Reorder_Level) VALUES (?, ?, ?, ?, ?, ?,?)';
        const [result] = await pool.query(sql, [ProductName, Category_ID, ProductPrice, ProductExpiryDate, ProductImage, ProductQty,ReorderLevel ]);
        res.json({ success: true, product: { id: result.insertId, ProductName, ProductPrice, ProductExpiryDate, Category_ID, ProductImage, ProductQty, ReorderLevel } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});





// Update a product
// Update a product
router.put('/product/:id', upload.single('ProductImage'), async (req, res) => {
    const { id } = req.params;
    const { ProductName, ProductPrice, ProductExpiryDate, Category_ID, ProductQty } = req.body;
    let ProductImage = req.file ? req.file.filename : null;

    try {
        let sql, params;
        if (ProductImage) {
            sql = 'UPDATE product SET Product_Name = ?, Category_ID = ?, Price = ?, Expiry_Date = ?, ProductImage = ?, Qty = ? WHERE Product_ID = ?';
            params = [ProductName, Category_ID, ProductPrice, ProductExpiryDate, ProductImage, ProductQty, id];
        } else {
            sql = 'UPDATE product SET Product_Name = ?, Category_ID = ?, Price = ?, Expiry_Date = ?, Qty = ? WHERE Product_ID = ?';
            params = [ProductName, Category_ID, ProductPrice, ProductExpiryDate, ProductQty, id];
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

router.get('/products/:categoryId', async (req, res) => {
    const { categoryId } = req.params;
    try {
        const sql = 'SELECT Product_ID, Product_Name, Price, Expiry_Date, ProductImage, Qty FROM product WHERE Category_ID = ?';
        const [results] = await pool.query(sql, [categoryId]);
        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Get a specific product by ID
router.get('/product/:productId', async (req, res) => {
    const { productId } = req.params;
    try {
        const sql = 'SELECT Product_Name, Category_ID, Price, Expiry_Date, ProductImage, Qty FROM product WHERE Product_ID = ?';
        const [results] = await pool.query(sql, [productId]);
        if (results.length === 0) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        console.log(results)
        res.json(results[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Delete a product
router.delete('/product/:productId', async (req, res) => {
    const { productId } = req.params;
    try {
        const sql = 'DELETE FROM product WHERE Product_ID = ?';
        const [result] = await pool.query(sql, [productId]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.json({ success: true, message: 'Product deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Get products expiring within the next 10 days
router.get('/product/expiringsoon', (req, res) => {
    const currentDate = new Date();
    const tenDaysLater = new Date(currentDate.getTime() + 10 * 24 * 60 * 60 * 1000); // Calculate date 10 days from now
    const query = 'SELECT Product_Name, Product_ID, Expiry_Date, ExpiryStatus FROM product WHERE Expiry_Date BETWEEN ? AND ?';

    pool.query(query, [currentDate, tenDaysLater], (err, results) => {
        if (err) {
            console.error('Error fetching products expiring soon:', err);
            res.status(500).send('Failed to fetch products expiring soon');
        } else {
            res.json(results);
        }
    });
});

module.exports = router;
