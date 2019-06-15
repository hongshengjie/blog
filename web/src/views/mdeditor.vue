<template>
  <div class="mdeditor">
    <form>
      <div class="row justify-content-end" style="margin: 10px">

        <input class="form-control col-md-4" id="title" placeholder="标题" v-model="title" >

        <div class="form-inline col-2">
          <label for="cid">类别:</label>
          <select class="form-control" id="cid">
            <option v-for="c in cat" :value="c.getCid()" v-if="c.getCid()==cid" selected >{{c.getName()}}</option>
            <option v-for="c in cat" :value="c.getCid()" v-if="c.getCid()!=cid"  >{{c.getName()}}</option>
          </select>
        </div>
        <input class="form-control col-2" id="headimage" placeholder="头图" v-model="headimage">
        <div class="btn-group col-4" >
          <button type="button" class="btn btn-info" @click="saveArticle">保存</button>
          <button type="button" class="btn btn-success" @click="publishArticle">发表</button>
          <button type="button" class="btn btn-danger" @click="delArticle">删除</button>
        </div>

      </div>
      <div class="row" style="margin: 10px">

      <textarea id="editor" class="col-6 form-control work" @input="mdToHTML" @scroll="scorllL"
                v-model="mdContent"></textarea>

        <div id="shower" class="col-6 work " @scroll="scorllR" style="border:solid cornflowerblue 2px;"
             v-html="htmlContent">

        </div>
      </div>
    </form>


  </div>


</template>

<script>

  import {BlogArticleReq, BlogAddReq,BlogArticle, BlogDelReq, BlogUpdateReq} from "../blog/blog_pb"
  import {BlogClient} from '../blog/blog_grpc_web_pb'
  import  {apiURL} from "../common/common";

  const MarkdownIt = require('markdown-it');
  export default {
    props: ['oid'],
    name: 'mdeditor',
    data: function () {
      return {
        title:"",
        headimage:"",
        mdContent: "",
        htmlContent: "",
        cat:[],
        article:null,
        cid:0
      }

    },
    created() {
      this.client = new BlogClient(apiURL, null, null);
      this.getArticle();
      this.md = new MarkdownIt();
    },

    methods: {
      mdToHTML: function () {
        this.htmlContent = this.md.render(this.mdContent);
      },
      scorllL: function () {
        $("#shower").scrollLeft($("#editor").scrollLeft());
        $("#shower").scrollTop($("#editor").scrollTop());

      },
      scorllR: function () {
        $("#editor").scrollLeft($("#shower").scrollLeft());
        $("#editor").scrollTop($("#shower").scrollTop());

      },

      getArticle: function () {
        let req = new BlogArticleReq();
        req.setOid(this.oid);
        this.client.article(req, {}, (err, resp) => {
          for (let x of resp.getCatMap().entries()) { // 遍历Map
            this.cat.push(x[1]);
          }
          if (resp.getArticle()!=null){
            let art=resp.getArticle().toObject();
            this.mdContent = art.contentmd;
            this.mdToHTML();
            this.title=art.title;
            this.headimage=art.headimage;
            this.cid= art.cid;
            this.article= art;
          }

        })
      },
      addArticle: function () {
        if (this.title==""){
          return ;
        }
        if (this.mdContent==""){
          return;
        }
        let cid =  $("#cid").val();
        if (cid==""){
          return ;
        }
        if (this.headimage==""){
          return;
        }
       let art = new BlogArticle();
        art.setTitle(this.title);
        art.setContentmd(this.mdContent);
        art.setCid(cid);
        art.setHeadimage((this.headimage));
        let req = new BlogAddReq();
        req.setArticle(art);
        this.client.add(req,{},(err,resp)=>{

          if (resp.getCode() != 0) {
            alert(resp.getMessage());
            return;
          }
          alert("success");
        })


      },
      publishArticle:function(){
        let req = new BlogUpdateReq();
        req.setObjectid(this.article.objectid);
        req.setStatus(1);
        this.client.update(req,{},(err,resp)=>{
          if (resp.getCode() != 0) {
            alert(resp.getMessage());
            return;
          }
          alert("success");
        })

      },
      saveArticle: function () {
        if (this.oid.length!=24){
          this.addArticle();
          return ;
        }
        let req = new BlogUpdateReq();
        req.setObjectid(this.oid);
        if (this.title!=""){
          req.setTitle(this.title);
        }
        if (this.mdContent!=""){
          req.setContentmd(this.mdContent);
        }
        let cid =  $("#cid").val();
        console.log(cid);
        if (cid!=""){
          req.setCid(cid);
        }
        if (this.headimage!=""){
          req.setHeadimage((this.headimage));
        }
        this.client.update(req,{},(err,resp)=>{
          if (resp.getCode() != 0) {
            alert(resp.getMessage());
            return;
          }
          alert("success");
        })


      },
      publishArticle:function(){
        let req = new BlogUpdateReq();
        req.setObjectid(this.article.objectid);
        req.setStatus(1);
        this.client.update(req,{},(err,resp)=>{
          if (resp.getCode() != 0) {
            alert(resp.getMessage());
            return;
          }
          alert("success");
        })

      },
      delArticle: function () {
        let req = new BlogDelReq();
        req.setObjectid(this.oid);
        this.client.del(req, {}, (err, resp) => {
          if (resp.getCode() != 0) {
            alert(resp.getMessage());
            return;
          }
          alert("success");
        })

      },

    }
  }
</script>

<style lang="scss">
  .work {
    height: 800px;
    overflow: auto;

  }


</style>
