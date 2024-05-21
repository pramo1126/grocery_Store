
import Welcomepgimg from './Assets/welcomepgimg5.jpg';
import { Link } from 'react-router-dom';



const Welcome = () => {
    const styles = {
        backgroundImage: `url(${Welcomepgimg})`,
        height: '100vh',
        width: '100vw',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    };

    const maskStyles = {
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        height: '100%',
        width: '100%',
    };

    const textStyles = {
        color: 'white',
        marginBottom: '1rem', 
        fontSize: '3.5rem', 
        textAlign: 'center', 
        '@media (max-width: 768px)': {
            fontSize: '2rem', 
        },
    };

    const buttonStyles1 = {
        backgroundColor: '#115C08 ',
        color: '#fff',
        border: 'none',
        borderRadius: '50px',
        padding: '15px 30px',
        textTransform: 'uppercase',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        ':hover': { // Add hover effect
            backgroundColor: '#fff',
            color: '#115C67',
        },
        marginRight: '1rem',
        marginLeft: '1rem',
    };

    const buttonStyles2 = {
        backgroundColor: '#fff',
        color: '#333',
        border: '2px solid #333',
        borderRadius: '50px',
        padding: '15px 30px',
        textTransform: 'uppercase',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease',
        ':hover': { // Add hover effect
            backgroundColor: 'lightgreen',
            color: '#fff',
            borderColor: 'lightgreen',
        },
    };

    return (
        <div className="bg-image" style={styles}>
            <div className="mask d-flex flex-column justify-content-center align-items-center h-100 w-100" style={maskStyles}>
                <h1 className="text-white mb-0" style={textStyles}>Welcome to Sameera Grocery Store</h1>
                <div style={{ marginTop: '2rem' }}> 
                    <Link to="/Signup" style={buttonStyles1}>Register </Link>
                    <Link to="/Login" style={buttonStyles2}>Log In</Link>
                    <Link to="/Home" style={buttonStyles1} className="mr-2">Browse the Store </Link>
                </div>
            </div>
        </div>
       
    );
};

export default Welcome;
