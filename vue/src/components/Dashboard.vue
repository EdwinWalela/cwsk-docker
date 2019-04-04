<template>
  <div class="parlet w-100" id="dashboard">
    <h2>Dashboard</h2>
    <div class='row'>
      <div class="alert alert-success col-md-3 m-2" role="alert">Total Number of Assets: {{data.assets}}</div>
      <div class="alert alert-info col-md-3 m-2" role="alert">Total Number of Tps: {{data.tps}}</div>
      <div class="alert alert-warning col-md-3 m-2" role="alert">Total Valuation: {{data.assetValuation[0].assettotalvalue}} KES </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      data: []
    }
  },
  computed: {
    token(){
      return this.$store.state.token;
    },
    isAuth(){
      return this.$store.state.isAuth;
    }
  },
  methods: {

  },
  created(){
    //console.log(this.$store.state.test);
    //console.log(this.$store.state.token);
    this.$swal({
      title: 'Please Wait ...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      onOpen: () => {
        this.$swal.showLoading();
      }
    });
    this.$http.get('reports', { headers: { 'Authorization': "bearer " + this.token }})
    .then(response => {
      this.$swal.close();
      if(response.status == 200){
        this.data = response.data;
      }
    })
    .catch(e => {
      this.$toast.error({
          title:'Error',
          message:e.response.data.msg
      });
      if(e.response.status == 401){

        this.$router.push({name: 'Login'});
      }else{
        this.$router.push({name: 'Login'});
      }

      //this.errors.push(e);
    })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#login{
  margin: 0 auto;
  margin-top:50px;
}
</style>
