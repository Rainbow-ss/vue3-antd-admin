import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css"; // 第三方的css文件
// svg全局组件
import SvgIcon from "./components/Svgicon";
// svg文件解析
import "./js/svg";

createApp(App)
  .use(store)
  .use(router)
  .use(Antd)
  .component("svg-icon", SvgIcon)
  .mount("#app");
