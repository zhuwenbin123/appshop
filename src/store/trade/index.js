import {reqAddressInfo,reqOderInfo} from '@/api'
const state = {
    userAddress:[],
    oderInfo:[],
};
const actions ={
    async getUserAddress({commit}){
        let result =  await reqAddressInfo();
        if(result.code == 200){
            commit("GETUSERADDRESS",result.data)
        }
    },
    async getOrderInfo({commit}){
        let result = await reqOderInfo();
        if(result.code == 200){
            commit("GETORDERINFO",result.data)
        }
    }
};
const mutations = {
    GETUSERADDRESS(state,value){
        state.userAddress = value
    },
    GETORDERINFO(state,value){
        state.oderInfo = value
    }
};
const getters = {};
export default {
    state,
    actions,
    mutations,
    getters
}