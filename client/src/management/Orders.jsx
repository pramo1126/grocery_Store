import AdminsideNavbar from '../components/AdminsideNavbar';
import AdminFooter from '../components/AdminFooter';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';


const Orders = ({ orderId }) => {

  const [orders, setOrders] = useState([]);


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/orderRoutes/orders/${orderId}`);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [orderId]);

  // const handleCancelOrder = (orderId) => {
  //   // Logic to cancel the order
  // };

  // const handleMarkAsDelivered = (orderId) => {
  //   // Logic to mark the order as delivered
  // };


  return (
    <div>
      <AdminsideNavbar />

      <div>
        {orders.map((order) => (
          <div key={order.Order_ID}>
            <p>Order ID: {order.Order_ID}</p>
            <p>Customer Name: {order.Customer_Name}</p>
            <p>Contact Number: {order.Contact_Number}</p>
            <p>Delivery Location: {order.Delivery_Location}</p>
            <p>Notes: {order.Notes}</p>
            <p>Grand Total: {order.Grand_Total}</p>
            <p>Date: {order.Date}</p>
            {/* <button onClick={() => handleCancelOrder(order.Order_ID)}>Cancel</button>
            <button onClick={() => handleMarkAsDelivered(order.Order_ID)}>Mark as Delivered</button> */}
            <hr />
          </div>
        ))}
      </div>
      <br></br>  <br></br> <br></br>
      <AdminFooter /> 
    </div>
      );
};
    
Orders.propTypes = {
  orderId: PropTypes.any.isRequired,
};
 
 

export default Orders
