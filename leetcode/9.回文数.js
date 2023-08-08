/*
 * @lc app=leetcode.cn id=9 lang=javascript
 *
 * [9] 回文数
 */

// @lc code=start
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    if (x < 0 || (x % 10 == 0 && x != 0)) return false
    let t = 0
    while (x > t) {
        t = t * 10 + x % 10
        x = Math.floor(x / 10)
    }
    return x == t || x == Math.floor(t / 10)
};
// @lc code=end

