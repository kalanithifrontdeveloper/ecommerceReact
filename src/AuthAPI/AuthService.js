import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/auth';

export const register = async (data) => {
    return await axios.post(`${API_URL}/register`, data);
};

export const login = async (data) => {
    return await axios.post(`${API_URL}/login`, data);
};

export const getProfile = async (token) => {
    return await axios.get(`${API_URL}/profile`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const logout = async (token) => {
    return await axios.post(`${API_URL}/logout`, {}, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
