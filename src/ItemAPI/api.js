// src/api/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000/api', // Adjust this URL if necessary
});

export default instance;
