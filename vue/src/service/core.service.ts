import { removeCookie, sleep } from "@/lib/util.lib";
import { reactive, readonly } from "vue";
import api from './api.service';

const state = reactive({
    user: null,
    time: 0,
    inited: false,
    get isLoggedIn() {
        return !!this.user;
    }
});

const updateUser = () => {
    return new Promise(async (resolve, reject)=>{
        try {
            const data = (await api.getMyInfo()).data;
            state.user = data;
            resolve(data);
        } catch(e) {
            reject(e);
        }
        state.inited = true;
    });
};

const logout = async (confirmed = false) => {
    if (confirmed && !confirm('로그아웃 하겠습니까?')) {
        return;
    }
    try { api.logout(); } catch(e) {}
    await sleep(100);
    removeCookie('authorization');
    location.reload();
};

export default {state: readonly(state), updateUser, logout};