// src/components/CategoryForm.js
import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Grid, Alert } from '@mui/material';
import CategoryService from '../CategoryAPI/CategoryService';

const CategoryForm = ({ categoryId }) => {
    const [category, setCategory] = useState({
        name: '',
        description: '',
        image: null
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (categoryId) {
            CategoryService.getCategory(categoryId)
                .then(response => {
                    setCategory(response.data);
                })
                .catch(error => {
                    console.error('There was an error fetching the category!', error);
                    setErrorMessage('There was an error fetching the category.');
                });
        }
    }, [categoryId]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setCategory(prev => ({
            ...prev,
            [name]: files ? files[0] : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', category.name);
        formData.append('description', category.description);
        if (category.image) {
            formData.append('image', category.image);
        }

        const request = categoryId 
            ? CategoryService.updateCategory(categoryId, formData) 
            : CategoryService.createCategory(formData);

        request
            .then(response => {
                setSuccessMessage(categoryId ? 'Category updated successfully!' : 'Category created successfully!');
                setCategory({
                    name: '',
                    description: '',
                    image: null
                });
            })
            .catch(error => {
                console.error('There was an error saving the category!', error);
                setErrorMessage('There was an error saving the category.');
            });
    };

    return (
        <Grid style={{display:"flex", justifyContent:"center", alignItems:"center", marginTop:"70px"}}>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="h5" component="div">
                    {categoryId ? 'Update' : 'Create'} Category
                </Typography>
                {successMessage && <Alert severity="success">{successMessage}</Alert>}
                {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                <TextField
                    label="Name"
                    variant="outlined"
                    name="name"
                    value={category.name}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Description"
                    variant="outlined"
                    name="description"
                    value={category.description}
                    onChange={handleChange}
                    multiline
                    rows={4}
                />
                <Button type="submit" variant="contained" color="primary">
                    {categoryId ? 'Update' : 'Create'} Category
                </Button>
            </Box>
        </Grid>
    );
};

export default CategoryForm;
