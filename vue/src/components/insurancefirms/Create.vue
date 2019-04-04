<template>
  <div class="card w-50" id="newasset">
    <strong class="mb-9 mp-4 pt-3 text-primary">Create Insurance Firm</strong>
    <div class="card-body">
      <form>
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" class="form-control" id="name" v-model.lazy="name" name="name" v-validate="'required:true|min:2'">
          <div class="help-block alert alert-danger" v-show="errors.has('name')">{{errors.first('name')}}</div>
        </div>
        <button class="btn btn-primary form-control" v-on:click.prevent="createFirm">Create</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreateFirm',
  data() {
    return {
        name: '',
    };
  },
  computed: {
    token(){
      return this.$store.state.token;
    },
    isAuth(){
      return this.$store.state.isAuth;
    },
  },
  created() {
  },
  methods: {
    createFirm: function(){
      let firm = {
        name: this.name
      };
      //console.log(user);
      this.$validator.validateAll().then(valid => {
        if(valid){
          console.log(this.token);
          this.$http.post('insurancefirms' , firm, { headers: { 'Authorization': "bearer " + this.token }})
          .then(response => {
            // JSON responses are automatically parsed.
            //console.log(response.status);
            if(response.status == 201){
              this.$swal.fire({
                type: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 1500
              }).then(rst => {
                this.$router.push({name: 'Insurances'});
              });
              //this.$router.go('/dashboard');
              //this.$store.commit('updateKey',response.data.token);
              //this.$store.commit('updateAuth',true);
              //console.log(this.$store.state.token);

            }
            //this.posts = response.data
          })
          .catch(e => {
            console.log(e.response);
            this.$toast.error({
                title:'Error',
                message:e.response.data.msg
            });
            if(e.response.status == 401){
              this.$router.push({name: 'Login'});
            }else{

            }
            //this.errors.push(e);
          })
        }
      });
    }
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
#newasset{
  margin: 0 auto;
  margin-top:50px;
}
</style>
