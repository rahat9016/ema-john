import firebase from "firebase/app";
import React, { useContext, useState } from "react"
import "firebase/auth";
import firebaseConfig from './firebase.config'
import {UserContext}  from "../../App";
import { useHistory, useLocation } from "react-router";
if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig)
}

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
  const [loggedInUser, setLoggedInUser] = useContext(UserContext)
  const history = useHistory()
  const location = useLocation()
  let { from } = location.state || { from: { pathname: "/" } };
  const provider = new firebase.auth.GoogleAuthProvider();
  var fbProvider = new firebase.auth.FacebookAuthProvider();
  const signInEvenHandler = () =>{
    firebase.auth().signInWithPopup(provider)
    .then(res=>{
      const {displayName,email,photoURL} = res.user
      const signedInUser ={
        isSignIn : true,
        name : displayName,
        email: email,
        picture: photoURL
      }
      setUser(signedInUser)
    })
    .catch(error => {
      console.log(error)
      console.log(error.code)
      console.log(error.message)
    })
  }
  const signOutEvenHandler = ()=>{
    firebase.auth().signOut()
    .then(()=>{
      const signedOutUser = {
        isSignIn : false,
        name : '',
        email: '',
        picture: ''
      }
      setUser(signedOutUser)
    })
  }
  const handleFbSignIn = ()=>{
    firebase.auth().signInWithPopup(fbProvider)
  .then(result => {
    
    var user = result.user;
 
    console.log("FB User", user)
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
    console.log(error)
  });
  }
  const handleBlur = (e) =>{
    // console.log(e.target.name,e.target.value);
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
    // console.log(user.email, user.password)
    if(newUser && user.email, user.password){
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then(res=>{
        console.log(res)
        const newUserInfo = {...user}
        newUserInfo.success = true
        newUserInfo.error = ''
        setUser(newUserInfo)
        updateUserName(user.name)
      })
      .catch((error) => {
        const newUserInfo = {...user}
        newUserInfo.error = error.message
        newUserInfo.success = false
        setUser(newUserInfo)
      });
    }
    if(!newUser && user.email && user.password){
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then( res => {
        const newUserInfo = {...user}
        newUserInfo.success = true;
        newUserInfo.error = '';
        setUser(newUserInfo);
        console.log('sign in user', res.user);
        setLoggedInUser(newUserInfo)
        history.replace(from);
  })
  .catch(error => {
        const newUserInfo = {...user}
        newUserInfo.error = error.message
        newUserInfo.success = false
        setUser(newUserInfo)
  });
    }
    e.preventDefault()
  }
  const updateUserName = name =>{
      const user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: name,
      }).then(function() {
        console.log('user name updated Successfully')
      }).catch(function(error) {
        console.log(error)
      });
  }
  return (
    <div style={{textAlign:'center'}}>
      {
        user.isSignIn ? <button onClick={signOutEvenHandler}>Sign out</button> :
        <button onClick={signInEvenHandler}>Sign in with Google</button>
      }<br/><br/>
      <button onClick={handleFbSignIn}>Sign in with Facebook</button><br/><br/>
      {
        user.isSignIn && <div>
            <p>E-mail {user.email}</p>
            <p>Name:- {user.name}</p>
            <img src={user.picture} alt=""/>
          </div>
      }
      
      <input type="checkbox" name="newUser"id="newUser" onChange={()=>setNewUser(!newUser)}/>
      <label htmlFor="newUser">Sign Up</label><br/><br/>
      <form onSubmit={handleSubmit}>
        <p>Display User Name {user.displayName}</p>
        {newUser && <input onBlur={handleBlur} type="text" name="name" placeholder="Name"/>}<br/><br/>
        <input onBlur={handleBlur} name='email' type="text"placeholder="Enter Your E-mail" required/>
        <br/><br/>
        <input onBlur={handleBlur} name='password' type="password" placeholder="Enter Your Password" required/>
        <br/><br/>
        <input type="submit" value={newUser ? 'sign out' : 'sign in'}/>
        <p style={{color:'red'}}>{user.error}</p>
        {
          user.success && <p style={{color:'green'}}>User {newUser ? 'Create' : 'Signed in'} Successfully Done!</p> 
        }
      </form>
    </div>
  );
}

export default Login;
