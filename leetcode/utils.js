/**
 * @author chenlingyu
 */

const _ = {
    delivery:1000000007,
    run: (ps, ex) => {
        ps.forEach(p => {
            const answer = _.return(ex(p).lc(), new Date().getTime())
            console.log("-------------------------------\n" +
                `条件:${JSON.stringify(p)}\n` +
                `答案:${JSON.stringify(answer.answer)}\n` +
                `用时:${answer.times}\n` +
                `-------------------------------\n`)
        })
    },
    return: (answer, timeTag) => {
        return {
            answer: answer,
            times: new Date().getTime() - timeTag
        };
    },
}

module.exports = _;