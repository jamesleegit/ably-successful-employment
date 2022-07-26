<script>
import api from '../../service/api.service.ts';
import {setCookie, verifyEmail} from '../../lib/util.lib.ts';

export default {
  mounted() {
    document.title = `로그인`;
  },
  data() {
    return {
      email: '',
      password: '',
      isRequesting: false
    };
  },
  methods: {
    async login() {
      if (this.isRequesting) {
        return;
      }

      let {email, password, isRequesting} = this;
      email = email.trim();

      if (!email || !verifyEmail(email)) { 
        alert('올바른 이메일을 입력하세요.');
        this.$refs.email.focus();
        return;
      } 

      if (!password) {
        alert('비밀번호를 입력해 주세요');  
        this.$refs.password.focus();
        return;
      } 
      
      this.isRequesting = true;
      try {
        const res = await api.login({email, password});
        setCookie('authorization', res.data.accessToken);
        location.replace('/');
      } catch(e) { }
      this.isRequesting = false;
    },
    register() {
      alert('준비중인 기능입니다.');
    }
  }
}

const login = async () => {
};
</script>

<template>
  <div class="wrapper">
    <div class="container">
      <router-link to="/"><div class="logo-wrap"><img src="@/assets/logo.svg" class="logo" /></div> </router-link>
      <div class="login-wrap">
        <div class="input-wrap">
          <input placeholder="이메일" v-model="email" ref="email">
        </div>
        <div class="input-wrap">
          <input placeholder="비밀번호" type="password" v-model="password" ref="password">
        </div>
        <button class="btn-submit" aria-disabled="false" @click="login();">로그인</button>
      </div>
      <!-- 비밀번호 찾기 및 기타 옵션 -->
      <div class="etc-wrap">
        <a @click="register();">회원가입 (준비중)</a>
        <div class="vr"></div>
        <router-link to="/auth/reset-password"><a>비밀번호 찾기</a></router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.logo-wrap {
  padding: 0 0 30px;
  margin: 0 0 20px;
}
.logo {
  display: block;
  width: 200px;
  margin: 0 auto ;
}
.wrapper {
  /* padding: 50px 0; */
  background-color: #eff2f3;
  min-height: calc(100vh);
  display: flex;
  align-items: center;
  padding-bottom: 80px;
}
.container {
  max-width: 460px;
}
.login-wrap {
  background-color: #fff;
  padding: 40px;
}
.input-wrap {
}
.input-wrap input {
  display: block;
  width: 100%;
  height: 45px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 10px;
  padding-left: 5px;
  transition: background-color .2s ease-out, border-color .2s ease-out;
}
.input-wrap input:focus{
  background-color: rgb(255, 255, 232);
  border-color: #000;
}

.btn-submit {
  width: 100%;
  height: 60px;
  background-color: rgb(255, 81, 96);
  color: #fff;
  font-size: 20px;
  margin-top: 20px;
  cursor: pointer;
}
.btn-submit:active {
  background-color: rgb(197, 60, 71);
}

.etc-wrap {
  padding: 20px 0 35px;
  text-align: center;
}

.etc-wrap a {
  display: inline-block;
  color: #000;
  cursor: pointer;
}

.etc-wrap .vr {
  display: inline-block;
  height: 1.2em;
  width: 1px;
  background-color: rgba(0,0,0,.25);
  margin: 0 20px;
}
</style>

<style scoped>
  @media (max-width: 500px) {
    .wrapper {
      padding: 0;
    }
    .login-wrap {
      padding: 30px 20px;
    }
  }
</style>
