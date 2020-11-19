/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function(head) {

  if (head === null) return null;

  const dummy = new ListNode(-1);
  dummy.next = head;

  let prev = dummy;
  let cur = head;

  while (cur && cur.next) {
    if (prev.next.val === cur.next.val) {
      // 循环移动 cur 指针，直到找到一个不同值
      while (cur && cur.next && cur.next.val === prev.next.val) {
        cur = cur.next;
      }
      prev.next = cur.next;
      cur = cur.next;
    } else {
      prev = prev.next;
      cur = cur.next;
    }
  }

  return dummy.next;

};