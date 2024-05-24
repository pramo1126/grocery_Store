import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer';
import  {  useEffect } from 'react';
import { Input, Ripple, initMDB } from "mdb-ui-kit";
// import BillPreview from './BillPreview'; 
import { useCart } from '../Context/CartContext';

const Checkout = () => {
    useEffect(() => {
        initMDB({ Input, Ripple });
    }, []);

    const { cart } = useCart();

    const calculateTotalPrice = () => {
        return cart.reduce((total, product) => total + (product.Price * product.Qty), 0).toFixed(2);
    };

  return (
    <div>
          <Navbar />
          <br></br> <br></br>

          
          <div className="container" >
              <div className="row justify-content-center">
              <div className="row">
                      <h4>Order Review</h4>
                      <br></br> <br></br>
                  <div className="col-md-6" style={{ border: "1px solid #ccc", padding: "10px", justifyItems:'center' }}>
                         
                      <div>
                         
                          <ul>
                              {cart.map((product, index) => (
                                  <li key={index}>
                                      {product.Product_Name} - Rs {product.Price} x {product.Qty} = Rs {(product.Price * product.Qty).toFixed(2)}
                                  </li>
                              ))}
                          </ul>
                          <p>Delivery Fee: Rs 150</p>
                          <p>Subtotal: Rs {parseFloat(calculateTotalPrice()) + 150}</p>
                    
                      </div>
                  </div>

                    
                    
                      {/* <h5>Checkout</h5> */}
          <form>
                  <div className="col">
                              <br></br> <br></br>
                                      <div data-mdb-input-init className="form-outline mb-4">
                          <input type="text" id="form6Example1" className="form-control" />
                          <label className="form-label" htmlFor="form6Example4">Name</label>
                      </div>
                  </div>
                
              {/* </div> */}


              {/* Text input */}
                          <div className="col">
              <div data-mdb-input-init className="form-outline mb-4">
                  <input type="text" id="form6Example4" className="form-control" />
                  <label className="form-label" htmlFor="form6Example4">Shipping Address</label>
              </div>
                          </div>


              {/* Number input */}
                          <div className="col">
              <div data-mdb-input-init className="form-outline mb-4">
                  <input type="number" id="form6Example6" className="form-control" />
                  <label className="form-label" htmlFor="form6Example6">Contact Number</label>
              </div>
                          </div>

                          <div className="col">
                              <div data-mdb-input-init className="form-outline mb-4">
                                  <select className="form-select" id="paymentMethod">
                                      {/* <option value="">Payment Method</option> */}
                                      <option value="cash">Cash on Delivery</option>
                                  </select>
                                  <label className="form-label" htmlFor="paymentMethod">Payment Method</label>
                              </div>
                          </div>


              {/* Message input */}
                          <div className="col">
              <div data-mdb-input-init className="form-outline mb-4">
                  <textarea className="form-control" id="form6Example7" rows="4"></textarea>
                  <label className="form-label" htmlFor="form6Example7">Special Note</label>
              </div>
                          </div>
                          

              {/* Submit button */}
                          <button data-mdb-ripple-init type="button" className="btn btn-success btn-block mb-4 d-block mx-auto">Place order</button>
                         
                          <button data-mdb-ripple-init type="button" className="btn btn-success btn-block mb-4 d-block mx-auto">Download Invoice</button>
          </form>
          
                     
             
          </div>

          <br></br><br></br>
        
   
              </div>
          </div>
          <Footer />
      </div>
  )
}

export default Checkout
