<template>
  <div>
    <div class="clearfix selector">
      <div class="type-wrap logo">
        <div class="fl key brand">品牌</div>
        <div class="value logos">
          <ul class="logo-list">
            <li v-for="trademark in trademarkList" :key="trademark.tmId" @click="trademarkHandler(trademark)">{{trademark.tmName}}</li>
          </ul>
        </div>
        <div class="ext">
          <a href="javascript:void(0);" class="sui-btn">多选</a>
          <a href="javascript:void(0);">更多</a>
        </div>
      </div>
      <div class="type-wrap" v-for="attr in attrsList" :key="attr.attrId">
        <div class="fl key">{{attr.attrName}}</div>
        <div class="fl value">
          <ul class="type-list">
            <li v-for="(attrValue,index) in attr.attrValueList" :key="index" @click="attrInfo(attr,attrValue)">
              <a>{{attrValue}}</a>
            </li>
          </ul>
        </div>
        <div class="fl ext"></div>
      </div>
      
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: "SearchSelector",
  data() {
    return {};
  },
  components: {},
  mounted() {},
  methods: {
    trademarkHandler(trademark){
      this.$emit('trademarkInfo',trademark)
    },
    attrInfo(attr,attrValue){
      this.$emit('attrInfo',attr,attrValue)
    }
  },
  computed:{
    ...mapGetters(['trademarkList','attrsList'])
  }
};
</script>

<style scoped>
.selector {
  border: 1px solid #ddd;
  margin-bottom: 5px;
  overflow: hidden;
}
.selector .logo {
  border-top: 0;
  margin: 0;
  position: relative;
  overflow: hidden;
}
.selector .logo .key {
  padding-bottom: 87px !important;
}
.selector .type-wrap {
  margin: 0;
  position: relative;
  border-top: 1px solid #ddd;
  overflow: hidden;
}
.selector .type-wrap .key {
  width: 100px;
  background: #f1f1f1;
  line-height: 26px;
  text-align: right;
  padding: 10px 10px 0 15px;
  float: left;
}
.selector .type-wrap .value {
  overflow: hidden;
  padding: 10px 0 0 15px;
  color: #333;
  margin-left: 120px;
  padding-right: 90px;
}
.selector .type-wrap .value .logo-list li {
  float: left;
  border: 1px solid #e4e4e4;
  margin: -1px -1px 0 0;
  width: 105px;
  height: 52px;
  text-align: center;
  line-height: 52px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 700;
  color: #e1251b;
  font-style: italic;
  font-size: 14px;
}
.selector .type-wrap .value .logo-list li img {
  max-width: 100%;
  vertical-align: middle;
}
.selector .type-wrap .value .type-list li {
  float: left;
  display: block;
  margin-right: 30px;
  line-height: 26px;
}
.selector .type-wrap .value .type-list li a {
  text-decoration: none;
  color: #666;
}
.selector .type-wrap .ext {
  position: absolute;
  top: 10px;
  right: 10px;
}
.selector .type-wrap .ext .sui-btn {
  display: inline-block;
  padding: 2px 14px;
  box-sizing: border-box;
  margin-bottom: 0;
  font-size: 12px;
  line-height: 18px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  padding: 0 10px;
  background: #fff;
  border: 1px solid #d5d5d5;
}
.selector .type-wrap .ext a {
  color: #666;
}
</style>