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
 * @param {number} val
 * @return {TreeNode}
 */
// 二叉搜索树的插入结果有多种，最简单的方式就是插入到叶子结点上
// 迭代实现 O(logn)
var insertIntoBST = function(root, val) {
    if (root === null) return new TreeNode(val);

    let cur = root;
    while(true) {
      if (cur.val < val) {
          if (cur.right) {
            cur = cur.right;
          } else {
            cur.right = new TreeNode(val);
            break;
          }
      } else {
        if (cur.left) {
          cur = cur.left;
        } else {
          cur.left = new TreeNode(val);
          break;
        }
      }
    }

    return root;
};


// 递归解法
var insertIntoBST = function(root, val) {
  if (root === null) return new TreeNode(val);

  if (root.val > val) {
    root.left = insertIntoBST(root.left, val);
  } else {
    root.right = insertIntoBST(root.right, val);
  }

  return root;
};