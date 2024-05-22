// useCart.js
import axios from 'axios';
import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

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
                    const response = await axios.get(`http://localhost:8000/cartRoutes/getCartItems?userId=${user.ID}`);
                    setCart(response.data);
                }
            } catch (error) {
                console.error('Error fetching cart:', error);
            }
        };

        fetchCart();
    }, []);

    const addOrUpdateCart = async (product, quantity) => {
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
                productId: product.Product_ID,
                quantity
            });

            if (response.status === 200) {
                // Update local cart state
                setCart(prevCart => {
                    const itemIndex = prevCart.findIndex(item => item.Product_ID === product.Product_ID);
                    if (itemIndex > -1) {
                        // Item exists in cart, update quantity
                        const updatedCart = [...prevCart];
                        if (quantity > 0) {
                            updatedCart[itemIndex].quantity = quantity;
                        } else {
                            updatedCart.splice(itemIndex, 1); // Remove item if quantity is 0
                        }
                        return updatedCart;
                    } else {
                        // New item, add to cart
                        return [...prevCart, { ...product, quantity }];
                    }
                });
            } else {
                console.error('Failed to update cart:', response.data);
            }
        } catch (error) {
            console.error('Error updating cart:', error);
        }
    };

    const removeFromCart = (Product_ID) => {
        setCart(cart.filter(item => item.Product_ID !== Product_ID));
    };

    const updateQuantity = (Product_ID, quantity) => {
        setCart(cart.map(item => item.Product_ID === Product_ID ? { ...item, quantity } : item));
    };

    return (
        <CartContext.Provider value={{ cart, addOrUpdateCart, removeFromCart, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

CartProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default CartProvider;
