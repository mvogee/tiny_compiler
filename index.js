/**
 * We're gonna start off with our first phase of parsing, lexical analysis, with
 * the tokenizer.
 *
 * We're just going to take our string of code and break it down into an array
 * of tokens.
 *
 *   (add 2 (subtract 4 2))   =>   [{ type: 'paren', value: '(' }, ...]
 */

import tokenizer from "./tokenizer.js";
import parser from "./parser.js";

// We start by accepting an input string of code, and we're gonna set up two
// things...
// {type: 'paren', value: '('};

// input is a string
function compiler(input) {
  let tokens = tokenizer(input);
  console.log(tokens);
  let ast = parser(tokens);
  console.log(ast.body);
  ast.body.forEach((item) => console.log(item));
  // let newAst = transformer(ast);
  // let output = codeGenerator(newAst);

  // and simply return the output!
  return;
}

function main() {
  console.log("Starting");
  const input = "(add 2 (subtract 4 2))";
  console.log(input);
  const output = compiler(input);
  console.log(output);
}

main();
