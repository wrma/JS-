/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
// 二叉搜索树是有序的
var lowestCommonAncestor = function (root, p, q) {
  let parent;
  while (true) {
    if ((p.val - root.val) * (q.val - root.val) <= 0) {
      parent = root;
      break;
    } else if (p.val < root.val && q.val < root.val) {
      root = root.left;
    } else if (p.val > root.val && q.val > root.val) {
      root = root.right;
    }
  }

  return parent;
};

// 递归解法
var lowestCommonAncestor = function (root, p, q) {
  if ((p.val - root.val) * (q.val - root.val) <= 0) {
    return root;
  }

  if (p.val < root.val && q.val < root.val) {
    return lowestCommonAncestor(root.left, p, q);
  }

  if (p.val > root.val && q.val > root.val) {
    return lowestCommonAncestor(root.right, p, q);
  }
}
