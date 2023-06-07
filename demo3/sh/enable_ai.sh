#!/bin/bash

# 算法管理 - 启用算法

if [ $# -lt 5 ]; then
    echo "$0: params error, now params count: $#"
    exit 9
fi

container_name=$1
image_name=$2
image_path=$3
nvr_api_url=$4
face_volume_dir=$5

# 1.判断镜像是否存在
if ! docker image inspect $image_name > /dev/null 2>&1; then
  echo "$0: image [ $image_name ] does not exist, is preparing to load now..."
    if [ ! -f "$image_path" ] && [ ! -r "$image_path"]; then
        echo "$0: image file [ $image_path ] does not exist or does not have read permission!"
        exit 8  
    fi

  # 加载镜像
  if ! docker load -i $image_path > /dev/null 2>&1; then
    echo "$0: image [ $image_path ] loading failed"
    exit 1
  fi
fi


# 2.判断容器是否存在
if ! docker container inspect $container_name > /dev/null 2>&1; then
  echo "$0: container [ $container_name ] does not exist, is preparing to run now..."
  # 运行容器
  if ! docker run -d --name $container_name -e CONTAINER_NAME=$container_name -e NVR_API_URL=$nvr_api_url -e FACE_VOLUME_DIR=$face_volume_dir $image_name > /dev/null 2>&1;then
    echo "$0: container running failed，container name: [ $container_name ]; image name: [ $image_name ]"
    exit 2
  fi
else
  # 获取容器状态
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
