/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */

// 双指针法
var removeElements = function(head, val) {
  if (head === null) return;
  if (head.val === val) return head.next; // error: 存在问题：如果链表为2 -> 2 -> 2, target 为 2 ，则按此结果会为 2 -> 2，不符合预期
  let pre = head;
  let cur = head.next;

  while (cur) {
    // 找到了需要删除的节点
    if (cur.val === val) {
      pre.next = cur.next;
      cur.next = null;
      break;
    } else {
      pre = pre.next;
      cur = cur.next;
    }
  }

  return head;
};


var removeElements = function(head, val) {

  if (head === null) return null;

  const dummy = new ListNode(-1);

  dummy.next = head;

  let cur = dummy;

  while (cur.next) {
    if (cur.next.val === val) {
      cur.next = cur.next.next;
    } else {
      cur = cur.next;
    }
  }

  return dummy.next;

};