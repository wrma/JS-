/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var sumOfLeftLeaves = function(root) {
  let sum = 0;

  const sumOf = function(root) {

    if (root === null) return 0;

    if (root.left !== null && root.left.left === null && root.left.right === null) {
      sum = sum + root.left.val;
    };

    sumOf(root.left)
    sumOf(root.right);

    return sum
  }

  return sumOf(root)

};