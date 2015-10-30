<style scoped>
  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: 240px;
    border-right: 1px solid #d9d9d9;
    background-color: #fff;
    .sidebar-header {
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #d9d9d9;
    }
    .global-notes-search, .new-btn {
      height: 25px;
      line-height: 25px;
      padding: 0;
      display: inline-block;
      width: 100%;
      text-align: center;
      font-size: 15px;
      border-color: #d4d4d4;
    }
    .new-btn {
      font-size: 12px;
      background-color: #5BAAEC;
      border-color: #5BAAEC;
      color: #fff;
    }
    .global-notes-search {
      text-align: left;
      position: relative;
      top: 1px;
      padding: 0 8px;
      &:focus {
        border-color: #35b5f4;
      }
    }
  }
</style>

<template>
  <div class="sidebar">
    <header class="sidebar-header">
      <div class="grid-8 with-padding">
        <input type="text" class="form-control global-notes-search"/>
      </div>
      <div class="grid-4 with-padding" style="padding-left: 0; text-align: right;">
        <a v-link="{ path: '/new' }" class="btn new-btn">New</a>
      </div>

    </header>
  </div>
</template>
