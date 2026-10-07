import Tree from "../tree.js";

describe("Tree correctly initialized", () => {
  test("Empty Tree", () => {
    const emptyTree = new Tree();
    expect(emptyTree.root).toBeNull();
  });

  test("Tree correctly built (even array length)", () => {
    const evenTree = new Tree([7, 4, 9, 0, 1, 3, 6, 2, 1, 7]);
    expect(evenTree.root.data).toBe(3);

    const leftChild = evenTree.root.left;
    expect(leftChild.data).toBe(1);
    expect(leftChild.left.data).toBe(0);
    expect(leftChild.left.left).toBeNull();
    expect(leftChild.left.right).toBeNull();
    expect(leftChild.right.data).toBe(2);
    expect(leftChild.right.left).toBeNull();
    expect(leftChild.right.right).toBeNull();

    const rightChild = evenTree.root.right;
    expect(rightChild.data).toBe(6);
    expect(rightChild.left.data).toBe(4);
    expect(leftChild.left.left).toBeNull();
    expect(leftChild.left.right).toBeNull();
    expect(rightChild.right.data).toBe(7);
    expect(leftChild.right.left).toBeNull();
    expect(rightChild.right.right.data).toBe(9);
    expect(rightChild.right.right.left).toBeNull();
    expect(rightChild.right.right.right).toBeNull();
  });

  test("Tree correctly built (odd array length)", () => {
    const oddTree = new Tree([4, 2, 7, 5, 1, 11, 9, 11, 5]);
    expect(oddTree.root.data).toBe(5);

    const leftChild = oddTree.root.left;
    expect(leftChild.data).toBe(2);
    expect(leftChild.left.data).toBe(1);
    expect(leftChild.left.left).toBeNull();
    expect(leftChild.left.right).toBeNull();
    expect(leftChild.right.data).toBe(4);
    expect(leftChild.right.left).toBeNull();
    expect(leftChild.right.right).toBeNull();

    const rightChild = oddTree.root.right;
    expect(rightChild.data).toBe(9);
    expect(rightChild.left.data).toBe(7);
    expect(rightChild.left.left).toBeNull();
    expect(rightChild.left.right).toBeNull();
    expect(rightChild.right.data).toBe(11);
    expect(rightChild.right.left).toBeNull();
    expect(rightChild.right.right).toBeNull();
  });
});

describe("Function test: includes", () => {
  const tree = new Tree([6, 3, 9, 7, 1, 0, 64, 3, 5, 85, 5, 23, 3, 5]);

  test("Value is in the tree", () => {
    expect(tree.includes(5)).toBeTruthy();
    expect(tree.includes(6)).toBeTruthy();
  });

  test("Value is not in the tree", () => {
    expect(tree.includes(100)).toBeFalsy();
    expect(tree.includes(-30)).toBeFalsy();
  });
});
