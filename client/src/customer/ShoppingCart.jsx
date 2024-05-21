import Navbar from '../components/Navbar/Navbar';
import { useCart } from '../Context/CartContext';
import Footer from '../components/Footer';

const ShoppingCart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  console.log("Cart items in ShoppingCart:", cart);

  return (
    <div>
      <Navbar />

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
                  {item.quantity}
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
      <Footer />
    </div>
  );
};

export default ShoppingCart;



// import Navbar from '../components/Navbar/Navbar'
// import { useCart } from '../Context/CartContext';
// import Footer from '../components/Footer';

// const ShoppingCart = () => {
//   const { cart, removeFromCart, updateQuantity } = useCart();

  

//   console.log("Cart items in ShoppingCart:", cart);

//   return (
//     <div>
//       <Navbar />

//       <div className ="card-header"><h3> Shopping Cart</h3></div>
//       <div className="card-body">
//       <table className='table'>
//       <tr>


//             <th>Product Name</th>
//             <th>Quantity</th>
//             <th>Unit Price (Rs)</th>
//             <th>Total Price</th>
//             <th>Remove</th>

//       </tr>
//         </thead>
//         <tbody>
//           {cart.length > 0 ? cart.map((item, index) => (
//             <tr key={index}>
//               <td>{item.ProductName}</td>
//               <td>
//                 <button onClick={() => updateQuantity(item.Product_ID, item.quantity - 1)}>-</button>
//                 {item.quantity}
//                 <button onClick={() => updateQuantity(item.Product_ID, item.quantity + 1)}>+</button>
//               </td>
//               <td>{item.Price}</td>
//               <td>{item.Price * item.quantity}</td>
//               <td>
//                 <button onClick={() => removeFromCart(item.Product_ID)}>Remove</button>
//               </td>
//             </tr>
//           )) : <tr><td colSpan="5">No items in the cart</td></tr>}
//         </tbody>
  
//       </table>
//     </div>
//   <Footer />
//     </div >
 
//   );
// };

// export default ShoppingCart;


//       {/* <div className="container">
//         {cart.length > 0 ? cart.map((cartItems, index) => (
//           <div key={index}>
//             <img src={`http://localhost:8000/Uploads/Biscuits&snacks/${cartItems.ProductImage}`} alt={cartItems.ProductName} />
//             <p>{cartItems.ProductName}</p>
//             <p>Quantity: {cartItems.quantity}</p>
//             <button onClick={() => updateQuantity(cartItems.productId, cartItems.quantity + 1)}>+</button>
//             <button onClick={() => updateQuantity(cartItems.productId, cartItems.quantity - 1)}>-</button>
//             <button onClick={() => removeFromCart(cartItems.productId)}>Remove</button>
//           </div>
//             )) : <p>No items in the cart</p>}
//           </div> */}
    