import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';

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
                    <div key={product.Product_ID} className="col-md-4 mb-4">
                        <Card >
                            <Card.Img variant="top" src={`http://localhost:8000/Uploads/Biscuits&snacks/${product.ProductImage}`} />
                            <Card.Body>
                                <Card.Title>{product.Product_Name}</Card.Title>
                                <Card.Text>
                                    Price: {product.Price} Rs
                                    <br />
                                    Expiry Date: {product.Expiry_Date}
                                </Card.Text>
                                <Button onClick={() => handleAddToCart(product.Product_ID)} variant="primary">Add to Cart</Button>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryPage;
