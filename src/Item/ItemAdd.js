// src/components/AddItem.js
import React, { useState } from 'react';
import axios from '../ItemAPI/api';
import { TextField, Button, Grid, Typography, Container } from '@mui/material';
import { Upload as UploadIcon } from '@mui/icons-material';

const AddItem = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [categoryId, setCategoryId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('image', image);
    formData.append('category_id', categoryId);

    axios.post('/items', formData)
      .then(response => {
        alert('Item added successfully');
        setName('');
        setDescription('');
        setPrice('');
        setImage(null);
        setCategoryId('');
      })
      .catch(error => console.error('Error adding item:', error));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Add Item
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Description"
              variant="outlined"
              multiline
              rows={4}
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Price"
              type="number"
              variant="outlined"
              value={price}
              onChange={e => setPrice(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              variant="contained"
              component="label"
              startIcon={<UploadIcon />}
            >
              Upload Image
              <input
                type="file"
                hidden
                onChange={e => setImage(e.target.files[0])}
              />
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Category ID"
              type="number"
              variant="outlined"
              value={categoryId}
              onChange={e => setCategoryId(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
            >
              Add Item
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default AddItem;
