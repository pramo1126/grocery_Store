
import { useEffect, useState } from 'react';
import axios from 'axios';
import AdminsideNavbar from '../components/AdminsideNavbar';
import AdminFooter from '../components/AdminFooter';
import { Link } from 'react-router-dom';


const Purchases = () => {

    const [suppliers, setSuppliers] = useState([]);

   

    useEffect(() => {
        const fetchsuppliers = async () => {
            try {
                const response = await axios.get('http://localhost:8000/productRoutes/suppliers/getallsuppliers');
                setSuppliers(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchsuppliers();
    }, []);

    

    const handleDelete = async (Supplier_ID) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this supplier?");

        if (isConfirmed) {
            try {
                const response = await axios.delete(`http://localhost:8000/productRoutes/suppliers/${Supplier_ID}`);
                if (response.status === 200) {
                    setSuppliers(suppliers.filter(supplier => supplier.Supplier_ID !== Supplier_ID));
                } else {
                    console.error('Failed to delete supplier:', response.data);
                }
            } catch (error) {
                console.error('Error deleting supplier:', error);
            }
        }
    };
    

    return (
        <div >
            <AdminsideNavbar />
            <br></br> <br></br>
            <div className="container admin-container">

                <div className="supplier-table">
                    <h2>Suppliers</h2>
                    <Link to="/AddSuppliers">
                        <button className="btn btn-dark" style={{ float: 'right' }}>Add Supplier</button>
                    </Link>
                </div>
                <br></br>
                <br></br> <br></br>
                <table className="table">
                    <thead>
                        <tr>

                            <th>Supplier Name</th>
                            <th> Address</th>
                            <th>Contact Number</th>
                            <th>Email</th>
                            <th>Actions</th>

                        </tr>
                    </thead>
                    <tbody>
                        {suppliers.map(supplier => (
                            <tr key={supplier.Supplier_ID}>
                                <td>{supplier.Supplier_Name}</td>
                                <td>{supplier.Supplier_Address}</td>
                                <td>{supplier.Supplier_ContactNo}</td>
                                <td>{supplier.Supplier_Email}</td>
                                <td>

                                    <button className="btn btn-danger mx-2" onClick={() => handleDelete(supplier.Supplier_ID)}>Delete</button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
                <br></br> <br></br>   <br></br> <br></br>   <br></br> <br></br>   <br></br> <br></br>   <br></br> <br></br><br></br><br></br>

            </div>
            <AdminFooter />
        </div>
    )
};

export default Purchases
