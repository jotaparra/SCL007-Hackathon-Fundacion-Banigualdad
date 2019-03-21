import {checkAuthState, registerUser, loginUserWithEmail, signOut} from './auth.js';
import {enviarConvalidacionAFirebase, readPost,guardandoComentarios, deletePost, biography,likePost, likeCount} from './index.js'
window.onload = () =>{     
      checkAuthState((firebaseUser) => {
         if(firebaseUser){
            // document.getElementById('loginRegister').style.display ="none";
            // document.getElementById('btnLogout').style.display = "block"; 
            readPostFromDatabase();
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

const logOut = () => {
   //console.log("Ud cerr  o sesión")
   signOut()
}
document.getElementById('btnLogout').addEventListener('click', logOut);





// Se guardan los post en la base de datos

const guardarComentarios = () => {  
const name = firebase.auth().currentUser.displayName;
       const title = tituloaconvalidar.value;
       const coment = coments.value;
       let photoUser = firebase.auth().currentUser.photoURL;
       let user_photo= photoUser !== null ? photoUser: 'IMG/avatar-default.png';
       const userId = firebase.auth().currentUser.uid;
       const tags = hashtagsPost.value;
       let imagen = imgUrl;
       let imagenDef = 'IMG/blanco.png'
       let postImg = imagen !== null ? imagen: imagenDef;
       
   
       document.getElementById('coments').value ='';
       document.getElementById('tituloaconvalidar').value='';
       document.getElementById('hashtagsPost').value='';
   
       let currentDate = new Date()
       let day = currentDate.getDate() 
       let month = currentDate.getMonth().toString()
       let year = currentDate.getFullYear()
       
       
       if ( name == ''){
           alert(` Se deben rellenar todos los campos para poder publicar` )
       }if ( title == ''){
           alert(` Se deben rellenar todos los campos para poder publicar` ) 
       }if ( coment == ''){
           alert(` Se deben rellenar todos los campos para poder publicar` )
       }if ( tags == ''){
           alert(` Se deben rellenar todos los campos para poder publicar` )
       } 
       enviarConvalidacionAFirebase(user_photo,userId, name,title,coment,tags, day , month, year, postImg);
       index.click();
    }
    
   btnComents.addEventListener('click', guardarComentarios)

   
   // Lee e imprime los comentarios que existen en la base de datos tanto en la pantalla principal como en recetas
   
   const readPostFromDatabase = () => {
      readPost((coment)=>{ 
       newcoments.innerHTML = 
         `<div class="cards-container" id= ${coment.key}>
           <div class="card card-one">
                       
                           <div class='box-header'>
                            <div class='avatar_post'>
                            <img src='${coment.val().profile_picture}'>
                            </div> 
                             <div class='name-post'>${coment.val().author}</div>
                           </div>

                           <div class='content'>   
                               <div class="contenidopost">
                                 <h3>${coment.val().title}</h3>          
                                 <p>${coment.val().body}</p>
                                 <h6>Canal: #${coment.val().hashtag}</h6>
                                 </div>

                                 <div class="contenidopost-img">
                                 <img class="img-post" src='${coment.val().imagen}'>
                                  </div>
                           </div>
                          

                              <div class='row'>
                               <div class='likes col alinear' id='likePost${coment.key}'>
                               <i class='far fa-thumbs-up'></i>
                               <span id= 'countLike${coment.key}'></span> 
                               <p class='iconmovile'>Me gusta</p>
                               </div>
                               
                               <div class='comments_home col alinear' id='${coment.key}'>
                               <i data-toggle="collapse" href="#collapseExample"  class="far fa-comment"></i>
                               <p class='iconmovile'>Comentar</p>
                               </div>
                          
                               <div class='borrar col  alinear' id='btn${coment.key}' userpp=${coment.key} class='borrar'>
                               <i class="far fa-trash-alt"></i>
                               <p class='iconmovile'>Borrar</p>
                               </div>
                               </div>

                               <div class="collapse" id="collapseExample">
                               <div id='comentPost'>               
                                    <textarea class="form-control" name='comentario' id='comentsPostHome${coment.key}'
                                      placeholder='Escribe aqui tu comentario...'>
                                    </textarea>      
                                   <button  class='save_homecoment' id='${coment.key}'>Comentar</button>
                                   <div  id='printHome${coment.key}'></div>
                               </div>
                               </div>
                              </div> </div>` + newcoments.innerHTML;  
   
   
           let btnLikes = document.getElementsByClassName('likes');
           for (let i =0; i< btnLikes.length; i++){
               btnLikes[i].addEventListener('click', btnLikePost);
           }
           let btnBorrar = document.getElementsByClassName('borrar');
           for (let i =0; i< btnBorrar.length; i++){
               btnBorrar[i].addEventListener('click', deletePost);
           }
           let btnComentarioHome = document.getElementsByClassName('comments_home');
           for (let i =0; i< btnComentarioHome.length; i++){
               btnComentarioHome[i].addEventListener('click', readComentsHome);
           }
           let btnSaveComentHome = document.getElementsByClassName('save_homecoment');
           for (let i =0; i< btnSaveComentHome.length; i++){
               btnSaveComentHome[i].addEventListener('click', saveComentHome);
           } })
       };     
     
 // Se guardan los likes en la base de datos
   const btnLikePost = (e) =>{
       const key = e.currentTarget.getAttribute('id').slice(8) 
       //const key = keyA !== null ? keyA :e.currentTarget.getAttribute('id').slice(11)
       const uid = firebase.auth().currentUser.uid;
       console.log(key)
       likePost (key,uid)
       printLikes (key,uid)
       likeCount (key,uid)
   } 
 // Se imprimen los likes
const printLikes =(key, uid) =>{
   
       let thisPostRef = firebase.database().ref('posts/'+ key + '/starCount'+ '/likeCount');
       thisPostRef.once('value', function(snapshot) {
       let printLikeCount = snapshot.val() ? Object.entries(snapshot.val()): 0;
       const likeFinal = printLikeCount.length ? printLikeCount.length : 0;
               console.log(likeFinal)
           if ( snapshot.val() ) {
               document.getElementById(`countLike${key}`).innerHTML = `${ likeFinal }`
               document.getElementById(`countLikeRec${key}`).innerHTML = `${ likeFinal}`;
               if(document.getElementById(`countLikeRec${key}`) === null){
                   return
               }else{
                   document.getElementById(`countLikeRec${key}`).innerHTML = `${ likeFinal }`;
               }
   
           } else {
              console.log( uid + '- no data in Firebase' );
               return 0;
           }
       });
   
   }

   
   
   const readComentsHome = (e) => {       
       
       const keyHome = e.currentTarget.getAttribute('id')    
       const comentRefHome = firebase.database().ref('/posts/' + keyHome + '/coment/');
       document.getElementById(`printHome${keyHome}` ).innerHTML ='';
       comentRefHome.once('value', (snapshot) => {
   
           if(snapshot.val() === null || snapshot.val() == '' ){
                  
               alert ('No existen comentarios para ésta publicación') 
   
          }else{
   
              for (let snap in snapshot.val()) { 
   
                document.getElementById(`printHome${keyHome}` ).innerHTML = `            
                       <div class="comentar-post" id= ${keyHome}>
                       <h3>${snapshot.val()[snap].author}</h3>
                       <p>${snapshot.val()[snap].contenido}<p> 
                       </div>
                ` + document.getElementById(`printHome${keyHome}`).innerHTML;
               
                  }}
              })
          
      }
   
   //Lee  e imprime los comentarios guardados en la base de datos  en la pantalla de recetas
      const readComents = (e) => {  
          
       const keyRecipes = e.currentTarget.getAttribute('id') 
       const comentRefRecipes = firebase.database().ref('/posts/' + keyRecipes + '/coment/'); 
       document.getElementById(`print${keyRecipes}`).innerHTML ='';
       comentRefRecipes.once('value', (snapshot) => {         
          
               if(snapshot.val() === null || snapshot.val() == '' ){
                  
                   alert ('No existen comentarios para ésta publicación') 
   
              }else{
                  for (let snap in snapshot.val()) {  
                       
                       document.getElementById(`print${keyRecipes}`).innerHTML = `            
                           <div id= ${keyRecipes}  style='border: 1px solid purple'>
                           <p>${snapshot.val()[snap].author}</p>
                           <h3>${snapshot.val()[snap].contenido}<h3> 
                           </div>
                    ` + document.getElementById(`print${keyRecipes}`).innerHTML;                 
                   
                  }}   
           })
   
      }
   
   // Se guarda en la base de datos el comentario creado en la página principal
      const saveComentHome =(e) =>{
       var newPostKey = firebase.database().ref().child('posts').push().key;
       const key = e.currentTarget.getAttribute('id')
       console.log(key);
       const name=firebase.auth().currentUser.displayName;     
       const contenido = document.getElementById(`comentsPostHome${key}`).value;
   
       if (contenido === null || contenido === ''){
   
           alert ('Debe completar todos los campos para comentar')
       }else{
       guardandoComentarios(key,contenido,name,newPostKey);
       printCommentHome(key,contenido,name, newPostKey);
       //editComentsFromFirebase(newPostKey);
       document.getElementById(`comentsPostHome${key}`).value='';
       }
   }
   
   
   // Se guarda en la base de datos el comentario creado en la página recetas
   const saveComent =(e) =>{
       const key = e.currentTarget.getAttribute('id')
       const name=firebase.auth().currentUser.displayName; 
       const contenido = document.getElementById(`comentsPostRece${key}`).value;
   
       if (contenido === null || contenido === ''){
   
           alert ('Debe completar todos los campos para comentar')
       }else{
         
       guardandoComentarios(key,contenido,name);
       printComment(key,contenido,name);
   
       }
   }
   
   //  Se imprime el comentario creado en la página principal
   const printCommentHome = (key,contenido,name,newPostKey) => {     
       const nombre = name !== null ? name : firebase.auth().currentUser.email;
   
       document.getElementById('printHome' + key).innerHTML ='';
       document.getElementById('printHome' + key).innerHTML = `
       <div id= ${key} style='border: 1px solid purple'>
           <p>${nombre}</p>
           <h3>${contenido}<h3> 
   
           <div class='row'>
           <div class='col-6'>
           <button  class='btn-likecoment edit' id='edit${key}' value='${newPostKey}'><span class='icondeskopt'><i class='fa fa-edit'></i></span><p class='iconmovile'>Editar</p></button>
           </div>
           <div id='savechanges' class='col-6'></div>
           </div>   
       </div> 
       `
      + document.getElementById("printHome"+ key).innerHTML;
   
      let btnEdit = document.getElementsByClassName('edit');
      for(let i =0; i<btnEdit.length; i++){
          btnEdit[i].addEventListener('click', editComentsFromFirebase);
      }
      
   
   }
   
   // Se imprime el comentario creado en la página de recetas
   const printComment = (key,contenido,name) => {     
       const nombre = name !== null ? name : firebase.auth().currentUser.email;
       document.getElementById('print' + key).innerHTML = '';
       document.getElementById('print' + key).innerHTML = `
       <div id= ${key} style='border: 1px solid purple'>
           <p>${nombre}</p>
           <h3>${contenido}<h3> 
       </div>`
       + document.getElementById('print' + key).innerHTML;
   }
   
   //Página perfil del Usuario
   
   const showUserInfo = () => {
       index_page.style.display='none';
       recipes_container.style.display ='none';
       profile_container.style.display ='block';
       search_container.style.display ='none';
       addpost_container.style.display ='none';
   
       const userInfo = firebase.auth().currentUser;
       let photoUser = firebase.auth().currentUser.photoURL;
       let user_photo= photoUser !== null ? photoUser: 'IMG/avatar-default.png'
      
       //console.log(userInfo)
       // if(userInfo.photoURL != null){
              
       profile_container.innerHTML =`
       <div class='container'>
       <div class='row'>
       <div class='col-4 col-m-2'></div>
       <div class='col-4 col-m-8 col-s-12'>
       <div class='card card-one'>
              <div class='header_card'>
              <div class='avatar'><img src='${user_photo}' alt='Jhon Doe' /></div>
              </div>
              <p class='info-user-p'>${userInfo.email}</p>
              <div class='desc' id='biography${userInfo.uid}'>
              <textarea name='comentario' id='postBio${userInfo.uid}' class='coment-biograph' 
              placeholder='Escribe aqui tu comentario...'></textarea>           
             <button class=' savebiograph' id='btnSaveBiography${userInfo.uid}'> Guardar Biografía </button>
              </div>
              
              <div class='footer_card'>
              <button id='btn-logout' class='btn-likecoment'>Cerrar Sesión</button>
              </div>
        </div>
        </div>
        <div class='col-4 col-m-2'></div>
        </div>
        </div>
               `; document.getElementById('btn-logout').addEventListener('click', logOut)
                  document.getElementById(`btnSaveBiography${userInfo.uid}`).addEventListener('click', saveBiography)
       }     
       
   
       const saveBiography = (e) =>{
   
       const key = e.target.getAttribute('id').slice(16)
       console.log (key)
       const contenido = document.getElementById(`postBio${key}`).value
   
           document.getElementById(`biography${key}`).innerHTML = `
           
           <p> ${contenido}</p>
           `;
           biography(key,contenido)
       }
       
       
   
   showUser.addEventListener('click', showUserInfo);    
   
   
   
   //Buscar Hashtag
   
   const searchTag = () => {
       
   document.getElementById('search-imput').value=''; 
   document.getElementById('searching').addEventListener('click', () => {
      
   let conditionSearch = document.getElementById('search-imput').value
   
   const ref = firebase.database().ref('posts/');
   document.getElementById('result_search').innerHTML='';
   ref.orderByChild('hashtag').equalTo(`${conditionSearch}`).once('value', function(snapshot) {
       snapshot.forEach(function(childSnapshot) {
        let childData = childSnapshot.val();
       
        console.log(childData)
   
           document.getElementById('result_search').innerHTML=`
           
           <div class='row'>  
             <div class='col-3 col-m-2 col-s-12'></div>
             <div class='col-6 col-m-8 col-s-12'>  
                       <div class='box_text'>
                           <div class='box-header'>
                            <div class='avatar_post'><img src='${childData.profile_picture}'/></div> 
                             <div class='name-post'>${childData.author}</div>
                           </div>
                           <div class='box-content'>
                           <h3>${childData.title}</h3><br>
                             <div class='content'>   
                             <img class="img-post" src='${childData.imagen}'>                         
                               <p>${childData.body}</p>
                             </div><br>
                             <h4>${childData.hashtag}</h4><br>
                             <span> Creado: ${childData.date.d} / ${childData.date.m} / ${childData.date.y} </span>
                           </div>
                    </div> 
               </div>
           <div class='col-3 col-m-2 col-s-12'></div>
            </div>` + document.getElementById('result_search').innerHTML;        
   
       });   
     })
   
   
   })
   
   }
   
   // Subir imagen a post
   const inputLoader = document.getElementById('postImgInput');
   let imgUrl;
   inputLoader.addEventListener('change', (e) => {
     const file = e.target.files[0];
     const uid = firebase.auth().currentUser.uid;
     const storageRef = firebase.storage().ref(uid + '/images/' + file.name);
     const uploadTask = storageRef.put(file);
     uploadTask.on('state_changed', function (snapshot) {
     },
       function error(err) {
       },
       function complete() {
         storageRef.getDownloadURL().then(function (url) {
           imgUrl = url;
         });
       });
   });
   