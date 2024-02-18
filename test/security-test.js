// 安全性示例
const data = [
    {
        "level": 1,
        "rules": [
            {
                "key": "deviceTypeCount",
                "value": 6,
                "operator": 5,
                "relation": 0
            }
        ]
    },
    {
        "level": 2,
        "rules": [
            {
                "key": "deviceTypeCount",
                "value": 4,
                "operator": 5,
                "relation": 0
            },
            {
                "key": "deviceTypeCount",
                "value": 6,
                "operator": 2,
                "relation": 0
            }
        ]
    },
    {
        "level": 3,
        "rules": [
            {
                "key": "deviceTypeCount",
                "value": 4,
                "operator": 2,
                "relation": 0
            }
        ]
    }
]

function getLevel(ruleOptions) {
    let level = 0;
    const dataLen = data.length;
    for (let j = 0; j < dataLen; j++) {
        element = data[j];
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


for (i = -1; i < 10; i++) {
    const deviceTypeCount = i;
    const options = new Map([
        [
            "deviceTypeCount", deviceTypeCount,
        ]
    ])

    const result = getLevel(options)

    console.log("count: ", i, " level: ", result)
}