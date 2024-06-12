import  { useEffect, useState } from 'react';
import axios from 'axios';
import './Admin.css';
import AdminsideNavbar from '../components/AdminsideNavbar';
import AdminFooter from '../components/AdminFooter';


const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8000/OrderRoutes/order/getallorder');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);


  const handleCancel = async (orderId) => {
    const confirmDelete = window.confirm('Are you sure you want to cancel and delete this order?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8000/orderRoutes/order/cancel/${orderId}`);
        // Update the state to reflect the deleted order
        setOrders(orders.filter(order => order.Order_ID !== orderId));
        console.log(`Order with ID ${orderId} has been canceled and deleted`);
      } catch (error) {
        console.error('Error canceling order:', error);
        // Handle error scenario
      }
    }
  };

  const handleStatusChange = (orderId, status) => {
    // Implement status change logic here
    console.log(`Change status of order with ID ${orderId} to ${status}`);
  };

  const filterOrdersByDateRange = () => {
    if (startDate && endDate) {
      const filteredOrders = orders.filter(order => {
        const orderDate = new Date(order.Date);
        return orderDate >= startDate && orderDate <= endDate;
      });
      return filteredOrders;
    } else {
      return orders;
    }
  };

  return (
    <div >
    <AdminsideNavbar/>
      <br></br> <br></br>
    <div className="container admin-container">
    
      <div className="order-table">
        <h2>Orders</h2>
          <br></br>
          <input
            type="date"
            value={startDate ? startDate.toISOString().split('T')[0] : ''}
            onChange={(e) => setStartDate(new Date(e.target.value))}
            onFocus={(e) => e.target.type = 'date'} // Ensure calendar appears on focus
            style={{ marginRight: '10px' }} // Add margin between the date input boxes
          />
          <input
            type="date"
            value={endDate ? endDate.toISOString().split('T')[0] : ''}
            onChange={(e) => setEndDate(new Date(e.target.value))}
            onFocus={(e) => e.target.type = 'date'} // Ensure calendar appears on focus
          />
          <br></br>     <br></br>
        <table className="table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Contact Number</th>
              <th>Delivery Location</th>
              <th>Notes</th>
              <th>Grand Total</th>
              <th>Date</th>
              <th>Products</th>
                <th>Actions</th>
            </tr>
          </thead>
          <tbody>
              {(startDate && endDate ? filterOrdersByDateRange() : orders).map(order => (
              <tr key={order.Order_ID}>
                <td>{order.Order_ID}</td>
                <td>{order.Customer_Name}</td>
                <td>{order.Contact_Number}</td>
                <td>{order.Delivery_Location}</td>
                <td>{order.Notes}</td>
                <td>{order.Grand_Total}</td>
                <td>{new Date(order.Date).toLocaleDateString()}</td>
                <td>{order.Products}</td>
                <td>
                 
                  
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ position: 'relative', display: 'inline-block' }} className="dropdown">
                      <select style={{ backgroundColor: '#f2f2f2', color: 'black', padding: '10px', fontSize: '16px', border: 'none' }} onChange={(e) => handleStatusChange(order.Order_ID, e.target.value)} defaultValue="default">
                        <option value="default" disabled>Select Status</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                  <br></br>  <br></br> 
                  <button className='btn btn-danger mx-2' onClick={() => handleCancel(order.Order_ID)}>Cancel</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
      <br></br>  <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br>v <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br>
      <AdminFooter />
    </div>
  );
};

export default Orders;
