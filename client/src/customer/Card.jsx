import { Card, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CustomCard = ({ productId, productName, imageSrc, productPrice, handleAddToCart }) => {
    const [addedToCart, setAddedToCart] = useState(false);
    const [userId, setUserId] = useState(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const fetchUserId = () => {
            const storedUser = localStorage.getItem('user');
            const user = storedUser ? JSON.parse(storedUser) : null;
            if (user && user.ID) {
                setUserId(user.ID);
                console.log(user.ID);
            }
        };

        fetchUserId();
    }, []);

    const handleAddToCartClick = async () => {
        if (!userId) {
            console.error('User ID not found.');
            return;
        }

        try {
            await axios.post('http://localhost:8000/cartRoutes/addOrUpdateCart', {
                userId: userId,
                productId: productId,
                quantity: 1, // initially add 1 item to the cart
            });
            setAddedToCart(true);
            handleAddToCart(productId);
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    return (
        <div className={`col-lg-3 col-md-4 col-sm-6 mb-4 mt-5 custom-card ${isHovered ? 'hoverEffect' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            

            <Card style={{ width: '280px', height: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Card.Img variant='top' src={imageSrc} style={{ width: '60%', height: '60%', objectFit: 'contain' }} />
                <Card.Body>
                    <Card.Title style={{ fontSize: "14px", textAlign: "center" }}>{productName}</Card.Title>
                    <Card.Text style={{ fontSize: "13px", textAlign: "center" }}>Rs. {productPrice}</Card.Text>
                    {!addedToCart && (
                        <div style={{ textAlign: "center" }}>
                            <Link to="/ShoppingCart" style={{ textDecoration: 'none' }}>
                                <Button variant='success' size='sm' onClick={handleAddToCartClick}>
                                    Add to Cart
                                </Button>
                            </Link>
                        </div>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
};

CustomCard.propTypes = {
    productId: PropTypes.number.isRequired,
    productName: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    productPrice: PropTypes.string.isRequired,
    handleAddToCart: PropTypes.func.isRequired,
};

export default CustomCard;
