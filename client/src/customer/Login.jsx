
//import {ReactDOM} from 'react-dom/client';
import image3 from './Assets/image 3.png'
// import InputGroup from 'react-bootstrap/InputGroup';
import './Authenti.css';
//import Logo from './Assets/Sameera.png'
import AdminFooter from '../components/AdminFooter';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';






const Login = () => {

    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: '',
        password: '',
    
    });

   /* const navigate = useNavigate();*/

    /*const handleSubmit = (event) => {
        event.preventDefault();
        console.log(values);
        axios.post('http://localhost:8000/Customer/Login', values)
            .then(result => {
                navigate('/Home')
            })
            .catch(err => console.log(err));

    };*/

    const [newErrors, setnewErrors] = useState({});
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    


    const handleInput = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    
    const validateInput = () => {
        const newErrors = {};

        if (values.email === "") {
            newErrors.email = "Email should not be empty";
        } else if (!emailPattern.test(values.email)) {
            newErrors.email = "Email did not match";
        } else {
            newErrors.email = "";
        }

        if (values.password === "") {
            newErrors.password = "Password should not be empty";
        } else {
            newErrors.password = "";
        }
        setnewErrors(newErrors);
    };

    const handleLogin = async () => {
        validateInput();

        if (newErrors.email === "" && newErrors.password === "") {
            console.log('enter to if block');
            console.log(values);
            try {
                const response = await axios.post('http://localhost:8000/Login', values);

                if (response.data.success) {
                    console.log(response.data);
                    const destination = response.data.destination;


                    let localuser = JSON.stringify(response.data.user);
                    localStorage.setItem('user',localuser);
                    navigate(destination);
                } else {
                    window.alert("Something went wrong Please Try again");
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        
        <section className="vh-100" style={{
            backgroundImage: "linear-gradient(to bottom, #0f2417, #B2BEB5)", color: "#fff"
        }}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-xl-10 col-12">
                        <div className="card" style={{ borderRadius: '1rem' }}>
                                <div className="row g-0 d-flex">
                                <div className="col-md-6 col-lg-5 d-none d-md-block">
                                    <img src={image3}
                                        alt="login form" className="img-fluid" style={{ borderRadius: '1rem 0 0 1rem' }} />
                                </div>
                                <div className="col-md-6 col-lg-7 align-items-center">
                                    <div className="card-body p-4 p-lg-5 text-black">

                                        <form>

                                            <div className="d-flex align-items-center mb-3 pb-1">
                                                <i className="fas fa-cubes fa-2x me-3" style={{ color: '#ff6219' }}></i>

                                                <span className="h1 fw-bold mb-0">Welcome</span>
                                            </div>

                                            <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '0px' }}>SignIn to your account</h5>



                                            <input
                                                type="email"
                                                id="form2Example17"
                                                className="form-control form-control-lg"
                                                placeholder="Enter Email"
                                                onChange={handleInput} name="email"
                                                style={{ fontSize: '14px' }}

                                            />
                                            <br></br>

                                            <input
                                                type="password"
                                                id="form2Example27"
                                                className="form-control form-control-lg"
                                                placeholder="Enter Password"
                                                onChange={handleInput}
                                                name="password"
                                                style={{ fontSize: '14px' }}
                                            />
                                            <br></br>
                                            <div className="pt-1 mb-4">
                                                <Button className="btn btn-dark btn-lg btn-block" type="button" onClick={handleLogin} style={{ fontSize: '14px', padding: '10px', marginLeft: '100px' }}>Login</Button>
                                            </div>

                                            <a className="small text-muted" href="#!">Forgot password?</a>
                                            <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>Do not have an account?<a href="./Signup"
                                                style={{ color: '#393f81' }}>Register here</a></p>


                                        </form>


                                    </div>
                                </div>
                              

                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            <AdminFooter />
        </section>



    );
};
export default Login;



