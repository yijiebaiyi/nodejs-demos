const http = require('http');
const fs = require('fs');

// 保存文件的地址
const filePath = '../images/download.jpg';  // 文件保存的路径
const file = fs.createWriteStream(filePath);

// POST 请求的选项设置
const options = {
    hostname: '127.0.0.1',
    path: '/dowload_file',
    port: 9090,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
};

const data = {
    "id": 0,
    "user_name": "ccb-test",
    "token": "abc123456",
    "file_path": "./result_img/phone_open.jpg"
};

// 要发送的数据
const postData = JSON.stringify(data);

// 发送 POST 请求
const req = http.request(options, function (res) {
    // 这里是接收文件数据
    res.pipe(file);

    file.on('finish', function () {
        file.close();
        console.log('文件下载完成');
    });
    /*let responseData = '';

    // 这里是正常的post请求响应
    res.on('data', function (chunk) {
        responseData += chunk;
    });
    // 响应完成时处理数据
    res.on('end', function () {
        console.log('响应数据:', responseData);
    });*/
}).on('error', function (err) {
    console.error('文件下载错误:', err.message);
});

// 发送请求时发生错误处理
req.on('error', function (err) {
    console.error('请求错误:', err);
});

// 发送数据
req.write(postData);
req.end();
