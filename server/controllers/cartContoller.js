const db = require('./config/db.js');

// Add product to cart
exports.addProductToCart = (req, res) => {
    const { productId, quantity } = req.body;

    // Check if product exists
    db.query('SELECT * FROM products WHERE id = ?', [productId], (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server error');
        } else if (results.length === 0) {
            res.status(404).send('Product not found');
        } else {
            const product = results[0];

            // Check if cart already has the product
            db.query('SELECT * FROM cart WHERE product_id = ?', [productId], (err, results) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('Server error');
                } else if (results.length > 0) {
                    // Update the quantity of the product in the cart
                    const newQuantity = results[0].quantity + quantity;
                    db.query('UPDATE cart SET quantity = ? WHERE id = ?', [newQuantity, results[0].id], (err, results) => {
                        if (err) {
                            console.log(err);
                            res.status(500).send('Server error');
                        } else {
                            res.send('Product added to cart');
                        }
                    });
                } else {
                    // Add the product to the cart
                    db.query('INSERT INTO cart (product_id, quantity) VALUES (?, ?)', [productId, quantity], (err, results) => {
                        if (err) {
                            console.log(err);
                            res.status(500).send('Server error');
                        } else {
                            res.send('Product added to cart');
                        }
                    });
                }
            });
        }
    });
};

// Remove product from cart
exports.removeProductFromCart = (req, res) => {
    const { productId } = req.body;

    // Check if product exists in cart
    db.query('SELECT * FROM cart WHERE product_id = ?', [productId], (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server error');
        } else if (results.length === 0) {
            res.status(404).send('Product not found in cart');
        } else {
            // Remove the product from the cart
            db.query('DELETE FROM cart WHERE product_id = ?', [productId], (err, results) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('Server error');
                } else {
                    res.send('Product removed from cart');
                }
            });
        }
    });
};

// Update the quantity of a product in the cart
exports.updateCartQuantity = (req, res) => {
    const { productId, quantity } = req.body;

    // Check if product exists in cart
    db.query('SELECT * FROM cart WHERE product_id = ?', [productId], (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server error');
        } else if (results.length === 0) {
            res.status(404).send('Product not found in cart');
        } else {
            // Update the quantity of the product in the cart
            db.query('UPDATE cart SET quantity = ? WHERE product_id = ?', [quantity, productId], (err, results) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('Server error');
                } else {
                    res.send('Cart updated');
                }
            });
        }
    });
};

// Get the total price of the products in the cart
exports.getCartTotal = (req, res) => {
    // Calculate the total price of the products in the cart
    db.query('SELECT SUM(cart.Qty * product.Price) AS total_price FROM cart JOIN product ON cart.Product_ID = product.Product_ID', (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server error');
        } else {
            res.send({ total: results[0].total });
        }
    });
};
