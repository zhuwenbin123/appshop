// home模块小仓库
import {reqgetCategoryList,reqGetBannerList,reqGetfloorList} from '@/api'
const state ={
    categoryList:[],
    bannerList:[],
    floorList:[],
};
const actions ={
    categoryList({commit}){
        reqgetCategoryList().then(res=>{
            if(res.code == 200){
                commit('CATEGORYLIST',res.data)
            }
        })
    },
    getBannerList({commit}){
        reqGetBannerList().then(res=>{
            if(res.code == 200){
                commit('GETBANNERLIST',res.data)
            }
        })
    },
    getFloorList({commit}){
        reqGetfloorList().then(res=>{
            if(res.code == 200){
                commit('GETFLOORLIST',res.data)
            }
        })
    }
};
const mutations ={
    CATEGORYLIST(state,value){
        state.categoryList = value
    },
    GETBANNERLIST(state,value){
        state.bannerList = value
    },
    GETFLOORLIST(state,value){
        state.floorList = value
    }
};
const getters ={};
export default{
    state,
    mutations,
    actions,
    getters
}