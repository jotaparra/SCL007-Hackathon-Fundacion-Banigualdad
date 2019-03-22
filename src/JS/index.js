export const writeUserData = (uid, name, email, imageUrl) => {

    firebase.database().ref("users/"+uid).once("value", function(snapshot) {
      if (snapshot.val() === null) {
        firebase.database().ref('users/'+uid).set({
              "perfil": {
                username: name !== null ? name : firebase.auth().currentUser.email,
                email: email,
                profile_picture: imageUrl !== null ? imageUrl : false,
              },
          })
      }
           
    });
  }
  
  export const enviarConvalidacionAFirebase =(imageUrl,uid,username,title,body,postTag,day,month,year,url)=>{
    // Crear nuevo post
    const postData = {
      profile_picture: imageUrl,
      author: username !== null ? username : firebase.auth().currentUser.email,
      uid: uid,
      body: body,
      title: title,
      hashtag: postTag,
      imagen : url,
      date:{
        d:day,
        m:month,
        y: year,
      },
      
      
      
    }
  
    // Llave que identifica el nuevo post
    var newPostKey = firebase.database().ref().child('/posts/').push().key;
  
    // Ingresa el post en publico y en su perfil.
    var updates = {};
    updates['/posts/' + newPostKey] = postData;
    updates['/users/' + uid + '/post/' + newPostKey] = postData;
    return firebase.database().ref().update(updates);
  
  }
  
  
  
  
  export const readPost = (onpostChange) => {
    let postRef = firebase.database().ref('posts');
    postRef.on('child_added',(coment)=> {
      
      onpostChange(coment);
    });
  };
  
  export const deletePost = (postdelete) => {
    var postID = postdelete.currentTarget.getAttribute('userpp');  
    var firebaseref = firebase.database().ref('posts/'+ postID);
    let askRemove = confirm("Quieres eliminar este Post?")
    if(askRemove == true){
      firebaseref.remove();
      location.reload();
    }else{
      return null
    }
  }
  
  
  export const guardandoComentarios =(key, contenido, author, newPostKey)=>{
    // Crear nuevo post
    const postcoment = {
      author: author !== null ? author : firebase.auth().currentUser.email,
      contenido: contenido,
      
    }; 
  
    // Llave que identifica el nuevo post
    //var newPostKey = firebase.database().ref().child('posts').push().key;
  
    // Ingresa el post en publico y en su perfil.
    var updates = {};
    updates['/posts/' + key + '/coment/' + newPostKey] = postcoment;
   // updates['/users/' + uid + '/post/' + key + '/comment/' + newPostKey] = postcoment;
  
   
    return firebase.database().ref().update(updates);
  }
  
  export const biography = (uid,contenido)=>{
  
   firebase.database().ref('users/'+uid).update({
              biografía: contenido            
              
          })
      }
     
     
  export const likePost = (id, uid) => {
  //  console.log('running likePost() for post ID:', id);
    let postRef = firebase.database().ref('posts/'+ id + '/starCount');
  
            postRef.once("value", function (snapshot) {
              let currentLikes = snapshot.child('likeCount').child(uid).val();
             
              
              if (currentLikes == null) {
                postRef.child('likeCount').child(uid).set('1'),
  
                function(error) {
                  if (error) {
                    console.log('Data could not be saved:' + error);
    
                  } else {
                    console.log('Data saved successfully');
                  }  }
  
              } else {
                postRef.child('likeCount').child(uid).remove();
              }     
  
             
            });
  
  } 
  
  
  export const likeCount = (id,uid) =>{  
    var starCountRef = firebase.database().ref('posts/' + id + '/starCount/' + '/likeCount/' + uid);
    starCountRef.on('value', function(snapshot) {
      
   // console.log (snapshot.val())
  
  });
  }
  
  