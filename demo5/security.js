// 安全性测试

const { evaluateConditions, securityJson } = require('./common')
function testfunc(data) {
    let res = 0;
    const deviceTypeCount = data.deviceTypeCount;
    if (deviceTypeCount >= 6) {
        res = 1;
    }

    if (deviceTypeCount >= 4 && deviceTypeCount < 6) {
        res = 2;
    }

    if (deviceTypeCount < 4) {
        res = 3;
    }

    return res;
}


let totalNum = 0;
let errNum = 0;
for (let count = 0; count < 10; count++) {
    const data = { deviceTypeCount: count };
    const res1 = evaluateConditions(securityJson, data);
    const res2 = testfunc(data);
    totalNum++;
    if (res1 !== res2) {
        errNum++;
        console.log("feat: ", res1, "test: ", res2, "data: ", data)
    }
}
console.log("错误率： ", errNum / totalNum)