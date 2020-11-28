let etapas = [
  {
    titulo: 'VEREADOR',
    numeros: 5,
    candidatos: [
      {
        numero: '38111',
        nome: 'Tonhão da Mercearia',
        partido: 'ABC',
        fotos: [
          { url: '38111.jpg', legenda: 'Vereador' }
        ]
      },
      {
        numero: '77222',
        nome: 'Marina Silva',
        partido: 'Democatras',
        fotos: [
          { url: '77222.jpg', legenda: 'Vereador' }
        ]
      },
    ]
  },
  {
    titulo: 'PREFEITO',
    numeros: 2,
    candidatos: [
      {
        numero: '99',
        nome: 'Ciclano',
        partido: 'ABC',
        vice: 'Cic',
        fotos: [
          { url: '99.jpg', legenda: 'Prefeito' },
          { url: '99_2.jpg', legenda: 'Vice-Prefeito', small: true }
        ]
      },
      {
        numero: '84',
        nome: 'Zulano',
        partido: 'QWERTY',
        vice: 'Zul',
        fotos: [
          { url: '84.jpg', legenda: 'Prefeito' },
          { url: '84_2.jpg', legenda: 'Vice-Prefeito', small: true }
        ]
      },
    ]
  }
];

let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4')
let aviso = document.querySelector('.d-2');
let photos = document.querySelector('.d-1-right')
let numeros = document.querySelector('.d-1-3')

let etapaAtual = 0;
let numero = '';
let votoBranco = true;

function comecarEtapa() {
  let etapa = etapas[etapaAtual];
  numero = '';
  votoBranco = false;

  let numeroHtml = '';
  for (let i = 0; i < etapa.numeros; i++) {
    if (i === 0) {
      numeroHtml += '<div class="numero pisca"></div>'
    } else {
      numeroHtml += '<div class="numero"></div>';
    }
  }
  seuVotoPara.style.display = 'block';
  cargo.innerHTML = etapa.titulo;
  descricao.innerHTML = '';
  aviso.style.display = 'none';
  photos.innerHTML = '';
  numeros.innerHTML = numeroHtml;
}

function atualiarInterface() {
  let etapa = etapas[etapaAtual];
  let candidato = etapa.candidatos.filter((item) => {
    if (item.numero === numero) {
      return true;
    } else {
      return false;
    };
  })
  if (candidato.length > 0) {
    candidato = candidato[0];
    seuVotoPara.style.display = 'block'
    aviso.style.display = 'block'
    descricao.innerHTML = `Nome: ${candidato.nome} <br/> partida: ${candidato.partido}`;

    let photosHtml = '';
    for (let i in candidato.fotos) {
      if (candidato.fotos[i].small) {
        photosHtml += `<div class="d-1-image small"> <img src="../images/${candidato.fotos[1].url}" alt="..." /> ${candidato.fotos[i].legenda} </div>`
      } else {
        photosHtml += `<div class="d-1-image"> <img src="../images/${candidato.fotos[0].url}" alt="..." /> ${candidato.fotos[i].legenda} </div>`
      }

    }
    photos.innerHTML = photosHtml;
  } else {
    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block';
    descricao.innerHTML = '<div class="aviso--grande pisca"> VOTO NULO </div>'

  }
}

function clicou(n) {
  let elNumero = document.querySelector('.numero.pisca')
  if (elNumero) {
    elNumero.innerHTML = n;
    numero = `${numero}${n}`
    elNumero.classList.remove('pisca')
    if (elNumero.nextElementSibling !== null) {
      elNumero.nextElementSibling.classList.add('pisca')
    } else {
      atualiarInterface();
    }
  }
}

function branco() {
  numero = '';
  console.log(numero)
  if (numero === '') {
    votoBranco = true;
    numeros.innerHTML = '';
    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block';
    descricao.innerHTML = '<div class="aviso--grande pisca"> VOTO EM BRANCO </div>'
    photos.innerHTML = '';
  }
}
function corrige() {
  comecarEtapa()
}
function confirma() {
  let etapa = etapas[etapaAtual];
  let votoConfirmado = false;
  if (votoBranco === true) {
    console.log('confirmando como Branco ')
    votoConfirmado = true;
  } else if (numero.length === etapa.numeros) {
    votoConfirmado = true;
    console.log('confirmando como " ' + numero)
  }

  if (votoConfirmado) {
    etapaAtual++;
    if (etapas[etapaAtual] !== undefined) {
      comecarEtapa();
    } else {
      document.querySelector('.tela').innerHTML = '<div class="aviso--gigante pisca"> FIM </div>'
    }
  }
}

comecarEtapa()
