import Tree from "./tree.js";

const evenTree = new Tree([7, 4, 9, 0, 1, 3, 6, 2, 1, 7]);
console.log("Tree from an even array:\n");
evenTree.prettyPrint(evenTree.root);
console.log("\n");

const oddTree = new Tree([4, 2, 7, 5, 1, 11, 9, 11, 5]);
console.log("Tree from an odd array:\n");
oddTree.prettyPrint(oddTree.root);
