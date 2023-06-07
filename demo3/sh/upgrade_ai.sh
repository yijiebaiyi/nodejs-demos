#!/bin/bash

# 算法管理 - 升级算法

# 请求参数备注
# container_name=$1
# image_name=$2
# image_path=$3
# nvr_api_url=$4
# face_volume_dir=$5
# algorithmStatus=$6
if [ $# -lt 6 ]; then
    echo "params error, now params count: $#"
    exit 9
fi

image_name=$2
algorithmStatus=$6

# 1.删除旧算法
bash ./sh/destroy_ai.sh "$image_name"
if [ $? -ne 0 ]; then
  echo "$0: destroy older version failed!"
  exit 1
fi

echo "$0: destroy older version success!"

# 2.如果当前状态是开启状态，则启用算法。否则不做操作。
$6=""
if [ $algorithmStatus -eq 1 ]; then
  bash ./sh/enable_ai.sh "$@"
  if [ $? -ne 0 ]; then
    echo "$0: enable failed!"
    exit 2
  fi
  echo "$0: enable success"
fi

