import React, { useState, useEffect } from 'react';
import Banner from "../components/banner/Banner";
//import Product from "../components/product/Product";
//import ProductCard from '../components/product/ProductCard';
import Category from '../components/category/Category';


const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
          const res = await fetch(`${process.env.REACT_APP_BE_ENDPOINT}/api/products`);
            //console.log(res);
          if(res.ok){
            const data = await res.json();
            setProducts(data);
           //console.log(data);
          }
            
        };
        fetchProducts();
    }, []);

    return (
        <div>
           <Banner/>
           <div className="container">
                <div className="row gy-4">
                    <Category category="etx" products={products} />
                    <Category category="mf" products={products} />
                    <Category category="hf" products={products} />
                </div>
            </div>
    
        </div>
    );
};

export default Home;
