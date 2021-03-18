import React, { useContext, useState } from "react"
import {UserContext}  from "../../App";
import { useHistory, useLocation } from "react-router";
import { createUserWithEmailAndPassword, handlerFacebookSignIn, handlerGoogleSignIN, initializeLoginFramework, signInWithEmailAndPassword, signOutEvenHandler } from "./loginManager";


function Login() {
  const [newUser,setNewUser] = useState(false)
  const [user,setUser] = useState({
    isSignIn : false,
    name: '',
    email:'',
    password:'',
    picture:'',
    error:'',
    success:''
  })
  initializeLoginFramework()
  const [loggedInUser, setLoggedInUser] = useContext(UserContext)
  const history = useHistory()
  const location = useLocation()
  let { from } = location.state || { from: { pathname: "/" } };

const googleSignIn = () => {
    handlerGoogleSignIN().then(res => {
      handleResponse(res,true)
    })
}
const facebookSignIn = () => {
    handlerFacebookSignIn().then(res => {
      handleResponse(res,true)
    })
}
  const handleBlur = (e) =>{
    let isFiledValid =  true
    if(e.target.name === 'email'){
      isFiledValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if(e.target.name ===  'password'){
      const passwordValid = e.target.value.length > 6 
      const passwordHasNumber = /\d{1}/.test(e.target.value)
      isFiledValid = (passwordValid && passwordHasNumber)
    }
    if(isFiledValid){
      const newUserInfo = {...user}
      newUserInfo[e.target.name] = e.target.value
      setUser(newUserInfo)
    }
  }
  const handleSubmit = (e)=>{
    if(newUser && user.email, user.password){
      createUserWithEmailAndPassword(user.name,user.email,user.password)
      .then(res =>{
        handleResponse(res,true)
      })
    }
    if(!newUser && user.email && user.password){
      signInWithEmailAndPassword(user.email,user.password)
      .then(res =>{
        handleResponse(res,true)
      })
    }
    e.preventDefault()
  }
  const signOut = () => {
    signOutEvenHandler().then(res => {
        handleResponse(res,false)
    })
}
const handleResponse = (res, redirect) =>{
  setUser(res)
  setLoggedInUser(res)
  if(redirect){
    history.replace(from);
  }
}
  return (
    <div style={{textAlign:'center'}}>
      {
        user.isSignIn ? <button onClick={signOut}>Sign out</button> :
        <button onClick={googleSignIn}>Sign in with Google</button>
      }
      <br/><br/>

      <button onClick={facebookSignIn}>Sign in with Facebook</button><br/><br/>
      {
        user.isSignIn && <div>
            <p>E-mail {user.email}</p>
            <p>Name:- {user.name}</p>
            <img src={user.picture} alt=""/>
          </div>
      }
      
      <input type="checkbox" name="newUser"id="signup" onChange={()=>setNewUser(!newUser)}/>
      <label htmlFor="signup">Sign Up</label><br/><br/>
      <form onSubmit={handleSubmit}>
        <p>Display User Name {user.displayName}</p>
        {newUser && <input onBlur={handleBlur} type="text" name="name" placeholder="Name"/>}<br/><br/>
        <input onBlur={handleBlur} name='email' type="text"placeholder="Enter Your E-mail" required/>
        <br/><br/>
        <input onBlur={handleBlur} name='password' type="password" placeholder="Enter Your Password" required/>
        <br/><br/>
        <input type="submit" value={newUser ? 'Submit' : 'sign in'}/>
        <p style={{color:'red'}}>{user.error}</p>
        {
          user.success && <p style={{color:'green'}}>User {newUser ? 'Create' : 'Signed in'} Successfully Done!</p> 
        }
      </form>
    </div>
  );
}

export default Login;
