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

  getNodeById(searchBeginNode: TreeNode, id: number) {
    function find(node: TreeNode): TreeNode {
      if (node === null) return;
      if (node.data.id === id) {
        return node;
      } else {
        let resultNode = find(node.firstChild);
        if (resultNode !== null)
          return resultNode;

        resultNode = find(node.secondChild);
        if (resultNode !== null)
          return resultNode;
      }
    }
    return find(searchBeginNode);
  }
}

export const tree = new Tree();