import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';


const ProductDetails = () => {
    const {ProductKey} = useParams()
    const [product,setProduct] = useState({})
    useEffect(()=>{
        fetch('https://aqueous-depths-72380.herokuapp.com/product/'+ProductKey)
        .then(res => res.json())
        .then(data => setProduct(data))
        
    },[ProductKey])
    return (
        <div>
            <h1></h1>
            <Product showAddToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetails;