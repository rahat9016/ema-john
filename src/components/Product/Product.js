import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Product = (props) => {
    const {name,img,price,seller,stock,key} = props.product
    return (
       
        <div className="product">
            <div>
                <img src={img} alt="" className="product-img"/>
            </div>
            <div>
                <h4 className="product-heading"><Link to={'/product/'+key}>{name}</Link></h4>
                <p>by {seller}</p>
                <h4>${price}</h4>
                <p><small>only {stock} left in stock - order soon</small></p>
                {props.showAddToCart ===true && <button className="product-shoping-cart"onClick={()=>props.handleAddProduct(props.product)} ><FontAwesomeIcon icon={faShoppingCart} /> Add to Cart</button>}

                
            </div>
        </div>
    );
};

export default Product;