const express = require('express');
const router = express.Router();
const { pool } = require('../config/db.js');


// router.post("/OrderRoutes/saveOrder", async (req, res) => {
//     try {
//         const { Customer_Name, Items, Delivery_Location, Notes, Grand_Total, Date } = req.body;

//         // Create a new order instance
//         const newOrder = new Order({
//             Customer_Name,
//             Items,
//             Delivery_Location,
//             Notes,
//             Grand_Total,
//             Date
//         });

//         // Save the order to the database
//         await newOrder.save();
//         const query = INSERT INTO order (Customer_Name, Items, Delivery_Location, Notes, Grand_Total, Date) VALUES (?, ?, ?, ?, ?, ?)';'
//         const values = [Customer_Name, Items, Delivery_Location, Notes, Grand_Total, Date];

//         connection.query(query, values, (error, results) => {
//             if (error) {
//                 console.error('Error saving order:', error);
//                 res.status(500).json({ error: 'An error occurred while saving the order' });
//             } else {
//                 res.status(201).json({ message: 'Order saved successfully' });
//             }
//         });
//     } catch (error) {
//         console.error('Error saving order:', error);
//         res.status(500).json({ error: 'An error occurred while saving the order' });
//     }
// });

// POST route to save order details
router.post('/orderRoutes/saveOrder', async (req, res) => {
    try {
        const { ID,Product_ID , Customer_Name, Qty, Delivery_Location, Notes, Grand_Total, Date } = req.body;

        const query = `INSERT INTO order (ID,Product_ID, Customer_Name, Qty,  Delivery_Location, Notes, Grand_Total, Date) VALUES(?, ?, ?, ?, ?, ?, ?,?)`;

        await pool.query(query, [ID, Product_ID, Customer_Name, Qty, Delivery_Location, Notes, Grand_Total, Date]);

        res.status(200).send('Order updated successfully');
    } catch (error) {
        console.error('Failed to update Order:', error);
        res.status(500).send('Error updating order');
    }
});

module.exports = router;