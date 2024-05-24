
import { useCart } from '../Context/CartContext';

const BillPreview = () => {
    const { cart } = useCart();

    const calculateTotalPrice = () => {
        return cart.reduce((total, product) => total + (product.Price * product.Qty), 0).toFixed(2);
    };

    return (
        <div className="col-md-6">
            <div>
                <h6>Bill Preview</h6>
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
    );
};

export default BillPreview;