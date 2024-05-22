
import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
const CartContext = createContext();
import axios from 'axios';

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([ ]);

    // useEffect(() => {
    //     console.log("Updated cart:", cart);
    // }, [cart]);
// useEffect(() => {
//     const addToCart = async (product, quantityToAdd) => {

//         // Retrieve the user data from localStorage
//         const storedUser = localStorage.getItem('user');
//         const user = storedUser ? JSON.parse(storedUser) : null;


//         // Check if user data is available and has an ID
//         if (!user || !user.ID) {
//             alert('You must be logged in to add items to the cart.');
//             console.error('User not logged in or user ID is missing');
//             return;
//         }
//         try {
//             // Make a POST request to add the product to the cart

//             const response = await axios.post('http://localhost:8000/cartRoutes/addProductsCart', {
//                 userId: user.ID,  // Use the user ID from localStorage
//                 productId: product.Product_ID,
//                 quantity: quantityToAdd
//             });

//             console.log('Request sent:', { userId: user.ID, productId: product.Product_ID, quantity: quantityToAdd });

//             if (response.status === 200) {
//                 // Update local cart state
//                 console.log('Cart updated:', response.data);
//                 // Here you might want to fetch the updated cart or update the state directly
//             } else {
//                 console.error('Failed to update cart:', response.data);
//             }
//         } catch (error) {
//             console.error('Error updating cart:', error);
//         }
//     };

    //     console.log("Updated cart:", cart);
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

    const addToCart = async (product, quantityToAdd) => {
        const storedUser = localStorage.getItem('user');
        const user = storedUser ? JSON.parse(storedUser) : null;

        if (!user || !user.ID) {
            alert('You must be logged in to add items to the cart.');
            console.error('User not logged in or user ID is missing');
            return;
        }

        // Update local state immediately for better responsiveness
        const newCartItem = { ...product, quantity: quantityToAdd };
        setCart([...cart, newCartItem]);

        // Sync with server
        try {
            const response = await axios.post('http://localhost:8000/cartRoutes/addProductsCart', {
                userId: user.ID,
                productId: product.Product_ID,
                quantity: quantityToAdd
            });

            if (response.status !== 200) {
                console.error('Failed to update cart:', response.data);
        // Optionally, roll back local changes if server update fails
            }
        } catch (error) {
            console.error('Error updating cart:', error);
            // Optionally, roll back local changes if server update fails
        }
    };

    const removeFromCart = (Product_ID) => {
        console.log("Removing from cart:", Product_ID);
        setCart(cart.filter(item => item.Product_ID !== Product_ID));
    };

    const updateQuantity = (Product_ID, quantity) => {
        console.log("Updating quantity for:", Product_ID, " New quantity:", quantity);
        setCart(cart.map(item => item.Product_ID === Product_ID ? { ...item, quantity } : item));
    };

    console.log("Current cart:", cart);

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