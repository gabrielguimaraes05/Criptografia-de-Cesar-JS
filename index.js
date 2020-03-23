const axios = require('axios');
const fs = require('fs');
const sha1 = require('js-sha1');
const FormData = require('form-data');

require('dotenv/config');

const request = async () => {
  try {
    return await axios.get(`https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=${process.env.TOKEN}`)
  } catch (error) {
    console.error(error)
  }
}

const send = async () => {
  const form = new FormData();
  const file = fs.createReadStream('./answer_repository/answer.json');

  form.append("answer", file);

  return await axios.post(`https://api.codenation.dev/v1/challenge/dev-ps/submit-solution?token=${process.env.TOKEN}`,
    form,
    {
      headers: {
        ...form.getHeaders()
      }
    },
    err => console.error(err)
  );
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
const index = async () => {

  const responseRequest = await request();

  if (responseRequest.data) {

    responseRequest.data.decifrado = await decrypt(responseRequest.data.cifrado, responseRequest.data.numero_casas);
    responseRequest.data.resumo_criptografico = sha1(responseRequest.data.decifrado);
    fs.writeFileSync('./answer_repository/answer.json', JSON.stringify(responseRequest.data));

     const responseSend =  await send();
     console.log(JSON.stringify(responseSend.data));
  };
}

index();
