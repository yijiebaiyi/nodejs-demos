// 安全性json请求示例
const securityJson = [
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
];

// 空气质量json请求示例
const airJson = [
    {
        "level": 1,
        "rules": [
            {
                "key": "PM2.5",
                "value": 0,
                "operator": 5,
                "relation": 0
            },
            {
                "key": "PM2.5",
                "value": 35,
                "operator": 6,
                "relation": 0
            },
            {
                "key": "PM10",
                "value": 0,
                "operator": 5,
                "relation": 0
            },
            {
                "key": "PM10",
                "value": 50,
                "operator": 6,
                "relation": 0
            },
            {
                "key": "ozone",
                "value": 0,
                "operator": 5,
                "relation": 0
            },
            {
                "key": "ozone",
                "value": 160,
                "operator": 6,
                "relation": 0
            }
        ]
    },
    {
        "level": 2,
        "rules": [
            {
                "key": "PM2.5",
                "value": 35,
                "operator": 0,
                "relation": 0
            },
            {
                "key": "PM2.5",
                "value": 75,
                "operator": 6,
                "relation": 0
            },
            {
                "key": "PM10",
                "value": 50,
                "operator": 0,
                "relation": 0
            },
            {
                "key": "PM10",
                "value": 150,
                "operator": 6,
                "relation": 0
            },
            {
                "key": "ozone",
                "value": 160,
                "operator": 0,
                "relation": 0
            },
            {
                "key": "ozone",
                "value": 200,
                "operator": 6,
                "relation": 0
            }
        ]
    },
    {
        "level": 3,
        "rules": [
            {
                "key": "PM2.5",
                "value": 75,
                "operator": 0,
                "relation": 1
            },
            {
                "key": "PM10",
                "value": 150,
                "operator": 0,
                "relation": 1
            },
            {
                "key": "ozone",
                "value": 200,
                "operator": 0,
                "relation": 1
            }
        ]
    }
]

// 环境质量json请求示例
const envJson = [
    {
        "level": 1,
        "rules": [
            {
                "key": "formaldehyde",
                "value": 0,
                "operator": 1,
                "relation": 0
            },
            {
                "key": "TVOC",
                "value": 0,
                "operator": 1,
                "relation": 0
            }
        ]
    },
    {
        "level": 2,
        "rules": [
            {
                "key": "formaldehyde",
                "value": 0,
                "operator": 0,
                "relation": 0
            },
            {
                "key": "formaldehyde",
                "value": 0.07,
                "operator": 6,
                "relation": 0
            },
            {
                "key": "TVOC",
                "value": 0,
                "operator": 0,
                "relation": 0
            },
            {
                "key": "TVOC",
                "value": 0.6,
                "operator": 6,
                "relation": 0
            }
        ]
    },
    {
        "level": 3,
        "rules": [
            {
                "key": "formaldehyde",
                "value": 0.07,
                "operator": 0,
                "relation": 0
            },
            {
                "key": "TVOC",
                "value": 0.6,
                "operator": 0,
                "relation": 0
            }
        ]
    }
];

// 舒适度json请求示例
const comfortJson = [
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
const evaluateConditions = (jsonData, variables) => {
    let level = 0; // 默认情况下，没有匹配的level
    let expression = ''; // 初始化条件表达式为空字符串

    for (const ruleSet of jsonData) {
        const rules = ruleSet.rules;
        let ruleExpression = ''; // 初始化规则表达式为空字符串

        for (let i = 0; i < rules.length; i++) {
            const rule = rules[i];
            const key = rule.key;
            const value = rule.value;
            const operator = rule.operator;
            const relation = rule.relation === 0 ? ' && ' : ' || ';

            // 拼接比较表达式
            let comparison;
            switch (operator) {
                case 0:
                    comparison = `${variables[key]} > ${value}`;
                    break;
                case 1:
                    comparison = `${variables[key]} === ${value}`;
                    break;
                case 2:
                    comparison = `${variables[key]} < ${value}`;
                    break;
                case 3:
                    comparison = `${variables[key]} !== ${value}`;
                    break;
                case 5:
                    comparison = `${variables[key]} >= ${value}`;
                    break;
                case 6:
                    comparison = `${variables[key]} <= ${value}`;
                    break;
                default:
                    comparison = '';
            }

            // 处理括号
            if (rule.leftParenthesis) {
                comparison = '('.repeat(rule.leftParenthesis) + comparison;
            }
            if (rule.rightParenthesis) {
                comparison += ')'.repeat(rule.rightParenthesis);
            }

            ruleExpression += comparison;

            // 添加条件之间的关系
            if (i < rules.length - 1) {
                ruleExpression += relation;
            }
        }

        // 计算并更新匹配的level
        if (eval(ruleExpression)) {
            level = ruleSet.level;
            expression = ruleExpression;
        }
    }

    return level;
}

exports.evaluateConditions = evaluateConditions;
exports.comfortJson = comfortJson;
exports.securityJson = securityJson;
exports.airJson = airJson;
exports.envJson = envJson;