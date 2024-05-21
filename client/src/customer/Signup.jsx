import { useState } from 'react'
import AdminFooter from '../components/AdminFooter';
//import { email } from '@mui/icons-material';
import Logo from './Assets/Sameera.png'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';





const Signup = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    });

    /* useEffect(() => {
         fetch('http://localhost:8000/customer')
             .then(response => response.json())
             .then(values => console.log(values))
             .catch(error => console.log(error))
     })*/

    const [newErrors, setnewErrors] = useState({});
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //const navigate = useNavigate();

    /*const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: [event.target.value]}));

    };*/

    const handleInput = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };


    const validateInput = () => {
        const newErrors = {};

        if (values.name === "") {
            newErrors.name = "Name should not be empty";
        } else {
            newErrors.name = "";
        }

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


    const handlesubmit = async (event) => {
        event.preventDefault();
        validateInput();

        if (newErrors.name === "" && newErrors.email === "" && newErrors.password === "") {
            console.log('enter to if block');
            console.log(values);
            
            // })

            try {
                const response = await axios.post('http://localhost:8000/Signup', values);
                console.log(response);
                if (response.status === 201) {
                    navigate('/Login');
                } else {
                    alert("Something went wrong Please Try again");
                }
            } catch (error) {
                console.log(error);
            }

            // .then(data => {
            //     if (data.success) {
            //         alert("Signup successful");
            //         window.location.href = './Login';
            //     } else {
            //         alert("Signup failed");
            //     }
            // })
            // .catch(error => console.log(error));
        }
    };

    // const checkConnection = async () => {
    //     try {
    //         const response = await fetch('http://localhost:8000/Signup');
    //         const data = await response.json();
    //         console.log(data);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    // useEffect(() => {
    //     checkConnection();
    // }, []);



    return (
        <section className="vh-100 "
            style={{
                backgroundImage: "linear-gradient(to bottom, #0f2417, #B2BEB5)",
                color: "#fff",
                 display: 'flex',
                justifyContent: 'center', 
                alignItems: 'center' 
            }}>
            <div className="col-12 col-md-6 col-lg-7 col-xl-8">
            <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        
                            <div className="card" style={{ borderRadius: '15px' }}>
                                <div className="card-body p-5">
                                    <img src={Logo} alt='Logo' style={{ width: '200px', marginLeft: '15px', marginTop: '-30px' }} />
                                    <h2 className="text- text-center mb-5" style={{ fontSize: '25px', marginTop: '-120px', marginLeft: '100px' }}>Create an account</h2>
                                    <form action="" onSubmit={handlesubmit}>

                                        <div className="form-outline mb-4">

                                            <label className="form-label" htmlFor="form3Example1cg">Your Name</label>

                                            <input type="name" id="form3Example3cg" className="form-control form-control-lg" onChange={handleInput} name='name' style={{ fontSize: '13px' }} />
                                            {newErrors.name && <span className='text-danger'>{newErrors.name}</span>}
                                        </div>

                                        <div className="form-outline mb-4">
                                            <label className="form-label" htmlFor="form3Example3cg">Your Email</label>
                                            <input type="email" id="form3Example3cg" className="form-control form-control-lg" onChange={handleInput} name='email' style={{ fontSize: '13px' }} />
                                            {newErrors.email && <span className='text-danger'>{newErrors.email}</span>}

                                        </div>
                                        <div className="form-outline mb-4">

                                            <label className="form-label" htmlFor="form3Example4cg">Password</label>
                                            <input type="password" id="form3Example3cg" className="form-control form-control-lg" onChange={handleInput} name='password' style={{ fontSize: '13px' }} />
                                            {newErrors.password && <span className='text-danger'>{newErrors.password}</span>}
                                        </div>

                                        <div className="form-check d-flex justify-content-center mb-5">
                                            <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3cg" />
                                            <label className="form-check-label" htmlFor="form2Example3g">
                                                I agree all statements in <a href="#!" className="text-body"><u>Terms of service</u></a>
                                            </label>
                                        </div>
                                        <div className="d-flex justify-content-center">
                                            <button type="submit" className="btn btn-success btn-block btn-lg gradient-custom-4 text-body" style={{ fontSize: '14px', padding: '8px' }}>Register</button>
                                        </div>
                                        <p className="text-center text-muted mt-5 mb-0">Have already an account? <a href="./Login" className="fw-bold text-body"><u>Login here</u></a></p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br></br><br></br><br></br>
            <AdminFooter />
        </section>
    );
}

export default Signup;