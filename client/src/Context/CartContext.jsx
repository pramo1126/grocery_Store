import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const storedUser = localStorage.getItem('user');
                const user = storedUser ? JSON.parse(storedUser) : null;
                if (user && user.ID) {
                    const response = await axios.get(`http://localhost:8000/cartRoutes/cart/${user.ID}`);
                    setCart(response.data);
                }
            } catch (error) {
                console.error('Error fetching cart:', error);
            }
        };

        fetchCart();
    }, []);

    const addToCart = async (productId, quantity) => {
        const storedUser = localStorage.getItem('user');
        const user = storedUser ? JSON.parse(storedUser) : null;

        if (!user || !user.ID) {
            alert('You must be logged in to add items to the cart.');
            console.error('User not logged in or user ID is missing');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/cartRoutes/addOrUpdateCart', {
                userId: user.ID,
                productId,
                quantity
            });

            if (response.status === 200) {
                setCart(prevCart => {
                    const existingItem = prevCart.find(product => product.Product_ID === productId);
                    if (existingItem) {
                        return prevCart.map(product =>
                            product.Product_ID === productId
                                ? { ...product, Qty: product.Qty + quantity }
                                : product
                        );
                    } else {
                        return [...prevCart, { ...response.data, Qty: quantity }];
                    }
                });
            } else {
                console.error('Failed to update cart:', response.data);
            }
        } catch (error) {
            console.error('Error updating cart:', error);
        }
    };

    const removeFromCart = async (Product_ID) => {
        const storedUser = localStorage.getItem('user');
        const user = storedUser ? JSON.parse(storedUser) : null;

        if (!user || !user.ID) {
            alert('You must be logged in to remove items from the cart.');
            console.error('User not logged in or user ID is missing');
            return;
        }

        try {
            const response = await axios.delete(`http://localhost:8000/cartRoutes/cart/${user.ID}/${Product_ID}`);
            if (response.status === 200) {
                setCart(prevCart => prevCart.filter(product => product.Product_ID !== Product_ID));
            } else {
                console.error('Failed to remove product from cart:', response.data);
            }
        } catch (error) {
            console.error('Error removing product from cart:', error);
        }
    };

    const updateQuantity = async (Product_ID, quantity) => {
        const storedUser = localStorage.getItem('user');
        const user = storedUser ? JSON.parse(storedUser) : null;

        if (!user || !user.ID) {
            alert('You must be logged in to update product quantity.');
            console.error('User not logged in or user ID is missing');
            return;
        } 

        try {
            const response = await axios.put(`http://localhost:8000/cartRoutes/cart/${user.ID}/${Product_ID}`, {
                quantity
            });

            if (response.status === 200) {
                setCart(prevCart =>
                    prevCart.map(product =>
                        product.Product_ID === Product_ID ? { ...product, Qty: quantity } : product
                    )
                );
            } else {
                console.error('Failed to update cart product quantity:', response.data);
            }
        } catch (error) {
            console.error('Error updating cart product quantity:', error);
        }
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

CartProvider.propTypes = {
    children: PropTypes.node.isRequired
}; 

export default CartProvider;
