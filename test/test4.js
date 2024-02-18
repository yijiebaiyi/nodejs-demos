const jsonData = [
    {
        "level": 1,
        "rules": [
            {
                "key": "TEM",
                "value": 22,
                "operator": 5,
                "relation": 0
            },
            {
                "key": "TEM",
                "value": 25,
                "operator": 6,
                "relation": 0
            },
            {
                "key": "HUM",
                "value": 0.45,
                "operator": 5,
                "relation": 0
            },
            {
                "key": "HUM",
                "value": 0.6,
                "operator": 6,
                "relation": 0
            },
            {
                "key": "PRES",
                "value": 1010,
                "operator": 5,
                "relation": 0
            },
            {
                "key": "PRES",
                "value": 1100,
                "operator": 6,
                "relation": 0
            }
        ]
    },
    {
        "level": 2,
        "rules": [
            {
                "key": "TEM",
                "value": 15,
                "operator": 0,
                "relation": 0,
                "leftParenthesis": 2
            },
            {
                "key": "TEM",
                "value": 22,
                "operator": 2,
                "relation": 1,
                "rightParenthesis": 1
            },
            {
                "key": "TEM",
                "value": 25,
                "operator": 0,
                "relation": 0,
                "leftParenthesis": 1
            },
            {
                "key": "TEM",
                "value": 30,
                "operator": 2,
                "relation": 0,
                "rightParenthesis": 2
            },
            {
                "key": "HUM",
                "value": 0.2,
                "operator": 0,
                "relation": 0,
                "leftParenthesis": 2
            },
            {
                "key": "HUM",
                "value": 0.45,
                "operator": 2,
                "relation": 1,
                "rightParenthesis": 1
            },
            {
                "key": "HUM",
                "value": 0.6,
                "operator": 0,
                "relation": 0,
                "leftParenthesis": 1
            },
            {
                "key": "HUM",
                "value": 0.8,
                "operator": 2,
                "relation": 0,
                "rightParenthesis": 2
            },
            {
                "key": "PRES",
                "value": 1000,
                "operator": 0,
                "relation": 0,
                "leftParenthesis": 2
            },
            {
                "key": "PRES",
                "value": 1010,
                "operator": 2,
                "relation": 1,
                "rightParenthesis": 1
            },
            {
                "key": "PRES",
                "value": 1100,
                "operator": 0,
                "relation": 0,
                "leftParenthesis": 1
            },
            {
                "key": "PRES",
                "value": 1200,
                "operator": 2,
                "relation": 0,
                "rightParenthesis": 2
            }
        ]
    },
    {
        "level": 3,
        "rules": [
            {
                "key": "TEM",
                "value": 15,
                "operator": 2,
                "relation": 1
            },
            {
                "key": "TEM",
                "value": 30,
                "operator": 0,
                "relation": 1
            },
            {
                "key": "HUM",
                "value": 0.2,
                "operator": 2,
                "relation": 1
            },
            {
                "key": "HUM",
                "value": 0.8,
                "operator": 0,
                "relation": 1
            },
            {
                "key": "PRES",
                "value": 1000,
                "operator": 2,
                "relation": 1
            },
            {
                "key": "PRES",
                "value": 1200,
                "operator": 0,
                "relation": 1
            }
        ]
    }
];

function getMatchedLevel(jsondata, ruleOptions) {
    let level = 0;
    const dataLen = jsonData.length;
    for (let j = 0; j < dataLen; j++) {
        element = jsonData[j];
        const elementRuleslen = element.rules.length;
        for (let i = 0; i < elementRuleslen; i++) {
            rule = element.rules[i];
            if (!ruleOptions.has(rule.key)) {
                return level;
            }
            currentValue = ruleOptions.get(rule.key);

            if (isMatch(rule.operator, rule.value, currentValue)) {
                level = element.level;
                if (rule.relation == 1 || i === elementRuleslen - 1) {
                    return level;
                }
            } else {
                if (rule.relation === 0) {
                    break;
                }
                continue;
            }
        }
    }
    return level;
}

// GT    = 0;  // 大于
// EQUAL = 1;  // 等于
// LT    = 2;  // 小于
// NEQ   = 3;  // 不等于
// LIKE  = 4;  // 模糊查询
// GE    = 5;  // 大于等于
// LE    = 6;  // 小于等于
// IN    = 7;  // in
function isMatch(operator, configValue, currentValue) {
    switch (operator) {
        case 0:
            return currentValue > configValue;
        case 1:
            return currentValue === configValue;
        case 2:
            return currentValue < configValue;
        case 3:
            return currentValue !== configValue;
        case 5:
            return currentValue >= configValue;
        case 6:
            return currentValue <= configValue;
        default:
            return false;
    }
}


function testfunc(data) {
    // const { TEMP, HUMP, PRES } = data;
    const TEMP = data.get("TEM");
    const HUMP = data.get("HUM");
    const PRES = data.get("PRES");

    if (TEMP >= 22 && TEMP <= 25 && HUMP >= 0.45 && HUMP <= 0.6 && PRES >= 1010 && PRES <= 1100) {
        return 1;
    }

    if (((TEMP > 15 && TEMP < 22) || (TEMP > 25 && TEMP < 30)) &&
        ((HUMP > 0.2 && HUMP < 0.45) || (HUMP > 0.6 && HUMP < 0.8)) &&
        ((PRES > 1000 && PRES < 1010) || (PRES > 1100 && PRES < 1200))) {
        return 2;
    }

    if (TEMP < 15 || TEMP > 30
        || HUMP < 0.2 || HUMP > 0.8
        || PRES < 1000 || PRES > 1200) {
        return 3;
    }

    return 0;
}

let totalNum = 0;
let errNum = 0;
for (let temp = 12; temp < 35; temp++) {
    for (let hum = 0.1; hum < 0.8; hum = (hum * 10 + 1) / 10) {
        for (let pres = 1000; pres < 1200; pres = pres + 100) {
            // const data = { TEMP: temp, HUMP: hum, PRES: pres };
            const data = new Map([
                [
                    "TEM", temp,
                ],
                [
                    "HUM", hum,
                ],
                [
                    "PRES", pres,
                ]
            ])
            const res1 = getMatchedLevel(jsonData, data);
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

// const data = { TEMP: 12, HUMP: 0.1, PRES: 1000 };
// const res1 = getMatchedLevel(jsonData, data);
// const res2 = testfunc(data);
// console.log("feat: ", res1, "test: ", res2, "data: ", data)

