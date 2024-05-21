
import Navbar from '../components/Navbar/Navbar'
import Card from './Card'
import Footer from '../components/Footer';
// import ramadanspecial from './Assets/ramadanspecials.jpg'
import { useEffect, useState } from 'react';
import axios from 'axios'; 

const Pasta = () => {

    const [product, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/productRoutes/Pasta')
            .then(response => {
                console.log("Fetched products:", response.data);
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);

    const handleAddToCart = (product) => {
        setCart([...cart, { productId: product.Product_ID, quantity: 1 }]);
    };
  return (
        <div>
            <Navbar />
            {/* <img
                src={ramadanspecial}
                style={{
                    width: '100%',
                    height: '70%',
                    marginTop: '15px',

                }} /> */}

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

export default Pasta


