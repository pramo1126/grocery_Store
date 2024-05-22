import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AdminNavbar from '../components/AdminNavbar';
import AdminFooter from '../components/AdminFooter';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdminProductList = () => {
    const { categoryId } = useParams(); // Get category ID from URL
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8000/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        if (categoryId) {
            const fetchProducts = async () => {
                try {
                    const response = await axios.get(`http://localhost:8000/productRoutes/products/${categoryId}`);
                    setProducts(response.data);
                } catch (error) {
                    console.error('Error fetching products:', error);
                }
            };

            fetchProducts();
        }
    }, [categoryId]);

    const handleEdit = (productId) => {
        console.log('Edit:', productId);
    };

    const handleDelete = (productId) => {
        console.log('Delete:', productId);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredProducts = products.filter(product => {
        return product.Product_Name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div>
            <AdminNavbar categories={categories} />
            <div className='px-5 mt-3'>
                <div className='d-flex justify-content-center'>
                    <h3>Product List - {categoryId ? categories.find(category => category.Category_ID === parseInt(categoryId))?.Product_Category : 'All Products'}</h3>
                </div>
                <div className="mb-3">
                    <input type="text" placeholder="Search by product name" onChange={handleSearch} className='bg-light p-2 border rounded w-75 text-dark'/>
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
                        {filteredProducts.map((product) => (
                            <tr key={product.Product_ID}>
                                <td>{product.Product_Name}</td>
                                <td><img src={`http://localhost:8000/Uploads/Biscuits&snacks/${product.ProductImage}`} alt={product.Product_Name} style={{ width: '100px' }} /></td>
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

export default AdminProductList;
