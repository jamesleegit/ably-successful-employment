<script>
    import {reactive}from 'vue';
    import { useRoute } from 'vue-router'
    import moment from 'moment';
    import Layout from '../common/layout.vue';
    import ResetPassword from '../common/reset-password.vue';

    const tabs = ['profile', 'reset-password'];

    export default {
        components: { Layout, ResetPassword },
        inject: ['core'],
        watch: {
            '$route'(to, from) {
                this.tabType = tabs.includes(to.query && to.query.tab) ? to.query.tab : 'profile';
            }
        },
        data() {
            return { 
                core: this.core.state,
                logout: this.core.logout,
                tabType: tabs.includes(this.$route.query && this.$route.query.tab) ? (this.$route.query.tab) : 'profile',
                tabNames: {
                    'profile': '프로필 정보',
                    'reset-password': '비밀번호 변경'
                }
            };
        },
        methods: {
            moment
        }
    }
</script>

<template>
    <layout>
        <div class="wrapper">
            <div class="background"></div>
            <div class="container" v-if="core.isLoggedIn">
                <div class="layout">
                    <div class="side about">
                        <div class="title">
                            <span class="nick">{{core.user.name}}</span>
                            <span>의 마이페이지</span>
                        </div>
                        <div class="nav-wrap">
                            <router-link to="?tab=profile"><button class="btn-tab" @click="tabType='profile'" :class="{active: tabType === 'profile'}">프로필 정보</button></router-link>
                            <router-link to="?tab=reset-password"><button class="btn-tab" @click="tabType='reset-password'" :class="{active: tabType === 'reset-password'}">비밀번호 변경</button></router-link>
                            <button class="btn-tab" @click="logout(true)">로그아웃</button>
                        </div>
                    </div>
                    <div class="main">
                        <div class="title">{{tabNames[tabType]}}</div>
                        <div class="content">
                            <template v-if="tabType === 'profile'">
                                <div class="label">이름</div>
                                <div>{{core.user.name}}</div>
                                <div class="label">이메일</div>
                                <div>{{core.user.email}}</div>
                                <div class="label">썸네일</div>
                                <div>
                                    <img :src="core.user.profileImage" class="thumb profile-thumb">
                                </div>
                                <div style="font-size: 13px; margin-top: 20px; color: #888;">{{moment(core.user.lastConnectedAt).format('YYYY년 MM월 DD일 hh시 mm분에 마지막으로 접속함')}}</div>
                            </template>
                            <template v-if="tabType === 'reset-password'">
                                <ResetPassword></ResetPassword>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </layout>
</template>
<style scoped>
    .wrapper {
        position: relative;
        height: 800px;
        height: calc(100vh - 80px);
        background-color: rgb(239,239,239);
    }
    .background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-position: center 0;
        background-repeat: no-repeat;
        background-size: cover;
        background-attachment: fixed;
    }
    .container {
        position: relative;
        z-index: 1;
        height: 100%;
    }
    .layout {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        height: 100%;
    }
    .layout > .side {
        width: 300px;
        height: 100%;
        padding: 25px 20px 0 0;
        border-right: 1px solid rgba(0,0,0,.1);
    }
    .layout > .main {
        flex: 1;
        width: 100%;
        height: 100%;
        border-right: 1px solid rgba(0,0,0,.1);
        overflow: auto;
    }
    .side .title {
        font-size: 18px;
        font-weight: bold;
    }
    .side .nick {
        color: rgb(255, 81, 96);
    }

    /* tab */
    .nav-wrap{
        margin-top: 20px;
    }
    .btn-tab {
        display: block;
        width: 100%;
        text-align: left;
        padding: 18px 0;
        border-bottom: 1px solid rgba(0,0,0,.1);
        cursor: pointer;
        margin-top: 5px;
    }
    .btn-tab::before {
        content: '';
        width: 8px;
        height: 8px;
        display: block;
        background-color: #bbb;
        display: inline-block;
        margin: 0 15px 0 10px;
        transform: rotate(45deg);
    }
    .btn-tab.active {
        color: #000;
        border-color: rgb(255, 81, 96);
    }
    .btn-tab.active::before {
        background-color: rgb(255, 81, 96);
    }

    /* main */
    .main .title {
        font-size: 17px;
        font-weight: bold;
        border-bottom: 1px solid rgba(0,0,0,.1);
        padding: 25px;
    }
    .main .label {
        font-weight: bold;
        margin: 20px 0 10px;
    }
    .main .content {
        padding: 0 25px;
    }
    .main .profile-thumb{
        width: 120px;
        height: 120px;
        box-shadow: 0 0 0 2px inset rgba(0,0,0,.25);
        border-radius: 5px;
        cursor: pointer;
    }
</style>

<style scoped>
    @media (max-width: 700px) {
        .wrapper, .container, .layout   {
            height: auto!important;
        }
        .wrapper {
            padding-bottom: 50vh;
        }
        .header {
            padding: 0 15px;
        }

        .layout {
            display: block;
        }

        .layout .side {
            width: 100%;
            height: auto;
            border: 0;
            padding: 0;
        }
        .layout .side .title {
            text-align: center;
            padding: 20px 0;
            border-bottom: 1px solid rgba(0,0,0,.1);
        }
        .layout .side .nav-wrap {
            margin-top: 0;
            display: flex;
        }
        .layout .side .nav-wrap button {
            margin-top: 0;
            flex: 1;
            text-align: center;
        }
        .layout .side .nav-wrap a {
            flex: 1;
            display: block;
            text-align: center;
        }
        .layout .side .nav-wrap button::before {
            display: none;
        }

        .layout > .main {
            height: auto;
            overflow: visible;
        } 
        .container{
            padding: 0;
        }
    }
</style>