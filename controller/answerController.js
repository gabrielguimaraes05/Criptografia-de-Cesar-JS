const fs = require('fs');

module.exports = {
  
  index() {
    var data = fs.readFileSync ("./answer_repository/answer.json", "utf8"); 
    var obj = JSON.parse(data);

    var textoDescriptogradado = descriptografar(obj.cifrado, obj.numero_casas);

    obj.decifrado = textoDescriptogradado;

   return obj;
  }
}

function descriptografar (cifrado, deslocamento) {
  var string = '';

  for(var i = 0; i < cifrado.length; i++) {
    if(cifrado.charCodeAt(i) >= 97 && cifrado.charCodeAt(i) <=122) {
      var codigo = cifrado.charCodeAt(i) - deslocamento;
      if(codigo >= 97 && codigo <= 122){
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