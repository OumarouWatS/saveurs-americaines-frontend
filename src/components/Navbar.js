import React from 'react';
import {Link} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';
import {useCart} from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
    const {user, logout, isAuthenticated} = useAuth();
    const {cart} = useCart();

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    Saveurs Americaines
                </Link>

                <ul className="navbar-menu">
                    <li>
                        <Link to="/products">Products</Link>
                    </li>
                    {isAuthenticated && (
                        <>
                            <li>
                                <Link to="orders">My Orders</Link>
                            </li>
                            <li>
                                <Link>
                                    Cart ({cart.item_count || 0})
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
                <div>
                    {isAuthenticated ? (
                        <>
                            <span className="navbar-user">Hello, {user.first_name || user.email}</span>
                            <button onClick={logout} className="btn btn-outline">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className='="btn btn-outline'>
                                Login
                            </Link>
                            <Link to="/register" className="btn btn-primary">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;