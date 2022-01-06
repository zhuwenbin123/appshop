import {reqCartList,reqDeleteCart,reqUpdateCheckedById} from '@/api'
const state = {
    cartList:[]
};
const actions ={
    getCartList({commit}){
        reqCartList().then(res=>{
            if(res.code == 200){
                commit('GETRESULTLIST',res.data)
            }
        })
    },
    // 删除购物车某一个产品
    async deleteCartList({commit},skuId){
        let result = await reqDeleteCart(skuId);
        if(result.code == 200){
            return "OK"
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 修改购物车某一个产品的状态
    async updateCheckedById({commit},{skuId,isChecked}){
        let result = await reqUpdateCheckedById(skuId,isChecked);
        if(result.code == 200){
            return "OK"
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    deleteAllCheckedCart({dispatch,getters}){
        let promiseArray = [];
        getters.cartList.cartInfoList.forEach(item=>{
            let promise =  item.isChecked == 1?dispatch('deleteCartList',item.skuId):'';
            promiseArray.push(promise)
        })
        return Promise.all(promiseArray)
    },
    updateAllCartIsChecked({dispatch,state},isChecked){
        let promiseArray = [];
        state.cartList.forEach(item=>{
            let promise =  dispatch('updateCheckedById',{skuId:item.skuId,isChecked});
            promiseArray.push(promise)
        })
        return Promise.all(promiseArray)
    }
};
const mutations = {
    GETRESULTLIST(state,value){
        state.cartList = value
    }
};
const getters ={
    cartList(state){
        return state.cartList[0] || {};
    }
};
export default {
    state,
    actions,
    mutations,
    getters
}