const axios = require('axios');
const fs = require('fs');
const answerController = require('./controller/answerController');
const sha1 = require('js-sha1');

const getBreeds = async () => {
  try {
    return await axios.get('https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=88dc014aff9c81caa0aa8aa5fba846b897bca63f')
  } catch (error) {
    console.error(error)
  }
}

const countBreeds = async () => {
  const breeds = await getBreeds()

  if (breeds.data) {
    var resposta = JSON.stringify(breeds.data);

    fs.writeFileSync('./answer_repository/answer.json', resposta);

    var obj = await answerController.index();
    obj.resumo_criptografico = sha1(obj.decifrado)
    console.log(obj);
  };
}

countBreeds();