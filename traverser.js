export const traverser = (ast, visitor) => {
  /**
   * traverses array visiting each child node.
   * @param {Array<ast>} array - array of nodes to be traversed.
   * @param {node | null} parent - parent node of the array
   */
  const traverseArray = (array, parent) => {
    array.forEach((child) => {
      traverseNode(child, parent);
    });
  };

  /**
   * traverses array visiting each child node.
   * @param {node} node - array of nodes to be traversed.
   * @param {node | null} parent - parent node of the array
   */
  const traverseNode = (node, parent) => {
    let methods = visitor[node.type];

    if (methods && methods.enter) {
      methods.enter(node, parent);
    }

    switch (node.type) {
      case "Program":
        traverseArray(node.body, node);
        break;

      case "CallExpression":
        traverseArray(node.params, node);
        break;

      case "NumberLiteral":
      case "StringLiteral":
        break;

      default:
        throw new TypeError(node.type);
    }
    if (methods && methods.exit) {
      methods.exit(node, parent);
    }
  };
  traverseNode(ast, null);
};

export default traverser;
