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
  @import 'codemirror/lib/codemirror';
  @import 'src/css/preview-github2.css';
  @import 'src/css/grid.css';
  .btn {
    border: 1px solid #e2e2e2;
    padding: 0 12px;
    height: 40px;
    line-height: 40px;
    border-radius: 2px;
  }
  .form-control {
    padding: 5px 10px;
    outline: none;
    border: 1px solid #e2e2e2;
    border-radius: 2px;
    font-family: Helvetica, serif;
    &:focus {
      border-color: #35b5f4;
      box-shadow: 0 0 0 3px rgba(48,144,228,.1);
    }
  }
</style>

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
