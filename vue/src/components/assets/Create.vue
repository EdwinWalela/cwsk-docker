<template>
  <div class="card w-50" id="newasset">
    <strong class="mb-9 mp-4 pt-3 text-primary">Create Asset</strong>
    <div class="card-body">
      <form>
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" class="form-control" id="name" v-model.lazy="name" name="name" v-validate="'required:true|min:2'">
          <div class="help-block alert alert-danger" v-show="errors.has('name')">{{errors.first('name')}}</div>
        </div>
        <div class="form-group">
          <label for="tag">Tag:</label>
          <input type="text" class="form-control" id="tag" v-model.lazy="tag" name="tag" v-validate="'required:true|min:3'">
          <div class="help-block alert alert-danger" v-show="errors.has('tag')">{{errors.first('tag')}}</div>
        </div>
        <div class="form-group">
          <label for="cost">Cost:</label>
          <input type="text" class="form-control" id="cost" v-model.lazy="cost" name="cost" v-validate="'required:true|min:3'">
          <div class="help-block alert alert-danger" v-show="errors.has('cost')">{{errors.first('cost')}}</div>
        </div>
        <div class="form-group">
          <label for="valuation">Valuation:</label>
          <input type="text" class="form-control" id="valuation" v-model.lazy="valuation" name="valuation" v-validate="'required:true|min:3'">
          <div class="help-block alert alert-danger" v-show="errors.has('valuation')">{{errors.first('valuation')}}</div>
        </div>
        <div class="form-group">
          <label for="valuation">Asset Type:</label>
          <select name='type' class='form-control' v-model.lazy='type'>
            <option >--select Type--</option>
            <option v-for='t in assettypes' v-bind:value="t.id">{{ t.name}}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="valuation">Source Tps:</label>
          <select name='tps'  class='form-control' v-model.lazy='tpsid'>
            <option>--select Tps--</option>
            <option v-for='t in tps'  v-bind:value="t.id">{{ t.name}}</option>
          </select>
        </div>
        <button class="btn btn-primary form-control" v-on:click.prevent="createAsset">Create</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreateAsset',
  data() {
    return {
        name: '',
        tag: '',
        cost: '',
        valuation: '',
        tpsid: '',
        type: ''
    };
  },
  computed: {
    token(){
      return this.$store.state.token;
    },
    isAuth(){
      return this.$store.state.isAuth;
    },
    tps() {
      return this.$store.state.tps ;
    },
    assettypes() {
      return this.$store.state.assettypes ;
    },
  },
  created() {
    this.$store.dispatch('fetchAssetTypes');
    this.$store.dispatch('fetchTps');
  },
  methods: {
    createAsset: function(){
      let asset = {
        name: this.name,
        tag: this.tag,
        cost: this.cost,
        valuation: this.valuation,
        tps: this.tpsid,
        type: this.type
      };
      //console.log(user);
      this.$validator.validateAll().then(valid => {
        if(valid){
          console.log(this.token);
          this.$http.post('assets' , asset, { headers: { 'Authorization': "bearer " + this.token }})
          .then(response => {
            // JSON responses are automatically parsed.
            //console.log(response.status);
            if(response.status == 201){
              this.$toast.success({
                  title:'Success',
                  message:'Asset Created Successfully'
              });
              //this.$router.go('/dashboard');
              //this.$store.commit('updateKey',response.data.token);
              //this.$store.commit('updateAuth',true);
              //console.log(this.$store.state.token);
              this.$router.push({name: 'Assets'});
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
