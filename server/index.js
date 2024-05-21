const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");
const bodyParser = require('body-parser');
const productRouter = require('./routes/productRoutes.js');
const path = require('path');
const cartRouter = require('./routes/cartRoutes.js');
const categoryRouter = require('./routes/categoryRoutes.js');




require('dotenv').config();




// Bodyparser middleware

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/Uploads/Biscuits&snacks', express.static(path.join(__dirname, 'Uploads', 'Biscuits&snacks')));

// Cors middleware
app.use(cors());

const PORT = process.env.PORT || 8000;
const {pool} = require('./config/db.js');
const {checkConnection} = require('./config/db.js');

app.use('/productRoutes', productRouter);
app.use('/cartRoutes', cartRouter);
app.use('/categoryRoutes', categoryRouter);


// const db = mysql.createConnection({
//     host: "srv1327.hstgr.io",
//     user: "u323893650_pramo",
//     password: "pramoData##12",
//     database: "u323893650_grocery_store"
// });
// const db = mysql.createPool({
//     host: "srv1327.hstgr.io",
//     user: "u323893650_pramo",
//     password: "pramoData##12",
//     database: "u323893650_grocery_store"
// });


// db.connect((err) => {
//     if (err) {
//         throw err;
//     }
//     console.log('MySQL connected');
// });

// app.post('/Signup', async (req, res) => {
//     console.log("request was came");
//     const { name, email, password } = req.body;
//     console.log(req.body);
//     /*if (!name || !email || !password) {
//         return res.status(400).json({ success: false, message: 'Name, email, and password are required' });
//     }*/

//     try {
//         console.log("test 1");
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const sql = 'INSERT INTO users (Email,Name, Password) VALUES (?, ?, ?)';

//         // connection open
//         const connection = await pool.getConnection();
//         await connection.execute(sql, [email, name, hashedPassword], (err, result) => {
//             if (err) {
//                 if (err.code === 'ER_DUP_ENTRY') {
//                     connection.release();
//                     return res.status(409).json({ success: false, message: 'Email already exists' });
//                 }
//                 console.log(err);
//                 connection.release();
//                 return res.status(500).json({ success: false, message: 'Internal server error' });
//             }

//             connection.release();
//             console.log("perfect");
//             return res.status(201).json({ success: true, message: 'User created successfully' });
//         });
//     } catch (err) {
//         console.log(err);
//         return res.status(500).json({ success: false, message: 'Internal server error' });
//     }
// });

app.post('/Signup', async (req, res) => {
    console.log("request was came");
    const { name, email, password } = req.body;
    console.log(req.body);

    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: 'Name, email, and password are required' });
    }

    try {
        console.log("test 1");
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = 'INSERT INTO users (Email, Name, Password) VALUES (?, ?, ?)';

        // connection open
        const connection = await pool.getConnection();
        const [rows, fields] = await connection.execute(sql, [email, name, hashedPassword]);

        if (rows.affectedRows === 0) {
            connection.release();
            console.log(err.message);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }

        connection.release();
        console.log("perfect");
        return res.status(201).json({ success: true, message: 'User created successfully' });
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ success: false, message: 'Email already exists' });
        }
        console.log(err);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});


/*app.post('/Login', async (req, res) => {
    console.log("login request was came");
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    try {
        const sql = 'SELECT * FROM users WHERE Email = ?';
        const connection = await pool.getConnection();
        const [rows, fields] = await connection.execute(sql, [email]);
        connection.release();

        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        console.log("test 2");
        const user = rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.Password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: 'Invalid password' });
        }

        let destination;
        if (user.Email === 'admin_sameera@gmail.com') {
            destination = '/AdminDashboard';
        } else {
            destination = '/Home';
        }

        return res.status(200).json({ success: true, message: 'Login successful', user, destination });
    } catch (err) {
        console.error(err);
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
    });*/

app.post('/Login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body);

        // if (!email || !password) {
        //     return res.status(400).json({ success: false, message: 'Email and password are required' });
        // }

        const connection = await pool.getConnection();

        const [rows] = await connection.execute('SELECT * FROM users WHERE Email = ?', [email]);

        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        const user = rows[0];
        console.log(user);

        const isPasswordValid = await bcrypt.compare(password, user.Password);

        console.log("ggg");
        console.log(isPasswordValid);


        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: 'Invalid password' });
        }

        let destination;

        if (user.email === 'admin_sameera@gmail.com') {
            destination = '/AdminDashboard';
           
        } else {
            destination = '/Home';
        }

        res.status(200).json({ success: true, message: 'Login successful', user, destination });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
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