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
                "operator": 5,
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
                "operator": 6,
                "relation": 1,
                "rightParenthesis": 2
            },
            {
                "key": "HUM",
                "value": 0.2,
                "operator": 5,
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
                "operator": 6,
                "relation": 1,
                "rightParenthesis": 2
            },
            {
                "key": "PRES",
                "value": 1000,
                "operator": 5,
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
                "operator": 6,
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

function evaluateCondition(condition, data) {
    const { key, value, operator } = condition;
    const dataValue = data[key];

    switch (operator) {
        case 0:
            return dataValue > value;
        case 1:
            return dataValue === value;
        case 2:
            return dataValue < value;
        case 3:
            return dataValue !== value;
        case 5:
            return dataValue >= value;
        case 6:
            return dataValue <= value;
        default:
            return false;
    }
}

function evaluateRuleSet1(ruleSet, data, result) {
    if (ruleSet.length === 0) {
        return result;
    }

    result = true;

    const children = [];
    let findRight = false
    for (const rule of ruleSet) {
        if (rule.leftParenthesis && !findRight) {
            children.push(rule);
        }

        if (rule.rightParenthesis) {
            findRight = true;
            result = evaluateRuleSet(children, data, result);
            children.pop();
        }
    }


    for (const rule of ruleSet) {
        const conditionResult = evaluateCondition(rule, data);

        if (rule.relation === 0) {
            result = result && conditionResult;
        } else {
            result = result || conditionResult;
        }
    }

    return result;
}


function evaluateRuleSet(ruleSet, data) {
    let result = true;
    let orResult = false; // 用于存储OR关系的结果

    let leftCount = 0;
    let rightCount = 0;
    for (const rule of ruleSet) {
        const leftParenthesis = rule.leftParenthesis || 0;
        const rightParenthesis = rule.rightParenthesis || 0;
        const relation = rule.relation;
        leftCount += leftParenthesis;
        rightCount += rightParenthesis;

        if (leftParenthesis) {

            result = result && evaluateCondition(rule, data);
        } else if (rightParenthesis) {
            orResult = orResult || result;
            result = true;
        } else {
            const conditionResult = evaluateCondition(rule, data);
            if (relation === 0) {
                result = result && conditionResult;
            } else {
                result = result || conditionResult;
            }
        }
    }

    return orResult || result; // 返回结果需要考虑AND和OR的关系
}

function getMatchedLevel(jsonData, data) {
    for (const levelRules of jsonData) {
        const { level, rules } = levelRules;

        if (evaluateRuleSet(rules, data)) {
            return level;
        }
    }

    return 0; // 没有匹配的规则
}

/*
function evaluateRuleSet(ruleSet, data) {
    let result = true;
    let orResult = false;

    for (const rule of ruleSet) {
        const { leftParenthesis, rightParenthesis, relation } = rule;

        if (leftParenthesis) {
            result = result && evaluateCondition(rule, data);
        } else if (rightParenthesis) {
            orResult = orResult || result;
            result = true;
        } else {
            const conditionResult = evaluateCondition(rule, data);
            if (relation === 0) {
                result = result && conditionResult;
            } else {
                result = result || conditionResult;
            }
        }
    }

    return orResult || result;
}

function getMatchedLevel(jsonData, data) {
    let matchedLevel = 0;

    for (const levelRules of jsonData) {
        const { level, rules } = levelRules;
        let ruleSet = [];
        let leftParenthesisCount = 0;
        let rightParenthesisCount = 0;

        for (const rule of rules) {
            if (rule.leftParenthesis) {
                leftParenthesisCount += rule.leftParenthesis;
            }

            if (rule.rightParenthesis) {
                rightParenthesisCount += rule.rightParenthesis;
            }

            ruleSet.push(rule);

            if (leftParenthesisCount === rightParenthesisCount) {
                if (evaluateRuleSet(ruleSet, data)) {
                    matchedLevel = level;
                    break;
                }
                ruleSet = [];
            }
        }
    }

    return matchedLevel;
}
*/

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
    for (let hum = 0.1; hum < 0.8; hum = (hum * 10 + 1) / 10) {
        for (let pres = 1000; pres < 1200; pres = pres + 100) {
            const data = { TEM: temp, HUM: hum, PRES: pres };
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

const data = { TEM: 26, HUM: 0.6, PRES: 1100 };
const res1 = getMatchedLevel(jsonData, data);
const res2 = testfunc(data);
console.log("feat: ", res1, "test: ", res2, "data: ", data)


