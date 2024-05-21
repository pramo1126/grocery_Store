import  { useState } from 'react';
import axios from 'axios';

const Checkout = ({ ShoppingCrt }) => {
    const [checkoutSuccess, setCheckoutSuccess] = useState(false);

    const handleCheckout = () => {
        axios.post('/api/checkout', { ShoppingCrt })
            .then(() => {
                setCheckoutSuccess(true);
            })
            .catch((error) => {
                console.error('Error during checkout:', error);
            });
    };

    return (
        <div>
            {!checkoutSuccess && (
                <button onClick={handleCheckout}>Proceed to Checkout</button>
            )}

            {checkoutSuccess && (
                <p>Checkout successful!</p>
            )}
        </div>
    );
};

export default Checkout;
