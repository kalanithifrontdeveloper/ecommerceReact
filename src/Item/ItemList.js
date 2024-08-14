// src/components/ItemList.js
import React, { useEffect, useState } from 'react';
import axios from '../ItemAPI/api';
import { Card, CardContent, CardMedia, Grid, Typography, Container, Button } from '@mui/material';

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('/items')
      .then(response => setItems(response.data))
      .catch(error => console.error('Error fetching items:', error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`/items/${id}`)
      .then(response => {
        alert('Item deleted successfully');
        setItems(items.filter(item => item.id !== id));
      })
      .catch(error => console.error('Error deleting item:', error));
  };
  

  return (
    <Container>
      <Grid container spacing={3}>
        {items.map(item => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={item.image}
                alt={item.name}
              />
              <CardContent>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  ${item.price}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Category ID: {item.category_id}
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary" 
                  style={{ marginRight: 8 }}
                  onClick={() => window.location.href = `/itemupdate/${item.id}`}
                >
                  Edit
                </Button>
                <Button 
                  variant="contained" 
                  color="secondary"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ItemList;
