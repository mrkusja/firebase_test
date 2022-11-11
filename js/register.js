import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js';

const firebaseConfig = {
  apiKey: 'AIzaSyBj_7PgKViWZ_LKZUXAKh-rIP3xw1Dy-_k',
  authDomain: 'fir-2bd6b.firebaseapp.com',
  databaseURL: 'https://fir-2bd6b-default-rtdb.firebaseio.com',
  projectId: 'fir-2bd6b',
  storageBucket: 'fir-2bd6b.appspot.com',
  messagingSenderId: '672356104842',
  appId: '1:672356104842:web:9d6388555722d428eecb73',
};

const app = initializeApp(firebaseConfig);

import {
  getDatabase,
  ref,
  set,
  child,
  get,
} from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js';

const db = getDatabase();

const name = document.getElementById('nameInp');
const email = document.getElementById('emailInp');
const username = document.getElementById('userInp');
const pass = document.getElementById('passInp');
const submit = document.getElementById('sub_btn');
let str = '';

//   ------------validation----------------
function isEmptyOrSpases(str) {
  return str === null || str.match(/^ *$/) !== null;
}

function Validation() {
  let nameregex = /^[a-zA-Z\s]+$/;
  let emailregex = /^[a-zA-Z0-9]+$/;
  let userregex = /^[a-zA-Z0-9]{5,}$/;

  if (
    isEmptyOrSpases(name.value) ||
    isEmptyOrSpases(email.value) ||
    isEmptyOrSpases(username.value) ||
    isEmptyOrSpases(pass.value)
  ) {
    alert('You cannot left any field empty!');
    return false;
  }

  if (!nameregex.test(name.value)) {
    alert('The name should only contain alphabets!');
    return false;
  }

  if (!emailregex.test(email.value)) {
    alert('Enter a valid email!');
    return false;
  }

  if (!userregex.test(username.value)) {
    alert(
      '-username can only be alphanumeric\n-username must be aleast 5 characters\n-username cannot contain spaces'
    );
    return false;
  }
  return true;
}

//   -----------register-------------

function RegisterUser() {
  if (!Validation()) {
    return;
  }
  const dbRef = ref(db);

  get(child(dbRef, 'UserList/' + username.value)).then(snapshot => {
    // let dbpass = snapshot.val().password
    // console.log(snapshot.exists())
    // console.log(dbpass)
    // console.log(pass.value)

    if (snapshot.exists()) {
      alert('Accout already exist!');
    } else {
      set(ref(db, 'UserList/' + username.value), {
        fullname: name.value,
        email: email.value,
        username: username.value,
        password: encPass(),
      })
        .then(() => {
          alert('User added sucessfully!');
        })
        .catch(error => {
          alert('error' + error);
        });
    }
  });
}

//   -----------cryptopassword------------

function encPass() {
  let cryptPass = CryptoJS.AES.encrypt(pass.value, pass.value);
  return cryptPass.toString();
}

submit.addEventListener('click', RegisterUser);