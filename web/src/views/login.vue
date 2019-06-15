<template>
    <div class="form-signin">
        <h1 class="h3 mb-3 font-weight-normal">login</h1>
        <label for="inputUserName" class="sr-only">UserName</label>
        <input type="text" id="inputUsername" class="form-control" placeholder="UserName" required autofocus>
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" id="inputPassword" class="form-control" placeholder="Password" required>
        <button class="btn btn-lg btn-primary"  @click="login">Sign in</button>
    </div>
</template>

<script>
    import {BlogGetTokenReq} from "../blog/blog_pb"
    import {BlogClient} from '../blog/blog_grpc_web_pb'
    import {apiURL} from '../common/common'

    export default {
        name: "login",
        created() {
            this.client = new BlogClient(apiURL, null, null);
        },
        methods:{
            login:function () {
                let username = $("#inputUsername").val();
                let pwd = $("#inputPassword").val();
                console.log(username,pwd);
                let req = new BlogGetTokenReq();
                req.setUsername(username);
                req.setPassword(pwd);

                this.client.getToken(req,{},(err,resp)=>{
                    console.error(err);
                    console.log(resp);
                     let token = resp.getToken();
                     if (token){
                         localStorage.setItem('token',token.toString());
                     }
                    }
                )
            }

    }
    }
</script>
