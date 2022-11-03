import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  // onAuthStateChanged,
  // deleteUser
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import {
  doc,
  setDoc,
  // getDoc,
  getFirestore,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  onSnapshot,
  orderBy,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDN3tz4xYlK7Siq4ERJTvFRaxam5HC8uhg",
  authDomain: "blog-app-229a3.firebaseapp.com",
  projectId: "blog-app-229a3",
  storageBucket: "blog-app-229a3.appspot.com",
  messagingSenderId: "259237453098",
  appId: "1:259237453098:web:fec09a5002bbc0fe2d5253",
  measurementId: "G-VSKHDKPW1R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

let reg = document.getElementById('Register')
reg.addEventListener("click", function () {


  let name = document.getElementById('reg-Name')
  let fName = document.getElementById('reg-fatherName')
  let number = document.getElementById('reg-num')
  let email = document.getElementById('reg-email')
  let pass = document.getElementById('reg-pass')

  // regix//
  var name1 = /^[a-zA-Z ]+$/.test(name.value)
  var name2 = /^[a-zA-Z ]+$/.test(fName.value);
  var number2 = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/.test(number.value)
  var email2 = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)
  var password2 = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(pass.value)
  if (name1) {
    if (name2) {
      if (number2) {
        if (email2) {
          if (password2) {
          } else { swal("invalid password") }
        } else { swal("invalid email") }
      } else { swal("invalid number") }
    } else { swal("invalid father name") }
  } else { swal("invalid name") }

  createUserWithEmailAndPassword(auth, email.value, pass.value)
    .then(async (userCredential) => {

      let load = document.getElementById('loader-reg')
      load.style.display = 'block'
      let disab = document.getElementById('Register')
      disab.style.display = 'none'
      let load1 = document.getElementById('img_Reg')
      load1.style.marginTop = '25px'
      // Signed in 
      const user = userCredential.user;
      await setDoc(doc(db, "user", user.uid), {
        name: name.value,
        fname: fName.value,
        number: number.value,
        email: email.value,
        pass: pass.value,
      });
      // console.log("Registered");
      // swal("Registered", "congrats", "success")
      let load_reg = document.getElementById('loader-reg')
      load_reg.style.display = 'none'
      let disa = document.getElementById('Register')
      disa.style.display = 'block'

      swal("Registered", "you have registered", "success");

      name.value - ""
      fName.value = ""
      number.value = ""
      email.value = ""
      pass.value = ""

    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("error", error);

      setTimeout(() => {
        let load_reg1 = document.getElementById('loader-reg')
        load_reg1.style.display = 'none'
        // swal("Sorry!", "Email Already use!", "error");
      }, 2000)


    });

});
// login user

let login = document.getElementById('Login-user')
login.addEventListener("click", function () {

  let login_email = document.getElementById('login-email')
  let login_pass = document.getElementById('login-pass')
  // console.log(user);
  // if(user)
  signInWithEmailAndPassword(auth, login_email.value, login_pass.value)
    .then(async () => {
      // const user = userCredential.user
      const users = auth.currentUser
      console.log(users.uid);

      // if(!users.uid){
      //   swal("Invalid!", "somethign invalid!", "error");
      // }
      let btn = document.getElementById('main-cont')
      btn.style.display = 'none'

      let loader = document.getElementById('loader')
      loader.style.display = 'block'
      
      setTimeout(() => {
        window.location = 'creatBlog.html'
      },3000);

    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        swal("Sorry!", "User Not Found!", "error");
         })
})



      // const docRef = doc(db, "user", user.uid);
      // console.log(docRef);
      // const docSnap = await getDoc(docRef);

      // if (docSnap.exists()) {
      //   console.log("User Data:", docSnap.data());

      //   let loader1 = document.getElementById('loader')
      //   loader1.style.display = 'none'


      //   let btn1 = document.getElementById('cont')
      //   btn1.style.display = 'block'

      // let loader1 = document.getElementById('loader')
      // loader1.style.display = 'none'

      //   let btn = document.getElementById('main-cont')
      // btn.style.display = 'none'


      // Blog post moving now

      //     let textPost = document.getElementById('text_post').value
      //     let postBtn = document.getElementById('post_btn').addEventListener("click",()=>{


    // })


    //   } else {
    //     console.log("No such document!");
    //    }
    // })
    //  .catch((error) => {
    //   const errorCode = error.code;
    //   const errorMessage = error.message;
    //   console.log(error);

    //   swal("Sorry!", "User Not Found!", "error");
    //    })

    //   })

    //  login

// let logout = document.getElementById('log_out')
// logout.addEventListener("click", () => {
//   const auth = getAuth();
//   const user = auth.currentUser;
//   console.log(user);
//   console.log(user);
//   deleteUser(user).then(() => {

//     let main_card = document.getElementById('container2')
//     main_card.style.display = 'none'

//     let load = document.getElementById('loader')
//     load.style.display = 'block'

//     setTimeout(function log_out() {

//       let main_cont = document.getElementById('main-cont')
//       main_cont.style.display = 'block'


//       let load1 = document.getElementById('loader')
//       load1.style.display = 'none'

//       let main_cont1 = document.getElementById('main-cont')
//       main_cont1.style.backgroundColor = 'rgb(41, 39, 39)'
//       let cont2 = document.getElementById('main-cont')
//       cont2.style.height = '85%'



//       let pas = document.getElementById('login-pass')
//       pas.value = ""

//     }, 1000)



//   }).catch((error) => {
//     // An error ocurred
//     // ...
  // });