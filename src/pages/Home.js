import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import { productsAPI, categoriesAPI } from '../services/api';
import './Home.css';

const Home = () => {
    const [featureProducts, setFeaturedProducts] = useStae([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                //Fetch featured products (first 6)
                const productRes = await productsAPI.getAll({limit: 6, sort: 'rating', order: 'DESC'});
                setFeaturedProducts(productRes.data.data);

                //Fetch categories
                const categoriesRes = await categoriesAPI.getAll();
                setCategories(categoriesRes.data.data);
            }catch (error){
                console.error('Error fetching data:', error);
            }finally{
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if(loading){
        return <div className="loading">Loading...</div>
    }

    return (
        <div>
            {/*Hero Section*/}
            <section className="hero">
                <div>
                    <h1>Welcome to Our Bakery!!</h1>
                    <p>Freshly baked goods, made with love</p>
                    <Link to="/products" className="btn btn-primary btn-large">
                        Browse Products
                    </Link>
                </div>
            </section>

            {/* Categories Section */}
            <section className="categories-section">
                <h2>Shop by Category</h2>
                <div className="categories-grid">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            to={`/products?category=${category.name}`}
                            className="category-card"
                        >
                            <h3>{category.name}</h3>
                            <p>{category.description}</p>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Featured Products */}
            <section className="featured-section">
                <h2>Feature Products</h2>
                <div className="products-grid">
                    {featureProducts.map((product) => {
                        <Link key={product.id} t0={`/products/${product.id}`} className="product-card">
                            <div className="product-image">
                                {product.image_url ? (
                                    <img src={product.image_url} alt={product.name} />
                                ) : (
                                    <div className="product-image-placeholder">Cake🧁</div>
                                )}
                            </div>
                            <div>
                                <h3>{product.name}</h3>
                                <p className="product-description">{product.description}</p>
                                <div className="product-footer">
                                    <span>${product.price}</span>
                                    {product.average_rating > 0 && (
                                        <span>⭐ {product.average_rating.toFixed(1)}</span>
                                    )}
                                </div>
                            </div>
                        </Link>
                    })}
                </div>
            </section>
        </div>
    );
};

export default Home;