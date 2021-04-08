import React, { useEffect, useState } from 'react';
import ReviewItems from '../../ReviewItems/ReviewItems';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif'
import { useHistory } from 'react-router';
const Review = () => {
    const [cart,setCart] = useState([])
    const [orderPlaced, setOrderPlace] = useState(false)

    const history = useHistory()
    const handleProceedCheckout = () =>{
        history.push('/shipment')
    }
    const removeProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey)
        setCart(newCart)
        removeFromDatabaseCart(productKey)
    }
   

    useEffect(()=>{
        const savaData = getDatabaseCart()
        const productKeys = Object.keys(savaData)
        fetch('https://aqueous-depths-72380.herokuapp.com/productsBykeys',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => setCart(data))

    },[])
    let orderConfirm;
    if(orderPlaced){
        orderConfirm = <img src={happyImage} alt=""/>
    }
    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    cart.map(pd => <ReviewItems product={pd} removeProduct={removeProduct}></ReviewItems>)
                }
                {orderConfirm}
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handleProceedCheckout} className="product-shoping-cart">Proceed Checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;


