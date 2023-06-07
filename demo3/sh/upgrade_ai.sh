#!/bin/bash

# 算法管理 - 升级算法

# 请求参数备注
# container_name=$1
# image_path=$2
# nvr_api_url=$3
# algorithmStatus=$4
if [ $# -lt 4 ]; then
    echo "params error, now params count: $#"
    exit 9
fi

algorithmStatus=$4
container_name=$1

# 1.删除旧算法
bash ./sh/destroy_ai.sh "$container_name"
if [ $? -ne 0 ]; then
  echo "$0: destroy older version failed!"
  exit 1
fi

echo "$0: destroy older version success!"

# 2.如果当前状态是开启状态，则启用算法。否则不做操作。
if [ $algorithmStatus -eq 1 ]; then
  bash ./sh/enable_ai.sh "$@"
  if [ $? -ne 0 ]; then
    echo "$0: enable failed!"
    exit 2
  fi
  echo "$0: enable success"
fi

