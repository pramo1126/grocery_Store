import AdminNavbar from '../components/AdminNavbar';
import AdminFooter from '../components/AdminFooter';

const admin = () => {
  return (
    <div>
      <AdminNavbar />
   <div className="d-flex justify-content-left">
                                            <button type="submit" className="btn btn-dark btn-block btn-lg text-white" style={{ fontSize: '13px', padding: '10px' }}>Add Category</button>
                                        </div>
      <br></br><br></br><br></br><br></br><br></br><br></br>
      <AdminFooter />
    </div>
  )
}

export default admin
