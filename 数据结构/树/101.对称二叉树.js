/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function(root) {

  if (root === null) return true;

  if (root.left === null && root.right === null) return true;

  if (root.left === null || root.right === null) return false;

  if (root.left.val !== root.right.val) return false;

  return isSymmetric(root.left) && isSymmetric(root.right);
    
};