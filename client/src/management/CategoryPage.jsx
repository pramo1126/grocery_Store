import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CategoryPage = () => {
    const { categoryId } = useParams();
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/categoryRoutes/category/${categoryId}`);
                console.log(response.data);  // Check if data is received
                setCategory(response.data[0]);
            } catch (error) {
                console.error('Error fetching category:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategory();
    }, [categoryId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!category) {
        return <div>Category not found.</div>;
    }

    return (
        <div>
            <h2>Hi, This is {category.Product_Category} Page</h2>
        </div>
    );
};

export default CategoryPage;
