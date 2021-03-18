import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config'

export const initializeLoginFramework = () =>{
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig)
    }
}
//Google Event Handler 
export const handlerGoogleSignIN = () => {
    const googleProvider = new firebase
        .auth
        .GoogleAuthProvider();
    return firebase
        .auth()
        .signInWithPopup(googleProvider)
        .then(res => {
            const {displayName, email, photoURL} = res.user
            const signedInUser = {
                isSignIn: true,
                name: displayName,
                email: email,
                picture: photoURL,
                success:true
            }
            return signedInUser
        })
        .catch(error => {
            console.log(error)
            console.log(error.code)
            console.log(error.message)
        })
    }
//Facebook Event Handler 
export const handlerFacebookSignIn = () => {
    var facebookProvider = new firebase
        .auth
        .FacebookAuthProvider();
    return firebase
        .auth()
        .signInWithPopup(facebookProvider)
        .then(result => {

            var user = result.user;
            user.success = true;
            return user;
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
            console.log(error)
        });
}
//Sign out Event Handler 
export const signOutEvenHandler = () => {
    return firebase
        .auth()
        .signOut()
        .then(() => {
            const signedOutUser = {
                isSignIn: false,
                name: '',
                email: '',
                picture: ''
            }
            return signedOutUser
        })
}
export const createUserWithEmailAndPassword = (name,email,password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(res=>{
        console.log(res)
        const newUserInfo = res.user
        newUserInfo.success = true
        newUserInfo.error = ''
        updateUserName(name)
        return newUserInfo
      })
      .catch((error) => {
        const newUserInfo = {}
        newUserInfo.error = error.message
        newUserInfo.success = false
        return newUserInfo
      });
}
export const signInWithEmailAndPassword = (email, password) => {
    return firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(res => {
            const newUserInfo = res.user
            newUserInfo.success = true;
            newUserInfo.error = '';
            return newUserInfo
        })
        .catch(error => {
            const newUserInfo = {}
            newUserInfo.error = error.message
            newUserInfo.success = false
            return newUserInfo
        });
}
const updateUserName = name => {
    const user = firebase
        .auth()
        .currentUser;
    user
        .updateProfile({displayName: name})
        .then(function () {
            console.log('user name updated Successfully')
        })
        .catch(function (error) {
            console.log(error)
        });
}