import { Link } from 'react-router-dom';
import AdminsideNavbar from '../components/AdminsideNavbar';
import AdminFooter from '../components/AdminFooter';
import { Pie, Line, Bar } from 'react-chartjs-2';
import axios from 'axios';
import { useState, useEffect } from 'react';
import 'chart.js/auto';
import './Admin.css';

const Admin = () => {
  const [topProductsData, setTopProductsData] = useState({});
  const [ordersData, setOrdersData] = useState({});
  const [revenueData, setRevenueData] = useState({});
  const [slowProductsData, setSlowProductsData] = useState({});
  const [categoryWiseItems, setCategoryWiseItems] = useState({});
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/AdminRoutes/chartsData');
        const data = response.data;

        setTopProductsData(data.topProductsData);
        setOrdersData({
          ...data.ordersData,
          options: {
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  stepSize: 1
                }
              }
            }
          }
        });
        setRevenueData(data.revenueData);
        setSlowProductsData(data.slowProductsData);
        setCategoryWiseItems(data.categoryWiseItems);
        setTotalCustomers(data.totalCustomers);
        setTotalItems(data.totalItems);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>  <AdminsideNavbar />
    <div className="container admin-container">
      <div className="content">
        <div className="header">
          <h1>Admin Dashboard</h1>
          <div className="btn-group">
            <button className="btn btn-primary btn-category">
              <Link to='/CategoryForm' className="text-white">Add Category</Link>
            </button>
            <button className="btn btn-secondary btn-category">
              <Link to='/AddProducts' className="text-white">Add Product</Link>
            </button>
          </div>
        </div>

        <div className="row stats">
          <div className="col-md-6 stat-item bg-info text-white">
            <h2>Total Customers</h2>
            <p>{totalCustomers}</p>
          </div>
          <div className="col-md-6 stat-item bg-success text-white">
            <h2>Total Items</h2>
            <p>{totalItems}</p>
          </div>
        </div>

        <div className="row charts">
          {Object.keys(topProductsData).length > 0 && (
            <div className="col-md-6 chart">
              <h3>Top Products</h3>
              <Pie data={topProductsData} />
            </div>
          )}
          {Object.keys(ordersData).length > 0 && (
            <div className="col-md-6 chart">
              <h3>Number of Orders Received Each Day</h3>
              <Line data={ordersData} options={ordersData.options} />
            </div>
          )}
          {Object.keys(revenueData).length > 0 && (
            <div className="col-md-6 chart">
              <h3>Revenue Received from Orders Each Day</h3>
              <Bar data={revenueData} />
            </div>
          )}
          {Object.keys(slowProductsData).length > 0 && (
            <div className="col-md-6 chart">
              <h3>Slow Moving Products</h3>
              <Pie data={slowProductsData} />
            </div>
          )}
          {Object.keys(categoryWiseItems).length > 0 && (
            <div className="col-md-6 chart">
              <h3>Category Wise Items</h3>
              <Pie data={categoryWiseItems} />
            </div>
          )}
        </div>
      </div>
    </div>
      <AdminFooter /> 
    </div>
  );
};

export default Admin;
