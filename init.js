const { createInterface } = require("readline")
const { exec } = require("child_process")
const reader = createInterface({
  input: process.stdin,
  output: process.stdout
})

reader.question(`名称: `, input => {
  const initHome = `${__dirname}/${input}`
  let cmd = `npm create vite@latest ${input} --template vue-ts`
  exec(cmd)
  reader.close()
  // console.log(cmd);
})
