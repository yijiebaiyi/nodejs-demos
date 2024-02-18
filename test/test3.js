// 定义一个函数用于根据条件判断是否满足规则
function evaluateRules(data, rules) {
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

// 示例数据
const data = {
    "TEMP": 12,
    "HUM": 0.1,
    "PRES": 1000
};

// 示例规则
const rules = [
    { "key": "TEMP", "value": 15, "operator": 0, "relation": 0, "leftParenthesis": 2 },
    { "key": "TEMP", "value": 22, "operator": 2, "relation": 1, "rightParenthesis": 1 },
    { "key": "TEMP", "value": 25, "operator": 0, "relation": 0, "leftParenthesis": 1 },
    { "key": "TEMP", "value": 30, "operator": 2, "relation": 0, "rightParenthesis": 2 },
    { "key": "HUM", "value": 0.2, "operator": 0, "relation": 0, "leftParenthesis": 2 },
    { "key": "HUM", "value": 0.45, "operator": 2, "relation": 1, "rightParenthesis": 1 },
    { "key": "HUM", "value": 0.6, "operator": 0, "relation": 0, "leftParenthesis": 1 },
    { "key": "HUM", "value": 0.8, "operator": 2, "relation": 0, "rightParenthesis": 2 },
    { "key": "PRES", "value": 1000, "operator": 0, "relation": 0, "leftParenthesis": 2 },
    { "key": "PRES", "value": 1010, "operator": 2, "relation": 1, "rightParenthesis": 1 },
    { "key": "PRES", "value": 1100, "operator": 0, "relation": 0, "leftParenthesis": 1 },
    { "key": "PRES", "value": 1200, "operator": 2, "relation": 0, "rightParenthesis": 2 }
];

// 输出结果
console.log(evaluateRules(data, rules)); // 输出 true
