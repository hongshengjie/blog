package model

import (
	"time"

	"blog/rpc/blog"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

// CategoryIDName CategoryIDName
var CategoryIDName = map[int32]*blog.Category{
	1: &blog.Category{Cid: 1, Name: "哲学"},
	2: &blog.Category{Cid: 2, Name: "编程语言"},
	3: &blog.Category{Cid: 3, Name: "数据库"},
	4: &blog.Category{Cid: 4, Name: "诗词"},

	11: &blog.Category{Cid: 11, Pcid: 1, Name: "阳明心学"},
	12: &blog.Category{Cid: 12, Pcid: 1, Name: "康德"},

	21: &blog.Category{Cid: 21, Pcid: 2, Name: "Golang"},
	22: &blog.Category{Cid: 22, Pcid: 2, Name: "Rust"},
	23: &blog.Category{Cid: 23, Pcid: 2, Name: "Javascript"},
}

// Article 文章
type Article struct {
	ObjectID    primitive.ObjectID `bson:"_id"`
	AuthorID    primitive.ObjectID `bson:"author_id"`    // 作者id
	Cid         int32              `bson:"cid"`          // 目录id
	PCid        int32              `bson:"p_cid"`        // 父目录id
	ReadCount   int32              `bson:"read_count"`   // 阅读数
	ZanCount    int32              `bson:"zan_count"`    // 点赞数
	Status      int32              `bson:"status"`       // 状态1：发表 0:未发表 2: 已删除
	Tags        []string           `bson:"tags"`         // 标签
	Title       string             `bson:"title"`        // 标题
	HeadImage   string             `bson:"head_image"`   // 头图
	AuthorName  string             `bson:"author_name"`  // 作者昵称
	AuthorFace  string             `bson:"author_face"`  // 作者头像
	Ctime       time.Time          `bson:"ctime"`        // 创建时间
	Mtime       time.Time          `bson:"mtime"`        // 修改时间
	ContentMD   string             `bson:"content_md"`   // markdown内容
	ContentHTML string             `bson:"content_html"` // html格式内容

}

// ArticleCollection 获取集合
func ArticleCollection() *mongo.Collection {
	return Mongo().Database("blog").Collection("article")
}
