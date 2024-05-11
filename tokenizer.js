export const token = {
  paren: (value) => ({ type: "paren", value: value }),
  number: (value) => ({ type: "number", value: value }),
  string: (value) => ({ type: "str", value: value }),
  name: (value) => ({ type: "name", value: value }),
};

export const tokenizer = (input) => {
  // current index of character on input
  let current = 0;
  //parsed tokens
  const tokens = [];
  const WHITESPACE = /\s/;
  const NUMBERS = /[0-9]/;
  let LETTERS = /[a-z]/i;

  while (current < input.length) {
    let char = input[current];
    if (WHITESPACE.test(char)) {
      current++;
      continue;
    }

    if (char === "(" || char === ")") {
      tokens.push(token.paren(char));
      current++;
      continue;
    }
    if (NUMBERS.test(char)) {
      let value = "";
      while (NUMBERS.test(char)) {
        value += char;
        char = input[++current];
      }
      tokens.push(token.number(value));
      continue;
    }
    if (char === '"') {
      char = input[++current];
      let value = "";
      while (char !== '"') {
        value += char;
        char = input[++current];
      }
      char = input[++current];
      tokens.push(token.string(value));
      continue;
    }
    if (LETTERS.test(char)) {
      let value = "";
      while (LETTERS.test(char)) {
        value += char;
        char = input[++current];
      }
      tokens.push(token.name(value));
      continue;
    }
    throw new TypeError("I dont know what this character is: " + char);
  }
  return tokens;
};

export default tokenizer;
