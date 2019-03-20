export const checkAuthState = (callback) => {
    firebase.auth().onAuthStateChanged((firebaseUser) => {
        if (firebaseUser) {
            console.log("Ingreso un usuario >" + JSON.stringify(firebaseUser));
            callback(firebaseUser)
        } else {
            console.log('No está logueado')
            callback(null)
        }
    })
};
export const registerUser = (email, password) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function () {
            console.log('click')
        })
        .catch(error => document.getElementById('error-m').innerHTML = `${error.message}`)
};


export const loginUserWithEmail = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
        //.catch(error => document.getElementById('error-m').innerHTML = `${error.message}`)
};
export const signOut = () => {
    firebase.auth().signOut().then(function () {
            // Sign-out successful.
        })
        .catch(function (error) {
            // An error happened.
        });
};


