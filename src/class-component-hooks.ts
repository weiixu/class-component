import { Vue } from "vue-class-component";

// 注册路由器钩子
Vue.registerHooks([
  "beforeRouteEnter",
  "beforeRouteLeave",
  "beforeRouteUpdate",
]);
