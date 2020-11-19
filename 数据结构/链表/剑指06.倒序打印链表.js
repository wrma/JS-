/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {number[]}
 */
// 辅助栈(迭代)
var reversePrint = function(head) {
  const res = [];
  while (head) {
      res.push(head.val);
      head = head.next;
  }
  return res.reverse();
};

// 递归写法
var reversePrint = function(head) {
  
  let res = [];

  const recur = function(head) {
    if (head === null) {
      return
    }
    recur(head.next);
    res.push(head.val);
  }

  recur(head);

  return res;
};
