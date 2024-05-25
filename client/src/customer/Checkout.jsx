import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer';
import  {  useEffect } from 'react';
import { Input, Ripple, initMDB } from "mdb-ui-kit";
import axios from 'axios';
import { useCart } from '../Context/CartContext';
import jsPDF from 'jspdf';

const Checkout = () => {
    // useEffect(() => {
    //     initMDB({ Input, Ripple });
    // }, []);

    const { cart } = useCart();

    const calculateTotalPrice = () => {
        return cart.reduce((total, product) => total + (product.Price * product.Qty), 0).toFixed(2);
    };

    const saveOrderDetails = async (orderData) => {
        try {
            const response = await axios.post('http://localhost:8000/orderRoutes/saveOrder', orderData);
            console.log('Order saved successfully:', response.data);
        } catch (error) {
            console.error('Error saving order:', error);
        }
    };

    const handlePlaceOrder = async () => {
        const orderData = {
            Customer_Name: document.getElementById('form6Example1').value, // Get customer ID from input field
            Items: JSON.stringify(cart),
            Delivery_Location: document.getElementById('form6Example2').value, // Get shipping address from input field
            Notes: document.getElementById('form6Example4').value, // Get special note from input field
            Grand_Total: parseFloat(calculateTotalPrice()) + 150,
            Date: new Date().toISOString()
        };

        await saveOrderDetails(orderData);
    };

    useEffect(() => {
        if (document.getElementById('form6Example1')) {
            initMDB({ Input, Ripple });
        }
    }, [cart]);

    const generateInvoicePDF = () => {
        const pdf = new jsPDF();

        // Add content to the PDF
        pdf.text('Invoice Details', 10, 10);
        pdf.text('Sameera Grocery Store', 10, 10); // Shop name
        pdf.text('Dadalla Road, Galle', 10, 20); // Shop address
        pdf.text('Customer Name: ' + document.getElementById('form6Example1').value, 10, 30); // Customer Name
        // Add order details here

        // Save the PDF
        pdf.save('invoice.pdf');
    };

  return (
    <div>
          <Navbar  />
          <br></br> <br></br>

          
          <div className="container" >
              <div className="row justify-content-center">
              <div className="row">
                      <h4>Order Review</h4>
                      <br></br> <br></br>
                  {/* <div className="col-md-6" style={{ border: "1px solid #ccc", padding: "10px", justifyItems:'center' }}> */}
                         
                      <div>
                         
                          <ul>
                              {cart && cart.map((product, index) => (
                                  <li key={index}>
                                      {product.Product_Name} - Rs {product.Price} x {product.Qty} = Rs {(product.Price * product.Qty).toFixed(2)}
                                  </li>
                              ))}
                          </ul>
                          <p>Delivery Fee: Rs 150</p>
                          <p>Subtotal: Rs {parseFloat(calculateTotalPrice()) + 150}</p>
                    
                      </div>
                  {/* </div> */}

                    
                    
                      {/* <h5>Checkout</h5> */}
          <form>
                  <div className="col">
                              <br></br> <br></br>
                                      <div data-mdb-input-init className="form-outline mb-4">
                          <input type="text" id="form6Example1" className="form-control" />
                          <label className="form-label" htmlFor="form6Example1">Name</label>
                      </div>
                  </div>
                
              {/* </div> */}


              {/* Text input */}
                          <div className="col">
              <div data-mdb-input-init className="form-outline mb-4">
                  <input type="text" id="form6Example2" className="form-control" />
                  <label className="form-label" htmlFor="form6Example2">Shipping Address</label>
              </div>
                          </div>


              {/* Number input */}
                          <div className="col">
              <div data-mdb-input-init className="form-outline mb-4">
                  <input type="number" id="form6Example3" className="form-control" />
                  <label className="form-label" htmlFor="form6Example3">Contact Number</label>
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
                  <textarea className="form-control" id="form6Example4" rows="4"></textarea>
                  <label className="form-label" htmlFor="form6Example4">Special Note</label>
              </div>
                          </div>
                          

              {/* Submit button */}
                          <button data-mdb-ripple-init type="button" onClick={handlePlaceOrder} className="btn btn-success btn-block mb-4 d-block mx-auto">Place order</button>
                         
                          <button data-mdb-ripple-init type="button" onClick={generateInvoicePDF} className="btn btn-success btn-block mb-4 d-block mx-auto">Download Invoice</button>
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
