/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function (head, k) {
  if (head === null) return null;
  // 只有一个值，直接返回
  if (head.next === null) return head;

  const dummy = new ListNode(-1);
  dummy.next = head;

  let prev = dummy;
  let end = prev;

  while (end.next) {

    let start = prev.next;
    // 让 end 先走 k 步 
    while (k > 0 && end) {
      end = end.next;
      k--;
    }

    // 当end为null时，说明剩下的节点数不足k个，可直接返回
    if (!end) break;

    // 记录下next节点，便于连接两个反转链表
    let next = end.next;

    // 断开链表
    end.next = null;

    // 对符合条件的K个一组的链表进行反转
    let reverseListHead = reverse(start);

    // 将反转后的链表连接到下一个链表上
    prev.next = reverseListHead;
    start.next = next
    prev = start;
    end = prev;
  }

  return dummy.next;

};

var reverse = function (head) {
  if (head === null) return null;

  let prev = null;
  let cur = head;

  while (cur) {
    let next = cur.next;
    cur.next = prev;
    prev = cur;
    cur = next;
  }

  return prev;

}