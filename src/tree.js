import sanitizeArray from "./sanitize-array.js";

/**
 * Represents a node in the Binary Search Tree
 */
class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

/**
 * Represents a Binary Search Tree
 */
class Tree {
  constructor(array = []) {
    this.root = this.#buildTree(array);
  }

  /**
   * Prints the tree to the console
   * @param {Node} node The root node of the tree to print
   * @param {string} prefix A string to print in every line
   * @param {boolean} isLeft Should be true if the node is the root
   * of a left subtree, false otherwise
   */
  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null || node === undefined) {
      return;
    }

    this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }

  /**
   * Builds a Balanced Binary Search Tree from an array
   * @param {array} array The array to build the tree from
   * @returns The root node of the built tree
   */
  #buildTree(array) {
    //Make sure the array is sorted and without duplicates
    array = sanitizeArray(array);

    //Base Case
    if (array.length === 0) return null;
    if (array.length === 1) return new Node(array[0], null, null);

    //Recursive Case
    const mid = Math.floor(array.length / 2);
    let leftHalf;
    let rightHalf;
    let rootNodeValue;

    if (array.length % 2 === 0) {
      leftHalf = array.slice(0, mid - 1);
      rightHalf = array.slice(mid, array.length);
      rootNodeValue = array[mid - 1];
    } else {
      leftHalf = array.slice(0, mid);
      rightHalf = array.slice(mid + 1, array.length);
      rootNodeValue = array[mid];
    }

    const leftChild = this.#buildTree(leftHalf);
    const rightChild = this.#buildTree(rightHalf);

    return new Node(rootNodeValue, leftChild, rightChild);
  }
}

export default Tree;
