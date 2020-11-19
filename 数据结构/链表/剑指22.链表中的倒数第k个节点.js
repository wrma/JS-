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
// 双指针法
var getKthFromEnd = function (head, k) {
  
  let former = head;
  let latter = head;

  // 让former先走k - 1步
  for (let i = 0; i < k - 1; i++) {
    former = former.next;
  }

  while(former.next) {
    former = former.next;
    latter = latter.next;
  }

  return latter;

};