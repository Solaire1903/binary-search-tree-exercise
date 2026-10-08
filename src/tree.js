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
   * Checks, if a given value is in the tree
   * @param {Number} value The value to look for
   * @param {Node} currentNode The current node that is visited
   * @returns True, if the value is in the tree, false otherwise
   */
  includes(value, currentNode = this.root) {
    if (currentNode === null) return false;
    if (currentNode.data === value) return true;

    const nextNode =
      value < currentNode.data ? currentNode.left : currentNode.right;

    return this.includes(value, nextNode);
  }

  /**
   * Inserts a given value into the tree
   * @param {Number} value The value to insert
   * @param {Node} currentNode The current node that is visited
   */
  insert(value, currentNode = this.root) {
    //Check for empty tree
    if (this.root === null) {
      this.root = new Node(value);
      return;
    }

    //Do nothing if value already exists in the tree
    if (currentNode.data === value) return;

    if (value < currentNode.data && currentNode.left === null) {
      currentNode.left = new Node(value);
      return;
    }
    if (value > currentNode.data && currentNode.right === null) {
      currentNode.right = new Node(value);
      return;
    }

    if (value < currentNode.data) this.insert(value, currentNode.left);
    else this.insert(value, currentNode.right);
  }

  /**
   * Deletes a given value from the tree
   * @param {Number} value The value to delete
   * @param {Node} currentNode The current node that is visited
   * @param {Node} prevNode The node that was visited in the previous call
   * @param {Boolean} isLeft True, if the node is a left child, false otherwise
   */
  deleteItem(value, currentNode = this.root, prevNode = null, isLeft = false) {
    const isRoot = currentNode === this.root;

    if (value === currentNode.data) {
      //Found node has 0 or 1 child
      if (currentNode.left === null || currentNode.right === null) {
        let nextNode = currentNode.left;
        if (currentNode.left === null) nextNode = currentNode.right;

        if (isRoot) {
          this.root = nextNode;
          return;
        }
        isLeft ? (prevNode.left = nextNode) : (prevNode.right = nextNode);
        return;
      }

      //Found node has 2 children
      else {
        //Successor is the smallest value in the right subtree
        const successorValue = this.#findSmallestValue(currentNode.right);
        currentNode.data = successorValue;
        this.deleteItem(successorValue, currentNode.right, currentNode, false);
      }
    }

    if (value < currentNode.data) {
      if (currentNode.left === null) return;
      this.deleteItem(value, currentNode.left, currentNode, true);
    } else {
      if (currentNode.left === null) return;
      this.deleteItem(value, currentNode.right, currentNode, false);
    }
  }

  /**
   * Traverses the tree in level order and calls the callback
   * function on every value
   * @param {Function} callback The callback function
   */
  levelOrderForEach(callback) {
    if (!this.#isValidFunction(callback)) throw this.#generateCallbackError();
    if (this.#isEmpty()) return;

    const queue = [this.root];
    while (queue.length > 0) {
      const currentNode = queue.shift();
      if (currentNode.left !== null) queue.push(currentNode.left);
      if (currentNode.right !== null) queue.push(currentNode.right);

      currentNode.data = callback(currentNode.data);
    }
  }

  /**
   * Traverses the tree in order and calls the callback
   * function on every value
   * @param {Function} callback The callback function
   */
  inOrderForEach(callback, currentNode = this.root) {
    if (!this.#isValidFunction(callback)) throw this.#generateCallbackError();

    if (currentNode === null) return;

    this.inOrderForEach(callback, currentNode.left);
    currentNode.data = callback(currentNode.data);
    this.inOrderForEach(callback, currentNode.right);
  }

  /**
   * Traverses the tree pre order and calls the callback
   * function on every value
   * @param {Function} callback The callback function
   */
  preOrderForEach(callback, currentNode = this.root) {
    if (!this.#isValidFunction(callback)) throw this.#generateCallbackError();

    if (currentNode === null) return;

    currentNode.data = callback(currentNode.data);
    this.preOrderForEach(callback, currentNode.left);
    this.preOrderForEach(callback, currentNode.right);
  }

  /**
   * Traverses the tree post order and calls the callback
   * function on every value
   * @param {Function} callback The callback function
   */
  postOrderForEach(callback, currentNode = this.root) {
    if (!this.#isValidFunction(callback)) throw this.#generateCallbackError();

    if (currentNode === null) return;

    this.postOrderForEach(callback, currentNode.left);
    this.postOrderForEach(callback, currentNode.right);
    currentNode.data = callback(currentNode.data);
  }

  /**
   * Returns the height of the node with the given value
   * @param {Number} value The value of the node to search the height for
   * @param {Node} currentNode The current node that is visited
   * @param {Number} level The current depth from the value node
   * @returns The height of the node with the given value
   */
  height(value, currentNode = this.#getNode(value), level = 0) {
    if (currentNode === undefined) return undefined;

    if (currentNode.left === null && currentNode.right === null) return level;

    const leftHeight =
      currentNode.left !== null
        ? this.height(null, currentNode.left, level + 1)
        : level;
    const rightHeight =
      currentNode.right !== null
        ? this.height(null, currentNode.right, level + 1)
        : level;

    return leftHeight > rightHeight ? leftHeight : rightHeight;
  }

  /**
   * Returns the depth of the node with the given value
   * @param {Number} value The value of the node to search the depth for
   * @param {Node} currentNode The current node that is visited
   * @param {Number} level The current depth from the root node
   * @returns The depth of the node with the given value
   */
  depth(value, currentNode = this.root, level = 0) {
    if (currentNode === null) return undefined;

    if (value === currentNode.data) return level;

    const nextNode =
      value < currentNode.data ? currentNode.left : currentNode.right;
    return this.depth(value, nextNode, level + 1);
  }

  /**
   * Prints the tree to the console
   * @param {Node} node The root node of the tree to print
   * @param {String} prefix A string to print in every line
   * @param {Boolean} isLeft True, if the node is a left child, false otherwise
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
   * Builds a Balanced Binary Search Tree from an array of numbers
   * @param {Array<Number>} array The array to build the tree from
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

  /**
   * Finds the smallest value in the tree, starting from the given node
   * @param {Node} root The root of the tree to search through
   * @returns {Number} The smallest value in the tree
   */
  #findSmallestValue(root) {
    let currentNode = root;
    while (currentNode.left !== null) currentNode = currentNode.left;

    return currentNode.data;
  }

  /**
   * Checks if the tree is empty
   * @returns True if the tree is empty, false otherwise
   */
  #isEmpty() {
    return this.root === null;
  }

  /**
   * Checks if the passed parameter is a valid function
   * @param {Function} func The function to check
   * @returns True if the function is valid, false otherwise
   */
  #isValidFunction(func) {
    return typeof func === "function";
  }

  /**Returns a new error with a callback warning
   * @returns The callback error
   */
  #generateCallbackError() {
    return new Error("Must provide a valid callback function");
  }

  /**
   * Returns the node in the tree with the given value
   * @param {Number} value The value to search the node for
   * @param {Node} currentNode The current node that is visited
   * @returns The node with the given value, undefined if
   * it is not in the tree
   */
  #getNode(value, currentNode = this.root) {
    if (currentNode === null) return undefined;
    if (currentNode.data === value) return currentNode;

    const nextNode =
      value < currentNode.data ? currentNode.left : currentNode.right;
    return this.#getNode(value, nextNode);
  }
}

export default Tree;
