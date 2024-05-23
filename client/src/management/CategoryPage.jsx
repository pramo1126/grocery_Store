import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CustomCard from '../customer/Card';

const CategoryPage = () => {
    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/productRoutes/products/${categoryId}`);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [categoryId]);

    const handleAddToCart = (productId) => {
        console.log('Product added to cart:', productId);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!products.length) {
        return <div>No products found.</div>;
    }

    return (
        <div className="container">
            <div className="row">
                {products.map((product) => (
                    <CustomCard
                        key={product.Product_ID}
                        productId={product.Product_ID}
                        productName={product.Product_Name}
                        imageSrc={`http://localhost:8000/Uploads/Biscuits&snacks/${product.ProductImage}`}
                        productPrice={product.Price}
                        handleAddToCart={handleAddToCart}
                    />
                ))}
            </div>
        </div>
    );
};

export default CategoryPage;
