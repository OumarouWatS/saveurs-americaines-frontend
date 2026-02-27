import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

// Create axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests if it exits
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if(token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Auth endpoints
export const authAPI = {
    register: (data) => api.post('/auth/register', data),
    login: (data) => api.post('/auth/login', data),
};

// Products endpoints
export const productsAPI = {
    getAll: (params) => api.get('/products', {params}),
    getById: (id) => api.get(`/products/${id}`),
    getReviews: (id, params) => api.get(`/products/${id}/reviews`, {params}),
};

// Categories endpoints
export const categoriesAPI = {
    getAll: () => api.get('/categories'),
    getById: (id) => api.get(`/categories/${id}`),
    getProducts: (id) => api.get(`/categories/${id}/products`),
};

// Cart endpoints
export const cartAPI = {
    get: () => api.get('/cart'),
    getSummary: () => api.get('/cart/summary'),
    updateItem: (id, data) => api.put(`/cart/items/${id}`, data),
    removeItem: (id) => api.delete(`/cart/items/${id}`),
    clear: () => api.delete('/cart'),
};

// Orders endpoints
export const ordersAPI = {
    create: (data) => api.post('/orders', data),
    getAll: (params) => api.get('/orders', {params}),
    getById: (id) => api.get(`/orders/${id}`),
    cancel: (id) => api.delete(`/orders/${id}`),
};

// User endpoints
export const userAPI = {
    getProfile: () => api.get('/users/profile'),
    updateProfile: (data) => api.put('/users/profile', data),
    changePassword: (data) => api.put('/users/password', data),
};

export default api;