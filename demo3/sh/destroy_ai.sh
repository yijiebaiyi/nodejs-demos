#!/bin/bash

# 算法管理 - 卸载/删除算法

if [ -z "$1" ]; then
    echo "$0: params error"
    exit 9
fi

image_name=$1
# 容器存在，先清除容器
containers=$(docker ps -a -q --filter ancestor="$image_name")
if [ -n "$containers" ]; then
  if ! docker rm -f "$containers" > /dev/null 2>&1; then
    echo "$0: container [ "$containers" ] stop & remove failed!"
    exit 1
  fi
fi

# 镜像不存在，直接退出
image=$(docker images -q "$image_name")
if [ -z "$image" ]; then
  echo "$0: image [ "$image_name" ] does not exist!"
  exit 0
fi

# 镜像存在，就删除镜像 
if ! docker rmi "$image_name" > /dev/null 2>&1; then
  echo "$0: image [ "$image_name" ] rm failed!"
  exit 2
fi