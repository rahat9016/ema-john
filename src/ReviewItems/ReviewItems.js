import React from 'react';

const ReviewItems = (props) => {
    // console.log(props)
    const {img, name,quantity,seller,key,price} = props.product
    
    return (
        <div>
            <img src={img} alt=""/>
            <h1>{name}</h1>
            <h3>Brand: {seller}</h3>
            <p>{quantity}</p>
            <p><small>${price}</small></p>
            <button onClick={()=>props.removeProduct(key)} className="product-shoping-cart">Remove</button>
        </div>
    );
};

export default ReviewItems;