#!/usr/bin/env sh

# args: $1 = version, $2 = dokku app name
docker build . -f ./Dockerfile-be -t dokku/$2:latest -t dokku/$2:$1
docker save dokku/$2:$1 | ssh $DOKKU_HOST \"docker load\"
ssh $DOKKU_HOST \"dokku git:from-image $2 dokku/$2:$1\"
