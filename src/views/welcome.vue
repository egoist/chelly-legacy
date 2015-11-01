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
      <form class="form center" @submit="handleRegister">
        <div class="form-group">
          <input type="email" class="form-control" placeholder="Email" v-model="userForReg.email">
        </div>
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Username" v-model="userForReg.username">
        </div>
        <div class="form-group">
          <input type="password" class="form-control" placeholder="Password" v-model="userForReg.password">
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
  import { url } from '../helpers/api'
  import biu from '../helpers/biu'
  export default {
    data () {
      return {
        showReg: false,
        showLogin: false,
        userForReg: {
          username: '',
          password: '',
          email: ''
        }
      }
    },
    methods: {
      handleRegister (e) {
        e.preventDefault()
        this.$http.post(url('register'), {user: this.userForReg}, data => {
          if (data.code) {
            return biu({
              type: 'error',
              text: data.message,
              autoHide: true
            })
          }
        })
      }
    }
  }
</script>
