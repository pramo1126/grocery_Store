import { Link } from 'react-router-dom';
import AdminFooter from '../components/AdminFooter';
import Navbar from '../components/AdminsideNavbar';

const Admin = () => {
  return (
    <div>
      <Navbar />
      <p>hi</p>
      <button><Link to='/categoryForm'> Category</Link></button>
      <AdminFooter className="mb-auto"/>
    </div>
  )
}
  
export default Admin;
