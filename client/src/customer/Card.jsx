import  { useState } from 'react';
import { useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const CustomCard = ({ productName, imageSrc, productPrice,}) => {
    const [quantity, setQuantity] = useState(0);
    const [addToCart, setAddToCart] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    // const getUserfromLocalStorage = localStorage.getItem("user")
    //     ? JSON.parse(localStorage.getItem("user"))
    //     : null;
    //     console.log(getUserfromLocalStorage.ID);

    const getUserfromLocalStorage = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : null;

    if (getUserfromLocalStorage) {
        console.log(getUserfromLocalStorage.ID);
    } else {
        console.log("No user found in localStorage");
    }


    useEffect(() => {
        console.log(`Product: ${productName}, Quantity: ${quantity}, Price: ${ productPrice }, Image: ${imageSrc}`);
    }, [quantity, productName , productPrice, imageSrc]); // Include productName in the dependency array to ensure updates are logged correctly
    const handleAddToCart = () => {
        const productDetails = {
            productName,
            productPrice,
            quantity
        };
      setCartItems(prevItems => [...prevItems, productDetails]);
        setAddToCart(true);
    };

    const handleAdd = () => {
        setQuantity(quantity + 1);
    };

    const handleReduce = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    };

    CustomCard.propTypes = {
        productName: PropTypes.string.isRequired,
        imageSrc: PropTypes.string.isRequired,
        productPrice: PropTypes.string.isRequired,
        handleAddToCart: PropTypes.func.isRequired,
    };
    return (
        <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
            <Card
                style={{
                    width: '18rem',
                    cursor: 'pointer',
                    boxShadow: isHovered ? '0 4px 8px rgba(0,0,0,0.2)' : 'none',
                    transition: 'box-shadow 0.3s'
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                    <Card.Img
                        variant="top"
                        src={imageSrc}
                        style={{
                            width: '150px',
                            height: '150px',
                            objectFit: 'contain',
                        }}
                    />
                </div>
                <Card.Body>
                    <Card.Title style={{ fontSize: '14px', textAlign: 'center' }}>{productName}</Card.Title>
                    <Card.Text style={{ fontSize: '13px', textAlign: 'center' }}>{productPrice}</Card.Text>

                    {!addToCart ? (
                        <div style={{ fontSize: '10px', textAlign: 'center' }}>
                            <Button variant="success" size="sm" onClick={handleAddToCart}>Add to Cart</Button>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Button variant="success" size="sm" onClick={handleReduce}>-</Button>
                            <span>{quantity}</span>
                            <Button variant="success" size="sm" onClick={handleAdd}>+</Button>
                        </div>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
};

export default CustomCard;
