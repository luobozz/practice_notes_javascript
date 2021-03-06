//TODO 整理格式化输出部分
//TODO 整理axios封装部分
//console terminal color
// for(var i=1;i<=8;i++){
//     console.log(`\x1B[${i}m%s\x1B[0m`, i)
// }

// for(var i=30;i<=47;i++){
//     console.log(`\x1B[${i}m%s\x1B[0m`, i)
// }

const moment = require("moment")
const axios = require("axios")
const lodash = require("lodash")
const { reject, stubString } = require("lodash")

const HEADERS = {
    "X-Access-Token": ""
}
const URL = {
    centerApi: "http://192.168.1.46:8888/bank-kpi/",
    fileServiceApi: "http://192.168.1.46:8888/bank-kpi/sys/fileservice/"
}

const ax = {
    get: (url, opt = {}) => {
        opt.headers = HEADERS
        return axios.get(url, opt)
    },
    post: (url, data, opt = {}) => {
        opt.headers = HEADERS
        return axios.post(url, data, opt)
    },
}

const api = {
    center: {
        dth3: (value) => {
            return ax.get(`${URL.centerApi}sys/log/dth3?value=${value}`)
        },
        searchByDepart: (data) => {
            const options = {}
            options.params = data || {}
            return ax.get(`${URL.centerApi}sysdepart/sysDepart/searchByDepart`, options)
        },
        login: () => {
            return ax.post(`${URL.centerApi}sys/login`, {
                username: "admin",
                password: "uaaIHVXKz5plwekhq/yK6w==",
                remember_me: true
            })
        }
    },
    fs: {
        csstat: (time) => {
            return new Promise((resolve, reject) => {
                let callTotal = []
                if (!lodash.isEmpty(time) && !(time instanceof moment)) {
                    reject("arg type not allow")
                }
                ax.get(`${URL.fileServiceApi}csstat`).then(r => {
                    let data = r.data.split("\n"), arr = []
                    data = data.slice(1, data.length)
                    data.forEach(p => {
                        const sp = p.split(" ");
                        arr.push({
                            depId: sp[0].slice(sp[0].length - 5, sp[0].length),
                            time: sp[1],
                            num: parseInt(sp[2] || 0),
                        })
                    })
                    if (lodash.isEmpty(time)) {
                        resolve(arr)
                    } else {
                        resolve(arr.filter(f => f.time?.indexOf(time.format("YYYY-MM-DD")) > -1))
                    }
                }).catch(e => {
                    reject(e)
                })
            })
        },
        psm: (depId, opt) => {
            const url = `${URL.fileServiceApi}psm/${depId}${opt.sasd ? "?sasd=true" : ""}`
            if (opt.getUrl) {
                return url
            }
            const options = {}
            if (opt.timeout) {
                options.timeout = opt.timeout
            }
            return ax.get(url, options)
        }
    }
}

let methods = {
    checkTime: moment(),
    depList: [],
    fsCall: [],
    fsTotal: 0,
    ctCall: [],
    ctTotal: 0,
    ctReportCall: [],
    ctReportTotal: 0,
    initData(time) {
        return new Promise((resolve, reject) => {
            console.log("请求机构列表中...")
            this.getDepList().then(r => {
                console.log("请求机构列表成功")
                console.log("请求fs叫号中...")
                api.fs.csstat(time).then(r => {
                    console.log("请fs叫号成功")
                    this.fsCall = r
                    console.log("请求中心端叫号中...")
                    this.getDepartDailyCallTotal(time).then(r => {
                        console.log("请求中心端叫号成功")
                        console.log("请求中心端上报叫号中...")
                        this.getDepartDailyReportCallTotal(time).then(r => {
                            console.log("请求中心端上报叫号成功")
                            resolve()
                        }).catch(e => {
                            console.log("请求中心端上报叫号失败")
                            reject(e)
                        })
                    }).catch(e => {
                        console.log("请求中心端叫号失败")
                        reject(e)
                    })
                }).catch(e => {
                    console.log("请求fs叫号失败")
                    reject(e)
                })
            }).catch(e => {
                console.log("请求机构列表失败")
                reject(e)
            })

        })
    },
    getDepartDailyCallTotal(time) {
        return new Promise((resolve, reject) => {
            if (lodash.isEmpty(time) || !(time instanceof moment)) {
                reject("arg type not allow")
            }
            api.center.dth3(`select BANK_CODE,count(1) num from CALL_OPERATE a where TO_CHAR(CALL_TIME,'YYYY-MM-DD')='${time.format("YYYY-MM-DD")}' group by BANK_CODE`).then(r => {
                r.data.forEach(p => {
                    this.ctCall.push({
                        depId: p.BANK_CODE,
                        time: time.format("YYYY-MM-DD"),
                        num: p.NUM,
                    })
                })
                resolve()
            }).catch(e => {
                reject(e)
            })
        })
    },
    getDepList() {
        return new Promise((resolve, reject) => {
            api.center.searchByDepart({
                pageNo: 1,
                pageSize: 5000,
                onlyReport: 1
            }).then(r => {
                if (r.data.success) {
                    r.data.result.records.forEach(p => {
                        const dep = {
                            depId: p.id,
                            name: p.departName,
                            psmIp: p.psmIp,
                            checkAddr: api.fs.psm(p.id, {
                                getUrl: true
                            }),
                            connStatus: false
                        }
                        this.depList.push(dep)
                    })
                    resolve()
                }
            }).catch(e => {
                reject(e)
            })
        })
    },
    getDepartDailyReportCallTotal(time) {
        return new Promise((resolve, reject) => {
            if (lodash.isEmpty(time) || !(time instanceof moment)) {
                reject("arg type not allow")
            }
            api.center.dth3(`select BANK_CODE,count(1) num from CALL_OPERATE a where EXISTS(select 1 from VIOLATION_RECORD where a.id=CALL_ID) and TO_CHAR(CALL_TIME,'YYYY-MM-DD')='${time.format("YYYY-MM-DD")}' group by BANK_CODE`).then(r => {
                r.data.forEach(p => {
                    this.ctReportCall.push({
                        name: "",
                        depId: p.BANK_CODE,
                        time: time.format("YYYY-MM-DD"),
                        num: p.NUM,
                    })
                })
                resolve()
            }).catch(e => {
                reject(e)
            })
        })
    },
    async getCompareResult() {
        // 请求误差
        const reqFix = 1
        const fix = (num, f) => {
            let ret = ""
            for (let i = 0; i < num; i++) {
                ret += f || " "
            }
            return ret
        }, len = (str) => {
            let realLength = 0, len = str.length, charCode = -1;
            for (var i = 0; i < len; i++) {
                charCode = str.charCodeAt(i);
                if (charCode >= 0 && charCode <= 128)
                    realLength += 1;
                else
                    realLength += 2;
            }
            return realLength;
        }, sub = (val, max) => {
            max = max - 2
            let returnValue = '';
            let byteValLen = 0;
            for (var i = 0; i < val.length; i++) {
                if (val[i].match(/[^\x00-\xff]/ig) != null)
                    byteValLen += 2;
                else
                    byteValLen += 1;
                if (byteValLen > max)
                    break;
                returnValue += val[i];
            }
            return returnValue + fix(max + 2 - len(returnValue));
        }

        const strFix = (num, str, f) => {
            str = str + ""
            return len(str) > num ? sub(str, num) : len(str) == num ? str : `${str}${fix(num - len(str), f)}`
        }

        const tableMsg = (lvl, msg, no) => {
            console.log('\x1B[' + lvl + 'm%s\x1B[0m', (no ? "--" : "| ") + msg + (no ? "-" : "|"))
        }
        console.log()
        tableMsg(2, fix(8 + 8 + 8 + 25 + 18 + 18 + 18 + 18, "-"), 1)
        tableMsg(1, strFix(8, "序号") + strFix(8, "联通状态") + strFix(8, "级别") + strFix(25, "机构") + strFix(18, "机构号") + strFix(18, "叫号(fs)") + strFix(18, "叫号(中心端)") + strFix(18, "叫号(中心端收到上报)"))
        tableMsg(2, fix(8 + 8 + 8 + 25 + 18 + 18 + 18 + 18, "-"))
        const detailMsg = (lvl, connstatus, no, name, depId, num, ctNum, reportNum) => {
            tableMsg(lvl, strFix(8, no) + strFix(8, connstatus ? "√" : "×") + strFix(8, lvl == 41 ? "无叫号" : lvl == 31 ? "严重" : lvl == 32 ? "微小" : lvl == 33 ? "一般" : "正常") + strFix(25, name) + strFix(18, depId) + strFix(18, num) + strFix(18, ctNum) + strFix(18, reportNum))
        }
        for (let i = 0; i < this.depList.length; i++) {
            p = this.depList[i]
            let connStatus = false
            await api.fs.psm(p.depId, {
                timeout: 3000
            }).then(r => {
                connStatus = true
            }).catch(e => {
                connStatus = false
            })
            const fsNum = this.fsCall.filter(o => p.depId == o.depId)?.[0]?.num | 0
            this.fsTotal += fsNum
            const ctCallNum = this.ctCall.filter(o => p.depId == o.depId)?.[0]?.num | 0
            this.ctTotal += ctCallNum
            const reportNum = this.ctReportCall.filter(o => p.depId == o.depId)?.[0]?.num | 0
            this.ctReportTotal += reportNum
            const lvl = fsNum == 0 ? 41 : reportNum == 0 ? 31 : fsNum > reportNum ? 33 : p.num - ctCallNum > reqFix ? 32 : 2
            detailMsg(lvl, connStatus, i + 1, p.name, p.depId, fsNum, ctCallNum, reportNum)
        }

        tableMsg(2, fix(8 + 8 + 8 + 25 + 18 + 18 + 18 + 18, "-"), 1)

        console.log()

        console.log('\x1B[1m%s\x1B[0m', `|${strFix(50, "", "-")}|`)
        console.log('\x1B[1m%s\x1B[0m', `|${strFix(50, "", "")}|`)
        console.log('\x1B[1m%s\x1B[0m', `|${strFix(50, `【${this.checkTime.format("YYYY-MM-DD")}】叫号统计`)}|`)
        console.log('\x1B[1m%s\x1B[0m', `|${strFix(50, ` 统计时间 ${moment().format("YYYY-MM-DD HH:mm:ss")}`)}|`)
        console.log('\x1B[1m%s\x1B[0m', `|${strFix(50, ` ${strFix(10, this.fsCall.length)}个网点有叫号`)}|`)
        console.log('\x1B[1m%s\x1B[0m', `|${strFix(50, ` ${strFix(10, this.fsTotal)}fs收到叫号`)}|`)
        console.log('\x1B[1m%s\x1B[0m', `|${strFix(50, ` ${strFix(10, this.ctTotal)}中心端收到号`)}|`)
        console.log('\x1B[1m%s\x1B[0m', `|${strFix(50, ` ${strFix(10, this.ctReportTotal)}中心端收到上报叫号`)}|`)
        console.log('\x1B[1m%s\x1B[0m', `|${strFix(50, ` ${strFix(10, (this.ctTotal / this.fsTotal * 100).toFixed(0) + "%")}中心端叫号成功率`)}|`)
        console.log('\x1B[1m%s\x1B[0m', `|${strFix(50, ` ${strFix(10, (this.ctReportTotal / this.fsTotal * 100).toFixed(0) + "%")}上报成功率`)}|`)
        console.log('\x1B[1m%s\x1B[0m', `|${strFix(50, "", "")}|`)
        console.log('\x1B[1m%s\x1B[0m', `|${strFix(50, "", "-")}|`)
    }
}

const main = function () {
    this.checkTime = moment().add(-1, "days")
    api.center.login().then(r => {
        HEADERS["X-Access-Token"] = r.data?.result?.token || ""
        if (lodash.isEmpty(HEADERS["X-Access-Token"])) {
            return
        }
        this.initData(this.checkTime).then(r => {
            this.getCompareResult()
        }).catch(e => {
            console.error(e)
        })
    }).catch(e => {
        console.log(e)
    })
}

main.call(methods)

