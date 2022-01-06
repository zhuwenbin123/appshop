import { reqGetPhone,reqUserRegister,reqUserLogin,reqUserInfo } from '@/api'
const state = {
    code:'',
    token:'',
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
            commit("USERLOGIN",result.data.token)
            return "OK"
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    async getUserInfo({commit}){
        let result = await reqUserInfo();
        if(result.code == 200){
            commit("GETUSERINFO",result.data);
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
    }
}
const getters = {}
export default {
	state,
	actions,
	mutations,
	getters,
}
