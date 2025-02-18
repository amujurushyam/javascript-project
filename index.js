import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

const firebaseConfig =
 {
  apiKey: "AIzaSyAeV4RFa48k8Op4hFwRERHcyHKaPgKGbFs",
  authDomain: "fashionstoree-aaa4b.firebaseapp.com",
  projectId: "fashionstoree-aaa4b",
  storageBucket: "fashionstoree-aaa4b.firebasestorage.app",
  messagingSenderId: "887513707037",
  appId: "1:887513707037:web:8119d47e3545c7635c4cf4",
  measurementId: "G-C26MJ8QCK8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Signup Event
document.getElementById("emailSignupButton").addEventListener("click", () => {
  const email = document.getElementById("signupEmail").value;
  const pass = document.getElementById("signupPassword").value;

  if (email === "" || pass === "") {
    Swal.fire({
      icon: "error",
      title: "Input Error",
      text: "Please enter both email and password."
    });
    return;
  }

  createUserWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      document.getElementById("signupEmail").value = "";
      document.getElementById("signupPassword").value = "";
      Swal.fire({
        title: "Signup Successful!",
        text: "Please login with your credentials.",
        icon: "success"
      }).then(() => {
        const signupModal = bootstrap.Modal.getInstance(document.getElementById("signupModal"));
        signupModal.hide();

        const loginModal = new bootstrap.Modal(document.getElementById("loginModal"));
        loginModal.show();
      });
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Signup Error",
        text: error.message // Display Firebase error message
      });
    });
});

// Login Event
document.getElementById("btns").addEventListener("click", () => {
  const email = document.getElementById("loginEmail").value;
  const pass = document.getElementById("loginPassword").value;

  if (email === "" || pass === "") {
    Swal.fire({
      icon: "error",
      title: "Input Error",
      text: "Please enter both email and password."
    });
    return;
  }

  signInWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      document.getElementById("loginEmail").value = "";
      document.getElementById("loginPassword").value = "";
      Swal.fire({
        title: "Login Successful!",
        icon: "success"
      }).then(() => {
        window.location.href = "main.html"; // Redirect to main page
      });
    })
    .catch((error) => {
      document.getElementById("loginEmail").value = "";
      document.getElementById("loginPassword").value = "";
      Swal.fire({
        icon: "error",
        title: "Login Error",
        text: error.message // Display Firebase error message
      }).then(() => {
        const loginModal = bootstrap.Modal.getInstance(document.getElementById("loginModal"));
        loginModal.show();
      });
    });
});

function logout() {
    Swal.fire({
        title: 'Logged Out',
        text: 'Logout successfully',
        icon: 'success',
        confirmButtonText: 'OK'
    }).then(() => {
        window.location.href = 'index.html';
    });
}

let log = document.getElementById("log");

log.addEventListener("click", () => {
  // Ensure the modal is initialized properly before showing it
  const loginModal = new bootstrap.Modal(document.getElementById("loginModal"));
  loginModal.show();
});
let sin=document.getElementById("sin")
sin.addEventListener("click",()=>{
  const signupModal = new bootstrap.Modal(document.getElementById("signupModal"));
  signupModal.show();
});
