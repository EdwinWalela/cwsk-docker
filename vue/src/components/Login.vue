<template>
  <div class="card w-50" id="login">
    <strong class="mb-9 mp-4 pt-3 text-primary">LOGIN</strong>
    <div class="card-body">
      <form >
      <div class="form-group">
        <label for="email">Email address:</label>
        <input type="email" class="form-control" id="email" v-model.lazy="email" name="email" v-validate="'required:true|email'">
        <div class="help-block alert alert-danger" v-show="errors.has('email')">{{errors.first('email')}}</div>
      </div>
      <div class="form-group">
        <label for="pwd">Password:</label>
        <input type="password" class="form-control" id="pwd" v-model.lazy="password" name="password" v-validate="'required:true|min:4'">
        <div class="help-block alert alert-danger" v-show="errors.has('password')">{{errors.first('password')}}</div>
      </div>
      <div class="form-group form-check">
        <label class="form-check-label">
          <input class="form-check-input" type="checkbox"> Remember me
        </label>
      </div>
      <button class="btn btn-primary form-control" v-on:click.prevent="login">Login</button>
    </form>
  </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
        email: '',
        password: ''
    };
  },
  created(){
    this.$swal.close();
  },
  methods: {
    login: function(){
      let user = {
        email: this.email,
        password: this.password
      };
      //console.log(user);
      this.$validator.validateAll().then(valid => {
        if(valid){
          this.$http.post('auth/login', user)
          .then(response => {
            // JSON responses are automatically parsed.
            //console.log(response.status);
            if(response.status == 200){
              this.$toast.success({
                  title:'Success',
                  message:'You have been logged in'
              });
              //this.$router.go('/dashboard');
              this.$store.commit('updateKey',response.data.token);
              this.$store.commit('updateAuth',true);
              //console.log(this.$store.state.token);
              this.$router.push({name: 'Dashboard'});
            }
            //this.posts = response.data
          })
          .catch(e => {
            console.log(e.response);
            this.$toast.error({
                title:'Error',
                message:e.response.data.msg
            });
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
#login{
  margin: 0 auto;
  margin-top:50px;
}
</style>
