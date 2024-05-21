
import Navbar from '../components/Navbar/Navbar'
import Card from './Card'
import Footer from '../components/Footer';
import ramadanspecial from './Assets/ramadanspecials.jpg'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../Context/CartContext';


const Biscuits = () => {
    const { addToCart } = useCart();
        const [product, setProducts] = useState([]);
    // const [cart, setCart] = useState([]);

        useEffect(() => {
            axios.get('http://localhost:8000/productRoutes/Biscuits')
            .then(response => {
                    console.log("Fetched products:", response.data);
                    setProducts(response.data);
                })
                .catch(error => {
                    console.error('Error fetching products:', error);
                });
        }, []);

    const handleAddToCart = (product) => {
        console.log("Handle add to cart:", product);
        // Correctly pass the product and quantity to the addToCart function
        addToCart(product, 1);  // Assuming you want to add 1 quantity of the product
    };

    // const handleAddToCart = (product) => {
    //     console.log("Handle add to cart:", product);
    //     addToCart({
    //         Product_ID: product.Product_ID,
    //         Product_Name: product.Product_Name,
    //         quantity: 1,
    //         productPrice: product.Price
    //     });
    // };

    return (
        <div>
            <Navbar />
            <img
                src={ramadanspecial}
                style={{
                    width: '100%',
                    height: '70%',
                    marginTop: '15px',

                }} />

            <br></br>
            <br></br> <br></br>
            <div className="container mt-4">
                <div className="row">
                    {product.map((product, index) => (
                        <Card
                            key={index}
                            productName={product.Product_Name}
                            imageSrc={`http://localhost:8000/Uploads/Biscuits&snacks/${product.ProductImage}`} 
                            productPrice={`Rs ${product.Price}`}
                             handleAddToCart={() => handleAddToCart(product)}
                        />
                    ))}
                   
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Biscuits
