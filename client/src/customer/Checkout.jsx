import { useEffect, useState } from 'react';
import { Input, Ripple, initMDB } from "mdb-ui-kit";
import axios from 'axios';
import { useCart } from '../Context/CartContext';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer';
import Logo from "../components/Navbar/Assets/Sameerawhite.png"

const Checkout = () => {
    const { cart } = useCart();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const calculateTotalPrice = () => {
        return cart.reduce((total, product) => total + (parseFloat(product.Price) * product.Qty), 0).toFixed(2);
    };

    const saveOrderDetails = async (orderData) => {
        try {
            setLoading(true);
            setError(null);
            setSuccess(null);
            console.log('Sending order data:', orderData); // Log the request payload
            const response = await axios.post('http://localhost:8000/orderRoutes/saveOrder', orderData);
            console.log('Order saved successfully:', response.data);
            setSuccess('Order saved successfully!');
        } catch (error) {
            console.error('Error saving order:', error);
            setError('Error saving order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handlePlaceOrder = async () => {
        const orderData = {
            Customer_Name: document.getElementById('form6Example1').value,
            Contact_Number: document.getElementById('form6Example3').value,
            Delivery_Location: document.getElementById('form6Example2').value,
            Notes: document.getElementById('form6Example4').value,
            Grand_Total: parseFloat(calculateTotalPrice()) + 150,
            Date: new Date().toISOString(),
            Items: JSON.stringify(cart.map(product => ({
                Product_ID: product.Product_ID,
                Qty: product.Qty
            })))
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

        // Convert image to Base64
        const reader = new FileReader();
        reader.onload = function (event) {
            const logoData = event.target.result;

            // Add the logo
            pdf.addImage(logoData, 'PNG', 14, 10, 50, 20);

            // Add the shop details
            pdf.setFontSize(16);
            pdf.setFont('helvetica', 'bold');
            pdf.text('Sameera Grocery Store', 70, 22);
            pdf.setFontSize(12);
            pdf.setFont('helvetica', 'normal');
            pdf.text('Dadalla Road, Galle', 70, 28);

            // Add invoice title
            pdf.setFontSize(20);
            pdf.text('Invoice', 105, 40, { align: 'center' });

            // Add customer details
            const customerName = document.getElementById('form6Example1').value;
            const shippingAddress = document.getElementById('form6Example2').value;
            const contactNumber = document.getElementById('form6Example3').value;
            const specialNote = document.getElementById('form6Example4').value;

            pdf.setFontSize(12);
            pdf.setFont('times', 'normal');
            pdf.text(`Customer Name: ${customerName}`, 14, 60);
            pdf.text(`Shipping Address: ${shippingAddress}`, 14, 66);
            pdf.text(`Contact Number: ${contactNumber}`, 14, 72);
            pdf.text(`Special Note: ${specialNote}`, 14, 78);

            // Add order details
            const cartItems = cart.map((item, index) => ([
                index + 1,
                item.Product_Name,
                item.Qty,
                parseFloat(item.Price).toFixed(2),
                (parseFloat(item.Price) * item.Qty).toFixed(2)
            ]));

            const tableColumn = ["#", "Product Name", "Qty", "Unit Price (Rs)", "Total Price (Rs)"];
            const tableRows = cartItems;

            // Add table to the PDF
            pdf.autoTable({
                head: [tableColumn],
                body: tableRows,
                startY: 90,
                theme: 'grid',
                headStyles: { fillColor: [22, 160, 133] },
                margin: { top: 10 }
            });

            // Add total price
            const finalY = pdf.previousAutoTable.finalY + 10;
            const totalPrice = parseFloat(calculateTotalPrice());
            const deliveryFee = 150;
            const grandTotal = totalPrice + deliveryFee;

            pdf.setFontSize(12);
            pdf.setFont('helvetica', 'bold');
            pdf.text(`Subtotal: Rs ${totalPrice.toFixed(2)}`, 14, finalY);
            pdf.text(`Delivery Fee: Rs ${deliveryFee}`, 14, finalY + 6);
            pdf.text(`Grand Total: Rs ${grandTotal.toFixed(2)}`, 14, finalY + 12);

            // Save the PDF
            pdf.save('invoice.pdf');
        };

        // Read the image file
        fetch(Logo)
            .then(res => res.blob())
            .then(blob => {
                reader.readAsDataURL(blob);
            });
    };

    if (!cart) return <div>Loading...</div>;

    return (
        <div>
            <Navbar handleCategoryChange={() => { }} /> {/* Ensure handleCategoryChange prop is passed */}
            <div className="container">

                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h4>Order Review</h4>
                        <ul>
                            {cart.map((product, index) => (
                                <li key={index}>
                                    {product.Product_Name} - Rs {product.Price} x {product.Qty} = Rs {(product.Price * product.Qty).toFixed(2)}
                                </li>
                            ))}
                        </ul>
                        <p>Delivery Fee: Rs 150</p>
                        <p>Subtotal: Rs {(parseFloat(calculateTotalPrice()) + 150).toFixed(2)}</p>
                        <form>
                            <div className="form-outline mb-4">
                                <input type="text" id="form6Example1" className="form-control" required />
                                <label className="form-label" htmlFor="form6Example1">Name</label>
                            </div>
                            <div className="form-outline mb-4">
                                <input type="text" id="form6Example2" className="form-control" required />
                                <label className="form-label" htmlFor="form6Example2">Shipping Address</label>
                            </div>
                            <div className="form-outline mb-4">
                                <input type="number" id="form6Example3" className="form-control" required />
                                <label className="form-label" htmlFor="form6Example3">Contact Number</label>
                            </div>
                            <div className="form-outline mb-4">
                                <textarea className="form-control" id="form6Example4" rows="4" required></textarea>
                                <label className="form-label" htmlFor="form6Example4">Special Note</label>
                            </div>
                            {error && <div className="alert alert-danger">{error}</div>}
                            {success && <div className="alert alert-success">{success}</div>}
                            <button type="button" onClick={handlePlaceOrder} className="btn btn-success btn-block mb-4" >
                                Place Order
                            </button>
                            <button type="button" onClick={generateInvoicePDF} className="btn btn-success btn-block mb-4">Download Invoice</button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Checkout;
