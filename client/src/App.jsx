import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./customer/Home";
import Login from "./customer/Login";
// import Biscuits from "./customer/Biscuits";
// import Frozenfoods from "./customer/Frozenfoods";
import ShoppingCart from "./customer/ShoppingCart";
import Signup from "./customer/Signup";
import Welcome from "./customer/Welcome";
import AdminDashboard from "./management/AdminDashboard";
// import AdminBiscuits from "./management/AdminBiscuits";
import AddProducts from "./management/AddProducts";
// import Beverages from "./customer/Beverages";
// import Pasta from "./customer/Pasta";
import { CartProvider } from "./Context/CartContext";
import EditProduct from "./management/EditProduct";
// import AdminFrozen from "./management/AdminFrozen";
// import AdminBeverages from "./management/AdminBeverages";
// import AdminPasta from "./management/AdminPasta";
import Orders from "./management/Orders";
import CategoryForm from "./management/CategoryForm";
import AdminProductList from "./management/AdminProductList";
import CategoryPage from "./management/CategoryPage";
import Checkout from "./customer/Checkout";
import Profile from "./customer/Profile";
import Promotions from "./customer/Promotions";
import Purchases from "./management/Purchases";
import AddSuppliers from "./management/AddSuppliers";


function App() {
	return (
		<div>
			<CartProvider>
				<BrowserRouter>
					<Routes>
						<Route path='/Welcome' element={<Welcome />} />
						<Route path='/Home' element={<Home />} />
						<Route path='/Login' element={<Login />} />
						<Route path='/Profile' element={<Profile />} />
						<Route path='/Promotions' element={<Promotions />} />
						{/* <Route path='/Biscuits' element={<Biscuits />} />
						<Route path='/FrozenFoods' element={<Frozenfoods />} /> */}
						<Route path='/ShoppingCart' element={<ShoppingCart />} />
						<Route path='/Signup' element={<Signup />} />
						<Route path='/AdminDashboard' element={<AdminDashboard />} />
						{/* <Route path='/AdminBiscuits' element={<AdminBiscuits />} />
						<Route path='/AdminFrozen' element={<AdminFrozen />} />
						<Route path='/AdminBeverages' element={<AdminBeverages />} />
						<Route path='/AdminPasta' element={<AdminPasta />} /> */}
						<Route path='/AddProducts' element={<AddProducts />} />
						{/* <Route path='/Beverages' element={<Beverages />} />
						<Route path='/Pasta' element={<Pasta />} /> */}
						<Route path='/EditProduct/:category/:productId' element={<EditProduct />} />
						<Route path='/Orders' element={<Orders />} />
						<Route path='/suppliers' element={<Purchases />} />
					<Route path='/CategoryForm' element={<CategoryForm />} />
						<Route path='/category/:categoryId' element={<CategoryPage />} />
						<Route path='/admin/category/:categoryId' element={<AdminProductList />} />
						<Route path='/Checkout' element={<Checkout />} />
						<Route path="/AddSuppliers" element={<AddSuppliers />} />
					</Routes>
				</BrowserRouter>
			</CartProvider>
		</div>
	);
}

export default App;
