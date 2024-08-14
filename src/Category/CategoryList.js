import React, { useEffect, useState } from 'react';
import CategoryService from '../CategoryAPI/CategoryService';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        CategoryService.getAllCategories().then(response => {
            setCategories(response.data);
        }).catch(error => {
            console.error('There was an error fetching the categories!', error);
        });
    }, []);

    return (
        <div>
            <h2>Category List</h2>
            <ul>
                {categories.map(category => (
                    <li key={category.id}>
                        {category.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryList;
