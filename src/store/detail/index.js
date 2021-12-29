import {reqGoodsInfo,reqAddOrUpdateShopCart} from '@/api'
const state = {
    goodInfo:{}
};
const actions ={
    getGoodInfo({commit},skuid){
        reqGoodsInfo(skuid).then(res=>{
            if(res.code == 200){
                commit('GETGOODINFO',res.data)
            }
        })
    },
    async addOrUpdateShopCart({commit},{skuId,skuNum}){
         let result = await reqAddOrUpdateShopCart(skuId,skuNum);
        if(result.code == 200){
            return "OK"
        }else{
            return Promise.reject(new Error("fail"))
        }
    }
};
const mutations ={
    GETGOODINFO(state,value){
        state.goodInfo = value
    }
};
const getters ={
    categoryView(state){
        return state.goodInfo.categoryView || {}
    },
    skuInfo(state){
        return state.goodInfo.skuInfo || {}
    },
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList || []
    }
};
export default{
    state,
    actions,
    mutations,
    getters
}