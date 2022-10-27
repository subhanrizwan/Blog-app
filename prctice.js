import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import {
  collection,
  query,
  where,
  onSnapshot,
  getFirestore,
  doc,
  updateDoc,
  increment,
  addDoc,
  arrayUnion,
  arrayRemove,
} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js";

const firebaseConfig = {
  // apiKey: "AIzaSyDN3tz4xYlK7Siq4ERJTvFRaxam5HC8uhg",
  // authDomain: "blog-app-229a3.firebaseapp.com",
  // projectId: "blog-app-229a3",
  // storageBucket: "blog-app-229a3.appspot.com",
  // messagingSenderId: "259237453098",
  // appId: "1:259237453098:web:fec09a5002bbc0fe2d5253",
  // measurementId: "G-VSKHDKPW1R"
  
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();

// const getCounter = () => {
//   const unsubscribe = onSnapshot(collection(db, "counter"), (querySnapshot) => {
//     const counter = [] ;
//     querySnapshot.forEach((doc) => {
//       counter.push(doc.data());
//     });
//     let count = document.getElementById("count");
//     count.innerHTML = counter[0].count;
//   });
// };
// getCounter();

// document.getElementById("plus").addEventListener("click", async () => {
//   const washingtonRef = doc(db, "counter", "zUchgnaPUvG9Hxw5pupF");
//   await updateDoc(washingtonRef, {
//     count: increment(1),
//   });
// });

// document.getElementById("minus").addEventListener("click", async () => {
//   const washingtonRef = doc(db, "counter", "zUchgnaPUvG9Hxw5pupF");

//   await updateDoc(washingtonRef, {
//     count: increment(-1),
//   });

// });

const userID = 1;
const username = "Ghous";

document.getElementById("post-btn").addEventListener("click", async () => {
  let myPost = document.getElementById("my-post");
  const docRef = await addDoc(collection(db, "posts"), {
    user: userID,
    content: myPost.value,
    likes: [],
    lastLike: "",
  });
  console.log("Document written with ID: ", docRef.id);
});

const getPosts = () => {
  let postList = document.getElementById("post-list");
  const unsubscribe = onSnapshot(collection(db, "posts"), (querySnapshot) => {
    postList.innerHTML = "";
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      postList.innerHTML += `<div> <h2> ${doc.data().content} </h2> (Likes: ${
        doc.data().likes.length
      } ${
        doc.data().lastLike ? `${doc.data().lastLike} recently like` : ""
      } ) ${
        doc.data().likes.indexOf(userID) !== -1
          ? `<i onclick="unLikePost('${doc.id}')" class="fa-solid fa-thumbs-up"></i>`
          : `<i onclick="likePost('${doc.id}')" class="fa-regular fa-thumbs-up"></i>`
      }</div>`;
      console.log(doc.id);
    });
  });
};

getPosts();

const likePost = async (id) => {
  const postRef = doc(db, "posts", id);
  await updateDoc(postRef, {
    likes: arrayUnion(userID),
    lastLike: username,
  });
};

const unLikePost = async (id) => {
  const postRef = doc(db, "posts", id);
  await updateDoc(postRef, {
    likes: arrayRemove(userID),
  });
};

window.likePost = likePost;
window.unLikePost = unLikePost;