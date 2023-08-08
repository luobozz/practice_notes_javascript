/*
 * @lc app=leetcode.cn id=12 lang=javascript
 *
 * [12] 整数转罗马数字
 */

// @lc code=start
/**
 * @param {number} num
 * @return {string}
 */
var intToRoman = function (p1) {
    const res = []
    const ROMAN_INDEX = [[1000, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"], [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]];
    for (let i = 0; i < ROMAN_INDEX.length; i++) {
        const [p, val] = ROMAN_INDEX[i];
        while (p1 >= p) {
            p1 -= p
            res.push(val)
        }
    }
    return res.join('')
};
// @lc code=end

