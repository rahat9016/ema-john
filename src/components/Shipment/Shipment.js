import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import './Shipment.css'
const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [loggedInUser,setLoggedInUser] = useContext(UserContext)
    const onSubmit = data => {
        console.log(data)
        const saveCart = getDatabaseCart()
        const orderDetails= {...loggedInUser,Products: saveCart,Shipment:data, OrderTime: new Date()}
        fetch('https://aqueous-depths-72380.herokuapp.com/addOrder',{
          method:"POST",
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(orderDetails)
        })
        .then(res => res.json())
        .then(data =>{
          if(data){
            processOrder()
            alert("Your order placed Successfully")
          }
        })
      };
    
    return (
        
        <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
          
          <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="Your Name" />
          {errors.name && <span className="error">This field is required</span>}

          <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="Your E-mail" />
          {errors.email && <span className="error"> is required</span>}

          <input name="address" ref={register({ required: true })} placeholder="Your Address" />
          {errors.address && <span className="error">Address is required</span>}
          
          <input name="number" ref={register({ required: true })} placeholder="Your Phone Number" />
          {errors.number && <span className="error">Phone Number is required</span>}

          <input type="submit" />
        </form>
      );
};

export default Shipment;