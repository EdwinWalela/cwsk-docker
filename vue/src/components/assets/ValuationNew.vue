<template>
  <div class="card w-50" id="newasset">
    <strong class="mb-9 mp-4 pt-3 text-primary">Create Valuation Record</strong>
    <div class="card-body">
      <form>
        <div class="form-group">
          <label for="name">Price:</label>
          <input type="text" class="form-control" id="price" v-model.lazy="price" name="price" v-validate="'required:true|min:2'">
          <div class="help-block alert alert-danger" v-show="errors.has('price')">{{errors.first('price')}}</div>
        </div>
        <div class="form-group">
          <label for="valuation">Asset:</label>
          <select name='assetId'  class='form-control' v-model.lazy='assetId'>
            <option>--select Asset--</option>
            <option v-for='asset in assets'  v-bind:value="asset.id">{{ asset.name}}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="details">Details:</label>
          <textarea class="form-control" id="details" v-model.lazy="details" name="details" v-validate="'required:true|min:3'"></textarea>
          <div class="help-block alert alert-danger" v-show="errors.has('details')">{{errors.first('details')}}</div>
        </div>
        <button class="btn btn-primary form-control" v-on:click.prevent="createValuation">Create</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ValuationNew',
  data() {
    return {
        price: '',
        details: '',
        assetId: ''
    };
  },
  computed: {
    token(){
      return this.$store.state.token;
    },
    isAuth(){
      return this.$store.state.isAuth;
    },
    assets() {
      return this.$store.state.assets ;
    },
  },
  created() {
    this.$store.dispatch('fetchAssets');
  },
  methods: {
    createValuation: function(){
      let supportPayload = {
        price: this.price,
        details: this.details,
        asset: this.assetId
      };
      //console.log(user);
      this.$validator.validateAll().then(valid => {
        if(valid){
          console.log(this.token);
          this.$http.post('valuations' , supportPayload, { headers: { 'Authorization': "bearer " + this.token }})
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
                this.$router.push({name: 'Assets'});
              });
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
#newasset{
  margin: 0 auto;
  margin-top:50px;
}
</style>
