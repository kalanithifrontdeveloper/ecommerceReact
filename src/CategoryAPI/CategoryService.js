import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/categories';

const getAllCategories = () => {
    return axios.get(API_URL);
};

const getCategory = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

const createCategory = (data) => {
    return axios.post(API_URL, data);
};

const updateCategory = (id, data) => {
    return axios.put(`${API_URL}/${id}`, data);
};

const deleteCategory = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

export default {
    getAllCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
};
