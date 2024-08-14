// src/components/DeleteItem.js
import React from 'react';
import axios from '../ItemAPI/api';

const DeleteItem = ({ id }) => {
  const handleDelete = () => {
    axios.delete(`/items/${id}`)
      .then(response => alert('Item deleted successfully'))
      .catch(error => console.error('Error deleting item:', error));
  };

  return <button onClick={handleDelete}>Delete Item</button>;
};

export default DeleteItem;
