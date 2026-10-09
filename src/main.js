import Tree from "./tree.js";

/**
 * Generates an array of size 15 filled with random numbers
 * @param max The upper bound of any random number in the array
 * (not inclusive)
 * @returns The array with random numbers
 */
const generateRandomArray = (max = 100000) => {
  const randomArray = [];
  for (let i = 0; i < 15; i++) {
    randomArray.push(Math.floor(Math.random() * max));
  }

  return randomArray;
};

/**
 * Adds a value to the valueArray array
 * @param {Number} value The value to add
 */
const addToArray = (value) => {
  valueArray.push(value);
};

/**
 * Prints the different orders of the tree values
 */
const printOrders = () => {
  valueArray = [];
  tree.levelOrderForEach(addToArray);
  const levelOrderString = valueArray.toString();
  console.log(`Level order: [${levelOrderString}]`);

  valueArray = [];
  tree.preOrderForEach(addToArray);
  const preOrderString = valueArray.toString();
  console.log(`Pre order: [${preOrderString}]`);

  valueArray = [];
  tree.inOrderForEach(addToArray);
  const inOrderString = valueArray.toString();
  console.log(`In order: [${inOrderString}]`);

  valueArray = [];
  tree.postOrderForEach(addToArray);
  const postOrderString = valueArray.toString();
  console.log(`Post order: [${postOrderString}]`);
};

//Driver script
const randomArray = generateRandomArray(100);
const tree = new Tree(randomArray);
let valueArray = [];

tree.prettyPrint();
console.log(`\nTree is balanced: ${tree.isBalanced()}\n`);

printOrders();

console.log("\nAdding several values over 100 to the tree...\n");
tree.insert(110);
tree.insert(120);
tree.insert(130);
tree.insert(140);
tree.insert(150);

tree.prettyPrint();
console.log(`\nTree is balanced: ${tree.isBalanced()}\n`);

console.log("Rebalancing Tree...\n");
tree.rebalance();

tree.prettyPrint();
console.log(`\nTree is balanced: ${tree.isBalanced()}\n`);

printOrders();
