`use strict`;


// setting the username & password
localStorage.setItem('username', 'Rushit');
localStorage.setItem('password', '1254');


// Connecting HTML elements with JavaScript
const login = document.querySelector('.loginbtn');
const username = document.querySelector('.username');
const password = document.querySelector('.password');
const forgot = document.querySelector('.forgot');

login.addEventListener('click', () => {
  if (username.value === localStorage.getItem('username') &&
      password.value === localStorage.getItem('password')) {
        window.open("./index.html", '_self');
  } else {
    forgot.innerText = 'Incorrect username or password';
    forgot.style.color = '#f00'
    setTimeout(() => { forgot.innerHTML = '<a href="#">Forgot password?</a>'}, 2000);
  }
})






