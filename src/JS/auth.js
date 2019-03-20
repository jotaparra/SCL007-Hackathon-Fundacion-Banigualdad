export const checkAuthState = (callback) => {
    firebase.auth().onAuthStateChanged((firebaseUser) => {
        if (firebaseUser) {
            console.log("Ingreso un usuario " + JSON.stringify(firebaseUser));
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
            checkEmail() //Función para enviar correo de verificacion
        })
        .catch(error => document.getElementById('error-m').innerHTML = `${error.message}`)
};
