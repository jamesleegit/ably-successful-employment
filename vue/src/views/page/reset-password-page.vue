<script>
import ResetPassword from '../common/reset-password.vue';

export default {
    components: {ResetPassword},
}

const login = async () => {
};
</script>

<template>
  <div class="wrapper">
    <div class="container">
      <router-link to="/"><div class="logo-wrap"><img src="@/assets/logo.svg" class="logo" /></div></router-link>
      <div class="login-wrap">
        <div class="title">비밀번호 재설정</div>
        <reset-password ref="child"></reset-password>
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
  padding: 20px 40px 40px;
}
.title {
    padding-top: 20px;
    font-size: 20px;
    font-weight: bold;
    border-bottom: 1px solid #eee;
    padding-bottom: 20px;
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
    .title {
      padding-top: 0;
    }
  }
</style>
