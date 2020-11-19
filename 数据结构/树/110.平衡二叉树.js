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
 * @return {boolean}
 */
// 思路：分别计算左右子树的最大高度，再计算绝对值
var isBalanced = function(root) {
  if (root === null) return true;

  const leftDepth = maxDepth(root.left);
  const rightDepth = maxDepth(root.right);

  // ps: 平衡二叉树指的是所有节点的左右子树高度差都小于1，比如说[1,2,2,3,null,null,3,4,null,null,4]就不是一颗平衡二叉树
  return Math.abs(leftDepth - rightDepth) <= 1  && isBalanced(root.left) && isBalanced(root.right);
    
};

function maxDepth(root) {
  if (root === null) return 0;
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
}