class Tree {
  constructor() {
    this.root = null;
  }

  newNode(data = null) {
    return {
      data,
      left: null,
      right: null,
    };
  }

  add(data) {
    const newNode = this.newNode();
    if (!this.root) {
      this.root = newNode;
    }
    let beforeNode = null;
    let currentNode = root;
    while (currentNode !== null && data !== beforeNode.data) {
      beforeNode = currentNode;
      currentNode = data < beforeNode.data ? beforeNode.left : beforeNode.right;
    }
    if (dato < beforeNode.data) beforeNode.left = newNode;
    else beforeNode.right = newNode;
    return this;
  }
}

console.log('');
