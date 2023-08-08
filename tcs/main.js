import fs from "flash-console"
console.log(fs);
const S=
setInterval(() => {
    fs.log('s',new Date())
}, 1000)