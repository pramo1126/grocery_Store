import AdminNavbar from '../components/AdminNavbar';
import AdminFooter from '../components/AdminFooter';
import  { useEffect, useState } from 'react';
import axios from 'axios';


const ProductInventory = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
    
        axios.get('http://localhost:8000/productRoutes/ProductInventory')
            .then(response => {
                console.log("API Response:", response.data);
                const fetchedProducts = response.data;
                const expiredProducts = fetchedProducts.filter(product => new Date(product.Expiry_Date) < new Date());
                console.log("Expired products:", response.data);
                setProducts(expiredProducts);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);

    // const handleDelete = (productId) => {
    //     if (window.confirm('Are you sure you want to delete this product?')) {
    //         axios.delete(`http://localhost:8000/productRoutes/ProductInventory/${productId}`)
    //             .then(() => {
    //                 const updatedProducts = products.filter(product => product.Product_ID !== productId);
    //                 setProducts(updatedProducts);
    //                 alert('Product deleted successfully');
    //             })
    //             .catch(error => {
    //                 console.error('Error deleting product:', error);
    //                 alert('Failed to delete product');
    //             });
    //     }
    // };


  return (
    <div>
          <AdminNavbar />
          <h5>Expired Product List </h5>
          <div className='px-5 mt-3'>
              <table className='table'>
                  <thead>
                      <tr>

                          <th>Product Name</th>
                            <th>Product ID</th>
                          <th>Expiry Date</th>
                          <th>Actions</th>

                      </tr>

                  </thead>
                  <tbody>
                      {products.length > 0 ? (
                          products.map((product) => (
                              <tr key={product.Product_ID}>
                                  <td>{product.Product_Name}</td>
                                  <td>{product.Expiry_Date}</td>
                                  {/* <td>
                                      <button onClick={() => handleDelete(product.Product_ID)} className="btn btn-danger">Delete</button>
                                  </td> */}
                              </tr>
                          ))
                      ) : (
                          <tr>
                              <td colSpan="4">No expired products found</td>
                          </tr>
                      )}
                  </tbody>

              </table>
          </div>
          <br></br>  <br></br> <br></br>
          <AdminFooter />
    </div>
  )
}

export default ProductInventory
