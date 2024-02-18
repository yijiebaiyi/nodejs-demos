const jsonData = require('./jsondata');
function evaluateConditions(jsonData, variables) {
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
                case 2:
                    comparison = `${variables[key]} < ${value}`;
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

const variables = { TEM: 14, HUM: 0.2, PRES: 1100 };

// 执行函数
const matchedLevel = testfunc(variables);
const matchedLevel2 = evaluateConditions(jsonData, variables);
console.log("Matched Level:", matchedLevel);
console.log("Matched Level:", matchedLevel2);
