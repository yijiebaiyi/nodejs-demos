// 空气质量测试

const { evaluateConditions, airJson } = require('./common')
function testfunc(data) {
    let res = 0;
    const { ozone, PM25, PM10 } = data;
    if (PM25 >= 0 && PM25 <= 35 && PM10 >= 0 && PM10 <= 50 && ozone >= 0 && ozone <= 160) {
        res = 1;
    }

    if (PM25 > 35 && PM25 <= 75 && PM10 > 50 && PM10 <= 150 && ozone > 160 && ozone <= 200) {
        res = 2;
    }

    if (PM25 > 75 || PM10 > 150 || ozone > 200) {
        res = 3;
    }

    return res;
}


let totalNum = 0;
let errNum = 0;
for (let PM25 = 0; PM25 < 76; PM25++) {
    for (let PM10 = 0; PM10 < 151; PM10++) {
        for (let ozone = 0; ozone < 201; ozone++) {
            const data = { PM25, PM10, ozone };
            data['PM2.5'] = PM25;
            const res1 = evaluateConditions(airJson, data);
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