import { useEffect, useState } from 'react';
import AdminNavbar from '../components/AdminNavbar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminPasta = () => {

  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/productRoutes/AdminPasta')
      .then(result => {
        console.log("Fetched products:", result.data);
        setProducts(result.data);

      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {

      axios.delete(`http://localhost:8000/productRoutes/AdminPasta/${productId}`)
        .then(() => {
          setProducts(products.filter(product => product.Product_ID !== productId));
          alert('Product deleted successfully');
        }).catch(error => {
          console.error('Error deleting product:', error);
          alert('Failed to delete product');
        });
    }
  };

  const handleEdit = (productId) => {
    // Redirect to edit page or open a modal for editing
    navigate(`/EditProduct/Pasta&Cereals/${productId}`);
    console.log('Edit:', productId);
  };

  console.log("Products in state:", products);
  return (
    <div>
      <AdminNavbar />
      <br></br>  <br></br>
      <div className='px-5 mt-3'>
        <div className='d-flex justify-content-center'>

          <h5>Product List - Pasta & Cereals</h5>

        </div>
        <Link to={"/AddProducts"} className='btn btn-success' style={{ backgroundColor: 'black' }}> Add Products </Link>
      </div>

      <div className='px-5 mt-3'>
        <table className='table'>
          <thead>
            <tr>

              <th>Product Name</th>
              <th>Image</th>
              <th>Product ID</th>
              <th>Product Price (Rs)</th>
              <th>Expiry Date</th>
              <th>Actions</th>

            </tr>

          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.Product_ID}>
                <td>{product.Product_Name}</td>
                <td><img src={`http://localhost:8000/Uploads/Biscuits&snacks/${product.ProductImage}`} style={{ width: '100px' }} /></td>
                <td>{product.Product_ID}</td>
                <td>{product.Price}</td>
                <td>{product.Expiry_Date}</td>
                <td>
                  <button onClick={() => handleEdit(product.Product_ID)} className="btn" style={{ backgroundColor: '#F2B75E', marginRight: '10px' }}>Edit</button>
                  <button onClick={() => handleDelete(product.Product_ID)} className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}

export default AdminPasta
