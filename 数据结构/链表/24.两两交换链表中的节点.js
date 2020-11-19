/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function (head) {
  if (head === null) return null;
  if (head.next === null) return head;

  const dummy = new ListNode(-1);
  dummy.next = head;

  let prev = dummy;

  while (prev.next && prev.next.next) {

    let l1 = prev.next;
    let l2 = prev.next.next;
    let next = l2.next;

    // 交换
    l2.next = l1;
    prev.next = l2;
    l1.next = next;

    prev = l1;
  }

  return dummy.next;
};