<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if="!userName">
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link class="register" to="/register">免费注册</router-link>
          </p>
          <p v-else>
              <a>{{userName}}</a>
              <a class="register" @click="loginOut">退出登入</a>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center/myorder">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" to="/home">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
          />
          <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      keyword:''
    };
  },
  components: {},
  mounted() {
    this.$bus.$on('clear',()=>{
      this.keyword = ''
    })
  },
  methods: {
    // 搜索按钮的回调
    goSearch(){
      if(this.$route.query){
        let location = {name:"search",params:{keyword:this.keyword || undefined}};
        location.query = this.$route.query
        this.$router.push(location)
      }
    },
    async loginOut(){
        try {
           await this.$store.dispatch('userLoginOut')
           this.$router.push('/home')
        } catch (error) {
            alert(error)
        }
    }
  },
  computed: {
      userName(){
          return this.$store.state.user.userInfo.name
      }
  }
};
</script>

<style scoped>
.header > .top {
  background-color: #eaeaea;
  height: 30px;
  line-height: 30px;
}
.header > .top .container {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}
.header > .top .container .loginList {
  float: left;
}
.header > .top .container .loginList p {
  float: left;
  margin-right: 10px;
}
.header > .top .container .loginList p .register {
  border-left: 1px solid #b3aeae;
  padding: 0 5px;
  margin-left: 5px;
}
.header > .top .container .typeList {
  float: right;
}
.header > .top .container .typeList a {
  padding: 0 10px;
}
.header > .top .container .typeList a + a {
  border-left: 1px solid #b3aeae;
}
.header > .bottom {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}
.header > .bottom .logoArea {
  float: left;
}
.header > .bottom .logoArea .logo img {
  width: 175px;
  margin: 25px 45px;
}
.header > .bottom .searchArea {
  float: right;
  margin-top: 35px;
}
.header > .bottom .searchArea .searchForm {
  overflow: hidden;
}
.header > .bottom .searchArea .searchForm input {
  box-sizing: border-box;
  width: 490px;
  height: 32px;
  padding: 0px 4px;
  border: 2px solid #ea4a36;
  float: left;
}
.header > .bottom .searchArea .searchForm input:focus {
  outline: none;
}
.header > .bottom .searchArea .searchForm button {
  height: 32px;
  width: 68px;
  background-color: #ea4a36;
  border: none;
  color: #fff;
  float: left;
  cursor: pointer;
}
.header > .bottom .searchArea .searchForm button:focus {
  outline: none;
}
</style>