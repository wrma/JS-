/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
// 思路：
// 1. 将链表连接成环
// 2. 在合适的位置断开这个环，找到链表头和链表尾
var rotateRight = function(head, k) {
  if (head === null) return null;
  if (head.next === null) return head;

  let start = head;

  // 确认链表长度 n
  let n = 1;
  while(start.next) {
    start = start.next;
    n++;
  }

  // 将链表连成环
  start.next = head;

  // 链表头为 n - k % n， 链表尾为 n - k % n - 1
  let newEnd = head;
  let count = n - k % n - 1;
  while ( count > 0) {
    newEnd = newEnd.next;
    count--;
  }

  let newStart = newEnd.next;
  newEnd.next = null;

  return newStart;

};