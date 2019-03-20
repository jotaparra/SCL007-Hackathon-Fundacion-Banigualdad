import {checkAuthState, registerUser, loginUserWithEmail} from './auth.js';
window.onload = () =>{     
      checkAuthState((user) => {
         if(user){
            // document.getElementById('loginRegister').style.display ="none";
            // document.getElementById('btnLogout').style.display = "block"; 
            }else{
            // document.getElementById('loginRegister').style.display ="block";
            // document.getElementById('btnLogout').style.display = "none";
         }   
      });
}
//Registrar usuario (email y contraseña)
const registerWithEmailAndPassword = () => {
   const emailUser = document.getElementById('textEmail').value;
   const passwordUser = document.getElementById('password').value;
   registerUser(emailUser, passwordUser);
};
document.getElementById('registerButton').addEventListener('click', registerWithEmailAndPassword);
//Iniciar Sesión correo y contraseña
const signInWithEmailAndPassword = () => {
   const emailUser = textEmail.value;
   const passwordUser = password.value;
   loginUserWithEmail(emailUser, passwordUser);
};
document.getElementById('btnSignUp').addEventListener('click', signInWithEmailAndPassword);
