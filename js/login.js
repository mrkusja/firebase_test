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

      const username = document.getElementById('userInp');
      const pass = document.getElementById('passInp');
      const submit = document.getElementById('sub_btn');
      let str = '';
  
      //   --------------authentification--------------

      function AuthenticateUser() {
        const dbRef = ref(db);

        get(child(dbRef, 'UserList/' + username.value)).then(snapshot => {
          if (snapshot.exists()) {
            // let dbpass = decPass(snapshot.val().password);
            login(snapshot.val());
            // if (dbpass == pass.value) {
            //   login();
            // }
            // else {
            //   alert('User does not exist');
            // }
          } else {
            alert('Username or password is invalid');
          }
        });
      }

      //   -----------decription password----------------

    //   function decPass() {
    //     let cryptPass = CryptoJS.AES.encrypt(dbpass, pass.value);
    //     return cryptPass.toString(CryptoJS.enc.Utf8);
    //   }

      //   ----------login----------------
   
      function login(user) {
        let keepLoggedIn = document.getElementById('customSwitch1').checked;

        if (!keepLoggedIn) {
          sessionStorage.setItem('user', JSON.stringify(user));
          window.location = 'home.html';
        } else {
          localStorage.setItem('keepLoggedIn', 'yes');
          localStorage.setItem('user', JSON.stringify(user));
          window.location = 'home.html';
        }
      }

      submit.addEventListener('click', AuthenticateUser);