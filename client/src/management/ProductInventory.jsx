import AdminsideNavbar from '../components/AdminsideNavbar';
import AdminFooter from '../components/AdminFooter';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ProductInventory = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8000/productRoutes/product/expiringsoon');
                console.log("API Response:", response.data);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <AdminsideNavbar />
            <h5>Expired Product List </h5>
            <div className='px-5 mt-3'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Product ID</th>
                            <th>Expiry Date</th>
                            <th>Expiry Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? (
                            products.map((product) => (
                                <tr key={product.Product_ID}>
                                    <td>{product.Product_Name}</td>
                                    <td>{product.Product_ID}</td>
                                    <td>{product.Expiry_Date}</td>
                                    <td>{product.ExpiryStatus}</td>
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
            <br></br> <br></br> <br></br>
            <AdminFooter />
        </div>
    );
};

export default ProductInventory;