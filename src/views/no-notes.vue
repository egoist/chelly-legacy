<style scoped>
  .no-notes {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    height: 40px;
    line-height: 40px;
    width: 230px;
    text-align: center;
    font-size: 18px;
    color: #fff;
    background-color: #5BAAEC;
    border-color: #5BAAEC;
    letter-spacing: 1px;
    &:hover {
      background-color: #4AA0D5;
    }
  }
</style>

<template>
  <a v-link="{ path: '/new' }" class="btn no-notes">Create your first note!</a>
</template>

<script>
  import { progressJS } from '../helpers/progress'
  export default {
    methods: {
    }
  }
</script>
