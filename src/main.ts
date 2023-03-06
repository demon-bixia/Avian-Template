import vClickOutside from "click-outside-vue3";
import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./style.css";

const pinia = createPinia();

createApp(App).use(pinia).use(router).use(vClickOutside).mount("#app");
