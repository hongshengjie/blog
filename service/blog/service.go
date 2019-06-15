package blog

import (
	"blog/service/tool/auth"
	"context"
	"errors"
	"fmt"
	"log"
	"time"

	"blog/model"
	"blog/rpc/blog"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// Service Service
type Service struct{}

// Index Index首页加载数据
func (s *Service) Index(ctx context.Context, req *blog.BlogIndexReq) (*blog.BlogIndexResp, error) {

	findOptions := options.Find()
	findOptions.SetLimit(20)
	findOptions.SetSort(bson.M{"_id": -1})
	cur, err := model.ArticleCollection().Find(ctx, bson.D{}, findOptions)
	if err != nil {
		log.Fatal(err)
	}
	defer cur.Close(ctx)

	arList := make([]*blog.BlogArticle, 0, 20)

	for cur.Next(ctx) {
		var result model.Article
		err := cur.Decode(&result)
		if err != nil {
			log.Fatal(err)
			continue
		}
		r := modelToProto(&result)
		arList = append(arList, r)

	}
	if err := cur.Err(); err != nil {
		log.Fatal(err)
	}
	return &blog.BlogIndexResp{Articles: arList, Cat: model.CategoryIDName}, nil
}

//List 文章列表页
func (s Service) List(ctx context.Context, req *blog.BlogListReq) (*blog.BlogListResp, error) {

	return &blog.BlogListResp{}, nil
}

// Article 文章详情页
func (s *Service) Article(ctx context.Context, req *blog.BlogArticleReq) (*blog.BlogArticleResp, error) {

	resp := &blog.BlogArticleResp{
		Cat: model.CategoryIDName,
	}
	oid, err := primitive.ObjectIDFromHex(req.GetOid())
	if err != nil {
		return resp, nil
	}
	var a model.Article
	if err := model.ArticleCollection().FindOne(ctx, bson.M{"_id": oid}).Decode(&a); err != nil {
		return resp, nil
	}
	resp.Article = modelToProto(&a)
	return resp, nil

}

// Add Add
func (s Service) Add(ctx context.Context, req *blog.BlogAddReq) (*blog.StatusResp, error) {
	userID := auth.GetUserIDFromContext(ctx)
	if userID == "" {
		return nil, errors.New("未登陆")
	}
	userOID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		return nil, errors.New("未登陆-oid")
	}

	var user model.User
	if err := model.UserCollection().FindOne(ctx, bson.M{"_id": userOID}).Decode(&user); err != nil {
		return nil, err
	}

	ar := req.GetArticle()
	var pcid int32
	if v, ok := model.CategoryIDName[ar.GetCid()]; ok {
		pcid = v.Pcid
	}
	a := &model.Article{
		ObjectID:    primitive.NewObjectID(),
		AuthorID:    user.ObjectID,
		Cid:         ar.GetCid(),
		PCid:        pcid,
		Tags:        ar.GetTags(),
		Title:       ar.GetTitle(),
		HeadImage:   ar.GetHeadImage(),
		AuthorName:  user.UserName,
		AuthorFace:  user.Face,
		ContentHTML: ar.GetContentHTML(),
		ContentMD:   ar.GetContentMD(),
		Ctime:       time.Now(),
		Mtime:       time.Now(),
	}
	if _, err := model.ArticleCollection().InsertOne(ctx, a); err != nil {
		return nil, err
	}

	return &blog.StatusResp{Message: "OK"}, nil
}

// Del Del
func (s Service) Del(ctx context.Context, req *blog.BlogDelReq) (*blog.StatusResp, error) {
	userID := auth.GetUserIDFromContext(ctx)
	if userID == "" {
		return &blog.StatusResp{Code: 1, Message: "未登录"}, nil
	}
	_, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		return nil, errors.New("未登陆-oid")
	}

	oid, err := primitive.ObjectIDFromHex(req.GetObjectID())
	if err != nil {
		return &blog.StatusResp{Code: 1, Message: "wrong id"}, nil
	}
	filter := bson.M{"_id": oid}

	update := bson.M{
		"$set": bson.M{
			"status": 2,
			"mtime":  time.Now(),
		},
	}

	if _, err := model.ArticleCollection().UpdateOne(ctx, filter, update); err != nil {
		return &blog.StatusResp{Code: 1, Message: err.Error()}, nil
	}
	return &blog.StatusResp{}, nil
}

// Update Update
func (s Service) Update(ctx context.Context, req *blog.BlogUpdateReq) (*blog.StatusResp, error) {

	userID := auth.GetUserIDFromContext(ctx)
	if userID == "" {
		return &blog.StatusResp{Code: 1, Message: "未登录"}, nil
	}

	oid, err := primitive.ObjectIDFromHex(req.GetObjectID())
	if err != nil {
		return &blog.StatusResp{Code: 1, Message: "wrong id"}, nil

	}
	filter := bson.M{"_id": oid}
	fields := bson.M{"mtime": time.Now()}
	if req.GetTitle() != "" {
		fields["title"] = req.GetTitle()
	}
	var pcid int32
	if v, ok := model.CategoryIDName[req.GetCid()]; ok {
		pcid = v.Pcid
	}
	if req.GetCid() != 0 {
		fields["cid"] = req.GetCid()
		fields["p_cid"] = pcid
	}
	if len(req.GetTags()) > 0 {
		fields["tags"] = req.GetTags()
	}
	if req.GetHeadImage() != "" {
		fields["head_image"] = req.GetHeadImage()
	}
	if req.GetContentMD() != "" {
		fields["content_md"] = req.GetContentMD()
	}
	if req.GetContentHTML() != "" {
		fields["content_html"] = req.GetContentHTML()
	}
	if req.GetStatus() != 0 {
		fields["status"] = req.GetStatus()
	}
	inc := bson.M{}
	if req.GetReadCount() != 0 {
		inc["read_count"] = req.GetReadCount()
	}
	if req.GetZanCount() != 0 {
		inc["zan_count"] = req.GetZanCount()
	}

	update := bson.M{
		"$set": fields,
	}
	if len(inc) > 0 {
		update["$inc"] = inc
	}

	if _, err := model.ArticleCollection().UpdateOne(ctx, filter, update); err != nil {
		return &blog.StatusResp{Code: 1, Message: err.Error()}, nil
	}

	return &blog.StatusResp{}, nil
}

// GetToken GetToken
func (s *Service) GetToken(ctx context.Context, req *blog.BlogGetTokenReq) (*blog.BlogGetTokenResp, error) {
	var user model.User
	if err := model.UserCollection().FindOne(ctx, bson.M{"username": req.GetUsername()}).Decode(&user); err != nil {
		return nil, err
	}
	if user.PassWord != req.GetPassword() {
		return nil, errors.New("密码错误")
	}
	t, err := auth.NewToken(user.UserName)
	fmt.Println(t)
	if err != nil {
		return nil, err
	}
	return &blog.BlogGetTokenResp{Token: t}, nil

}

func modelToProto(a *model.Article) *blog.BlogArticle {
	return &blog.BlogArticle{
		ObjectID:    a.ObjectID.Hex(),
		Title:       a.Title,
		Tags:        a.Tags,
		HeadImage:   a.HeadImage,
		AuthorName:  a.AuthorName,
		AuthorFace:  a.AuthorFace,
		ReadCount:   a.ReadCount,
		ZanCount:    a.ZanCount,
		ContentMD:   a.ContentMD,
		ContentHTML: a.ContentHTML,
		Ctime:       a.Ctime.Unix(),
		Mtime:       a.Mtime.Unix(),
		Cid:         a.Cid,
		Pcid:        a.PCid,
	}
}
