<template>
  <div class="parlet w-100" id="dashboard">
    <h2>Assets</h2>
    <table class="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Tag</th>
          <th>Cost</th>
          <th>Created At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="asset in assets">
          <td>{{asset.name}}</td>
          <td>{{asset.tag}}</td>
          <td>{{asset.cost}}</td>
          <td>{{asset.created_at}}</td>
          <td>
            <router-link :to="{ name: 'ViewAsset', params: { assetId: asset.id }}">
              <v-icon name="eye"/>
            </router-link>
            <router-link to="/asset">
              <v-icon name="edit"/>
            </router-link>
            <router-link to="/login">
              <v-icon name="trash"/>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Assets',
  data() {
    return {
      assets: []
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
    this.$http.get('assets', { headers: { 'Authorization': "bearer " + this.token }})
    .then(response => {
      this.$swal.close();
      if(response.status == 200){
        this.assets = response.data.assets;
      }
    })
    .catch(e => {
      console.log(e.response);
      if(e.response.status == 401){
        this.$toast.error({
            title:'Error',
            message:e.response.data.msg
        });
        this.$router.push({name: 'Login'});
      }else{

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
