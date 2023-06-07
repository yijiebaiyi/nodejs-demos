#!/bin/bash

# 算法管理 - 停用算法

if [ -z "$1" ]; then
    echo "params error"
    exit 9
fi

container_name=$1

# 容器不存在，直接返回成功
if ! docker container inspect $container_name > /dev/null 2>&1; then
  echo "$0: container [ $container_name ] does not exist! "
  exit 0
fi

if ! docker stop $container_name > /dev/null 2>&1; then
  echo "$0: container [ $container_name ] stop failed! "
  exit 2
fi