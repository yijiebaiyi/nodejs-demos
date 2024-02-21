function evaluateCondition(condition, data) {
    const { key, value, operator } = condition;
    const dataValue = data[key];

    switch (operator) {
        case 0:
            return dataValue > value;
        case 2:
            return dataValue < value;
        case 5:
            return dataValue >= value;
        case 6:
            return dataValue <= value;
        default:
            return false;
    }
}

function evaluateRuleSet(ruleSet, data) {
    let result = true;
    let tempResult = true;

    for (const rule of ruleSet) {
        const { key, value, operator, relation } = rule;

        if (tempResult === false && relation === 1) {
            result = false;
            tempResult = true; // Reset tempResult for next group
            continue;
        }

        const conditionResult = evaluateCondition(rule, data);

        if (relation === 0) {
            tempResult = tempResult && conditionResult;
        } else {
            tempResult = tempResult || conditionResult;
        }

        if (relation === 0 && conditionResult === false) {
            result = false;
        }
    }

    return result;
}

function getMatchedLevel1(jsonData, data) {
    let matchedLevel = 0;

    for (const levelRules of jsonData) {
        const { level, rules } = levelRules;
        const ruleSet = [];

        let leftParenthesisCount = 0;
        let rightParenthesisCount = 0;

        for (const rule of rules) {
            const { leftParenthesis, rightParenthesis } = rule;

            if (leftParenthesis !== undefined) {
                leftParenthesisCount += leftParenthesis;
            }

            if (rightParenthesis !== undefined) {
                rightParenthesisCount += rightParenthesis;
            }

            ruleSet.push(rule);

            if (leftParenthesisCount === rightParenthesisCount) {
                if (evaluateRuleSet(ruleSet, data)) {
                    matchedLevel = level;
                    break;
                }

                ruleSet.length = 0; // Reset ruleSet for next group
            }
        }

        if (matchedLevel !== 0) {
            break; // 如果已匹配到级别，则终止循环
        }
    }

    return matchedLevel;
}

function evaluateConditions(jsonData, data) {
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

function evaluateCondition2(condition, data) {
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
            const res1 = evaluateConditions(jsonData, data);
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