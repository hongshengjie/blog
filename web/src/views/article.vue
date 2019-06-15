<template>
  <div class="article">
    <div>
      <div v-html="artContent">

      </div>
    </div>
  </div>

</template>

<script>
  import {BlogArticleReq} from "../blog/blog_pb"
  import {BlogClient} from '../blog/blog_grpc_web_pb'
  const MarkdownIt = require('markdown-it');
  import {apiURL} from '../common/common'

  export default {
    props: ['oid'],
    name: 'article',
    data:function () {
      return {
        artContent: "",
      }

    },
    created() {
      this.client = new BlogClient(apiURL, null, null);
      this.getArticle();
      this.md=new MarkdownIt();
    },
    methods:{
      getArticle:function () {
       let req = new BlogArticleReq();
       req.setOid(this.oid);
       this.client.article(req,{},(err,resp)=>{
         this.artContent= this.mdToHTML(resp.getArticle().toObject().contentmd);
       })

      },
      mdToHTML:function (mdcontent) {
       return this.md.render(mdcontent);
      }

    }
  }
</script>

