import  { useEffect, useState } from 'react';
import axios from 'axios';

const AdminCategoryList = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('/api/categories').then(response => {
            setCategories(response.data);
        });
    }, []);

    return (
        <div>
            <h1>Categories</h1>
            <ul>
                {categories.map(category => (
                    <li key={category.Category_ID}>{category.Category_Name}</li>
                ))}
            </ul>
        </div>
    );
};

export default AdminCategoryList
