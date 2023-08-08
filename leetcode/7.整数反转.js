/*
 * @lc app=leetcode.cn id=7 lang=javascript
 *
 * [7] 整数反转
 */

// @lc code=start
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    let res = 0
    let mf=x>0?Math.floor:Math.ceil
    const MAXINT = 214748364, MAXINT_LAST = 7
    const MININT = -214748364, MININT_LAST = -8
    while (x != 0) {
        let temp = x % 10
        if (res > MAXINT || (res == MAXINT && temp > MAXINT_LAST)) {
            return 0
        }
        if (res < MININT || (res == MININT && temp < MININT_LAST)) {
            return 0
        }
        res = res * 10 + temp
        x = mf(x / 10)
    }
    return res
};
// @lc code=end

