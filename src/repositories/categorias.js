import config from '../config';

const URL_CATEGORIES = `${config.URL_BACKEND_TOP}/categorias`;

function getAll() {
  console.log(config.URL_BACKEND_TOP);

  // trazendo dados do nosso bd.js
  return fetch(`${URL_CATEGORIES}`)
    .then(async (respostaDoServidor) => {
      if (respostaDoServidor.ok) {
        const resposta = await respostaDoServidor.json();
        return resposta;
      }

      throw new Error('Não foi possível pegar os dados:(');
    });
}

function getAllWinthVideos() {
  console.log(config.URL_BACKEND_TOP);

  // trazendo dados do nosso bd.js
  return fetch(`${URL_CATEGORIES}?_embed=videos`)
    .then(async (respostaDoServidor) => {
      if (respostaDoServidor.ok) {
        const resposta = await respostaDoServidor.json();
        return resposta;
      }

      throw new Error('Não foi possível pegar os dados:(');
    });
}

export default {
  getAllWinthVideos,
  getAll,
};
