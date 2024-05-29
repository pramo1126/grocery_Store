import { Link } from 'react-router-dom';
import AdminFooter from '../components/AdminFooter';
import AdminsideNavbar from '../components/AdminsideNavbar';
import { Pie, Line } from 'react-chartjs-2';
import axios from 'axios';
import { useState, useEffect } from 'react';


const Admin = () => {

  const [topProductsData, setTopProductsData] = useState({});
  const [ordersData, setOrdersData] = useState({});
  const [revenueData, setRevenueData] = useState({});
  const [slowProductsData, setSlowProductsData] = useState({});


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/chartsData');
        const data = response.data;

        setTopProductsData(data.topProductsData);
        setOrdersData(data.ordersData);
        setRevenueData(data.revenueData);
        setSlowProductsData(data.slowProductsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <div>
      <AdminsideNavbar />

      <button><Link to='/categoryForm'> Category</Link></button>
      <Pie data={topProductsData} />
      <Line data={ordersData} />
      <Line data={revenueData} />
      <Pie data={slowProductsData} />
      
      <AdminFooter/>
    </div>
  )
}
  
export default Admin;
