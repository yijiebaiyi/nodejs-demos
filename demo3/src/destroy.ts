import { exec } from 'child_process';

// 卸载算法容器
let sh = "bash";
let shPath = "./sh/destroy_ai.sh";
let imageName = "playphone:1.1";
let shParams: string[] = [
    sh,
    shPath,
    imageName,
]
exec(shParams.join(" "), (error, stdout, stderr) => {
    if (error) {
        console.error(`执行脚本时发生错误: ${error}`);
    }
    console.log(`脚本的输出：${stdout}`);
    console.error(`脚本的错误输出：${stderr}`);
});
