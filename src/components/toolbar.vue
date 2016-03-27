<template>
  <section class="toolbar">
    <div class="fl">
      <div class="file-name">
        {{ initialFile.fileName }}
      </div>
    </div>
    <div class="fr">
      <button class="btn toolbar-btn">预览</button>
    </div>
  </section>
</template>

<script>
  import {initialFile} from '../vuex/getters'

  export default {
    vuex: {
      getters: {initialFile}
    },
    data() {
      return {}
    }
  }
</script>

<style>
  @import "../css/variables";

  .toolbar {
    background-color: #f9f9f9;
    height: var(--toolBarHeight);
    line-height: var(--toolBarHeight);
    padding: 0;
    & .file-name {
      height: var(--toolBarHeight);
      line-height: var(--toolBarHeight);
      padding: 0 10px;
    }
  }
  .toolbar-btn {
    width: 100px;
  }
</style>
