import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddProductForm = () => {
	const Navigate = useNavigate();

	const [values, setValues] = useState({
		ProductName: "",
		ProductPrice: "",
		ProductImage: "",
		ProductCategory: "",
	});

	useEffect(() => {
		axios
			.get("http://localhost:8000/")
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	}, []);

	const handlesubmit = async (event) => {
		event.preventDefault();
		console.log(values);
		const formData = new FormData();
		formData.append("ProductName", values.ProductName);
		formData.append("ProductPrice", values.ProductPrice);
		formData.append("ProductExpiryDate", expiryDate.toISOString().slice(0, 10));
		formData.append("ProductImage", values.ProductImage);
		formData.append("ProductCategory", values.ProductCategory);

		axios
			.post("http://localhost:8000/productRoutes/product", formData)

			.then((result) => {
				if (result.data.success) {
					console.log("Succeded");
					Navigate("/AdminDashboard");
				} else {
					alert(result.data.message);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const [expiryDate, setExpiryDate] = useState(new Date());

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
			className='vh-100 '
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
									<form onSubmit={handlesubmit}>
										<div className='form-outline mb-4'>
											<h2
												className='text- text-center mb-5'
												style={{ fontSize: "25px", marginTop: "-120px", marginLeft: "100px" }}>
												Add New Product
											</h2>
										</div>

										<br></br>
										<div className='form-outline mb-4'>
											<label className='form-label' htmlFor='form3Example1cg'>
												Product Name
											</label>
											<input
												type='text'
												id='form3Example3cg'
												className='form-control form-control-lg'
												onChange={handleInput}
												name='ProductName'
												style={{ fontSize: "13px" }}
											/>
										</div>

										<div className='form-outline mb-4'>
											<label className='form-label' htmlFor='form3Example3cg'>
												Product Category
											</label>
											<select
												id='form3Example3cg'
												className='form-control form-control-lg'
												onChange={handleInput}
												name='ProductCategory'
												value={values.ProductCategory}
												style={{ fontSize: "13px" }}>
												<option value='Biscuits & Snacks' selected>
													Biscuits & Snacks{" "}
												</option>
												<option value='Beverages & Dairy Product'>Beverages & Dairy Product</option>
												<option value='Frozen Foods'>Frozen Foods </option>
												<option value='Pasta & Cereals'>Pasta & Cereals </option>
											</select>
										</div>

										{/* <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form3Example3cg">Product Category</label>
                                                <input type="text" id="form3Example3cg" className="form-control form-control-lg" onChange={handleInput} name='ProductCategory' style={{ fontSize: '13px' }} />

                                    </div> */}

										<div className='form-outline mb-4'>
											<label className='form-label' htmlFor='form3Example3cg'>
												Product Price
											</label>
											<input
												type='text'
												id='form3Example3cg'
												className='form-control form-control-lg'
												onChange={handleInput}
												name='ProductPrice'
												style={{ fontSize: "13px" }}
											/>
										</div>

										<div className='form-outline mb-4'>
											<label className='form-label' htmlFor='form3Example3cg'>
												{" "}
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
											<label className='form-label' htmlFor='form3Example3cg'>
												Product Image
											</label>
											<input
												type='file'
												id='form3Example3cg'
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
												Save
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

export default AddProductForm;
