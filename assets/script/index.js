`use strict`;

// Connecting HTML elements with JavaScript
// form
const form = document.querySelector('form');
const input = document.querySelector('#file');
const postButton = document.querySelector('.button');
const fileName = document.querySelector('#file-name');
// post
const display = document.querySelector('.display');
const date = document.querySelectorAll('.date');




// setting the username & password
localStorage.setItem('username', 'Rushit');
localStorage.setItem('password', '1254');

// Class User
class User {
  #id;
  #name;
  #userName;
  #email;

  constructor(id, name, userName, email) {
    this.#id = id;
    this.#name = name;
    this.#userName = userName;
    this.#email = email;
  }

  get id() { return this.#id; }
  get name() { return this.#name; }
  get email() { return this.#email; } 
  get userName() { return this.#userName; }

  getInfo() { 
    let info = `Username: ${this.#userName} <br> Name: ${this.#name} <br> Id: ${this.#id} <br> Email: ${this.#email} <br>`;
    return info;
  }
}

// Class Subscriber
class Subscriber extends User {
  #pages;
  #groups;
  #canMonitize;

  constructor(id, name, userName, email, pages, groups, canMonitize) {
    super(id, name, userName, email);
    this.#pages = pages.join(', ');
    this.#groups = groups.join(', ');
    this.#canMonitize = canMonitize;
  }

  monitize() {
    if(this.canMonitize) return 'Yes';
    return 'No';
  }

  get pages() { return this.#pages; }
  get groups() { return this.#groups; }
  get canMonitize() { return this.#canMonitize; }

  getInfo() {
    let info = `${super.getInfo()} <br> Pages: ${this.#pages} <br> Groups: ${this.#groups} <br> Can monitize: ${this.monitize()}`;
    return info;
  }
}

// Creating new subscriber
const subscriber = new Subscriber(
  12551, 
  'Rushit Parmar', 
  'rbparmar', 
  'rushitparmar59@gmail.com', 
  ['BAPS', 'Marvel'],
  ['Kishore Mandal', 'BAPS Winnipeg'],
  true
);

// displaying file name
file.addEventListener('input', function() {
  const images = file.files;
  for (let image of images) {
      fileName.innerHTML = `${image.name}`;
  }
});

// post button function
postButton.addEventListener('click', function() {
  const textArea = document.querySelector('textarea');
  const input = document.querySelector('#file');

  // checking if textarea or image is empty
  if(textArea.value.length <=0 && input.files.length <=0) {
    return;
  }

  // creating new post
  const post = document.createElement('div');
  post.classList.add('post');
  post.innerHTML = `
    <header>
      <div class="fig-name">
        <figure>
          <img src="./Assets/image/profile icon.png">
        </figure>
        <div class="name">${subscriber.name}</div>        
      </div>
      <div class="date">${new Date().toDateString()} </div>
    </header>

    <div class="text">${textArea.value}</div>
  `;

  // adding image to post
  if(input.files.length > 0) {
    post.innerHTML = post.innerHTML + 
    `<div class="image"><img src='${URL.createObjectURL(input.files[0])}'></div>`; 
  }

  // adding the post
  display.insertBefore(post, display.firstChild);
  
  // reseting the form
  form.reset();
  fileName.innerHTML = '';
  textArea.innerHTML = '';
})


for (let i = 0; i < date.length; i++) {
  date[i].innerHTML = new Date().toDateString();
}


// Using the random user API to get fake people

const url = 'https://randomuser.me/api/?results=12&inc=name,picture,location';

const options = {
  method: 'GET',
  mode: 'cors',
  header: {
    Accept: 'application/vnd.github.v3+json',
  }
};

async function getPeople() {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error (`${response.statusText}: ${response.status}`)
    }
    const people = document.querySelector('.people')

    const data = await response.json();
    console.log(data)
    for (i = 0; i < data.results.length; i++) {
      people.innerHTML = people.innerHTML +  `
        <div class="person">
          <img src="${data.results[i].picture.medium}">
          <div class="person-details">
            <div class="name">${data.results[i].name.first} ${data.results[i].name.last}</div>
            <div class="city">${data.results[i].location.city}</div>
          </div>
        </div>
      `;
    }
  } catch(error) {
    console.log(error.message);
  }
}
getPeople();
