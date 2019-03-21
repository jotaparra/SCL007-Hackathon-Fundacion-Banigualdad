import {writeUserData} from './index.js'

window.onload = () =>{
    checkAuthState();
};


export const checkAuthState = (callback) => {
    firebase.auth().onAuthStateChanged((firebaseUser) => {
        if (firebaseUser) {
            console.log("Ingreso un usuario >" + JSON.stringify(firebaseUser));
            writeUserData(firebase.auth().currentUser.uid, firebase.auth().currentUser.displayName, firebase.auth().currentUser.email,firebase.auth().currentUser.photoURL);
            callback(firebaseUser)
           
            
        } else {
            console.log('No está logueado')
            callback(null)
        }
    })
};
export const registerUser = (email, password) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((firebaseUser)=>{
        console.log("usuario >" + JSON.stringify(firebaseUser.uid) )
    })
        .catch(error => document.getElementById('error-m').innerHTML = `${error.message}`)
};


export const loginUserWithEmail = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((firebaseUser) => {
        console.log("usuario >" + JSON.stringify(firebaseUser))
    }) 
    .then(() =>{
        writeUserData(firebase.auth().currentUser.uid, firebase.auth().currentUser.displayName, firebase.auth().currentUser.email,firebase.auth().currentUser.photoURL)

    }) 
        .catch(error => document.getElementById('error-m').innerHTML = `${error.message}`)
};

export const signOut = () => {
    firebase.auth().signOut().then(function () {
            // Sign-out successful.
        })
    
        .catch(function (error) {
            // An error happened.
        });
};


