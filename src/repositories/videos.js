import config from '../config'

const URL_CATEGORIES = `${config.URL_BACKEND_TOP}/videos`

function create(objDoVideo) {
  console.log(config.URL_BACKEND_TOP)

  //trazendo dados do nosso bd.js
  return fetch(`${URL_CATEGORIES}?_embed=videos`,{
    method:'POST',
    headers:{
      'Content-type':'application/json'
    },
    body:JSON.stringify(objDoVideo) //na internet só circula texto
  })
    .then(async (respostaDoServidor) => {

      if (respostaDoServidor.ok) {
        const resposta = await respostaDoServidor.json()
        return resposta
      }

      throw new Error('Não foi possível cadastrar os dados:(')

    })
}

export default {
  create,
}

