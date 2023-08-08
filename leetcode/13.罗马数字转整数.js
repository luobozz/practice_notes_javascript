/*
 * @lc app=leetcode.cn id=13 lang=javascript
 *
 * [13] 罗马数字转整数
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function (p1) {
    const ROMAN_MAP = {
        'I': 1,
        'V': 5,
        'X': 10,
        'L': 50,
        'C': 100,
        'D': 500,
        'M': 1000,
    }
    const res = []
    for (let i = 0; i < pi.length; i++) {
        res.push(ROMAN_MAP[p1[i]])
    }
    return res
};
// @lc code=end

