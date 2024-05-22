import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import PropTypes from 'prop-types';

const AdminNavbar = ({ categories }) => {
    return (
        <Navbar collapseOnSelect expand="lg" style={{ backgroundColor: '#F2B75E' }} variant="dark" className="black-text">
            <Container>
                <br></br><br></br>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/AdminDashboard" style={{ color: 'black' }}>Admin Dashboard</Nav.Link>
                        <NavDropdown title="Product Categories" id="collapsible-nav-dropdown">
                            {categories.map((category) => (
                                <NavDropdown.Item as={Link} to={`/category/${category.Category_ID}`} key={category.Category_ID}>
                                    {category.Product_Category}
                                </NavDropdown.Item>
                            ))}
                        </NavDropdown>
                        <Nav.Link as={Link} to="/Orders" style={{ color: 'black' }}>Orders</Nav.Link>
                        <Nav.Link as={Link} to="/ProductInventory" style={{ color: 'black' }}>Product Inventory</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link as={Link} to="/Login" style={{ color: 'black' }}>Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

AdminNavbar.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.shape({
        Category_ID: PropTypes.number.isRequired,
        Product_Category: PropTypes.string.isRequired,
    })).isRequired,
};

export default AdminNavbar;
