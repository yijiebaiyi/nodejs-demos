#!/bin/bash

echo "test output......";
image_file="C:\\Users\\yjby\\Desktop\\工作文件\\playphone1.1.tar"
image_id=$(docker load -q -i "$image_file")

echo "image_id: $image_id"
if ! docker ps -a > /dev/null 2>&1; then
    echo "$0: enable failed!"
    exit 1
fi
echo "docker ps success"
exit 0