import { useEffect, useState } from 'react';
import AdminNavbar from '../components/AdminNavbar';
import AdminFooter from '../components/AdminFooter';
import { Link } from 'react-router-dom';
import axios from 'axios';


const AdminProductList = () => {
    const [categoryId, setCategoryId] = useState(''); // Add state for category selection
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);


const getProductsByCategory = async (categoryId) => {
    try {
        const response = await axios.get(`https://localhost:8000/AdminProductList/${categoryId}`);
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Failed to fetch products. Please try again.');
        }
    } catch (error) {
        console.error('Error fetching products:', error.message);
        return [];
    }
};



    useEffect(() => {
        // Fetch categories data
        // Example: Fetch categories from an API endpoint
        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://localhost:8000/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleCategoryChange = (selectedCategoryId) => {
        setCategoryId(selectedCategoryId);
        // Fetch products based on selected category
        getProductsByCategory(selectedCategoryId).then(products => setProducts(products));
    };


    // Define the logic for editing a product
    const handleEdit = (productId) => {
        console.log('Edit:', productId);
    };

    // Define the logic for deleting a product
    const handleDelete = (productId) => {
        console.log('Delete:', productId);
    };

    <AdminProductList categories={categories} />


    return (
        <div>
            <AdminNavbar categories={categories} handleCategoryChange={handleCategoryChange} />
            <div className='px-5 mt-3'>
                <div className='d-flex justify-content-center'>
                    <h3>Product List - {categoryId ? categories.find(category => category.id === categoryId)?.name : 'All Products'}</h3>
                </div>
                <Link to={"/AddProducts"} className='btn btn-success'> Add Products </Link>
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
                                <td><img src={product.ProductImage} style={{ width: '100px' }} /></td>
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
            <AdminFooter />
        </div>
    );
};

export default AdminProductList
