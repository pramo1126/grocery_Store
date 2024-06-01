import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import AdminNavbar from '../components/AdminNavbar';
import AdminFooter from '../components/AdminFooter';
import axios from 'axios';

const AdminProductList = () => {
    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isFiltered, setIsFiltered] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8000/categoryRoutes/categories');
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
                    setFilteredProducts(response.data);
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

    const handleDelete = async (productId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this product?');

        if (confirmDelete) {
            try {
                const response = await axios.delete(`http://localhost:8000/productRoutes/product/${productId}`);
                if (response.status === 200) {
                    setProducts(products.filter(product => product.Product_ID !== productId));
                    setFilteredProducts(filteredProducts.filter(product => product.Product_ID !== productId));
                } else {
                    console.error('Failed to delete product:', response.data);
                }
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setFilteredProducts(products.filter(product => product.Product_Name.toLowerCase().includes(e.target.value.toLowerCase())));
    };

    const handleReorderFilter = async () => {
        try {
            const response = await axios.get('http://localhost:8000/productRoutes/product/reorder');
            setFilteredProducts(response.data);
            setIsFiltered(true);
        } catch (error) {
            console.error('Error fetching products for reorder:', error);
        }
    };

    const handleExpiringSoonFilter = async () => {
        try {
            const response = await axios.get('http://localhost:8000/productRoutes/product/expiringsoon');
            setFilteredProducts(response.data);
            setIsFiltered(true);
        } catch (error) {
            console.error('Error fetching expiring soon products:', error);
        }
    };

    const handleResetFilter = () => {
        setFilteredProducts(products);
        setSearchTerm('');
        setIsFiltered(false);
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div>
            <AdminNavbar categories={categories} />
            <div className='px-5 mt-3'>
                <div className='d-flex justify-content-center'>
                    <h3>Product List - {categoryId ? categories.find(category => category.Category_ID === parseInt(categoryId))?.Product_Category : 'All Products'}</h3>
                </div>
                <div className="mb-3">
                    <input type="text" placeholder="Search by product name" value={searchTerm} onChange={handleSearch} className='bg-light p-2 border rounded w-75 text-dark' />
                </div>
                <div className="mb-3">
                    <button onClick={handleReorderFilter} className='btn btn-warning mx-2'>Reorder Alert</button>
                    <button onClick={handleExpiringSoonFilter} className='btn btn-danger mx-2'>Expiring Soon</button>
                    <button onClick={handleResetFilter} className='btn btn-secondary mx-2'>Reset</button>
                </div>
                <br></br><br></br>
                <Link to={"/AddProducts"} className='btn btn-success' style={{ backgroundColor: 'black', color: 'white' }}> Add Products </Link>
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
                            <th>Stock Amount</th>
                            <th>Reorder Level</th>
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
                                <td>{formatDate(product.Expiry_Date)}</td>
                                <td>{product.Qty}</td>
                                <td>{product.Reorder_Level}</td>
                                <td>
                                    <button onClick={() => handleEdit(product.Product_ID)} className="btn" style={{ backgroundColor: '#F2B75E', marginRight: '10px' }}>
                                        <Link to={`/EditProduct/${categoryId}/${product.Product_ID}`}> Edit</Link>
                                    </button>
                                    <button onClick={() => handleDelete(product.Product_ID)} className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br>
            <AdminFooter />
        </div>
    );
};

export default AdminProductList;
