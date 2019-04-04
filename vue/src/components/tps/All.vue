<template>
  <div class="parlet w-100" id="dashboard">
    <h2>Temporary Places Of Residence (TPSs)</h2>
    <table class="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Alias</th>
          <th>Location</th>
          <th>Address</th>
          <th>Phone</th>
          <th>Created At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="t in tps">
          <td>{{t.name}}</td>
          <td>{{t.alias}}</td>
          <td>{{t.location}}</td>
          <td>{{t.address}}</td>
          <td>{{t.phone}}</td>
          <td>{{t.created_at}}</td>
          <td>
            <router-link to="/login">
              <v-icon name="eye"/>
            </router-link>
            <router-link to="/login">
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
  name: 'Dashboard',
  data() {
    return {
      tps: []
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
    this.$http.get('tps', { headers: { 'Authorization': "bearer " + this.token }})
    .then(response => {
      this.$swal.close();
      if(response.status == 200){
        this.tps = response.data.tps;
      }
    })
    .catch(e => {
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
