// 舒适度测试

const { evaluateConditions, comfortJson } = require('./common')
function testfunc(data) {
    let res = 0;
    const TEMP = data.TEM;
    const HUMP = data.HUM;
    const PRES = data.PRES;
    if (TEMP >= 22 && TEMP <= 25 && HUMP >= 0.45 && HUMP <= 0.6 && PRES >= 1010 && PRES <= 1100) {
        res = 1;
    }

    if (((TEMP >= 15 && TEMP < 22) || (TEMP > 25 && TEMP <= 30)) ||
        ((HUMP >= 0.2 && HUMP < 0.45) || (HUMP > 0.6 && HUMP <= 0.8)) ||
        ((PRES >= 1000 && PRES < 1010) || (PRES > 1100 && PRES <= 1200))) {
        res = 2;
    }

    if (TEMP < 15 || TEMP > 30
        || HUMP < 0.2 || HUMP > 0.8
        || PRES < 1000 || PRES > 1200) {
        res = 3;
    }

    return res;
}


let totalNum = 0;
let errNum = 0;
for (let temp = 12; temp < 35; temp++) {
    for (let hum = 0.1; hum < 0.8; hum = hum + 0.05) {
        for (let pres = 1000; pres < 1200; pres = pres + 50) {
            const data = { TEM: temp, HUM: hum, PRES: pres };
            const res1 = evaluateConditions(comfortJson, data);
            const res2 = testfunc(data);
            totalNum++;
            if (res1 !== res2) {
                errNum++;
                console.log("feat: ", res1, "test: ", res2, "data: ", data)
            }
        }
    }
}
console.log("错误率： ", errNum / totalNum)