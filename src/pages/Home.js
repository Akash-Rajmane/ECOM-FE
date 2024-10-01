import React, { useState, useEffect } from "react";
import Banner from "../components/banner/Banner";
//import Product from "../components/product/Product";
//import ProductCard from '../components/product/ProductCard';
import Category from "../components/category/Category";
import { Audio } from "react-loader-spinner";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_BE_ENDPOINT}/api/products`
        );
        //console.log(res);
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
          //console.log(data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <Banner />
      <div className="container">
        {!loading ? (
          <div className="row gy-4">
            <Category category="etx" products={products} />
            <Category category="mf" products={products} />
            <Category category="hf" products={products} />
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
            }}
          >
            <Audio
              height="80"
              width="80"
              radius="9"
              color="dodgerblue"
              ariaLabel="loading"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
