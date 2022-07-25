<script>
    import api from '../../service/api.service';
    import {verifyEmail} from '../../lib/util.lib';
    export default {
        created() {
            this.interval1 = setInterval(() => { 
                this.nowTime = new Date().getTime();
                if (this.step === 1 && this.authExpireTime && new Date().getTime() > this.authExpireTime) {
                    this.authExpireTime = null;
                    this.issueToken = null;
                    alert('인증번호 입력시간이 만료 되었습니다.');
                }
            }, 10);
        },
        unmounted() {
            clearInterval(this.interval1);
        },
        inject: ['core'],
        methods: {
            timerFormat(ms) {
                return  `${String(Math.floor(ms / (1000 * 60))).padStart(2,'0')}:${String(Math.floor((ms % (1000 * 60)) / 1000)).padStart(2,'0')}`;
            },
            async submit1() {
                if (this.isSubmitting) {
                    return;
                }
                this.email = this.email.trim();
                if (!this.email || !verifyEmail(this.email)) { 
                     alert('올바른 이메일을 입력하세요.');
                    return;
                }
                this.isSubmitting = true;
                try {
                    const startTime = new Date().getTime();
                    const res = await api.resetPw1({email: this.email});
                    this.authExpireTime = startTime + res.data.remainMillisecond;
                    this.issueToken = res.data.issueToken;
                    setTimeout(() =>this.$refs.authCodeInput.focus());
                } catch(e) {

                }
                this.isSubmitting = false;
            },
            async submit2() {
                if (this.isSubmitting) {
                    return;
                }
                if (!this.authCode) {
                    alert('이메일 인증코드를 입력하세요.');
                    return;
                }
                this.isSubmitting = true;
                try {
                    const res = await api.resetPw2({email: this.email, issueToken: this.issueToken, authCode: this.authCode});
                    this.confirmToken = res.data.confirmToken;
                    this.step = 2;
                } catch(e) {
                }
                this.isSubmitting = false;
            },
            async submit3() {
                if (this.isSubmitting) {
                    return;
                }
                if (!confirm('입력한 정보를 새로운 비밀번호로 설정하겠습니까?')) {
                    return;
                }
                if (!this.password) {
                    alert(`새 비밀번호를 입력하세요.`);
                    return;
                }
                if (this.password !== this.passwordRe) {
                    alert(`비밀번호 재입력 항목이 올바르지 않습니다.`);
                    return;
                }
                this.isSubmitting = true;
                try {
                    const res = await api.resetPw3({email: this.email, confirmToken: this.confirmToken, newPassword: this.password, newPasswordConfirm: this.passwordRe});
                    this.confirmToken = res.data.confirmToken;
                    this.step = 3;
                } catch(e) {
                }
                this.isSubmitting = false;
            },
        },
        data() {
            return {
                core: this.core.state,
                step: 1,

                nowTime: null,
                interval1: null,
                isSubmitting: false,
                issueToken: null,
                authExpireTime: null,
                confirmToken: null,

                email: this.core.state.isLoggedIn ? this.core.state.user.email : '',
                password: '',
                passwordRe: '',
                authCode: '',

                logout: this.core.logout
            }
        }
    }
</script>

<template>
    <div class="container">
        <template v-if="step === 1">
            <div style="max-width: 350px; margin: 0 auto;">
                <div class="label">이메일</div>
                <div class="input-wrap">
                    <input placeholder="" v-model="email" :disabled="!!issueToken || isSubmitting || core.isLoggedIn" >
                    <button @click="submit1();" :disabled="!!issueToken || isSubmitting">
                        <span v-if="isSubmitting && !issueToken" class="fas fa-spinner fa-spin"></span>
                        <span v-if="!(isSubmitting && !issueToken)">인증진행</span>
                    </button>
                </div>
                <template v-if="issueToken">
                    <div class="label">이메일 인증코드</div>
                    <div class="input-wrap">
                        <div class="input-box">
                            <input placeholder="" v-model="authCode" :disabled="isSubmitting" ref="authCodeInput">
                            <div class="time">{{timerFormat(authExpireTime - nowTime)}}</div>
                        </div>
                        <button @click="submit2();" :disabled="isSubmitting">
                            <span v-if="isSubmitting" class="fas fa-spinner fa-spin"></span>
                            <span v-if="!isSubmitting">확인</span>
                        </button>
                    </div>
                    <div style="margin-top: 20px; background: #ddd; padding: 10px; line-height: 1.25;">{{email}}로 인증코드를 발송했습니다.<br/>메일함을 확인하세요.</div>

                </template>
            </div>
        </template>
        <template v-if="step === 2">
            <div style="max-width: 350px; margin: 0 auto;">
                <div class="alert-green pc-only">
                    <span class="fas fa-check"></span><span style="font-weight: bold;">&nbsp;이메일 인증성공 ({{email}})</span>
                </div>
                <div class="alert-green mobile-only">
                    <span class="fas fa-check"></span><span style="font-weight: bold;">&nbsp;{{email}}</span>
                </div>
                <div class="label">새 비밀번호 입력</div>
                <div class="input-wrap">
                    <input placeholder="" type="password" v-model="password" :disabled="isSubmitting" class="input-w">
                </div>
                <div class="label">비밀번호 재입력</div>
                <div class="input-wrap">
                    <input placeholder="" type="password" v-model="passwordRe" :disabled="isSubmitting" class="input-w">
                </div>
                <div style="text-align: right;">
                    <button class="btn-submit" @click="submit3();" :disabled="isSubmitting">
                        <span v-if="isSubmitting" class="fas fa-spinner fa-spin"></span>
                        <span v-if="!isSubmitting">확인</span>
                    </button>
                </div>
            </div>
        </template>

        <template v-if="step === 3">
            <div class="container form" >
                <div class="form-title">
                    <i class="far fa-check-circle" style="font-size: 60px; color: green;"></i>
                </div>
                <div class="form-title">비밀번호 재설정 완료</div>
                <div class="form-nav" v-if="core.isLoggedIn">
                    <router-link to="/"><button style="padding: 15px 20px;">홈으로</button></router-link>
                    <!-- <div style="width: 10px;"></div> -->
                    <!-- <button style="padding: 15px 30px;" @click="logout()">로그아웃</button> -->
                </div>
                <div class="form-nav" v-if="!core.isLoggedIn">
                    <router-link to="/auth/login"><button style="padding: 15px 20px;">로그인 페이지로</button></router-link>
                </div>
            </div>
        </template>
    </div>
</template>

<style scoped>
.container {
    max-width: 500px;
    padding: 10px 0;
}
.alert-green {
    width: 100%;
    background-color: rgb(225, 255, 225);
    color: green;
    display: inline-block;
    padding: 15px 20px;
    box-shadow: 0 0 0 1px rgba(0,0,0,.1) inset;
    margin: 20px 0 0;
}
.label {
    font-weight: bold;
    margin: 20px 0 10px;
}

input {
    position: relative;
    height: 45px;
    padding-left: 10px;
    background-color: #fff;
    width: 250px;
    border: 1px solid rgba(0,0,0,.15)
}

[disabled] {
    opacity: .5;
}
.input-wrap {
    display: flex;
    align-items: center;
}
.input-wrap button {
    height: 45px;
    padding: 0 15px;
    background-color: rgb(62 86 255);
    color: #fff;
    cursor: pointer;
    margin-left: 10px;
}
.input-wrap button:active {
    background-color: rgb(60, 73, 174);
}

.input-box {
    position: relative;
}
.input-box .time {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 15px;
    line-height: 45px;
    pointer-events: none;
    color: red;
}

.input-w {
    width: 350px;
}

.btn-submit {
    height: 50px;
    width: 120px;
    background-color: rgb(62 86 255);
    color: #fff;
    cursor: pointer;
    margin-top: 20px;
}

.fa-spinner {
}

.form {
    max-width: 400px; 
    text-align: center;
     padding-top: 30px;
}
.form .form-title {
    font-size: 24px;
    margin-top: 20px;
    font-weight: bold;
}
.form .form-nav {
    display: flex;
    align-items: center;
    justify-content: center;
}
.form .form-nav button {
     border: 1px solid #ddd;
     background-color: #f5f5f5;
     margin-top: 30px;
     border-radius: 5px;
     cursor: pointer;
}

.form .form-nav button:active {
    opacity: .7;
}
</style>

<style scoped>
  @media (max-width: 500px) {
    input {
        position: relative;
        height: 45px;
        padding-left: 10px;
        background-color: #fff;
        flex: 1;
        width: 100%;
        border: 1px solid rgba(0,0,0,.15)
    }
  }
</style>