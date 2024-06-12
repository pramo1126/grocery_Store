import { Link } from 'react-router-dom';
import AdminsideNavbar from '../components/AdminsideNavbar';
import AdminFooter from '../components/AdminFooter';
import { Pie, Line, Bar } from 'react-chartjs-2';
import axios from 'axios';
import { useState, useEffect } from 'react';
import 'chart.js/auto';
import './Admin.css';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import jsPDF from 'jspdf';
import 'jspdf-autotable';



const Admin = () => {
  const [topProductsData, setTopProductsData] = useState({});
  const [ordersData, setOrdersData] = useState({});
  const [revenueData, setRevenueData] = useState({});
  const [slowProductsData, setSlowProductsData] = useState({});
  const [categoryWiseItems, setCategoryWiseItems] = useState({});
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateReport = async () => {
    try {
      setLoading(true); // Set loading to true when starting PDF generation

      console.log('Fetching data from the server...');
      // Fetch the data from the server
      const response = await axios.post('http://localhost:8000/AdminRoutes/revenue', {
        startDate: startDate.toISOString().slice(0, 10),
        endDate: endDate.toISOString().slice(0, 10),
      });


      console.log('Data fetched successfully:', response.data);

      const { revenueDetails } = response.data;

      // Populate the data array for the PDF report
      const data = revenueDetails.map((item) => [
        item.Product_Name,
        item.quantity,
        item.Price,
        item.total,
      ]);

     

      console.log('Data for PDF report:', data);

      // Calculate the total revenue
      let totalRevenue = 0;
      revenueDetails.forEach((item) => {
        totalRevenue += item.total;
      });

      // Add the total revenue to the data array
      data.push(['', '', '', 'Total Revenue:', totalRevenue]);
      console.log('Data with total revenue:', data);
      // Create a new PDF document
      const pdf = new jsPDF('p', 'pt', 'letter');

      // Add a header to the document
      pdf.setFontSize(18);
     pdf.setTextColor(40); // gray color
      // doc.setFontAlignment('center');
      pdf.text('Sameera Grocery Store - Revenue Report', 120, 75);

      // Add a subheader with the date range
     pdf.setFontSize(14);
      pdf.setTextColor(100); // lighter gray color
      // doc.setFontAlignment('center');
      pdf.text(`Date Range: ${startDate.toISOString().slice(0, 10)} - ${endDate.toISOString().slice(0, 10)}`, 135, 100);

      // // Add a line break
      // pdf.text('', '\n');

      // Define the table's columns
      const columns = [
        { title: 'Product', dataKey: 'product' },
        { title: 'Quantity', dataKey: 'quantity' },
        { title: 'Price', dataKey: 'price' },
        { title: 'Total', dataKey: 'total' },
      ];

      // Add the table to the document
      pdf.autoTable(columns, data.slice(0, -1), {
        startY: 140,
        styles: {
          fontSize: 11,
          cellPadding: 3,
        },
        columnStyles: {
          0: { cellWidth: 180 }, // set the width of the first column
          1: { cellWidth: 0 }, // set the width of the second column
          2: { cellWidth: 100 }, // set the width of the third column
          3: { cellWidth: 120 }, // set the width of the fourth column
        },

       didParseCell: (data) => {
        // If the cell is in the last row and the first column, set the text to 'Total Revenue:'
        if (data.row.index === data.table.body.length && data.column.index === 0) {
          data.cell.text = 'Total Revenue:';
        }
      }
    });

      // Add a row for the total revenue
      pdf.setFontSize(14);
      pdf.setTextColor(40); // gray color
      // pdf.text(data[data.length - 1][3].join(''), 360, pdf.lastAutoTable.finalY + 10);



      // Save the document and trigger a download
      pdf.save('revenue_report.pdf');

      setTimeout(() => {
        setLoading(false); // Set loading to false when PDF generation is complete
        alert('Report downloaded successfully');
      }, 2000); // Simulating a 2-second delay
    } catch (error) {
      console.error('Error generating report:', error);
      setLoading(false); // Set loading to false in case of an error
    }
  };

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
              <button className="btn btn-primary btn-category" style={{ backgroundColor: 'black', color: 'white' }}>
                <Link to='/CategoryForm' className="text-white">Add Category</Link>
              </button>
            <button className="btn btn-secondary btn-category">
              <Link to='/AddProducts' className="text-white">Add Product</Link>
            </button>
          </div>
        </div>

          <div className="row stats">
            <div className="col-md-6 stat-item bg-info text-white" style={{ backgroundColor: '#F2B75E' }}>
              <h2>Total Customers</h2>
              <p>{totalCustomers}</p>
            </div>
            <div className="col-md-6 stat-item bg-success text-white" style={{ backgroundColor: '#F2B75E' }}>
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
                <br></br><br></br>
                {/* Add the form for generating the revenue report */}
                <form>
                  <div className="form-group">
                    <label htmlFor="startDate">Start Date:</label>
                    {/* Replace the input element with the DatePicker component */}
                    <DatePicker
                      id="startDate"
                      selected={startDate} // Use the selected prop to bind the state
                      onChange={(date) => setStartDate(date)} // Use the onChange prop to update the state
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="endDate">End Date:</label>
                    {/* Replace the input element with the DatePicker component */}
                    <DatePicker
                      id="endDate"
                      selected={endDate} // Use the selected prop to bind the state
                      onChange={(date) => setEndDate(date)} // Use the onChange prop to update the state
                      className="form-control"
                    />
                  </div>
             
                  <button
                    type="button"
                    onClick={handleGenerateReport}
                    style={{ cursor: loading ? 'wait' : 'pointer' }}
                    className={`btn btn-primary mt-3`}
                  >
                    Generate Report
                  </button>
                </form>

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
