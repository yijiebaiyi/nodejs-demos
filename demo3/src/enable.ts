import { exec } from 'child_process';

// 启用算法容器
let sh = "bash";
let shPath = "./sh/enable_ai.sh";
let containerName = "playphone1.1";
let imageName = "playphone:1.1";
let imagePath = "C:\\Users\\yjby\\Desktop\\工作文件\\playphone1.1.tar";
let nvrApiUrl = "172.19.1.198/ai-nvr";
let faceVolumnDir = "/home/ai-nvr/facedata"
let shParams: string[] = [
    sh,
    shPath,
    containerName,
    imageName,
    imagePath,
    nvrApiUrl,
    faceVolumnDir,
]
exec(shParams.join(" "), (error, stdout, stderr) => {
    if (error) {
        console.error(`执行脚本时发生错误: ${error}`);
    }
    console.log(`脚本的输出：${stdout}`);
    console.error(`脚本的错误输出：${stderr}`);
});
