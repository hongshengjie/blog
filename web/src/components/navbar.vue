<template>
  <!-- 导航栏 -->
  <div class="row">
    <div class="col-12">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <button class="navbar-toggler" type="button" data-toggle="collapse"
                data-target="#bs-example-navbar-collapse-1">
          <span class="navbar-toggler-icon"></span>
        </button>
        <a class="navbar-brand" href="/">洪胜杰的网站</a>
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" href="#">哲学</a>
            </li>

            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" id="navbarDropdownMenuLink"
                 data-toggle="dropdown">技术</a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <a class="dropdown-item" href="#">Golang</a>
                <a class="dropdown-item" href="#">Rust</a>
                <a class="dropdown-item" href="#">Javascript</a>
                <div class="dropdown-divider">
                </div>
                <a class="dropdown-item" href="#">Clang</a>
              </div>
            </li>

          </ul>

          <ul class="navbar-nav ml-md-auto">
            <li class="nav-item ">
              <a class="nav-link" href="#">杂言</a>
            </li>

            <form class="form-inline">
              <input class="form-control mr-sm-2" type="text"/>
              <button class="btn btn-primary my-2 my-sm-0" type="submit">
                搜索
              </button>
            </form>

          </ul>
        </div>
      </nav>
    </div>
  </div>

</template>

<script>
  export default {
    name: "NavBar"
  }
</script>


