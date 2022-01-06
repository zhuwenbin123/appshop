<template>
  <div>
    <TypeNav/>
    <ListContainer/>
    <Recommend/>
    <Rank/>
    <Like/>
    <Floor v-for="floor in floorList" :key="floor.id" :list="floor"/>
    <Banner/>
  </div>
</template>

<script>
import {mapState} from 'vuex';

import ListContainer from '@/pages/Home/ListContainer';
import Recommend from '@/pages/Home/Recommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Banner from '@/pages/Home/Banner'
export default {
  name: '',
  data () {
    return {
      
    };
  },
  components: {ListContainer,Recommend,Rank,Like,Floor,Banner},
  mounted () {
    this.$store.dispatch('getFloorList');
    this.$store.dispatch('getUserInfo')
  },
  methods: {},
  computed:{
     ...mapState({
      floorList:state => state.home.floorList
    })
  }
}
</script>

<style scoped>
</style>