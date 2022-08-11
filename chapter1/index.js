// Soluções declarativas vs imperativas

// Problema: transformar uma array de strings em lowercase para upppercase

// Solução imperativa
// Necessita variáveis
const toUpperCase = (input) => {
  const output = [];
  for (let i = 0; i < input.length; i++) {
    output.push(input[i].toUpperCase());
  }
  return output;
};

toUpperCase(["foo", "bar"]); // ['FOO', 'BAR']

// Solução declarativa
// Muito menos código e melhor readability
// Não foi preciso criar variáveis
const toUpperCase2 = (input) => input.map((value) => value.toUpperCase());

// Imperativo = detalha instruções
// Declarativo = diz o que quer apenas