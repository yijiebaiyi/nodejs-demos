import { exec } from "shelljs";

// 执行命令并获取输出结果
const result = exec('bash ./sh/shelljs_test.sh');
if (result.code === 0) {
    console.log("成功");
} else {
    console.log("失败, 错误码：", result.code);
    const error = result.stderr; // 获取错误输出
    console.error("错误的输出", error);
}


let info = result.stdout;
console.log("标准输出：", info)