export const setCookie = (name: string,value: string, ms: number) => {
    let expires = '';
    if (ms) {
        let date = new Date();
        date.setTime(date.getTime() + (ms));
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '')  + expires + '; path=/';
}
export const getCookie = (name: string) => {
    let nameEQ = name + '=';
    let ca = document.cookie.split(';');
    for(let i=0;i < ca.length;i++) {
        let c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
export const removeCookie = (name: string) => {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

export const sleep = (ms: number) => new Promise(resolve=>setTimeout(resolve, ms));

export const verifyEmail = (str : string) => {  return /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i.test(str); }