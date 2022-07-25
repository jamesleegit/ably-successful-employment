import { getCookie } from '@/lib/util.lib';
import axios, {Axios} from 'axios';

class ApiService {
    axios: Axios;
    apiUrl = 'https://ably-frontend-assignment-server.vercel.app/api';
    constructor() {
        this.axios = axios.create();

        this.axios.interceptors.request.use(config=>{
            config.headers = {
                'Content-Type': 'application/json',
                ...config.headers,
            };

            const jwtToken = getCookie('authorization');
            if (jwtToken) {
                config.headers['Authorization'] = jwtToken;
            }

            return config;
        });

        this.axios.interceptors.response.use(
            response=>{
                return response;
            },
            error => {
                // 에러 메세지가 있다면 Back-end error mesage Alert 호출
                if (![401].includes(error.response.status) && error && error.response && error.response.data && error.response.data.error && error.response.data.error.message) {
                    alert(error.response.data.error.message);
                } 
                return error;
            }
        );
    }

    login(data: {email: string; password: string}) {
        return this.axios.post<{accessToken: string;}>(`${this.apiUrl}/login`, data);
    }
    
    logout() {
        return this.axios.post(`${this.apiUrl}/logout`);
    }

    getMyInfo() {
        return this.axios.get<any>(`${this.apiUrl}/user`);
    }
    
    // 비밀번호 재설정
    resetPw1(data: {email: string; }) {
        return this.axios.get<{remainMillisecond: number; issueToken: string;}>(`${this.apiUrl}/reset-password`, {params:{ email: data.email }});
    }
    resetPw2(data: {email: string; authCode: string; issueToken: string; }) {
        return this.axios.post<{confirmToken: string;}>(`${this.apiUrl}/reset-password`, data);
    }
    resetPw3(data: {email: string; confirmToken: string; newPassword: string; newPasswordConfirm: string; }) {
        return this.axios.patch(`${this.apiUrl}/reset-password`, data);
    }
}

export default <ApiService> new ApiService();