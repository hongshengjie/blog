package model

import (
	"context"
	"fmt"
	"log"
	"sync"

	"go.mongodb.org/mongo-driver/mongo"
)

// Mongo mongo客户端
var mongoClient *mongo.Client
var clientOnce sync.Once
var err error

//Mongo  后去mongo客户端
func Mongo() *mongo.Client {
	if mongoClient == nil {
		clientOnce.Do(initClient)
	}
	return mongoClient
}

func initClient() {
	mongoClient, err = mongo.Connect(context.TODO())
	if err != nil {
		log.Fatal(err)
	}
	// Check the connection
	err = mongoClient.Ping(context.TODO(), nil)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Connected to MongoDB!")
}
