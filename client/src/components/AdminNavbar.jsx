import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import PropTypes from 'prop-types';




const AdminNavbar = ({ categories, handleCategoryChange }) => {


    const handleCategoryClick = (category) => {
        handleCategoryChange(category);
    };

    return (
    <div>

        <Navbar collapseOnSelect expand="lg" style={{ backgroundColor: '#F2B75E' }} variant="dark"
        className="black-text">
            <Container>
                <br></br><br></br>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"   />
                   
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                            
                            <Nav.Link href="/AdminDashboard" style={{ color: 'black' }}>Admin Dashboard </Nav.Link>
                            <NavDropdown title="Product Categories" id="collapsible-nav-dropdown">
                                {categories.map((category, index) => (
                                    <NavDropdown.Item key={index} onClick={() => handleCategoryClick(category)}>
                                        {category}
                                    </NavDropdown.Item>
                                ))}
                            </NavDropdown>
                            <Nav.Link href="/Orders" style={{ color: 'black' }}> Orders</Nav.Link>
                            <Nav.Link href="/ProductInventory" style={{ color: 'black' }}> Product Inventory</Nav.Link>
                            
                    </Nav>
                    <Nav>
                       
                            <Nav.Link eventKey={2} href="/Login" style={{ color: 'black' }}>Logout</Nav.Link>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>


    </div>
     
    )
}
AdminNavbar.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    handleCategoryChange: PropTypes.func.isRequired,
};

export default AdminNavbar
