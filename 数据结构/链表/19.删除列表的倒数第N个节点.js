/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {

  if (head === null) return null;

  const dummy = new ListNode(-1);
  dummy.next = head;

  let prev = dummy;
  let end = prev.next;
  let start = prev.next;

  while (n > 0) {
    end = end.next;
    n--;
  }

  while (end) {
    end = end.next;
    start = start.next;
    prev = prev.next;
  }

  // 当 end 为 null 时，说明已经找到该节点，删除即可
  prev.next = start.next;

  return dummy.next;

};