import React, {createContext, useState, useContext, useEffect} from 'react';
import {cartAPI} from '../services/api';
import {useAuth} from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext());

    if(!context){
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
};

export const CartProvider = ({ children}) => {
    const [cart, setCart] = useState({items: [], total: '0.00', item_count: 0});
    const [loading, setLoading] = useState(false);
    const {isAuthenticated} = useAuth();

    const fetchCart = async () => {
        if(!isAuthenticated){
            setCart({items: [], total: '0.00', item_count: 0});
            return;
        }
        try{
            setLoading(true);
            const response = await cartAPI.get();
            setCart(response.data);
        }catch(error){
            console.error('Error fetching cart:', error);
        }finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, [isAuthenticated]);

    const addToCart = async (productId, quantity = 1) => {
        try{
            await cartAPI.addItem({product_id: productId, quantity});
            await fetchCart();
            return {success: true};
        }catch(error){
            return {success: false,
            error: error.response?.data?.error || 'Failed to add to cart'
            };
        }
    };
    
    const updateCartItem = async (itemId, quantity) => {
        try{
            await cartAPI.updateItem(itemId, {quantity});
            await fetchCart();
            return {success: true};
        }catch(error){
            return {
                success: false,
                error: error.response?.data?.error || 'Failed to update cart'
            };
        }
    };

    const removeFromCart = async (itemId) => {
        try{
            await cartAPI.removeItem(itemId);
            await fetchCart();
            return {success: true};
        }catch(error){
            return {
                success: false,
                error: error.response?.data?.error || 'Failed to update cart'
            };
        }
    };

    const clearCart = async () => {
        try {
            await cartAPI.clear();
            await fetchCart();
            return {success: true};
        }catch (error){
            return {
                success: false,
                error: error.response?.data?.error || 'Failed to clear cart'
            };
        }
    };

    const value = {
        cart,
        loading,
        fetchCart,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};