const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");


sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

//onclick playing audio
let play = function () { document.getElementById("audio").play() }


const loginFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (username && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    })

    if (response.ok) {
      console.log(response)
      document.location.replace('/home');
    } else {
      // response.message represents the issue upon failed log-in attempt
      alert(response.message);
      console.log(response)
    }
  }
};

document
  .querySelector('.sign-in-form')
  .addEventListener('submit', loginFormHandler);


const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const errorElement = document.getElementById('error');
  const symbols = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/
  const letters = /[a-zA-Z]/;
  const upperCase = /[A-Z]/;


  if (password.length < 6) {
    errorElement.textContent = 'Password must be longer than 6 characters'
  } else if (password.length > 20) {
    errorElement.textContent = 'Password must be less than 20 characters'

  } else if (!symbols.test(password)) {
    errorElement.textContent = 'Password must contain at least one special characters'


  } else if (!letters.test(password)) {
    errorElement.textContent = 'Password must contain at least one letter'

  } else if (!upperCase.test(password)) {
    errorElement.textContent = 'Password must contain at least one upper-case letter'


  } else if (username && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/home');
    } else {
      alert('Failed to sign up.');
    }
  }
};

document
  .querySelector('.sign-up-form')
  .addEventListener('submit', signupFormHandler);








