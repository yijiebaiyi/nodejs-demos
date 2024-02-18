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

// 定义一个函数用于根据条件判断是否满足规则
function evaluateRules2(data, rules) {
    let result = true;

    rules.forEach(rule => {
        let value = data[rule.key]; // 从数据中获取对应字段的值

        // 根据 operator 执行不同的比较操作
        switch (rule.operator) {
            case 0: // 大于
                result = result && (value > rule.value);
                break;
            case 2: // 小于
                result = result && (value < rule.value);
                break;
            case 5: // 大于等于
                result = result && (value >= rule.value);
                break;
            case 6: // 小于等于
                result = result && (value <= rule.value);
                break;
        }

        // 根据 relation 处理逻辑关系
        if (rule.relation === 1) {
            result = result || evaluateRules(data, rules.slice(rules.indexOf(rule) + 1));
        }
    });

    return result;
}

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


// 定义一个函数用于根据条件判断是否满足规则
function evaluateRules(data, rules) {
    return rules.reduce((result, rule) => {
        let value = data[rule.key]; // 从数据中获取对应字段的值

        // 根据 operator 执行不同的比较操作
        result = evaluateCondition(rule, data);

        // 根据 relation 处理逻辑关系
        if (rule.relation === 1) {
            // OR 关系，遇到 OR 关系时，如果结果为 false，则继续计算后面的条件
            if (!result) {
                return evaluateRules(data, rules.slice(rules.indexOf(rule) + 1));
            }
        }

        // 根据括号数量处理逻辑
        if (rule.leftParenthesis && !result) {
            // 如果当前条件不满足，且存在左括号，则递归计算括号内的条件
            return evaluateRules(data, rules.slice(rules.indexOf(rule) + 1));
        }

        if (rule.rightParenthesis && result) {
            // 如果当前条件满足，且存在右括号，则结束计算
            return true;
        }

        return result;
    }, true);
}

/*
function test(data, rules, result) {
    if (rules.length === 0) {
        return result;
    }

    for (const rule of rules) {

        const res = evaluateCondition(rule, data);

        // 根据括号数量处理逻辑
        if (rule.leftParenthesis && !res) {
            // 如果当前条件不满足，且存在左括号，则递归计算括号内的条件
            return evaluateRules(data, rules.slice(rules.indexOf(rule) + 1), res);
        }

        if (rule.rightParenthesis) {
            result = res;
            // 如果当前条件满足，且存在右括号，则结束计算
            return result;
        }



        if (res) {
            if (rule.relation === 1) {
                return true;
            } else {
                return evaluateRules(data, rules.slice(rules.indexOf(rule) + 1), true);
            }
        } else {
            if (rule.relation === 0) {
                return false;
            } else {
                return evaluateRules(data, rules.slice(rules.indexOf(rule) + 1), false);
            }
        }
    }
}
*/

function getMatchedLevel(data, parameters) {
    for (const item of data) {
        if (evaluateRules(parameters, item.rules)) {
            return item.level;
        }
        /*
        for (const rule of item.rules) {
            if (evaluateRules(parameters, item.rules)) {
                return item.level;
            }
            const { key, value, operator, relation } = rule;
            const leftParenthesis = rule.leftParenthesis || 0;
            const rightParenthesis = rule.rightParenthesis || 0;
            const paramValue = parameters[key];

            if (breakParenthesis) {
                if (rightParenthesis === 0) {
                    // rightParenthesis--;
                    continue;
                    // matchCount += rightParenthesis;
                } else {
                    if (isMatch) {
                        return item.level;
                    }
                }
                
            }

            if (evaluateCondition(rule, data)) {

            }

            // 检查是否满足条件

            console.log("等级", item.level, "规则： ", rule, "匹配数量：", matchCount);
            // 检查是否满足关系
            // if (matchCount >= leftParenthesis && matchCount <= rightParenthesis) {
            //     if (relation === 1) {
            //         return item.level;
            //     }
            // }
        }
*/

    }
    return 0; // 没有匹配到任何level
}

function testfunc(data) {
    const TEMP = data.TEM;
    const HUMP = data.HUM;
    const PRES = data.PRES;
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

const data = { TEMP: 12, HUMP: 0.1, PRES: 1000 };
const res1 = getMatchedLevel(jsonData, data);
const res2 = testfunc(data);
console.log("feat: ", res1, "test: ", res2, "data: ", data)

