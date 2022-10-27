 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
 import {
  doc,
  deleteDoc,
  getDoc,
  collection,
   getFirestore,
    addDoc,
    updateDoc,
     onSnapshot,
     arrayUnion,
     arrayRemove,
   } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js";
   import{
    getAuth,
    onAuthStateChanged,
    deleteUser,
    
   }from"https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js"
   import {
     getStorage, 
    ref,
    uploadBytesResumable, 
    getDownloadURL,
  } 
   from "https://www.gstatic.com/firebasejs/9.12.1/firebase-storage.js";



   const firebaseConfig = {
    apiKey: "AIzaSyDN3tz4xYlK7Siq4ERJTvFRaxam5HC8uhg",
    authDomain: "blog-app-229a3.firebaseapp.com",
    projectId: "blog-app-229a3",
    storageBucket: "blog-app-229a3.appspot.com",
    messagingSenderId: "259237453098",
    appId: "1:259237453098:web:fec09a5002bbc0fe2d5253",
    measurementId: "G-VSKHDKPW1R"
  };

   const app = initializeApp(firebaseConfig);
   const auth = getAuth();
   const db = getFirestore();
   const storage = getStorage();
  console.log("Auth",auth)
  
  let inp = document.getElementById('inp')
  let postfile = document.getElementById('post_file')
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const useruid = user.uid
      console.log(useruid);
      console.log(user.email);
      console.log(user.uid);

      // blog app//
      let postBtn = document.getElementById('post_btn').addEventListener
      ("click",async()=>{ 
        if(inp.value && postfile.file ){
        
       
        // add//
        const docRef = await addDoc(collection(db, "user"), {
          textpost:inp.value,
          likes: [],
          users : useruid,
        });
        console.log("Document written with ID: ", docRef.id);
        // add//
 let file = postfile.files[0]
 console.log(postfile);
  const storageRef = ref(storage, `images/${docRef.id}.jpg`);

const uploadTask = uploadBytesResumable(storageRef, file);
uploadTask.on('state_changed', 
  (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '0 % done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        console.log('Upload is 100% done');
        break;
    }
  }, 
  (error) => {
    console.log(error);
  }, 
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
      // console.log('File available at', downloadURL);
      let url =  downloadURL
      console.log(url);

      const washingtonRef = doc(db, "user", docRef.id);
      await updateDoc(washingtonRef, {
        image : url 
});

inp.value = ""
postfile = ""
    })
    });
  }else{
    swal("Invalid", "please make a post", "error");
  }
  }
);
      
      const getpost=()=>{
        let blog_post= document.getElementById('blog_post-child')
        const unsubscribe = onSnapshot((collection(db, "user")), (querySnapshot) => {
          blog_post.innerHTML=""
          querySnapshot.forEach((doc) => {
            console.log(useruid);
            // console.log(doc.data().textpost);
            blog_post.innerHTML +=
            `
            <div id="card">
            <div id="img_div">
            <img src="${doc.data().image}">
            </div>
             <div id="description"><p>${doc.data().textpost}</p></div>
             <p> ${doc.data().likes.length}
            
              ${doc.data().likes.indexOf(useruid) !== -1
              ? `<i id="dislikepost" onclick="dislike_post('${doc.id}')" class="fa-solid fa-thumbs-up"></i>`
              :`<i id="likepost" onclick="like_post('${doc.id}')" class="fa-regular fa-thumbs-up"></i>`
            }  
            <button id="btn_del" onclick="del_blog(this)">Delete Blog</button>
            </p>
            </div>
            
            `
            console.log(doc.id);
          });
        })
      }
      getpost();
      // window.getpost = getpost
      
      let like_post= async(id)=>{
        const washingtonRef = doc(db, "user",id);
      
      await updateDoc(washingtonRef, {
          likes: arrayUnion(useruid)
      });
      }
      let dislike_post= async(id)=>{
        const washingtonRef = doc(db, "user", id);
      
      await updateDoc(washingtonRef, {
          likes: arrayRemove(useruid)
      });
      }
      window.like_post = like_post
      window.dislike_post = dislike_post
      
      
      

// blog app///

    } 
    // else {
    // console.log("error");
    // }

  });
  
let del_blog =()=>{
  // console.log("subhan");
  // console.log(event.target.parentNode.parentNode.remove())
  event.target.parentNode.parentNode.remove()
//   const auth = getAuth();
//   console.log(auth);
//   const User1 = auth.currentUser
//   console.log(User1);
//  deleteUser(User1).then(() => {

// });

}
window.del_blog = del_blog

  



  // let get_user=()=>{
  //   console.log("chl rha he");
    // const docRef = doc(db, "user");
    // console.log(docRef);
//  console.log(user);
//  const docSnap = getDoc(docRef);
//  console.log(docSnap);
 
//  if (docSnap.exists()) {
//    console.log("subhan");
//    console.log("User Data:", docSnap.data());
//  }
  // }
  // get_user();




 




 // Initialize Firebase

//  const firebaseConfig = {
//   apiKey: "AIzaSyB-Do56bN1_qONekBDxrDUrPR3RW2ZakYI",
//   authDomain: "prcticeblog-15790.firebaseapp.com",
//   projectId: "prcticeblog-15790",
//   storageBucket: "prcticeblog-15790.appspot.com",
//   messagingSenderId: "240179812926",
//   appId: "1:240179812926:web:2403bd5fe1827431038f6f",
//   measurementId: "G-KEC69XHD57"
// };

//  const app = initializeApp(firebaseConfig);
//  const db = getFirestore();

// const userid = 1;

// let inp = document.getElementById('inp')
// let postBtn = document.getElementById('post_btn').addEventListener("click",async ()=>{
//   //
//   const docRef = await addDoc(collection(db, "user"), {
//     textpost:inp.value,
//     likes: [],
//     user : userid
//   });
//   console.log("Document written with ID: ", docRef.id); 
//   // console.log(blog_post);
  
// })

// const getpost=()=>{
//   let blog_post= document.getElementById('blog_post')
//   const unsubscribe = onSnapshot((collection(db, "user")), (querySnapshot) => {
//     blog_post.innerHTML=""
//     // console.log(blog_post);
//     querySnapshot.forEach((doc) => {
//       // console.log(doc.data().textpost);
//       blog_post.innerHTML +=
     
//       ` 
//       <div id="blog_post-child">
//       <div id="card">
//        <p >${doc.data().textpost}
//         ${doc.data().likes.length}</p>
      
//         ${doc.data().likes.indexOf(userid) !== -1
//         ? `<i id="dislikepost" onclick="disLikePost('${doc.id}')" class="fa-solid fa-thumbs-up"></i>`
//         :`<i id="likepost" onclick="likePost('${doc.id}')" class="fa-regular fa-thumbs-up"></i>`
//       }</div>
//        </div>
//       `
//     });
//   })
// }
// getpost();
// // window.getpost = getpost

// let likePost= async(id)=>{
//   const washingtonRef = doc(db, "user",id);

// await updateDoc(washingtonRef, {
//     likes: arrayUnion(userid)
// });
// }
// let disLikePost= async(id)=>{
//   const washingtonRef = doc(db, "user", id);

// await updateDoc(washingtonRef, {
//     likes: arrayRemove(userid)
// });
// }
// window.likePost = likePost

// window.disLikePost = disLikePost




// blog app///




  // 
// )

// import {
//   doc,
//   getDoc,
//   getFirestore
// } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js";
 
// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth();
// const db = getFirestore();
// console.log(db);
// const storage = getStorage();


// const user = userCredential.user;
// console.log(user);
      // const docRef = doc(db, "user", user.uid);
      // console.log(docRef);
      // const docSnap = await getDoc(docRef);

      // if (docSnap.exists()) {
      //   console.log("User Data:", docSnap.data());

      // }
    //     // location.replace('creatBlog.html')
     
    // //     // let img = document.getElementById('profile')
    // //     // img.src = docSnap.data().profile;

    // //     // let name_user = document.getElementById('name')
    // //     // name_user.innerHTML = `<h1>${docSnap.data().name}</h1>`

    // //     // let fname_user = document.getElementById('father')
    // //     // fname_user.innerHTML = `<h6>${docSnap.data().fname}</h6>`

    // //     // let p_num_user = document.getElementById('p-num')
    // //     // p_num_user.innerHTML = `<h6>${docSnap.data().number}</h6>`

    // //     // let email_user = document.getElementById('email')
    // //     // email_user.innerHTML = `<h6>${docSnap.data().email}</h6>`


    // //     // let btn1 = document.getElementById('container2')
    // //     // btn1.style.display = 'block'

    // //     // let cont = document.getElementById('main-cont')
    // //     // cont.style.height = '65%'
    // //     // let cont1 = document.getElementById('main-cont')
    // //     // cont1.style.backgroundColor = '#ffff'

    // //     let loader1 = document.getElementById('loader')
    // //     loader1.style.display = 'none'


    //   } else {
    //     console.log("No such document!");

    //    }
    // // .catch((error) => {
    // //   const errorCode = error.code;
    // //   const errorMessage = error.message;
    // //   console.log(error);
    // //   // if(!docSnap.exists){
    // //   swal("Sorry!", "User Not Found!", "error");
    // //   // }
    // // });




// let text_post = document.getElementById('inp')
// // console.log(text_post);
// let postbtn = document.getElementById('post_btn')
// postbtn.addEventListener("click",async() => {
//   console.log("chl rha he");

//   //storage/image //

//   let postfile = document.getElementById('post_file')
//   let file = postfile.files[0]
//   console.log(file);
//   const storageRef = ref(storage, `user/${user.uid}`.jpg);
//   const uploadTask = uploadBytesResumable(storageRef, file);

//   uploadTask.on('state_changed',
//     (snapshot) => {

//       const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//       console.log('Upload is ' + progress + '% done');
//       switch (snapshot.state) {
//         case 'paused':
//           console.log('Upload is paused');
//           break;
//         case 'running':
//           console.log('Upload is running');
//           break;
//       }
//     },
//     (error) => {
//       console.log(error);
//     },
//     () => {
//       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//         console.log('File available at', downloadURL);
//       });
//     }
//   );
// // add_text//
// await setDoc(doc(db, "user", user.uid), {
//   text_post:text_post.value,
//   file:file
// });

// // add_text//

//   //storage //

// })




 
//  const firebaseConfig = {
//    apiKey: "AIzaSyB-Do56bN1_qONekBDxrDUrPR3RW2ZakYI",
//    authDomain: "prcticeblog-15790.firebaseapp.com",
//    projectId: "prcticeblog-15790",
//    storageBucket: "prcticeblog-15790.appspot.com",
//    messagingSenderId: "240179812926",
//    appId: "1:240179812926:web:2403bd5fe1827431038f6f",
//    measurementId: "G-KEC69XHD57"
//  };
// ${doc.data().likes.length}