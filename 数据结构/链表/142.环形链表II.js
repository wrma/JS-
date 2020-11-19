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

// 构建快慢指针两次相遇
// 第一次相遇，设快指针长度为f，慢指针为s，环的长度为b，则有 f = 2s; f = s + nb
// 得 s = nb, f = 2nb
// 构建第二次相遇，将f重新放置head处，一次一步，当s = a + nb时，f = a，两者相遇，此时快指针所在即为环的入口
var detectCycle = function(head) {
    let slow = head;
    let fast = head;

    // 首先判断是否有环，有环则构建第一次相遇
    while (true) {
      // 无环
      if (fast === null || fast.next === null) {
        return null
      }
      fast = fast.next.next;
      slow = slow.next;
      // 第一次相遇
      if (fast === slow) {
        break;
      }
    }

    fast = head;

    // 构建第二次相遇
    while (slow !== fast) {
      slow = slow.next;
      fast = fast.next;
    }

    return fast;

};