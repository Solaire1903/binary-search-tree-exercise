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

describe("Function test: insert", () => {
  const tree = new Tree([1, 2, 3, 5, 6, 7, 9]);

  test("Insert value correctly", () => {
    tree.insert(4);
    tree.insert(8);

    expect(tree.root.left.right.right.data).toBe(4);
    expect(tree.root.right.right.left.data).toBe(8);
  });

  test("Don't insert duplicate value", () => {
    tree.insert(5);

    expect(tree.root.right.left.left).toBeNull();
  });

  test("Insert into empty tree", () => {
    const newTree = new Tree();
    newTree.insert(10);
    expect(newTree.root.data).toBe(10);
  });
});

describe("Function test: deleteItem", () => {
  const tree = new Tree([2, 3, 4, 5, 6, 7, 8]);

  test("Delete child node with no children", () => {
    tree.deleteItem(2);
    expect(tree.root.left.left).toBeNull();
  });

  test("Delete child node with one child", () => {
    tree.deleteItem(3);
    expect(tree.root.left.data).toBe(4);
  });

  test("Delete child node with two children", () => {
    tree.deleteItem(7);
    expect(tree.root.right.data).toBe(8);
    expect(tree.root.right.left.data).toBe(6);
    expect(tree.root.right.right).toBeNull();
  });

  test("Delete root node with two children", () => {
    tree.deleteItem(5);
    expect(tree.root.data).toBe(6);
    expect(tree.root.right.left).toBeNull();

    tree.deleteItem(6);
    expect(tree.root.data).toBe(8);
    expect(tree.root.right).toBeNull();
  });

  test("Delete root node with one child", () => {
    tree.deleteItem(8);
    expect(tree.root.data).toBe(4);
    expect(tree.root.right).toBeNull();
    expect(tree.root.left).toBeNull();
  });

  test("Delete root node with no child", () => {
    tree.deleteItem(4);
    expect(tree.root).toBeNull();
  });
});

describe("Function test: orderForEach", () => {
  test("Level order function", () => {
    const tree = new Tree([2, 3, 4, 5, 6, 7, 8]);
    const mockCallback = jest.fn((x) => x * 2);
    tree.levelOrderForEach(mockCallback);

    //Make sure the tree was really traversed in level order
    expect(mockCallback.mock.calls[0]).toEqual([5]);
    expect(mockCallback.mock.calls[1]).toEqual([3]);
    expect(mockCallback.mock.calls[2]).toEqual([7]);
    expect(mockCallback.mock.calls[3]).toEqual([2]);
    expect(mockCallback.mock.calls[4]).toEqual([4]);
    expect(mockCallback.mock.calls[5]).toEqual([6]);
    expect(mockCallback.mock.calls[6]).toEqual([8]);

    expect(mockCallback.mock.results[0].value).toBe(10);
    expect(mockCallback.mock.results[1].value).toBe(6);
    expect(mockCallback.mock.results[2].value).toBe(14);
    expect(mockCallback.mock.results[3].value).toBe(4);
    expect(mockCallback.mock.results[4].value).toBe(8);
    expect(mockCallback.mock.results[5].value).toBe(12);
    expect(mockCallback.mock.results[6].value).toBe(16);
  });

  test("In order function", () => {
    const tree = new Tree([2, 3, 4, 5, 6, 7, 8]);
    const mockCallback = jest.fn((x) =>  x * 2);
    tree.inOrderForEach(mockCallback);

    //Make sure the tree was really traversed in order
    expect(mockCallback.mock.calls[0]).toEqual([2]);
    expect(mockCallback.mock.calls[1]).toEqual([3]);
    expect(mockCallback.mock.calls[2]).toEqual([4]);
    expect(mockCallback.mock.calls[3]).toEqual([5]);
    expect(mockCallback.mock.calls[4]).toEqual([6]);
    expect(mockCallback.mock.calls[5]).toEqual([7]);
    expect(mockCallback.mock.calls[6]).toEqual([8]);

    expect(mockCallback.mock.results[0].value).toBe(4);
    expect(mockCallback.mock.results[1].value).toBe(6);
    expect(mockCallback.mock.results[2].value).toBe(8);
    expect(mockCallback.mock.results[3].value).toBe(10);
    expect(mockCallback.mock.results[4].value).toBe(12);
    expect(mockCallback.mock.results[5].value).toBe(14);
    expect(mockCallback.mock.results[6].value).toBe(16);
  });

  test("Pre order function", () => {
    const tree = new Tree([2, 3, 4, 5, 6, 7, 8]);
    const mockCallback = jest.fn((x) => x * 2);
    tree.preOrderForEach(mockCallback);

    //Make sure the tree was really traversed pre order
    expect(mockCallback.mock.calls[0]).toEqual([5]);
    expect(mockCallback.mock.calls[1]).toEqual([3]);
    expect(mockCallback.mock.calls[2]).toEqual([2]);
    expect(mockCallback.mock.calls[3]).toEqual([4]);
    expect(mockCallback.mock.calls[4]).toEqual([7]);
    expect(mockCallback.mock.calls[5]).toEqual([6]);
    expect(mockCallback.mock.calls[6]).toEqual([8]);

    expect(mockCallback.mock.results[0].value).toBe(10);
    expect(mockCallback.mock.results[1].value).toBe(6);
    expect(mockCallback.mock.results[2].value).toBe(4);
    expect(mockCallback.mock.results[3].value).toBe(8);
    expect(mockCallback.mock.results[4].value).toBe(14);
    expect(mockCallback.mock.results[5].value).toBe(12);
    expect(mockCallback.mock.results[6].value).toBe(16);
  });

  test("Post order function", () => {
    const tree = new Tree([2, 3, 4, 5, 6, 7, 8]);
    const mockCallback = jest.fn((x) => x * 2);
    tree.postOrderForEach(mockCallback);

    //Make sure the tree was really traversed post order
    expect(mockCallback.mock.calls[0]).toEqual([2]);
    expect(mockCallback.mock.calls[1]).toEqual([4]);
    expect(mockCallback.mock.calls[2]).toEqual([3]);
    expect(mockCallback.mock.calls[3]).toEqual([6]);
    expect(mockCallback.mock.calls[4]).toEqual([8]);
    expect(mockCallback.mock.calls[5]).toEqual([7]);
    expect(mockCallback.mock.calls[6]).toEqual([5]);

    expect(mockCallback.mock.results[0].value).toBe(4);
    expect(mockCallback.mock.results[1].value).toBe(8);
    expect(mockCallback.mock.results[2].value).toBe(6);
    expect(mockCallback.mock.results[3].value).toBe(12);
    expect(mockCallback.mock.results[4].value).toBe(16);
    expect(mockCallback.mock.results[5].value).toBe(14);
    expect(mockCallback.mock.results[6].value).toBe(10);
  });

  test("Throw Error if no valid callback is passed", () => {
    const tree = new Tree([2, 3, 4, 5, 6, 7, 8]);
    const errorMessage = "Must provide a valid callback function";

    expect(() => tree.levelOrderForEach()).toThrow(errorMessage);
    expect(() => tree.inOrderForEach()).toThrow(errorMessage);
    expect(() => tree.preOrderForEach()).toThrow(errorMessage);
    expect(() => tree.postOrderForEach()).toThrow(errorMessage);
  });
});

describe("Function test: height", () => {
  const tree = new Tree([2, 3, 4, 5, 6, 7, 8]);

  test("Get correct height", () => {
    expect(tree.height(5)).toBe(2);
    expect(tree.height(3)).toBe(1);
    expect(tree.height(6)).toBe(0);

    tree.insert(9);
    expect(tree.height(5)).toBe(3);
  });

  test("Value is not in the tree", () => {
    expect(tree.height(10)).toBeUndefined();
  });
});

describe("Function test: depth", () => {
  const tree = new Tree([2, 3, 4, 5, 6, 7, 8]);

  test("Get correct depth", () => {
    expect(tree.depth(5)).toBe(0);
    expect(tree.depth(3)).toBe(1);
    expect(tree.depth(6)).toBe(2);

    tree.insert(9);
    expect(tree.depth(9)).toBe(3);
  });

  test("Value is not in the tree", () => {
    expect(tree.depth(10)).toBeUndefined();
  });
});

describe("Function test: isBalanced", () => {
  test("Empty Tree (counts as balanced)", () => {
    const emptyTree = new Tree();
    expect(emptyTree.isBalanced()).toBeTruthy();
  });

  const tree = new Tree([2, 3, 4, 5, 6, 7, 8]);

  test.skip("Balanced Tree", () => {
    expect(tree.isBalanced()).toBeTruthy();
  });

  test("Unbalanced Tree", () => {
    tree.insert(9);
    tree.insert(10);

    expect(tree.isBalanced()).toBeFalsy();
  });
});
