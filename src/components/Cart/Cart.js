import React from 'react';
import './Cart.css'
const Cart = (props) => {
    // console.log(props)
    const cart = props.cart
    // const total = cart.reduce((total, pro) => total + pro.price, 0)
    let total = 0; for(let i = 0; i < cart.length; i++){     
        const product = cart[i]     
    total = total + product.price * product.quantity || 1
 }
    let shiping = 0
    if (total > 35) {
        shiping = 0
    } else if (total > 15) {
        shiping = 4.99;
    } else if (total > 0) {
        shiping = 12.99
    }
    const FormatNumber = num => {
        const precision = num.toFixed(2)
        return Number(precision)
    }
    const tax = FormatNumber((total / 10))

    const totalAmount = total + shiping + tax

    return (
        <div>
            <h1 className="cart-heading">This is Cart</h1>
            <h4>Order Summary :- {cart.length}</h4>
            <p>
                <small>Shiping :- {shiping}</small>
            </p>
            <p>
                <small>Tax :- {tax}</small>
            </p>
            <p>Total Price :- {FormatNumber(totalAmount)}</p>
            {
                props.children
            }
        </div>
    );
};

export default Cart;