import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import PropTypes from "prop-types";
const CustomCard = ({ productName, imageSrc, productPrice }) => {
	const [quantity, setQuantity] = useState(0);
	const [addToCart, setAddToCart] = useState(false);

	const handleAddToCart = () => {
		// Implement the logic to add the product to the cart
		console.log(`Added ${quantity} ${productName} to cart.`);
		// Reset quantity after adding to cart
		setQuantity(0);
		// Update addToCart state to true
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

	return (
		<div className='col-lg-3 col-md-4 col-sm-6 mb-4  mt-5'>
			<Card.Title style={{ fontSize: "14px", textAlign: "center" }}>
				{/* <div style={{ fontWeight: "bold", marginBottom: "5px" }}>Category: {"categoryName"}</div> */}
				{/* {productName} */}
			</Card.Title>

			<Card>
				<Card.Img variant='top' src={imageSrc} />
				<Card.Body>
					<Card.Title style={{ fontSize: "14px", textAlign: "center" }}>{productName}</Card.Title>
					<Card.Text style={{ fontSize: "13px", textAlign: "center" }}>{productPrice}</Card.Text>

					{!addToCart ? (
						<div style={{ fontSize: "10px", textAlign: "center" }}>
							<Button variant='success' size='sm' onClick={handleAddToCart}>
								Add to Cart
							</Button>
						</div>
					) : (
						<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
							<Button variant='success' size='sm' onClick={handleReduce}>
								-
							</Button>
							<span>{quantity}</span>
							<Button variant='success' size='sm' onClick={handleAdd}>
								+
							</Button>
						</div>
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
};

export default CustomCard;
