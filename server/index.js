const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");
const bodyParser = require('body-parser');
const path = require('path');
const productRouter = require('./routes/productRoutes.js');
const cartRouter = require('./routes/cartRoutes.js');
const categoryRouter = require('./routes/categoryRoutes.js');
require('dotenv').config();
const { pool, checkConnection } = require('./config/db.js');
const orderRouter = require('./routes/orderRoutes.js')
const adminRouter = require('./routes/adminRoutes.js')


// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/Uploads/Biscuits&snacks', express.static(path.join(__dirname, 'Uploads', 'Biscuits&snacks')));
app.use(cors());

// Routes
app.use('/productRoutes', productRouter);
app.use('/cartRoutes', cartRouter);
app.use('/categoryRoutes', categoryRouter);
app.use('/orderRoutes', orderRouter)
app.use('/adminRoutes', adminRouter)


const PORT = process.env.PORT || 8000;

// Signup Route
app.post('/Signup', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: 'Name, email, and password are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = 'INSERT INTO users (Email, Name, Password) VALUES (?, ?, ?)';
        const connection = await pool.getConnection();
        const [rows] = await connection.execute(sql, [email, name, hashedPassword]);

        connection.release();
        if (rows.affectedRows === 0) {
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
        return res.status(201).json({ success: true, message: 'User created successfully' });
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ success: false, message: 'Email already exists' });
        }
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Login Route
// Login Route

// Login Route
app.post('/Login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.execute('SELECT * FROM users WHERE Email = ?', [email]);
        connection.release();

        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const user = rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.Password);

        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: 'Invalid password' });
        }

        const userId = user.ID; // Retrieve the user ID

        console.log(`User ID ${userId} logged in.`); // Log the user ID to console

        let destination = (user.Email.toLowerCase() === 'admin_sameera@gmail.com'.toLowerCase()) ? '/AdminDashboard' : '/Home';
        return res.status(200).json({ success: true, message: 'Login successful', user, destination, userId });
    } catch (err) {
        console.error(err); // Log any caught errors
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});


checkConnection()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Error starting the server:', err);
    });
