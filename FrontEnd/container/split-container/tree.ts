export interface INodeData {
  id: number;
  type: 'row' | 'column' | 'none';
  width: string;
  height: string;
}

export class TreeNode {
  constructor(data: INodeData, parent: TreeNode = null) {
    this.data = data;
    this.parent = parent;
  }

  data: INodeData;
  parent: TreeNode;
  firstChild: TreeNode;
  secondChild: TreeNode;

  insertAsFirstChild(data: INodeData) {
    const node = new TreeNode(data, this);
    return this.firstChild = node;
  }

  insertAsSecondChild(data: INodeData) {
    const node = new TreeNode(data, this);
    return this.secondChild = node;
  }

  getData() {
    return this.data;
  }

  updateData(newData: INodeData) {
    this.data = newData;
  }
}

class Tree {
  root: TreeNode = null;

  insertAsRoot(data: INodeData) {
    return this.root = new TreeNode(data);
  }

  insertAsFirstChild(node: TreeNode, data: INodeData) {
    return node.insertAsFirstChild(data);
  }

  insertAsSecondChild(node: TreeNode, data: INodeData) {
    return node.insertAsSecondChild(data);
  }

  deleteNode(node: TreeNode) {
    if (node === this.root) {
      this.root = null;
      return;
    }
    if (node === node.parent.firstChild) {
      node.parent.firstChild = null;
    } else {
      node.parent.secondChild = null;
    }
  }

  getNodeById(searchBeginNode: TreeNode, id: number) {
    function find(node: TreeNode): TreeNode {
      if (!node) return;
      if (node.data.id === id) {
        return node;
      } else {
        let resultNode = find(node.firstChild);
        if (resultNode)
          return resultNode;

        resultNode = find(node.secondChild);
        if (resultNode)
          return resultNode;
      }
    }
    return find(searchBeginNode);
  }

  getNodeChildIds(node: TreeNode) {
    let ids: number[] = [];
    this.traverseLevel(node, (child) => {
      ids.push(child.data.id);
    });
    return ids;
  }

  traverseLevel(node: TreeNode, func: (node: TreeNode) => any) {
    let queue: TreeNode[] = [];
    queue.push(node);
    while (queue.length > 0) {
      const node = queue.shift();
      func(node);

      if (node.firstChild) queue.push(node.firstChild);
      if (node.secondChild) queue.push(node.secondChild);
    }
  }
}

export const tree = new Tree();