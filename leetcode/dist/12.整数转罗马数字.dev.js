"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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
var intToRoman = function intToRoman(p1) {
  var res = [];
  var ROMAN_INDEX = [[1000, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"], [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]];

  for (var i = 0; i < ROMAN_INDEX.length; i++) {
    var _ROMAN_INDEX$i = _slicedToArray(ROMAN_INDEX[i], 2),
        p = _ROMAN_INDEX$i[0],
        val = _ROMAN_INDEX$i[1];

    while (p1 >= p) {
      p1 -= p;
      res.push(val);
    }
  }

  return res.join('');
}; // @lc code=end