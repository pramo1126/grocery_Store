import { useCart } from '../Context/CartContext';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer';
import { Table, Button, Image, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ShoppingCart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const handleDecreaseQuantity = (productId, currentQuantity) => {
    if (currentQuantity > 1) {
      updateQuantity(productId, currentQuantity - 1);
    }
  };

  const handleIncreaseQuantity = (productId) => {
    const product = cart.find(product => product.Product_ID === productId);
    if (product) {
      updateQuantity(productId, product.Qty + 1);
    }
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, product) => total + (product.Price * product.Qty), 0).toFixed(2);
  };

  return (
    <div>
      <Navbar />
      <Container>
        <Row className="my-4">
          <Col>
            <h3>Shopping Cart</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Product Image</th>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Unit Price (Rs)</th>
                  <th>Total Price</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {cart.length > 0 ? cart.map((product, index) => (
                  <tr key={index}>
                    <td>
                      <Image src={`http://localhost:8000/Uploads/Biscuits&snacks/${product.ProductImage}`} rounded width="50" height="50" />
                    </td>
                    <td>{product.Product_Name}</td>
                    <td>
                      <Button variant="secondary" size="sm" onClick={() => handleDecreaseQuantity(product.Product_ID, product.Qty)}>-</Button>
                      <span className="mx-2">{product.Qty}</span>
                      <Button variant="secondary" size="sm" onClick={() => handleIncreaseQuantity(product.Product_ID)}>+</Button>
                    </td>
                    <td>{product.Price}</td>
                    <td>{(product.Price * product.Qty).toFixed(2)}</td>
                    <td>
                      <Button variant="danger" size="sm" onClick={() => removeFromCart(product.Product_ID)}>Remove</Button>
                    </td>
                  </tr>
                )) : <tr><td colSpan="6" className="text-center">No items in the cart</td></tr>}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col className="text-right">
            <h4>Total Price: Rs {calculateTotalPrice()}</h4>
            <Button variant="primary" size="lg">Proceed to Checkout</Button>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default ShoppingCart;
