import  { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom"; // Import Link
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Logo from "./Assets/Sameerawhite.png";

const NavbarComponent = ({ handleCategoryChange }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("http://localhost:8000/categoryRoutes/categories");
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    const handleCategoryClick = (category) => {
        handleCategoryChange(category);
    };

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" style={{ backgroundColor: "#0f2417" }} variant="dark">
                <Container>
                    <Navbar.Brand href="#home">
                        <img src={Logo} alt="Logo" height="70px" width="auto" />
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/Home">Home</Nav.Link>
                            <NavDropdown title="Our Products" id="collapsible-nav-dropdown">
                                {categories.map((category) => (
                                    <NavDropdown.Item
                                        key={category.Category_ID}
                                        as={Link} // Use as prop to render Link
                                        to={`/category/${category.Category_ID}`} // Use to prop for navigation
                                        onClick={() => handleCategoryClick(category)}
                                    >
                                        {category.Product_Category}
                                    </NavDropdown.Item>
                                ))}
                            </NavDropdown>
                            <Nav.Link href="#pricing">About Us</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="/ShoppingCart">Cart</Nav.Link>
                            <Nav.Link eventKey={2} href="/Login">Login</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <div className="d-flex justify-content-center" style={{ marginTop: "20px" }}>
                <Form className="d-flex" style={{ maxWidth: "5000px" }}>
                    <Form.Control
                        type="search"
                        placeholder="Search our Products"
                        className="me-2"
                        aria-label="Search"
                        style={{ width: "100%" }}
                    />
                    <Button variant="outline-success">Search</Button>
                </Form>
            </div>
        </div>
    );
};

NavbarComponent.propTypes = {
    handleCategoryChange: PropTypes.func.isRequired,
};

export default NavbarComponent;
