// const { pool } = require('../config/db.js'); 
// exports.getAllProducts = async(req, res) => {
//     try {
//         const connection = await pool.getConnection();
//         const [rows, fields] = await connection.execute('SELECT * FROM product');
//         connection.release();
//         res.json(rows);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: 'Internal server error' });
//     }
    
// };

// exports.getProductById = (req, res) => {
//     const productId = req.params.id;
//     pool.query('SELECT * FROM products WHERE id = ?', [productId], (error, results) => {
//         if (error) {
//             return res.status(500).json({ message: 'Error retrieving product' });
//         }
//         if (results.length === 0) {
//             return res.status(404).json({ message: 'Product not found' });
//         }
//         res.json(results[0]);
//     });
// };

// exports.AddProducts = (req, res) => {
//     const { name, description, price, imageSrc } = req.body;
//     pool.query(
//         'INSERT INTO products (name, description, price, image_src) VALUES (?, ?, ?, ?)',
//         [name, description, price, imageSrc],
//         (error, results) => {
//             if (error) {
//                 return res.status(500).json({ message: 'Error creating product' });
//             }
//             res.status(201).json({ message: 'Product created successfully', id: results.insertId });
//         }
//     );
// };

// exports.updateProduct = (req, res) => {
//     const productId = req.params.id;
//     const { name, description, price, imageSrc } = req.body;
//     pool.query(
//         'UPDATE products SET name = ?, description = ?, price = ?, image_src = ? WHERE id = ?',
//         [name, description, price, imageSrc, productId],
//         (error, results) => {
//             if (error) {
//                 return res.status(500).json({ message: 'Error updating product' });
//             }
//             if (results.affectedRows === 0) {
//                 return res.status(404).json({ message: 'Product not found' });
//             }
//             res.json({ message: 'Product updated successfully' });
//         }
//     );
// };

// exports.deleteProduct = (req, res) => {
//     const productId = req.params.id;
//     pool.query('DELETE FROM products WHERE id = ?', [productId], (error, results) => {
//         if (error) {
//             return res.status(500).json({ message: 'Error deleting product' });
//         }
//         if (results.affectedRows === 0) {
//             return res.status(404).json({ message: 'Product not found' });
//         }
//         res.json({ message: 'Product deleted successfully' });
//     });
// };

// exports.updateInventory = (req, res) => {
//     const { cart } = req.body;

//     cart.forEach((item) => {
//         db.query('UPDATE products SET quantity = quantity - ? WHERE id = ?', [item.quantity, item.productId], (err, results) => {
//             if (err) {
//                 console.log(err);
//                 res.status(500).send('Server error');
//             }
//         });
//     });

//     res.send('Inventory updated');
// };

