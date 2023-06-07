#!/bin/bash

# 算法管理 - 卸载/删除算法

if [ -z "$1" ]; then
    echo "$0: params error"
    exit 9
fi

container_name=$1
# 容器不存在，直接退出
container=$(docker ps -a --format '{{.Names}}' | grep -w "$container_name")
if [ -z "$container" ]; then
  echo "$0: container [ "$container_name" ] does not exist"
  exit 0
fi

# 获取镜像名称
image_name=$(docker inspect -f '{{.Config.Image}}' $container_name)

# 删除容器
if ! docker rm -f "$container_name" > /dev/null 2>&1; then
  echo "$0: container [ "$container_name" ] stop & remove failed!"
  exit 1
fi

# 删除镜像
if ! docker rmi -f "$image_name" > /dev/null 2>&1; then
  echo "$0: image [ "$image_name" ] rm failed!"
  exit 2
fi


