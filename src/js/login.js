const randomImage = [
  'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png',
  'https://mir-s3-cdn-cf.behance.net/project_modules/disp/c7906d33850498.56ba69ac353e1.png',
  'https://external-preview.redd.it/yble0xDFerMYRYRz9uUgrVhnBrzVULNvCX38QH1za_U.jpg?auto=webp&s=1fc278147524128e733102857f9834a857047ab3',
  'https://pm1.aminoapps.com/6936/941ca032795b0d863289ffe9fea681b4c6a7fc7ar1-640-640v2_00.jpg'
];

const seeMoreBtn = document.getElementById('see-more');
seeMoreBtn.addEventListener('click', () => {
  const infos = document.querySelector('.see-more-infos');
  infos.classList.remove('display');
});

async function getData(emailValue, passwordValue) {
  const data = await fetch('http://localhost:3000/users').then((res) => res.json());
  let userFound = false;

  data.forEach((res) => {
    const respEmail = res.email;
    const respPassword = res.password;

    if (emailValue === respEmail && passwordValue === respPassword) {
      localStorage.setItem('id', res.id);
      window.location.href = './pages/browse.html';
      userFound = true;
    }
  });

  if (!userFound) {
    const helpContainer = document.querySelector('.user-not-found');
    helpContainer.classList.add('display');
  }
}

function handleSubmit(event) {
  event.preventDefault();
  const email = document.getElementById('email-or-number').value;
  const password = document.getElementById('password').value;

  if (email !== '' && password !== '') {
    getData(email, password);
  } else {
    const notFound = document.querySelector('.user-not-found');
    notFound.classList.remove('display');
  }
}

const form = document.querySelector('form');
form.addEventListener('submit', handleSubmit);

function validateForm() {
  const emailInput = document.getElementById('email-or-number');
  const passwordInput = document.getElementById('password');
  const inputPhone = document.getElementById('phone');

  emailInput.addEventListener('input', (event) => {
    const input = event.target;
    const p = document.querySelector('.email-error');
    if (!input.value.match(/\w{2,}@[a-zA-Z]{2,}\.[a-zA-Z]{2,}/)) {
      p.classList.remove('display');
      p.innerHTML = '<i class="fa-regular fa-circle-xmark"></i> Informe um Email ou número de telefone válido';
      emailInput.classList.add('error-input');
    } else {
      p.classList.add('display');
      emailInput.classList.remove('error-input');
    }
  });

  passwordInput.addEventListener('input', (event) => {
    const input = event.target;
    const p = document.querySelector('.pass-error');
    if (input.value.length < 8) {
      p.classList.remove('display');
      p.innerHTML = '<i class="fa-regular fa-circle-xmark"></i> A senha deve ter entre 4 e 60 caracteres.';
      passwordInput.classList.add('error-input');
    } else {
      p.classList.add('display');
      passwordInput.classList.remove('error-input');
    }
  });

  inputPhone.addEventListener('input', (event) => {
    const input = event.target;
    const p = document.querySelector('.phone-error');
    if (!input.value.match(/[0-9]/) || input.value.length < 10) {
      p.classList.remove('display');
      p.innerHTML = '<i class="fa-regular fa-circle-xmark"></i> O número deve conter 10 ou mais dígitos.';
      inputPhone.classList.add('error-input');
    } else {
      p.classList.add('display');
      inputPhone.classList.remove('error-input');
    }
  });
}

validateForm();

function reverterModal(email, password) {
  const inputEmail = document.getElementById('email-or-number');
  const inputPassword = document.getElementById('password');
  const phoneDiv = document.querySelector('.phone-group');

  phoneDiv.classList.add('display');

  const h1 = document.querySelector('h1');
  h1.textContent = 'Entrar';

  const button = document.getElementById('submitBtn');
  button.textContent = 'Entrar';

  inputEmail.value = email;
  inputPassword.value = password;

  form.removeEventListener('submit', handleNewUserSubmit);
  form.addEventListener('submit', handleSubmit);
}

async function newUser(emailValue, passwordValue, phoneValue) {
  const email = emailValue;
  const password = passwordValue;
  const phoneNumber = phoneValue;

  const profiles = [{ 
    favMovie: [],
    imageUrl: randomImage[Math.floor(Math.random() * randomImage.length)], 
    profileName: 'new user'
  }];

  const data = await fetch('http://localhost:3000/users', {
    method: 'POST',
    body: JSON.stringify({ email, password, phoneNumber, profiles }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const response = await data.json();
  console.log(response);

  reverterModal(email, password);
}

function handleNewUserSubmit(event) {
  event.preventDefault();
  const inputEmail = document.getElementById('email-or-number').value;
  const inputPassword = document.getElementById('password').value;
  const inputPhone = document.getElementById('phone').value;

  if (inputEmail !== '' && inputPassword !== '' && inputPhone !== '') {
    newUser(inputEmail, inputPassword, inputPhone);
    form.reset();
  }
}

function modalNewUser() {
  document.getElementById('newUser').addEventListener('click', () => {
    const phoneDiv = document.querySelector('.phone-group');
    const helpContainer = document.querySelector('.user-not-found');

    phoneDiv.classList.remove('display');
    helpContainer.classList.add('display');

    const newHere = document.querySelector('.new-here');
    const lastDiv = document.querySelector('.last-div');
    newHere.classList.add('display');
    lastDiv.classList.add('display');

    const rememberPass = document.getElementById('remember-pass');
    rememberPass.classList.add('display');

    const h1 = document.querySelector('h1');
    h1.textContent = 'Login';

    const button = document.getElementById('submitBtn');
    button.textContent = 'Criar conta';

    form.removeEventListener('submit', handleSubmit);
    form.addEventListener('submit', handleNewUserSubmit);
  });
}

modalNewUser();
