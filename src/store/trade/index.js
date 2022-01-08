import {reqAddressInfo,reqOderInfo} from '@/api'
const state = {
    userAddress:[],
    oderInfo:[],
};
const actions ={
    getUserAddress({commit}){
        reqAddressInfo().then(res=>{
            if(res.code == 200){
                commit("GETUSERADDRESS",res.data)
            }
        })
    },
    getOrderInfo({commit}){
        reqOderInfo().then(res=>{
            if(res.code == 200){
                commit("GETORDERINFO",res.data)
            }
        })
    }
};
const mutations = {
    GETUSERADDRESS(state,value){
        console.log(value);
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