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
 * @return {number[]}
 */
// 递归解法
var preorderTraversal = function(root) {
    if (root === null) return;

    console.log(root.val);
    preorderTraversal(root.left);
    preorderTraversal(root.right);

};

// 迭代解法
var preorderTraversal = function(root) {
  if (root === null) return;

  console.log(root.val);
  preorderTraversal(root.left);
  preorderTraversal(root.right);

};