<template>
  <div class="index row mt-3" id="index">
    <div class="col-md-12" id="articleList">
      <div class="card mb-3" v-for="art in articles">
        <img v-if="art.headimage != ''" :src="art.headimage" class="card-img-top">
        <div class="card-body">
          <router-link :to="objectIdToHREF(art.objectid)"><h5 class="card-title">{{art.title}}</h5></router-link>
          <p class="card-text">{{art.authorname}}</p>
          <p class="card-text">
            <small class="text-muted">更新于 {{fmtime(art.mtime)}}</small>
          </p>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import {BlogIndexReq} from "../blog/blog_pb"
  import {BlogClient} from '../blog/blog_grpc_web_pb'
  import {fmtime,apiURL} from '../common/common'


  export default {
    name: "index",
    data: function () {
      return {
        articles: []
      }
    },
    created() {
      this.client = new BlogClient(apiURL, null, null);
      this.getArticles();
    },
    methods: {
      getArticles: function () {
        let req = new BlogIndexReq();
        this.client.index(req, {}, (err, resp) => {
          this.articles = resp.toObject().articlesList;
          console.log(this.articles);
        });
      },
      objectIdToHREF: function (id) {
        return "/article/" + id;
      },
      fmtime: fmtime

    }
  }
</script>


