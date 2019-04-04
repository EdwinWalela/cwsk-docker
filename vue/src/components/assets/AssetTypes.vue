<template>
  <div class="parlet w-100" id="dashboard">
    <h2>Asset Types</h2>
    <table class="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Created At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="type in assettypes">
          <td>{{type.name}}</td>
          <td>{{type.created_at}}</td>
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
  name: 'AllAssetsTypes',
  data() {
    return {
      assettypes: []
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
    this.$http.get('types', { headers: { 'Authorization': "bearer " + this.token }})
    .then(response => {
      if(response.status == 200){
        this.assettypes = response.data.types;
        console.log(response.data);
      }
    })
    .catch(e => {
      if(e.response.status == 401){
        console.log(e.response);
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
