import { checkAuthState, registerUser, loginUserWithEmail } from './auth.js';


window.onload = () => {
   checkAuthState((user) => {
      if (user) {
         // document.getElementById('loginRegister').style.display ="none";
         // document.getElementById('btnLogout').style.display = "block"; 
      } else {
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


//Imprimiendo productos por categoria, creando cards(Johanna)




function showCards(data) {
   const infoData= data;

document.getElementById('root').innerHTML='';

document.getElementById('product-list').innerHTML = '';
   for (let i = 0; i < infoData.length; i++) {
document.getElementById('product-list').innerHTML += `
      
<!-- Card Wider -->

<!-- Card Narrower -->
      <div class="card card-cascade narrower">

<!-- Card image -->
         <div class="view view-cascade overlay">
            <img  class="card-img-top" src="${data[i].img}" alt="Card image cap">
               <a>
                  <div class="mask rgba-white-slight"></div>
               </a>
         </div>

<!-- Card content -->
         <div class="card-body card-body-cascade">

<!-- Label -->
         <h5 class="pink-text pb-2 pt-1">${data.category}</h5>
<!-- Title -->
         <h4 class="font-weight-bold card-title">${data.name}</h4>
             <p>${data.zone}</p>
<!-- Text -->
             <p class="card-text">${data.description}</p>
<!-- Button -->
            <a class="btn btn-unique">Ver contacto</a>

         </div>

         </div>
<!-- Card Narrower -->`

}

}

showCards(console.log())
