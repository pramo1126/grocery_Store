import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await axios.get("/categoryRoutes/categories");
				setCategories(response.data);
			} catch (error) {
				console.error("Error fetching categories:", error);
			}
		};

		fetchCategories();
	}, []);

	return (
		<nav>
			<ul>
				<li>
					<Link to='/'>Home</Link>
				</li>
				{categories.map((category) => (
					<li key={category.Category_ID}>
						<Link to={`/category/${category.Category_ID}`}>{category.Category_Name}</Link>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Navbar;
