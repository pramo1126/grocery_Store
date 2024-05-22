import Navbar from '../components/Navbar/Navbar';
import { useCart } from '../Context/CartContext';
import Footer from '../components/Footer';

const ShoppingCart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  console.log("Cart items in ShoppingCart:", cart);

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <div className="card-header"><h3>Shopping Cart</h3></div>
        <div className="card-body">
          <table className='table'>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Unit Price (Rs)</th>
                <th>Total Price</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cart.length > 0 ? cart.map((item, index) => (
                <tr key={index}>
                  <td>{item.Product_Name}</td>
                  <td>
                    <button onClick={() => updateQuantity(item.Product_ID, item.quantity - 1)}>-</button>
                    {item.quantity}
                    <button onClick={() => updateQuantity(item.Product_ID, item.quantity + 1)}>+</button>
                  </td>
                  <td>{item.Price}</td>
                  <td>{item.Price * item.quantity}</td>
                  <td>
                    <button onClick={() => removeFromCart(item.Product_ID)}>Remove</button>
                  </td>
                </tr>
              )) : <tr><td colSpan="5">No items in the cart</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShoppingCart;
