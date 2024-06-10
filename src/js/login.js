const randomImage = ['https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png', 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/c7906d33850498.56ba69ac353e1.png', 'https://external-preview.redd.it/yble0xDFerMYRYRz9uUgrVhnBrzVULNvCX38QH1za_U.jpg?auto=webp&s=1fc278147524128e733102857f9834a857047ab3', 'https://pm1.aminoapps.com/6936/941ca032795b0d863289ffe9fea681b4c6a7fc7ar1-640-640v2_00.jpg']

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
      const form = document.querySelector('form')
      form.reset()
    }
  })
  console.log(data);
}

const form = document.querySelector('form')
form.addEventListener('submit', (ev) => {
  ev.preventDefault()
  const email = document.getElementById('email-or-number')
  const password = document.getElementById('password')

    if (email.value !== '' || password.value !== '') {
    getData(email.value, password.value)
  } else {
    const notFound = document.querySelector('.user-not-found')
    notFound.classList.remove('display')
  }
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
  
  const profiles = [{ imageUrl: randomImage[Math.floor(Math.random() * randomImage.length)],  profileName: 'new user'}]

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

function modalNewUser() {
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
    
    button.addEventListener('click', (ev) => {
      ev.preventDefault()

      if (inputEmail.value !== '' && inputPassword.value !== '' && inputPhone.value !== '') {
        newUser(inputEmail.value, inputPassword.value, inputPhone.value)
      } else {
        const notFound = document.querySelector('not-found')
        notFound.classList.remove('display')
      }
    })
  })
}

modalNewUser()
