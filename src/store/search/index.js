// search模块小仓库
import {reqGetSearchInfo} from '@/api'


const state ={
    searchList:{}
};
const actions ={
    getSearchList({commit},params = {}){
        reqGetSearchInfo(params).then(res=>{
            if(res.code == 200){
                commit('GETSEARCHLIST',res.data)
            }
        })
    }
};
const mutations ={
    GETSEARCHLIST(state,value){
        state.searchList = value
    }
};
const getters ={
    goodsList(state){
        return state.searchList.goodsList || []
    },
    trademarkList(state){
        return state.searchList.trademarkList || []
    },
    attrsList(state){
        return state.searchList.attrsList || []
    }
};
export default{
    state,
    mutations,
    actions,
    getters
}