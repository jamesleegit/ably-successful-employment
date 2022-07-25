<script>
    import core from './service/core.service.ts';
    export default {
        provide: { core }
    };
</script>

<!-- 최초 로그인 정보를 가져온 다음 화면 렌더링 -->
<!-- => 부자연스러운 화면동작 막기위함 -->
<template v-if="core.inited">
  <router-view />
</template>

<style>
html,body {
    background-color: #fff;
    background-attachment: fixed;
    color: #000;
    margin: 0;
    padding: 0;
    letter-spacing: -1px;
    line-height: 1;
    word-break: break-all;
}

input,
a,
textarea,
button {
    line-height: 1;
    letter-spacing: -1px;
    font-size: 1em;
}

*{
    box-sizing: border-box;
    vertical-align: middle;
}

body, h1, h2, h3, h4, h5, h6, input, textarea, select, html, button, a { 
    font-family: -apple-system,BlinkMacSystemFont,"Apple SD Gothic Neo","Malgun Gothic","맑은 고딕",arial,굴림,Gulim,sans-serif;
}

button {
    background-color: transparent;
    color: #000;
    border:0;
    outline: 0;
    padding: 0;
}

input,
textarea {
    resize: none;
    color: #000;
    width: 100%;
    display: block;
    outline: 0;
    border: 0;
    background-color: transparent;
}

.container {
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 15px;
}

.thumb {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

a {
    text-decoration: none;
    color: inherit;
}


@media (max-width: 500px) {
    .mobile-only { display: block!important; }
    .pc-only { display: none!important; }
}

@media (min-width: 501px) {
    .mobile-only { display: none!important; }
    .pc-only { display: block!important; }
}
</style>
