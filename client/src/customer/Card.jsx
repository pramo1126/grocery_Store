import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { useCart } from '../Context/CartContext';

const CustomCard = ({ productName, imageSrc, productPrice, product }) => {
    const { addOrUpdateCart } = useCart();
    const [quantity, setQuantity] = useState(0);
    const [addToCartView, setAddToCartView] = useState(false);

    const handleAddToCart = async () => {
        if (quantity > 0) {
            await addOrUpdateCart(product, quantity);
            setAddToCartView(false);
        }
    };

    const handleAdd = async () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        setAddToCartView(true);
        await addOrUpdateCart(product, newQuantity);
    };

    const handleReduce = async () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            await addOrUpdateCart(product, newQuantity);
        } else {
            setAddToCartView(false);
            setQuantity(0);
            await addOrUpdateCart(product, 0);
        }
    };

    return (
        <div className='col-lg-3 col-md-4 col-sm-6 mb-4 mt-5'>
            <Card>
                <Card.Img variant='top' src={imageSrc} />
                <Card.Body>
                    <Card.Title style={{ fontSize: "14px", textAlign: "center" }}>{productName}</Card.Title>
                    <Card.Text style={{ fontSize: "13px", textAlign: "center" }}>{productPrice} Rs</Card.Text>
                    {addToCartView ? (
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Button variant='success' size='sm' onClick={handleReduce}>-</Button>
                            <span>{quantity}</span>
                            <Button variant='success' size='sm' onClick={handleAdd}>+</Button>
                        </div>
                    ) : (
                        <Button variant='success' size='sm' onClick={handleAdd}>Add to Cart</Button>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
};

CustomCard.propTypes = {
    productName: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    productPrice: PropTypes.string.isRequired,
    product: PropTypes.object.isRequired
};

export default CustomCard;import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { useCart } from '../Context/CartContext';

const CustomCard = ({ productName, imageSrc, productPrice, product }) => {
    const { addToCart, updateQuantity } = useCart();
    const [quantity, setQuantity] = useState(0);

    const handleAdd = async () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        if (quantity === 0) {
            await addToCart(product, newQuantity);
        } else {
            await updateQuantity(product.Product_ID, newQuantity);
        }
    };

    const handleReduce = async () => {
        if (quantity > 0) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            await updateQuantity(product.Product_ID, newQuantity);
        }
    };

    return (
        <div className='col-lg-3 col-md-4 col-sm-6 mb-4 mt-5'>
            <Card>
                <Card.Img variant='top' src={imageSrc} />
                <Card.Body>
                    <Card.Title style={{ fontSize: "14px", textAlign: "center" }}>{productName}</Card.Title>
                    <Card.Text style={{ fontSize: "13px", textAlign: "center" }}>{productPrice} Rs</Card.Text>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Button variant='success' size='sm' onClick={handleReduce}>-</Button>
                        <span>{quantity}</span>
                        <Button variant='success' size='sm' onClick={handleAdd}>+</Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

CustomCard.propTypes = {
    productName: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    productPrice: PropTypes.string.isRequired,
    product: PropTypes.object.isRequired
};

export default CustomCard;
