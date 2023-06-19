module.exports = {
  bail: true, //bail, se o algum teste falhar os outros não são executados
  coverageProvider: "v8",

  testMatch: [  //Padrão de arquivos de teste. o ** Significa que pode estar em qualquer pasta /* pode ser qualquer nome, mas a extensão é .spec.js
    "<rootDir>/src/**/*.spec.js" //partindo da raiz, o jest irá observar somente apartir da src. Ignorando os node_modules.
  ],

}