<template>
  <div>
    <Header/>
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from './components/Header';
import Footer from './components/Footer';
export default {
  name: '',
  data () {
    return {
      
    };
  },
  components: {
    Header,
    Footer
  },
  mounted () {
    this.$store.dispatch("categoryList");
  },
  methods: {}
}
</script>

<style scoped>
</style>