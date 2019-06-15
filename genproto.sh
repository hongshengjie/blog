#bin/bash

# 获取当前目录,

protoc -I proto/ proto/blog/*.proto --go_out=plugins=grpc:rpc

protoc -I proto/ proto/blog/*.proto --js_out=import_style=commonjs:web/src --grpc-web_out=import_style=commonjs,mode=grpcwebtext:web/src


#GOOS=linux GOARCH=amd64 go build