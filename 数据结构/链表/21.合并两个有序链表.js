/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {

  // 虚拟节点
  const dummy = new ListNode(-1);
  let prev = dummy;
  while (l1 !== null && l2 !== null) {
    if (l1.val > l2.val) {
      prev.next = l2;
      l2 = l2.next;
    } else {
      prev.next = l1;
      l1 = l1.next;
    }
    prev = prev.next;
  }

  // 直接将列表末尾指向未合并完的链表即可
  prev.next = l1 === null ? l2 : l1;

  const res = dummy.next;

  delete dummy;

  return res;
};