#!/bin/bash

# 算法配置 - 开启/关闭配置（即重启算法容器）

if [ -z "$1" ]; then
    echo "params error"
    exit 9
fi

container_name=$1

# 容器不存在，直接返回失败
if ! docker container inspect $container_name > /dev/null 2>&1; then
  echo "$0: container [ $container_name ] does not exist! "
  exit 1
fi

# 重启容器
if ! docker restart $container_name > /dev/null 2>&1; then
  echo "$0: container [ $container_name ] restart failed! "
  exit 2
fi