import React from 'react';
import ProductCard from '../product/ProductCard';

const CATEGORY_ARR = ["Electronics", "Men's Fashion", "Home & Furniture"];

const Category = ({ products, category }) => {
    const categoryName = category === "etx" ? CATEGORY_ARR[0] : category === "mf" ? CATEGORY_ARR[1] : CATEGORY_ARR[2];

    return (
        <div className="col-12" id={category}>
            <h2 className="text-left m-4 text-primary fs-2">{categoryName}</h2>
            <div className="row g-4">
                {products.filter(el => el.category === category).map(pdt => (
                    <div className="col-12 col-sm-6 col-md-4" key={pdt._id}>
                        <ProductCard name={pdt.name} id={pdt._id} price={pdt.price} description={pdt.description} image={pdt.images[0]} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Category;