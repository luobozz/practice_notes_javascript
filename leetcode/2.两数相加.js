/*
 * @lc app=leetcode.cn id=2 lang=javascript
 *
 * [2] 两数相加
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
// function ListNode(val, next) {
//     this.val = (val === undefined ? 0 : val)
//     this.next = (next === undefined ? null : next)
// }
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
    let p = 0
    let head = new ListNode(0)
    let curr = head
    while (p || l1 || l2) {
        const a = l1?.val || 0, b = l2?.val || 0
        let s = a + b + p
        p = 0
        if (s >= 10) {
            p = 1
        }
        curr.next = new ListNode(s % 10)
        curr = curr.next
        if (l1) l1 = l1.next
        if (l2) l2 = l2.next
    }
    return head.next
};
// @lc code=end
