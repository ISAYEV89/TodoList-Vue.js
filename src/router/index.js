import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
// import VueSweetalert2 from 'vue-sweetalert2';
// import 'sweetalert2/dist/sweetalert2.min.css';


Vue.use(Router);
// Vue.use(VueSweetalert2);



export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: index
    }
  ]
})
