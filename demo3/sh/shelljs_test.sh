#!/bin/bash

echo "test output......";

if ! docker ps -a > /dev/null 2>&1; then
    echo "$0: enable failed!"
    exit 1
fi
echo "docker ps success"
exit 0