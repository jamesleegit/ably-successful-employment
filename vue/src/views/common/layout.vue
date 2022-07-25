<script>
    export default {
        inject: ['core'],
        data() { return { core: this.core.state };  }
    }
</script>

<template>
    <header>
        <div class="container">
            <div class="header">
                <!-- <button class="btn-toggle mobile-only"><i class="fas fa-bars"></i></button> -->
                <div class="logo"></div>
                <div style="flex: 1;"></div>
                <!-- 로그인 성공화면 -->
                <template v-if="core.isLoggedIn">
                    <!-- svg로 깔기 -->
                    <div><router-link to="/"><div class="thumb profile-thumb" :style="{'background-image': `url('${core.user.profileImage}')`}"></div></router-link></div>
                </template>
            </div>
        </div>
    </header>
    <main>
        <slot></slot>
    </main>
    <footer></footer>
</template>
<!-- show side -->

<style scoped>
    header {
        position: relative;
        z-index: 1;
        background-color: #fff;
    }
    .header {
        display: flex;
        align-items: center;
        height: 80px;
    }
    .header .logo {
        width: 157px;
        height: 80px;
        background-image: url(@/assets/logo.svg);
        background-repeat: no-repeat;
        background-position: left center;
    }
    /*  */
    .header .nav-item {
        display: block;
        text-decoration: none;
        color: rgb(31, 31, 31);
        font-weight: bold;
    }
    .nick {
        font-weight: bold;
        margin-left: 12px;
        font-size: 17px;
    }
    .profile-thumb{
        width: 55px;
        height: 55px;
        border-radius: 5px;
        background-color: rgb(239,239,239);
        box-shadow: 0 3px 5px rgba(0,0,0,.25), 0 0 0 1px rgba(0,0,0,.1) inset;
    }

    /* btn-toggle */
    .btn-toggle {
        width: 55px;
        height: 55px;
        border-radius: 5px;
        background-color: #eee;
        margin-right: 15px;
    }
    .btn-toggle:active {
        background-color: #ccc;
    }

    @media (max-width: 500px) {
    }
</style>
