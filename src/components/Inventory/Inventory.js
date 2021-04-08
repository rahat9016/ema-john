import React from 'react';
import fakeData from '../../fakeData'
const Inventory = () => {
    const handleAddProduct = ()=>{
        fetch('https://aqueous-depths-72380.herokuapp.com/addProduct',{
            method:'POST',
            headers:{'Content-type' : 'application/json'},
            body:JSON.stringify(fakeData)
        })
    }
    return (
        <div style={{textAlign:'center'}}>
            <form action="">
                <p><span>Name: </span><input type="text"/></p>
                <p><span>Price: </span><input type="text"/></p>
                <p><span>Quantity: </span><input type="text"/></p>
                <p><span>Upload File: </span><input type="file"/></p>
            <button onClick={handleAddProduct}>Add Product In Database</button>
            </form>
            
        </div>
    );
};

export default Inventory;