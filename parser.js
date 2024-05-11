export const nodes = {
  numLiteral: (value) => ({
    type: "NumberLiteral",
    value: value,
  }),
  stringLiteral: (value) => ({
    type: "StringLiteral",
    value: value,
  }),
  node: (value) => ({ type: "CallExpression", name: value, params: [] }),
};

export const parser = (tokens) => {
  let current = 0;
  // { type: "paren", value: value }
  // ({ type: "paren", value: value }),
  // number: (value) => ({ type: "number", value: value }),
  // string: (value) => ({ type: "str", value: value }),
  // name: (value) => ({ type: "name", value: value }),
  function walk() {
    let token = tokens[current];

    if (token.type === "number") {
      current++;
      return nodes.numLiteral(token.value);
    }
    if (token.type === "str") {
      current++;
      return nodes.stringLiteral(token.value);
    }
    if (token.type === "paren" && token.value === "(") {
      token = tokens[++current];
      if (token.type !== "name") {
        throw new TypeError(
          `expected function name but got: ${token.value} instead`,
        );
      }
      let node = nodes.node(token.value); // this is the token.type === name
      token = tokens[++current];

      while (token.type !== "paren" && token.value !== ")") {
        token = tokens[++current];
        node.params.push(walk());
        token = tokens[current];
      }
      current++;
      return node;
    }

    throw new TypeError(`Error at ${token.value} ${token.type}`);
  }

  let ast = {
    type: "Program",
    body: [],
  };

  while (current < tokens.length) {
    ast.body.push(walk());
  }
  return ast;
};

export default parser;
