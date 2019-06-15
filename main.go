package main

//go:generate protoc -I proto/ proto/blog/blog.proto --go_out=plugins=grpc:rpc
//go:generate protoc -I proto/ proto/blog/blog.proto --js_out=import_style=commonjs:web/src --grpc-web_out=import_style=commonjs,mode=grpcwebtext:web/src

import (
	"log"
	"net"

	"blog/rpc/blog"
	blogs "blog/service/blog"

	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

func main() {
	l, err := net.Listen("tcp", ":9090")
	if err != nil {
		log.Fatal(err)
		return
	}
	gs := grpc.NewServer()
	blog.RegisterBlogServer(gs, &blogs.Service{})
	reflection.Register(gs)
	gs.Serve(l)
}
