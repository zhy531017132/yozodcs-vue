import Vue from 'vue'
import App from './App.vue'
import { Button, Select, Container ,Main,Header,Aside,Submenu,Menu,MenuItem,MenuItemGroup,Upload,Breadcrumb,BreadcrumbItem,Notification,Dialog,Table,TableColumn,Tag} from 'element-ui'
import router from '../router'
import store from '../store'
// Vue.config.productionTip = false

Vue.use(Button);
Vue.use(Select);
Vue.use(Container);
Vue.use(Main);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Submenu);
Vue.use(Menu);
Vue.use(MenuItemGroup);
Vue.use(MenuItem);
Vue.use(Upload);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Dialog);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Tag);
Vue.prototype.$notify = Notification;
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')

