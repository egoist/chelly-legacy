<style>
  body {
    margin: 0;
    font: 14px/1.4 Helvetica, serif;
    position: relative;
  }
  a {
    color: #333;
    text-decoration: none;
  }
</style>
<style src="codemirror/lib/codemirror.css"></style>
<style src="./css/preview-github2.css"></style>
<style src="./css/grid.css"></style>
<style src="./css/form.css"></style>

<style scoped>
  h1 {
    color: red;
  }
</style>

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data () {
      return {

      }
    },
    ready () {
      console.log('inited')
    }
  }
</script>
