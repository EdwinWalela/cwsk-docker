<template>
  <nav id="sidebar" class="sidebar-wrapper">
    <div class="sidebar-content">
      <!-- sidebar-header  -->
      <!-- sidebar-search  -->
      <div class="sidebar-menu">
          <sidebar-menu :menu="items" />
      </div>
      <!-- sidebar-menu  -->
    </div>
    <!-- sidebar-content  -->
    <div class="sidebar-footer">
      <a href="#">
        <i class="fa fa-bell"></i>
        <span class="badge badge-pill badge-warning notification">3</span>
      </a>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
          return {
            items: [
              { title: 'Dashboard', href: '/dashboard', icon: 'fa fa-align-justify'},
              { title: 'Assets', href: '/assets',icon: 'fa fa-hdd', child: [
                { title: 'New Asset', href: '/assets/new'},
                { title: 'New Support', href: '/assets/support'},
                { title: 'New Valuation', href: '/assets/valuation'},
                { title: 'Asset Types', href: '/assets/types', child: [
                  { title: 'New Type', href: '/assets/types/new'},
                ]}
              ]},
              { title: 'Tps', href: '/tps', icon: 'fa fa-landmark',
                  badge: {
                          text: 'new',
                          //class:'warning'
                      },
                child: [
                  { title: 'New Tps', href: '/tps/new'},
              ]},
              {
                title: 'Insurances', href:'/insurancefirms', icon: 'fa fa-bell',
                child: [
                  { title: 'New Insurance', href: '/insurancefirms/new'},
                ],
              }
            ],
            collapsed: {
                type: Boolean,
                default: true
            },
            width: {
                type: String,
                default: '250px'
            },
            widthCollapsed: {
                type: String,
                default: '50px'
            },
            theme: { // available themes: 'white-theme'
                type: String,
                default: 'white-theme'
            },
          };
        },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.vsm-item a{
    text-align: left;
}
.v-sidebar-menu .vsm-link {
    text-align: left;
}


</style>
