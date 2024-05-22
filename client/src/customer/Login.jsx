import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import image3 from './Assets/image 3.png';
import AdminFooter from '../components/AdminFooter';
import './Authenti.css';

const Login = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleInput = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    const validateInput = () => {
        const newErrors = {};

        if (!values.email) {
            newErrors.email = "Email should not be empty";
        } else if (!emailPattern.test(values.email)) {
            newErrors.email = "Email did not match";
        }

        if (!values.password) {
            newErrors.password = "Password should not be empty";
        }

        setErrors(newErrors);
    };

    const handleLogin = async () => {
        validateInput();
        if (!errors.email && !errors.password) {
            try {
                const response = await axios.post('http://localhost:8000/Login', values);
                if (response.data.success) {
                    const destination = response.data.destination;
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                    navigate(destination);
                } else {
                    alert("Something went wrong. Please try again.");
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <section className="vh-100" style={{ backgroundImage: "linear-gradient(to bottom, #0f2417, #B2BEB5)", color: "#fff" }}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-xl-10 col-12">
                        <div className="card" style={{ borderRadius: '1rem' }}>
                            <div className="row g-0 d-flex">
                                <div className="col-md-6 col-lg-5 d-none d-md-block">
                                    <img src={image3} alt="login form" className="img-fluid" style={{ borderRadius: '1rem 0 0 1rem' }} />
                                </div>
                                <div className="col-md-6 col-lg-7 align-items-center">
                                    <div className="card-body p-4 p-lg-5 text-black">
                                        <form>
                                            <div className="d-flex align-items-center mb-3 pb-1">
                                                <span className="h1 fw-bold mb-0">Welcome</span>
                                            </div>
                                            <h5 className="fw-normal mb-3 pb-3">Sign in to your account</h5>
                                            <input
                                                type="email"
                                                className="form-control form-control-lg"
                                                placeholder="Enter Email"
                                                onChange={handleInput}
                                                name="email"
                                                style={{ fontSize: '14px' }}
                                            />
                                            {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
                                            <br />
                                            <input
                                                type="password"
                                                className="form-control form-control-lg"
                                                placeholder="Enter Password"
                                                onChange={handleInput}
                                                name="password"
                                                style={{ fontSize: '14px' }}
                                            />
                                            {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
                                            <br />
                                            <div className="pt-1 mb-4">
                                                <Button className="btn btn-dark btn-lg btn-block" type="button" onClick={handleLogin} style={{ fontSize: '14px', padding: '10px', marginLeft: '100px' }}>Login</Button>
                                            </div>
                                            <a className="small text-muted" href="#!">Forgot password?</a>
                                            <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>Do not have an account?<a href="./Signup" style={{ color: '#393f81' }}>Register here</a></p>
                                        </form>
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
