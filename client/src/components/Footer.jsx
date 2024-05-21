
import Logo from './Navbar/Assets/Sameerawhite.png'

const Footer = () => {
    return (
        <footer className="text-center text-lg-start text-muted text-white">
            <section className="" style={{ backgroundColor: "#0f2417", color: "white", paddingTop: "-100px", paddingBottom: "-10px", marginTop: "10px" }}>

                <div className="container text-center text-md-start">
                    <div className="row align-items-center">


                        <div className="col-md-5 col-lg-2 col-xl-2 mx-auto mb-4" >
                            <br></br>
                            <h6 className="text-uppercase fw-bold mb-4" style={{ marginLeft: "280px" }}> Categories</h6>

                            <p className="text-center">
                                <a href="#!" className="text-reset" style={{ marginLeft: "280px" }}>Biscuits&Snacks</a>
                            </p>

                            <p className="text-center">
                                <a href="#!" className="text-reset" style={{ marginLeft: "280px" }}>Beverages</a>
                            </p>
                            <p className="text-center">
                                <a href="#!" className="text-reset" style={{ marginLeft: "280px" }}>FrozenFoods</a>
                            </p>
                            <p className="text-center">
                                <a href="#!" className="text-reset" style={{ marginLeft: "280px" }}>Pasta&Cereals</a>
                            </p>
                        </div>
                        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                            <h6 className="text-uppercase fw-bold mb-4" style={{ marginLeft: "100px" }}> Contact Us</h6>


                            <p className="fas fa-home me-3" style={{ marginLeft: "100px" }}> Sameera Grocery Store, Dadalla Rd, Galle.</p>
                            <p className="fas fa-envelope me-3" style={{ marginLeft: "100px" }}>Sameerastores@gmail.com</p>
                            <p className="fas fa-phone me-3" style={{ marginLeft: "100px" }}> +94 91 2247469</p>
                        </div>
                    </div>

                </div>

                <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                    <img src={Logo} className="logo" alt="Logo" style={{ marginLeft: "-400px", marginTop: "-280px", maxWidth: "270px" }} />
                </div>
            </section>
            <div className="text-center p-4" style={{ backgroundColor: "#B2BEB5", marginTop: "-30px" }}>
                © 2024 Copyright:
                <a className="text-reset fw-bold" href="https://mdbootstrap.com/">sameerastores.com</a>
            </div>
        </footer>
    );
};

export default Footer
