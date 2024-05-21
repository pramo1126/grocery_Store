
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Logo from './Assets/Sameerawhite.png';





const navbar = ({ handleCategoryChange }) => {

    const categories = ['Biscuits & Snacks', 'Pasta & Cereals', 'Beverages & Dairy Products', 'Frozen Foods'];

    const handleCategoryClick = (category) => {
        handleCategoryChange(category);
    };

    return (
        <div>
           
            <Navbar collapseOnSelect expand="lg" style={{ backgroundColor: '#0f2417' }} variant="dark">
                <Container>
                    <Navbar.Brand href="#home">
                        <img
                            src={Logo}
                            alt="Logo"
                            height="70px"
                            width="auto"
                        // className="d-inline-block align-top"
                        />{' '}
                    </Navbar.Brand>


                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/Home">Home</Nav.Link>
                            <NavDropdown title="Our Products" id="collapsible-nav-dropdown">
                                {categories.map((category, index) => (
                                    <NavDropdown.Item key={index} onClick={() => handleCategoryClick(category)}>
                                        {category}
                                    </NavDropdown.Item>
                                ))}
                            </NavDropdown>

{/*                            
                            <NavDropdown title="Our Products" id="collapsible-nav-dropdown">
                                <NavDropdown.Item href="/Biscuits">Biscuits & Snacks </NavDropdown.Item>
                                <NavDropdown.Item href="/Pasta">Pasta & Cereals</NavDropdown.Item>
                                <NavDropdown.Item href="/Beverages">Beverages & Dairy Products </NavDropdown.Item>
                                <NavDropdown.Item href="/Frozenfoods">Frozen Foods</NavDropdown.Item>
                            </NavDropdown> */}
                            <Nav.Link href="#pricing">  About Us</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="/ShoppingCart">Cart</Nav.Link>
                            <Nav.Link eventKey={2} href="/Login">Login</Nav.Link>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>



            <div className="d-flex justify-content-center" style={{ marginTop: '20px' }}>
                <Form className="d-flex" style={{ maxWidth: '5000px' }}>
                    <Form.Control
                        type="search"
                        placeholder="Search our Products"
                        className="me-2"
                        aria-label="Search"
                        style={{ width: '100%' }}

                    />
                    <Button variant="outline-success">Search</Button>
                </Form>
            </div>
         
        </div>
     
    )
}

export default navbar

