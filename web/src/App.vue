<template>
  <div id="app">
    <div id="Nav">
      <NavBar></NavBar>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from "./components/navbar";


export default {
  name: "app",
  components: { NavBar }
};
</script>

<style lang="scss">
</style>
