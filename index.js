const axios = require('axios');
const fs = require('fs');
const sha1 = require('js-sha1');
const FormData = require('form-data');

const request = async () => {
  try {
    return await axios.get('https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=88dc014aff9c81caa0aa8aa5fba846b897bca63f')
  } catch (error) {
    console.error(error)
  }
}

const decrypt = async (cifrado, deslocamento) => {
  var string = '';

  for (var i = 0; i < cifrado.length; i++) {
    if (cifrado.charCodeAt(i) >= 97 && cifrado.charCodeAt(i) <= 122) {
      var codigo = cifrado.charCodeAt(i) - deslocamento;
      if (codigo >= 97 && codigo <= 122) {
        string += String.fromCharCode(codigo);
      } else {
        string += String.fromCharCode(((codigo + 122) - 97) + 1)
      }
    } else {
      string += cifrado[i];
    }
  }
  return string;
}

const dispatch = async () => {
  const bodyFormData = new FormData();

  try {
    bodyFormData.append('answer', './answer_repository/answer.json');
  } catch (response) {
    console.log(response)
  }

  axios.post('https://api.codenation.dev/v1/challenge/dev-ps/submit-solution?token=88dc014aff9c81caa0aa8aa5fba846b897bca63f', bodyFormData, {
    headers: form.getHeaders(),
  }).then(result => {
    // Handle result…
    console.log(result.data);
  });

}

const index = async () => {

  const response = await request();

  if (response.data) {

    response.data.decifrado = await decrypt(response.data.cifrado, response.data.numero_casas);
    response.data.resumo_criptografico = sha1(response.data.decifrado);
    fs.writeFileSync('./answer_repository/answer.json', JSON.stringify(response.data));

    await dispatch();
  };
}

index();