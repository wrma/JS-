/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} key
 * @return {TreeNode}
 */
var deleteNode = function(root, key) {
    if (root === null) return null

    if (root.val === key) {
        // 当该节点为叶子结点时，可以直接删除
        if (root.left === null && root.right === null) {
            return null
        }

        // 当结点只有左节点或右节点时，直接返回左节点/右节点
        if (root.left === null && root.right !== null) {
            return root.right
        }

        if (root.right === null && root.left !== null) {
            return root.left
        }

        // 当有两个节点的时候，可以找到右子树中最小的节点来接替自己，然后转而把这个最小节点删除
        if (root.left !== null && root.right !== null) {
            // root.left.right = root.right;
            const minRoot = findMin(root.right);
            root.val = minRoot.val;
            root.right = deleteNode(root.right, minRoot.val);
        }
    }

    if (root.val > key) {
        root.left = deleteNode(root.left, key); // 左边的节点删除后赋值到左节点上
    }

    if (root.val < key) {
        root.right = deleteNode(root.right, key);
    }

    return root;

};

const findMin = (root) => {
    while (root.left !== null) {
        root = root.left
    }
    return root
}