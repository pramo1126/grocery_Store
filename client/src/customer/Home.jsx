
import Navbar from '../components/Navbar/Navbar';
import videoHome from './Assets/videoHome.mp4';
import Footer from '../components/Footer';
import axios from 'axios';
import { useEffect } from 'react';
import snackpost from './Assets/snacks  Post (36 x 24 cm).png';
import frozenpost from './Assets/frozenfoods  Post (36 x 24 cm).png';
import pastapost from './Assets/pasta  Post (36 x 24 cm).png';
import beveragepost from './Assets/beverages  Post (36 x 24 cm).png';




const Home = () => {

    useEffect(() => {
        axios.get('http://localhost:8000/')
        .then(res => console.log(res))
        .catch(err => console.log(err));
            
        })
    return (
        <div>
            <Navbar />
            <video
                style={{
                    position: 'absolute',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    minWidth: '100%',
                    marginRight: '50px',
                    height: '100%',
                    width: '100%',
                    objectFit: 'cover',
                    marginTop: '370px',
                    marginLeft: '10px'
                }}
                autoPlay
                loop
                muted
            >
                <source src={videoHome} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div style={{ marginTop: '700px', padding: '20px', textAlign: 'center', marginBottom: '200px' }}>
                <br></br> <br></br> <br></br> <br></br>
                {/* <div style={{ borderBottom: '1px solid grey', marginRight: '10px', marginLeft: '10px' }}></div> */}
                <div className="card-header" style={{ fontSize: '35px', color: 'black', fontFamily: 'sans-serif', padding: '20px', textAlign: 'center', fontWeight: 'bolder' }} >About Us </div>
                {/* <div style={{ borderBottom: '1px solid grey', marginRight: '10px', marginLeft: '10px' }}></div> */}
                <div className="card-body" style={{ fontSize: '15px', color: 'black', padding: '20px', fontFamily: 'sans-serif' }}>
                    <blockquote className="blockquote mb-0">
                        <p>Welcome to Sameera Grocery Store, your one-stop shop for all your grocery needs! Sameera Grocery Store has been serving the local community with top-quality products and exceptional service. Our team is dedicated to providing a pleasant shopping experience for our customers. We strive to maintain a clean and organized store, and our friendly staff is always ready to assist you with any questions or special requests.</p>
                        <p>We are committed to supporting local farmers and suppliers, ensuring that our products are fresh, sustainable, and of the highest quality. Your satisfaction is our priority, and we look forward to serving you for many years to come.</p>
                    </blockquote>
                </div>
                <br></br> <br></br> <br></br> <br></br><br></br> <br></br>
                {/* <div style={{ borderBottom: '1px solid grey', marginRight: '10px', marginLeft: '10px' }}></div> */}
                <h1 style={{ fontSize: '35px', color: 'black', fontFamily: 'sans-serif', padding: '20px', textAlign: 'center', fontWeight: 'bolder' }} >Shop by Category </h1>
                {/* <div style={{ borderBottom: '1px solid grey', marginRight: '10px', marginLeft: '10px' }}></div> */}
                <br></br> <br></br> 
                <div style={{ display: 'flex' }}>
                    <img
                        src={snackpost}
                        alt="large-image"
                        style={{ width: '840px', height: '560px' }}
                        onClick={() => console.log('Large image clicked')}
                    />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <img
                            src={frozenpost}
                            alt="small-image-1"
                            style={{ width: '360px', height: '280px' }}
                            onClick={() => console.log('Small image 1 clicked')}
                        />
                        <img
                            src={pastapost}
                            alt="small-image-2"
                            style={{ width: '360px', height: '280px' }}
                            onClick={() => console.log('Small image 2 clicked')}
                        />
                        <br />
                        <img
                            src={beveragepost}
                            alt="small-image-3"
                            style={{ width: '240px', height: '560px', marginLeft:'360px', marginTop:'-585px' }}
                            onClick={() => console.log('Small image 3 clicked')}
                        />
                    </div>
                </div>
                <br></br> <br></br> <br></br>  <br></br> <br></br>
               
                <h1 style={{ fontSize: '35px', color: 'black', fontFamily: 'sans-serif', padding: '20px', textAlign: 'center', fontWeight: 'bolder' }} >Best Sellers </h1>
                
                <br></br> <br></br>
                const products = [


                ]
            </div>
            <Footer />
        </div>
    );
}

export default Home;
