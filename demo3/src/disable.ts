import { exec } from 'child_process';

// 停用算法容器
let sh = "bash";
let shPath = "./sh/disable_ai.sh";
let containerName = "playphone1.1";
let shParams: string[] = [
    sh,
    shPath,
    containerName,
]
exec(shParams.join(" "), (error, stdout, stderr) => {
    if (error) {
        console.error(`执行脚本时发生错误: ${error}`);
    }
    console.log(`脚本的输出：${stdout}`);
    console.error(`脚本的错误输出：${stderr}`);
});
