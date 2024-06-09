import axios from 'axios';
import { useState } from 'react';
const AddSuppliers = () => {

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});

    const handleSave = async (e) => {
        e.preventDefault();
        let errors = {};

        if (!name) {
            errors.name = 'Supplier Name is required';
        }

        if (!address) {
            errors.address = 'Supplier Address is required';
        }

        if (!contactNo) {
            errors.contactNo = 'Supplier ContactNo is required';
        } else if (!/^\d{10}$/.test(contactNo)) {
            errors.contactNo = 'Contact number should be a 10-digit number';
        }

        if (!email) {
            errors.email = 'Supplier Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email address is invalid';
        }

        if (Object.keys(errors).length === 0) {
            try {
                const response = await axios.post('http://localhost:8000/productRoutes/supplier', {
                    SupplierName: name,
                    SupplierAddress: address,
                    SupplierContactNo: contactNo,
                    SupplierEmail: email,
                });

                if (response.data.success) {
                    setMessage('Supplier details saved successfully!');
                } else {
                    setMessage('Failed to save supplier details');
                }
            } catch (error) {
                console.error(error);
                setMessage('Failed to save supplier details');
            }
        } else {
            setErrors(errors);
        }
    };
 
  return (
        <div style={{ backgroundImage: "linear-gradient(to bottom, #F2B75E, #B2BEB5)", color: "#fff", display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div className="col-12 col-md-6 col-lg-7 col-xl-8">
                <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                    <div className="container h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="card" style={{ borderRadius: '15px' }}>
                                <div className="card-body p-5">
                                    <form onSubmit={handleSave}>
                                        <div className="form-outline mb-4">
                                            <h2 className="text-center mb-5" style={{ fontSize: '25px', marginTop: '-120px', marginLeft: '100px' }}>
                                                Add Supplier
                                            </h2>
                                        </div>
                                      <br></br><br></br>
                                        <div className="form-outline mb-4">
                                            <label className="form-label" htmlFor="supplierName">Supplier Name</label>
                                            <input type="text" id="supplierName" className="form-control form-control-lg" value={name} onChange={e => setName(e.target.value)} style={{ fontSize: '13px' }} />
                                        </div>
                                        <div className="form-outline mb-4">
                                            <label className="form-label" htmlFor="supplierAddress">Supplier Address</label>
                                            <input type="text" id="supplierAddress" className="form-control form-control-lg" value={address} onChange={e => setAddress(e.target.value)} style={{ fontSize: '13px' }} />
                                        </div>
                                        <div className="form-outline mb-4">
                                            <label className="form-label" htmlFor="supplierContactNo">Supplier ContactNo</label>
                                            <input type="text" id="supplierContactNo" className="form-control form-control-lg" value={contactNo} onChange={e => setContactNo(e.target.value)} style={{ fontSize: '13px' }} />
                                          {errors.contactNo && <div className="text-danger">{errors.contactNo}</div>}

                                        </div>
                                        <div className="form-outline mb-4">
                                            <label className="form-label" htmlFor="supplierEmail">Supplier Email</label>
                                            <input type="email" id="supplierEmail" className="form-control form-control-lg" value={email} onChange={e => setEmail(e.target.value)} style={{ fontSize: '13px' }} />
                                        </div>
                                        <div className="d-flex justify-content-center">
                                            <button type="submit" className="btn btn-dark btn-block btn-lg text-white" style={{ fontSize: '13px', padding: '10px' }}>Save</button>
                                        </div>
                                    </form>
                                    {message && <div className="mt-3 text-success">{message}</div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddSuppliers
