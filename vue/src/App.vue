<template>
  <div id="app" class="page-wrapper chiller-theme toggled layout">
      <app-sidebar v-if='isAuth'></app-sidebar>
      <div class="page-content container">
        <div class="container-fluid py-3 pr-10 ">
          <div class="main-content">
            <router-view/>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import sidebar from './components/Sidebar';
export default {
  name: 'App',
  components: {
    'app-sidebar': sidebar
  },
  computed: {
    token(){
      return this.$store.state.token;
    },
    isAuth(){
      return this.$store.state.isAuth;
    }
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  /* font-family: 'Roboto', sans-serif;
  font-family: 'Noto Sans', sans-serif;
  */
  font-size: 1.4rem;
  font-family: 'Raleway', sans-serif;
  /*
  font-family: 'PT Sans', sans-serif;
  */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
.form-group{
}
.form-control {
  height: 3em;
}
.main-content {
    padding-left: 130px;
}
@media (min-width: 770px)
.main-content {
    padding-left: 130px;
}

@media (max-width: 769px)
.main-content {
    max-width: 100%;
}
</style>
