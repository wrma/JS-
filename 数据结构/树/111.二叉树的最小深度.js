/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */ 
var minDepth = function(root) {
  if (root === null) return 0;

  const m1 = minDepth(root.left);
  const m2 = minDepth(root.right)

  // 只有左子树或只有右子树的情况
  if (root.left === null || root.right === null) {
    return m1 + m2 + 1;
  } else {
    return Math.min(m1, m2) + 1
  }
};