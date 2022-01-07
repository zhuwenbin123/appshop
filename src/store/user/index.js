import { reqGetPhone,reqUserRegister,reqUserLogin,reqUserInfo,reqLoginOut } from '@/api'
const state = {
    code:'',
    token:localStorage.getItem('TOKEN'),
    userInfo:{},
}
const actions = {
    async getCode({commit},phone){
        let result =  await reqGetPhone(phone);
        if(result.code == 200){
            commit("GETCODE",result.data)
            return "OK"
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 用户注册
    async userRegister({commit},userObj){
        let result =  await reqUserRegister(userObj);
        if(result.code == 200){
            return "OK"
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 登入
    async userLogin({commit},data){
        let result = await reqUserLogin(data);
        if(result.code == 200){
            commit("USERLOGIN",result.data.token);
            localStorage.setItem("TOKEN",result.data.token)
            return "OK"
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 获取用户信息
    async getUserInfo({commit}){
        let result = await reqUserInfo();
        if(result.code == 200){
            commit("GETUSERINFO",result.data);
            return "OK"
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 退出登入
    async userLoginOut({commit}){
        let result = await reqLoginOut();
        if(result.code == 200){
            commit("CLEAR")
            return "OK"
        }else{
            return Promise.reject(new Error('faile'))
        }
    }
}
const mutations = {
    GETCODE(state,value){
        state.code = value
    },
    USERLOGIN(state,value){
        state.token = value
    },
    GETUSERINFO(state,value){
        state.userInfo = value
    },
    CLEAR(state){
        state.userInfo = {};
        state.token = '';
        localStorage.removeItem("TOKEN")
    }
}
const getters = {}
export default {
	state,
	actions,
	mutations,
	getters,
}
