<template>
      <!-- loading這個元件有active屬性的話就啟用，其他功能就看文檔 -->
      <loading :active="isLoading"/>
  <toasts></toasts>
  <nav-bar></nav-bar>
  <router-view/>
</template>

<script type="module">
  import NavBar from '@/components/NavBar.vue';
  import Loading from 'vue3-loading-overlay';
  import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
  import Toasts from '@/components/Toasts.vue'
  export default{
    data(){
      return {
        isLoading:false
      }
    },
    created(){
      this.$emitter.on('updateLoadingStatus',(data)=>{this.isLoading=data});
    },
    components:{
    NavBar,
    Loading,
    Toasts
}
  }
</script>
<style lang="scss">

@import 'bootstrap';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
