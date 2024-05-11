export const codeGenerator = (node) => {
  switch (node.type) {
    case "Program":
      return node.body.map(codeGenerator).join("\n");

    case "ExpressionStatement":
      return codeGenerator(node.expression) + ";";

    case "CallExpression":
      return (
        codeGenerator(node.callee) +
        "(" +
        node.arguments.map(codeGenerator).join(", ") +
        ")"
      );

    case "Identifier":
      console.log("generator: identifier", node.name);
      return node.name;

    case "NumberLiteral":
      console.log("generator: num", node.value);
      return node.value;

    case "StringLiteral":
      console.log("generator: str", node.value);
      return '"' + node.value + '"';

    default:
      throw new TypeError(node.type);
  }
};

export default codeGenerator;
