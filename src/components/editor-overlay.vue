<style scoped>
  .editor-overlay {
    position: fixed;
    top: 0;
    left: 240px;
    right: 0;
    bottom: 0;
    background-color: white;
    z-index: 9999;
    .editor-tip {
      text-align: center;
      position: fixed;
      top: 50%;
      left: calc(50% + 120px);
      width: 100%;
      transform: translateY(-50%) translateX(-50%);
      text-shadow: 0 1px #eee;
      color: #333;
      .tip-cat {
        font-size: 15px;
        font-weight: bold;
      }
      .tip-content {
        margin-top: 10px;
        margin-bottom: 10px;
        font-size: 24px;
      }
      .tip-refresh {
        display: inline-block;
        height: 40px;
        line-height: 40px;
        width: 40px;
        border-radius: 2px;
        border: 1px solid #eee;
        cursor: pointer;
        color: #999;
        &:hover {
          background-color: #f9f9f9;
          color: #333;
          border-color: #ccc;
        }
      }
    }
  }
</style>

<template>
  <div class="editor-overlay">
    <div class="editor-tip">
      <div class="tip-cat">{{ tip.category }}</div>
      <div class="tip-content">{{ tip.tip }}</div>
      <div class="tip-refresh" @click="fetchTip">
        <span class="octicon octicon-sync"></span>
      </div>
    </div>
  </div>
</template>

<script>
  import { sidebarLoader } from '../helpers/loaders'
  export default {
    data () {
      return {
        tip: {
          tip: '',
          category: ''
        }
      }
    },
    methods: {
      fetchTip () {
        sidebarLoader.start()
        this.$http.get('https://lib.avosapps.com/tips', tip => {
          this.tip = tip
          sidebarLoader.stop()
        })
      }
    },
    ready () {
      this.fetchTip()
    }
  }
</script>
