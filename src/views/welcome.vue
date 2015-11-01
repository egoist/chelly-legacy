<style scoped>
  .welcome {
    text-align: center;
    padding-top: 70px;
    h1 {
      font-size: 70px;
    }
    .welcome-locally {
      padding: 20px 0;
      margin-top: 50px;
      border-top: 1px solid #e2e2e2;
      span {
        cursor: pointer;
        &:hover {
          color: #4AA0D5;
        }
      }
    }
  }
  .no-notes {
    height: 50px;
    line-height: 50px;
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
  <div class="welcome">
    <h1>Chelly</h1>
    <template v-if="!showReg && !showLogin">
      <button class="btn no-notes" @click="showReg = showReg === true ? false : true">Create account</button>
      <button class="btn no-notes" @click="showLogin = showLogin === true ? false : true">Sign in</button>
    </template>
    <div class="welcome-reg" v-show="showReg">
      <form class="form">
        <div class="form-group">
          <input type="text" class="form-control">
        </div>
        <button class="btn btn-blue">Create account</button>
      </form>
    </div>
    <div class="welcome-locally">
      <span>Run Chelly Locally ››</span>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        showReg: false,
        showLogin: false
      }
    },
    methods: {
    }
  }
</script>
