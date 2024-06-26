import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const CategoryForm = ({ category }) => {
    const [name, setName] = useState(category ? category.Product_Category : '');
    const [description, setDescription] = useState(category ? category.Category_Desc : '');
    const [message, setMessage] = useState('');

    const handleSave = async (e) => {
        e.preventDefault();

        const formData = {
            Product_Category: name,
            Category_Desc: description
        };

        try {
            if (category) {
                await axios.put(`http://localhost:8000/categoryRoutes/category/${category.Category_ID}`, formData);
            } else {
                await axios.post('http://localhost:8000/categoryRoutes/category', formData);
            }
            setMessage('Category saved successfully!');
        } catch (error) {
            console.error(error);
            setMessage('Error saving category.');
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
                                                {category ? 'Update Category' : 'Add Category'}
                                            </h2>
                                        </div>
                                        <div className="form-outline mb-4">
                                            <br></br>
                                            <label className="form-label" htmlFor="categoryName">Category Name</label>
                                            <input type="text" id="categoryName" className="form-control form-control-lg" value={name} onChange={e => setName(e.target.value)} style={{ fontSize: '13px' }} />
                                        </div>
                                        <div className="form-outline mb-4">
                                            <label className="form-label" htmlFor="categoryDescription">Category Description</label>
                                            <textarea id="categoryDescription" className="form-control form-control-lg" value={description} onChange={e => setDescription(e.target.value)} style={{ fontSize: '13px' }}></textarea>
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

CategoryForm.propTypes = {
    category: PropTypes.object,
};

export default CategoryForm;
