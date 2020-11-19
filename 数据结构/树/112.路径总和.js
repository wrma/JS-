/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {boolean}
 */
// 总和类问题，在递归时考虑减法
var hasPathSum = function(root, sum) {

  if (root === null) return false;

  if (root.left === null && root.right === null) return root.val === sum;

  if (hasPathSum(root.left, sum - root.val)) {
    return true;
  }

  if (hasPathSum(root.right, sum - root.val)) {
    return true;
  }

  return false;

};