import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CustomCard from '../customer/Card';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer';


const  Promotions = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/productRoutes/products/${categoryId}`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  const handleAddToCart = (productId) => {
    console.log('Product added to cart:', productId);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // if (!products.length) {
  //   return <div>No products found.</div>;
  // }

  
  const handleExpiringSoonFilter = async () => {
    try {
      const response = await axios.get('http://localhost:8000/productRoutes/product/expiringsoon');
      setFilteredProducts(response.data);
      setIsFiltered(true);
    } catch (error) {
      console.error('Error fetching expiring soon products:', error);
    }
  };

  return (
    <div>  <Navbar />
      <br></br>


      <div className="mb-3">
        <button onClick={handleExpiringSoonFilter} className='btn btn-success'>View Promotions</button>

      </div>

      <div className="container">
        <div className="row">
          {filteredProducts.map((product) => (
            <CustomCard
              key={product.Product_ID}
              productId={product.Product_ID}
              productName={product.Product_Name}
              imageSrc={`http://localhost:8000/Uploads/Biscuits&snacks/${product.ProductImage}`}
              productPrice={product.Price}
              handleAddToCart={handleAddToCart}
            />
          ))}
       
      </div>
      </div>
      <br></br> <br></br>
      <br></br> <br></br> <br></br> <br></br><br></br> <br></br> <br></br> <br></br><br></br> <br></br> <br></br> <br></br>
      <Footer />
    </div>

  );
};

export default Promotions;