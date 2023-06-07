#!/bin/bash

# 算法管理 - 启用算法

if [ $# -lt 3 ]; then
    echo "$0: params error, now params count: $#"
    exit 9
fi

container_name=$1
image_path=$2
nvr_api_url=$3
volume_face_dir="/home/data"

## 判断容器是否存在
if ! docker container inspect $container_name > /dev/null 2>&1; then
  # 1. 容器不存在
  echo "$0: container [ $container_name ] does not exist, is preparing to run now..."
  # 1.1 判断镜像文件是否存在
  if [ ! -f "$image_path" ] && [ ! -r "$image_path"]; then
      echo "$0: image file [ $image_path ] does not exist or does not have read permission!"
      exit 8  
  fi

  # 1.2 加载镜像，并获取镜像名称
  image_name=$(docker load -q -i "$image_path" | awk -F ": " '{print $2}')

  # 1.3 运行容器
  if ! docker run -d --name $container_name -e containerName=$container_name -e apiUrl=$nvr_api_url -e volumeFaceDir=$volume_face_dir $image_name > /dev/null 2>&1;then
    echo "$0: container running failed，container name: [ $container_name ]; image name: [ $image_name ]"
    exit 2
  fi
else
  # 2. 容器存在
  # 2.1 判断容器状态
  container_status=$(docker container inspect -f '{{.State.Status}}' $container_name)
  if [ "$container_status" != "running" ]; then
    echo "$0: container [ $container_name ] state is [ $container_status ], is preparing to restart now "
    # 重启容器
    if ! docker restart $container_name > /dev/null 2>&1;then
        echo "$0: container restarting failed, container name: [ $container_name ]"
        exit 3
    fi
  else
    echo "$0: container [ $container_name ] is running"
  fi
fi
