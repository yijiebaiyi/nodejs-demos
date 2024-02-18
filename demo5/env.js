// 环境质量测试

const { evaluateConditions, envJson } = require('./common')
function testfunc(data) {
    let res = 0;
    const { formaldehyde, TVOC } = data;
    if (formaldehyde === 0 && TVOC === 0) {
        res = 1;
    }

    if (TVOC > 0 && TVOC <= 0.6 && formaldehyde > 0 && formaldehyde <= 0.07) {
        res = 2;
    }

    if (formaldehyde > 0.07 && TVOC > 0.6) {
        res = 3;
    }

    return res;
}


let totalNum = 0;
let errNum = 0;
for (let formaldehyde = 0; formaldehyde < 0.1; formaldehyde = formaldehyde + 0.01) {
    for (let TVOC = 0; TVOC < 1; TVOC = TVOC + 0.1) {
        const data = { formaldehyde, TVOC };
        const res1 = evaluateConditions(envJson, data);
        const res2 = testfunc(data);
        totalNum++;
        if (res1 !== res2) {
            errNum++;
            console.log("feat: ", res1, "test: ", res2, "data: ", data)
        }
    }
}
console.log("错误率： ", errNum / totalNum)