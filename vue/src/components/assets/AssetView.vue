<template>
  <div class="w-100" id="newasset" >
    <div>
      <div class="page-header">
        <strong class="mb-9 mp-4 pt-3 text-primary" v-show="loaded">Asset: {{ data.asset.name}}  <span class="label label-primary">{{data.asset.tag}}</span> </strong>
      </div>
      <div class="panel panel-primary">
        <div class="panel-body">
          <div class="alert alert-primary" role="alert">
            <p>Cost of Asset: <strong>{{data.asset.cost}}</strong>

            </p>
            <p>
              Valuation of Asset: <strong>{{data.asset.valuation}}</strong>
            </p>
          </div>
          <p>Lorem ipsum dolor sit amet consectetur adipiscing elit, natoque tristique nec morbi platea nascetur ac, dis curae lobortis gravida eu pulvinar. Elementum mus sem ullamcorper convallis praesent molestie himenaeos facilisis vulputate pellentesque, tellus mattis lectus porta porttitor taciti felis erat congue parturient, tempus per suscipit lacinia luctus habitasse fringilla penatibus morbi. Dictum malesuada dis lectus posuere parturient rhoncus sed montes, nam imperdiet nostra cursus dictumst purus suscipit ultrices sapien, sociis penatibus commodo tempus praesent feugiat ad.
          </p>
        </div>
        <div class="panel-footer">
          <div class="well well-sm">
            <p>Belongs to TPS: <strong>{{data.asset.tp.name}} </strong></p>
            <p>Created On: <strong> {{data.asset.created_at}}</strong></p>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <div class="panel-primary">
          <h2><strong>Cummulative Valuations</strong></h2>
        </div>
        <ul class="list-group panel">
          <li class="list-group-item" v-for="v in data.valuations">
            <p><strong>{{ v.name }} </strong></p>
             <span class="label label-info">Valuation: {{v.price_now}}</span>
             <p>{{v.details}}</p>
             Created At: {{v.created_at}}</li>
        </ul>
      </div>
      <div class="col-md-6">
        <div class="panel-primary">
          <h2><strong>Cummulative Maintenance</strong></h2>
        </div>
        <ul class="list-group panel">
          <li class="list-group-item" v-for="s in data.supports">
            <p><strong>{{ s.name }}</strong></p>
             <span class="label label-info">Cost: {{s.cost}}</span>
             <p>{{s.details}}</p>
          Created At: {{s.created_at}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default {
  name: 'ViewAsset',
  data() {
    return {
        data: {
          asset: {
            name: null
          },
          valuations: {},
          supports: {}
        },
        loaded: false
    };
  },
  computed: {
    token(){
      return this.$store.state.token;
    },
    isAuth(){
      return this.$store.state.isAuth;
    }
  },
  created() {
    console.log(this.token);
    this.$swal({
      title: 'Please Wait ...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      onOpen: () => {
        this.$swal.showLoading();
      }
    });
    this.$http.get('assets/'+this.$route.params.assetId , { headers: { 'Authorization': "bearer " + this.token }})
    .then(response => {
      // JSON responses are automatically parsed.
      //console.log(response.data);
      this.$swal.close();
      if(response.status == 200){
        this.$toast.success({
            title:'Success',
            message:'Asset Loaded Successfully'
        });
        this.loaded = true;
        this.data = response.data;
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
      }

      //this.errors.push(e);
    })
  },
  methods: {

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
