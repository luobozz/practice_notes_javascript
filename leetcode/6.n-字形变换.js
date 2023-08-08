/*
 * @lc app=leetcode.cn id=6 lang=javascript
 *
 * [6] N 字形变换
 */

// @lc code=start
/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function (s, numRows) {
    let flag = 0, order = -1, res = [];
    for (let i = 0; i < s.length; i++) {
        res[flag] = `${res[flag] || ''}${s[i]}`
        if (flag == numRows - 1 || flag == 0) order = -order
        flag += order
    }
    return res.join('')
};
// @lc code=end

