const seeMoreBtn = document.getElementById('see-more')
seeMoreBtn.addEventListener('click', () => {
  const infos = document.querySelector('.see-more-infos')
  infos.classList.remove('display')
})

async function getData(emailValue, passwordValue) {
  const data = await fetch('http://localhost:3000/users').then((res) => res.json())
  data.forEach((res) => {
    const respEmail = res.email
    const respPassword = res.password

    if (emailValue !== respEmail || passwordValue !== respPassword) {
      const h1 = document.querySelector('h1')
      if (h1.textContent === 'Login') {
        const helpContainer = document.querySelector('.user-not-found')
        helpContainer.classList.add('display') 
      } else {
        const notFound = document.querySelector('.user-not-found')
        notFound.classList.remove('display')
      }
    } else {
      localStorage.setItem('id', res.id)
      window.location.href = './pages/browse.html'
    }
  })
  console.log(data);
}

const form = document.querySelector('form')
form.addEventListener('submit', (ev) => {
  ev.preventDefault()
  const email = document.getElementById('email-or-number')
  const password = document.getElementById('password')

  getData(email.value, password.value)
  form.reset()
})

function validateForm() {
  const emailInput = document.getElementById('email-or-number')
  const passwordlInput = document.getElementById('password')
  const inputPhone = document.getElementById('phone')
  let isValided = false

  emailInput.addEventListener('input', (event) => {
    const input = event.target
    if (!input.value.match(/\w{2,}@[a-zA-Z]{2,}\.[a-zA-Z]{2,}/)) {
      const p = document.querySelector('.email-error')
      p.classList.remove('display')
      p.innerHTML = '<i class="fa-regular fa-circle-xmark"></i>' + 'Informe um Email ou número de telefone válido'
      emailInput.classList.add('error-input')
      isValided = false
    } else {
      const p = document.querySelector('.email-error')
      p.classList.add('display')
      emailInput.classList.remove('error-input')
      isValided = true
    }
  })

  passwordlInput.addEventListener('input', (event) => {
    const input = event.target
    if (input.value.length < 8) {
      const p = document.querySelector('.pass-error')
      p.classList.remove('display')
      p.innerHTML = '<i class="fa-regular fa-circle-xmark"></i>' + 'A senha deve ter entre 4 e 60 caracteres.'
      passwordlInput.classList.add('error-input')
      isValided = false
    } else {
      const p = document.querySelector('.pass-error')
      p.classList.add('display')
      passwordlInput.classList.remove('error-input')
      isValided = true
    }
  })

  inputPhone.addEventListener('input', (event) => {
    const input = event.target
    if (!input.value.match(/[0-9]/) || input.value.length < 10) {
      const p = document.querySelector('.phone-error')
      p.classList.remove('display')
      p.innerHTML = '<i class="fa-regular fa-circle-xmark"></i>' + 'O número deve conter 10 ou mais dígitos.'
      inputPhone.classList.add('error-input')
      isValided = false
    } else {
      const p = document.querySelector('.phone-error')
      p.classList.add('display')
      passwordlInput.classList.remove('error-input')
      isValided = true
    }
  })
}

validateForm()

async function newUser(emailValue, passwordValue, phoneValue) {
  const email = emailValue
  const password = passwordValue
  const phoneNumber = phoneValue
  
  const profiles = [{ imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png',  profileName: 'new user'}]

  const data = await fetch('http://localhost:3000/users', {
    method: 'POST',
    body: JSON.stringify({ email, password, phoneNumber, profiles}),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const response = await data.json()
  console.log(response);
}

document.getElementById('newUser').addEventListener('click', () => {
  const inputPhone = document.getElementById('phone')
  const inputEmail = document.getElementById('email-or-number')
  const inputPassword = document.getElementById('password')

  const phoneDiv = document.querySelector('.phone-group')
  const helpContainer = document.querySelector('.user-not-found')

  phoneDiv.classList.remove('display')
  helpContainer.classList.add('display')

  const newHere = document.querySelector('.new-here')
  const lastDiv = document.querySelector('.last-div')
  newHere.classList.add('display')
  lastDiv.classList.add('display')

  const rememberPass = document.getElementById('remember-pass')
  rememberPass.classList.add('display')

  const h1 = document.querySelector('h1')
  h1.textContent = 'Login'

  const button = document.getElementById('submitBtn')
  button.textContent = 'Criar conta'
  button.addEventListener('submit', newUser(inputEmail.value, inputPassword.value, inputPhone.value))
})