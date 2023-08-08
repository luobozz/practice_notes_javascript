/*
 * @lc app=leetcode.cn id=11 lang=javascript
 *
 * [11] 盛最多水的容器
 */

// @lc code=start
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    const s = [0, 0, 0]
    const v = (sf, se) => {
        return sf == se ? 0 : Math.abs((se - sf) * (height[sf] < height[se] ? height[sf] : height[se]))
    }
    for (let i = 0; i < height.length; i++) {
        const isce = v(s[0], i) > v(s[0], s[1]), c = height[s[2]] > height[s[0]]
        s[1] = isce ? i : s[1]
        const iscf = height[s[2]] > height[s[0]] && v(s[2], s[1]) > v(s[0], s[1])
        s[0] = iscf ? s[2] : s[0]
        s[2] = i
    }
    return v(s[0], s[1])
};
// @lc code=end

