// src/components/UpdateItem.js
import React, { useState, useEffect } from 'react';
import axios from '../ItemAPI/api';

const UpdateItem = ({ match }) => {
  const [item, setItem] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [categoryId, setCategoryId] = useState('');

  useEffect(() => {
    axios.get(`/items/${match.params.id}`)
      .then(response => {
        setItem(response.data);
        setName(response.data.name);
        setDescription(response.data.description);
        setPrice(response.data.price);
        setImage(response.data.image);
        setCategoryId(response.data.category_id);
      })
      .catch(error => console.error('Error fetching item:', error));
  }, [match.params.id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/items/${match.params.id}`, { name, description, price, image, category_id: categoryId })
      .then(response => alert('Item updated successfully'))
      .catch(error => console.error('Error updating item:', error));
  };

  if (!item) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update Item</h2>
      <label>
        Name:
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
      </label>
      <br />
      <label>
        Description:
        <textarea value={description} onChange={e => setDescription(e.target.value)} />
      </label>
      <br />
      <label>
        Price:
        <input type="number" value={price} onChange={e => setPrice(e.target.value)} />
      </label>
      <br />
      <label>
        Image URL:
        <input type="text" value={image} onChange={e => setImage(e.target.value)} />
      </label>
      <br />
      <label>
        Category ID:
        <input type="number" value={categoryId} onChange={e => setCategoryId(e.target.value)} />
      </label>
      <br />
      <button type="submit">Update Item</button>
    </form>
  );
};

export default UpdateItem;
