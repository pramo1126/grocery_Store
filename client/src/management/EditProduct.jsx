// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// const EditProduct = () => {
//   const { category, productId } = useParams();
//   const navigate = useNavigate();
//   const [values, setValues] = useState({
//     ProductName: '',
//     ProductPrice: '',
//     ProductImage: '',
//     ProductCategory: '',
//     ExpiryDate: new Date()
//   });

//   useEffect(() => {
//     const encodedCategory = encodeURIComponent(category);
//     const url = `http://localhost:8000/productRoutes/${encodedCategory}/${productId}`;
//     axios.get(url)
//       .then(response => {
//         const product = response.data;
       
//         setValues({
//           ProductName: product.Product_Name,
//           ProductPrice: product.Price,
//           ProductImage: product.ProductImage,
//           ProductCategory: product.Product_Category,
//           ExpiryDate: new Date(product.Expiry_Date)
//         });
//         console.log(response.data);
//       })
      
//       .catch(err => console.error('Error fetching product:', err));
//   }, [category, productId]);



//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const formData = new FormData();
//     formData.append('ProductName', values.ProductName);
//     formData.append('ProductPrice', values.ProductPrice);
//     formData.append('ProductExpiryDate', values.ExpiryDate.toISOString().slice(0, 10));
//     formData.append('ProductImage', values.ProductImage);
//     formData.append('ProductCategory', values.ProductCategory);


//     const encodedCategory = encodeURIComponent(category);
//     axios.put(`http://localhost:8000/productRoutes/${encodedCategory}/${productId}`, formData)
//       .then(result => {
//         if (result.data.success) {
//           navigate('/AdminDashboard');
//         } else {
//           alert(result.data.message);
//         }
//       })
//       .catch(error => {
//         console.error('Failed to update product:', error);
//       });
//   };

//   const handleInput = (event) => {
//     setValues({ ...values, [event.target.name]: event.target.value });
//   };

//   const handleImage = (event) => {
//     setValues({ ...values, ProductImage: event.target.files[0] });
//   };
//   return (
//     <section className="vh-100" style={{ backgroundImage: "linear-gradient(to bottom, #F2B75E, #B2BEB5)", color: "#fff", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//       <div className="col-12 col-md-6 col-lg-7 col-xl-8">
//         <div className="mask d-flex align-items-center h-100 gradient-custom-3">
//           <div className="container h-100">
//             <div className="row d-flex justify-content-center align-items-center h-100">
//               <div className="card" style={{ borderRadius: '15px' }}>
//                 <br></br> 
//                 <div className="card-body p-5">
//                   <form onSubmit={handleSubmit}>
//                     <div className="form-outline mb-4">
              
//                       <h2 className="text-center mb-5" style={{ fontSize: '25px', marginTop: '-120px', marginLeft: '100px' }}>Edit Product</h2>
//                     </div>
//                     <div className="form-outline mb-4">
//                       <label className="form-label" htmlFor="ProductName">Product Name</label>
//                       <input type="text" id="ProductName" className="form-control form-control-lg" onChange={handleInput} name='ProductName' value={values.ProductName} style={{ fontSize: '13px' }} />
//                     </div>
//                     <div className="form-outline mb-4">
//                       <label className="form-label" htmlFor="ProductCategory">Product Category</label>
//                       <select id="ProductCategory" className="form-control form-control-lg" onChange={handleInput} name='ProductCategory' value={values.ProductCategory} style={{ fontSize: '13px' }}>
//                         <option value="Biscuits & Snacks">Biscuits & Snacks</option>
//                         <option value="Beverages & Dairy Product">Beverages & Dairy Product</option>
//                         <option value="Frozen Foods">Frozen Foods</option>
//                         <option value="Pasta & Cereals">Pasta & Cereals</option>
//                       </select>
//                     </div>
//                     <div className="form-outline mb-4">
//                       <label className="form-label" htmlFor="ProductPrice">Product Price</label>
//                       <input type="text" id="ProductPrice" className="form-control form-control-lg" onChange={handleInput} name='ProductPrice' value={values.ProductPrice} style={{ fontSize: '13px' }} />
//                     </div>
//                     <div className="form-outline mb-4">
//                       <label className="form-label" htmlFor="ExpiryDate">Expiry Date</label>
//                       <DatePicker selected={values.ExpiryDate} onChange={date => setValues({ ...values, ExpiryDate: date })} className="form-control form-control-lg" style={{ fontSize: '13px' }} />
//                     </div>
//                     <div className="form-outline mb-4">
//                       <label className="form-label" htmlFor="ProductImage">Product Image</label>
//                       <input type="file" id="ProductImage" className="form-control form-control-lg" onChange={handleImage} name='ProductImage' style={{ fontSize: '13px' }} />
//                     </div>
//                     <div className="d-flex justify-content-center">
//                       <button type="submit" className="btn btn-dark btn-block btn-lg text-white" style={{ fontSize: '13px', padding: '10px' }}>Save</button>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default EditProduct

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EditProductForm = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    ProductName: "",
    ProductPrice: "",
    ProductImage: "",
    ProductCategory: "",
    ProductQty: "",
  });

  const [categories, setCategories] = useState([]);
  const [expiryDate, setExpiryDate] = useState(new Date());

  useEffect(() => {
    // Fetch categories from the backend
    axios
      .get("http://localhost:8000/categoryRoutes/categories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => console.log(err));

    // Fetch product details from the backend
    axios
      .get(`http://localhost:8000/productRoutes/product/${productId}`)
      .then((res) => {
        const product = res.data;
        setValues({
          ProductName: product.Product_Name,
          ProductPrice: product.Price,
          ProductImage: product.ProductImage,
          ProductCategory: product.Category_ID,
          ProductQty: product.Qty,
        });
        setExpiryDate(new Date(product.Expiry_Date));
      })
      .catch((err) => console.log(err));
  }, [productId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("ProductName", values.ProductName);
    formData.append("ProductPrice", values.ProductPrice);
    formData.append("ProductExpiryDate", expiryDate.toISOString().slice(0, 10));
    formData.append("ProductImage", values.ProductImage);
    formData.append("Category_ID", values.ProductCategory);
    formData.append("ProductQty", values.ProductQty);

    axios
      .put(`http://localhost:8000/productRoutes/product/${productId}`, formData)
      .then((result) => {
        if (result.data.success) {
          navigate("/AdminDashboard");
        } else {
          alert(result.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleInput = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleImage = (event) => {
    setValues({
      ...values,
      ProductImage: event.target.files[0],
    });
  };

  return (
    <section
      className='vh-100'
      style={{
        backgroundImage: "linear-gradient(to bottom, #F2B75E, #B2BEB5)",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <div className='col-12 col-md-6 col-lg-7 col-xl-8'>
        <div className='mask d-flex align-items-center h-100 gradient-custom-3'>
          <div className='container h-100'>
            <div className='row d-flex justify-content-center align-items-center h-100'>
              <div className='card' style={{ borderRadius: "15px" }}>
                <div className='card-body p-5'>
                  <form onSubmit={handleSubmit}>
                    <div className='form-outline mb-4'>
                      <h2
                        className='text-center mb-5'
                        style={{ fontSize: "25px", marginTop: "-120px", marginLeft: "100px" }}>
                        Edit Product
                      </h2>
                    </div>
                    <br></br>
                    <div className='form-outline mb-4'>
                      <label className='form-label' htmlFor='ProductName'>
                        Product Name
                      </label>
                      <input
                        type='text'
                        id='ProductName'
                        className='form-control form-control-lg'
                        onChange={handleInput}
                        name='ProductName'
                        value={values.ProductName}
                        style={{ fontSize: "13px" }}
                      />
                    </div>

                    <div className='form-outline mb-4'>
                      <label className='form-label' htmlFor='ProductCategory'>
                        Product Category
                      </label>
                      <select
                        id='ProductCategory'
                        className='form-control form-control-lg'
                        onChange={handleInput}
                        name='ProductCategory'
                        value={values.ProductCategory}
                        style={{ fontSize: "13px" }}>
                        <option value='' disabled>Select a category</option>
                        {categories.map((category) => (
                          <option key={category.Category_ID} value={category.Category_ID}>
                            {category.Product_Category}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className='form-outline mb-4'>
                      <label className='form-label' htmlFor='ProductQty'>
                        Product Qty
                      </label>
                      <input
                        type='text'
                        id='ProductQty'
                        className='form-control form-control-lg'
                        onChange={handleInput}
                        name='ProductQty'
                        value={values.ProductQty}
                        style={{ fontSize: "13px" }}
                      />
                    </div>

                    <div className='form-outline mb-4'>
                      <label className='form-label' htmlFor='ProductPrice'>
                        Product Price
                      </label>
                      <input
                        type='text'
                        id='ProductPrice'
                        className='form-control form-control-lg'
                        onChange={handleInput}
                        name='ProductPrice'
                        value={values.ProductPrice}
                        style={{ fontSize: "13px" }}
                      />
                    </div>

                    <div className='form-outline mb-4'>
                      <label className='form-label' htmlFor='ExpiryDate'>
                        Expiry Date
                      </label>
                      <DatePicker
                        selected={expiryDate}
                        onChange={(date) => setExpiryDate(date)}
                        className='form-control form-control-lg'
                        style={{ fontSize: "13px" }}
                      />
                    </div>

                    <div className='form-outline mb-4'>
                      <label className='form-label' htmlFor='ProductImage'>
                        Product Image
                      </label>
                      <input
                        type='file'
                        id='ProductImage'
                        className='form-control form-control-lg'
                        onChange={handleImage}
                        name='ProductImage'
                        style={{ fontSize: "13px" }}
                      />
                    </div>

                    <div className='d-flex justify-content-center'>
                      <button
                        type='submit'
                        className='btn btn-dark btn-block btn-lg text-white'
                        style={{ fontSize: "13px", padding: "10px" }}>
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br></br>
    </section>
  );
};

export default EditProductForm;

