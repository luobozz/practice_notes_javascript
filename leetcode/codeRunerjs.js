var test = function (p1) {
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
    for (let i = 0; i < p1.length; i++) {
        res.push(ROMAN_MAP[p1[i]])
    }
    return res
};

console.log(test('III'));