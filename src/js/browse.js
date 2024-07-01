const randomImage = ['https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png', 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/c7906d33850498.56ba69ac353e1.png', 'https://external-preview.redd.it/yble0xDFerMYRYRz9uUgrVhnBrzVULNvCX38QH1za_U.jpg?auto=webp&s=1fc278147524128e733102857f9834a857047ab3', 'https://pm1.aminoapps.com/6936/941ca032795b0d863289ffe9fea681b4c6a7fc7ar1-640-640v2_00.jpg']

async function renderData(id) {
  const response = await fetch(`http://localhost:3000/users/${id}`);
  const data = await response.json();
  const perfis = data.profiles;

  const containerPerfis = document.querySelector('.profiles');

  const moreProfile = document.getElementById('btn-more');
  containerPerfis.innerHTML = ''; // Limpa todos os perfis
  containerPerfis.append(moreProfile); 

  for (let i = 0; i < perfis.length; i++) {
    const cards = document.createElement('div');
    cards.classList = 'cards';
    const imageCard = document.createElement('div');
    imageCard.classList.add('image');
    const img = document.createElement('img');
    img.src = perfis[i].imageUrl;
    img.classList.add('profile-image');
    const p = document.createElement('p');
    p.textContent = perfis[i].profileName;
    imageCard.append(img);
    cards.append(imageCard, p);

    containerPerfis.append(cards);
  }

  if (perfis.length === 5) {
    moreProfile.classList.add('display')
  } else {
    moreProfile.classList.remove('display')
  }
  console.log(data);
}

async function adicionarPerfil(id, novoPerfil) {
  const response = await fetch(`http://localhost:3000/users/${id}`);
  const data = await response.json();

  const perfis = data.profiles;
  perfis.push(novoPerfil);

  await fetch(`http://localhost:3000/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...data, profiles: perfis })
  });

  renderData(id);
  console.log(perfis);
}

const moreBtn = document.getElementById('btn-more');
moreBtn.addEventListener('click', () => {
  const window = document.querySelector('.fade');
  window.classList.remove('display');

  const backBtn = document.getElementById('back-button');
  backBtn.addEventListener('click', () => {
    window.classList.add('display');
  });

  const finishBtn = document.getElementById('finish-button');
  const form = document.querySelector('form');

  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
  });

  finishBtn.addEventListener('click', async () => {
    const input = document.getElementById('profile-name');

    const newProfile = {
      imageUrl: randomImage[Math.floor(Math.random() * randomImage.length)],
      profileName: input.value,
      favMovie: []
    };

    const id = localStorage.getItem('id');
    adicionarPerfil(id, newProfile);

    const fade = document.querySelector('.fade')
    fade.classList.add('display')
  });
});

const id = localStorage.getItem('id');
renderData(id);
