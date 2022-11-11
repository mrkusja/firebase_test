let userlink = document.getElementById('userlink');
let signoutlink = document.getElementById('signoutlink');
let header = document.getElementById('header');
let site = document.getElementById('site')

let currentUser = null;

function getUsername() {
  let keepLoggedIn = localStorage.getItem('keepLoggedIn');

  if (keepLoggedIn == 'yes') {
    currentUser = JSON.parse(localStorage.getItem('user'));
  } else {
    currentUser = JSON.parse(sessionStorage.getItem('user'));
  }
}

function Signout() {
  sessionStorage.removeItem('user');
  localStorage.removeItem('user');
  localStorage.removeItem('keepLoggedIn');
  window.location = 'home.html';
}

window.onload = function () {
  getUsername();
  if (currentUser == null) {
    userlink.innerText = 'Create new account';
    userlink.classList.replace('nav-link', 'btn');
    userlink.classList.add('btn-primary');
    userlink.href = 'register.html';

    signoutlink.innerText = 'Login';
    signoutlink.classList.replace('nav-link', 'btn');
    signoutlink.classList.add('btn-success');
    signoutlink.href = 'login.html';
  } else {
    userlink.innerText = currentUser.username;
    header.innerText = 'Welcome, ' + currentUser.fullname;
    site.classList.remove('visually-hidden')
    userlink.classList.replace('btn', 'nav-link');
    userlink.classList.remove('btn-primary');
    userlink.href = '#';

    signoutlink.innerText = 'Sign Out';
    signoutlink.classList.replace('btn', 'nav-link');
    signoutlink.classList.remove('btn-success');
    signoutlink.href = 'javascript:Signout()';
  }
};