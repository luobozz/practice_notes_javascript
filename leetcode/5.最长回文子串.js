/*
 * @lc app=leetcode.cn id=5 lang=javascript
 *
 * [5] 最长回文子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
    const so = {}
    let m = 0, o = { s: 0, e: 0 }
    for (let i = 0; i < s.length; i++) {
        const e = s[i]
        if (!so[e]) {
            // 记录回文开始
            so[e] = { s: i, e: i }
        }else{
            // 命中了一次回尾,判断是否回文
            const ts=s.slice(so[e].s,so[e].e+1)
            console.log(ts);
        }
        // so[e].e = i
    }
    // for (const n in so) {
    //     if (so[n].e - so[n].s > m) {
    //         m = so[n].e - so[n].s
    //         o = so[n]
    //     }
    // }
    return s.slice(o.s, o.e + 1)
};
// @lc code=end

