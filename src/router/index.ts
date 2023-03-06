import { createRouter, createWebHistory } from "vue-router";

import Access from "../views/Access.vue";
import Home from "../views/Home.vue";
import PasswordReset from "../views/PasswordReset.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/access/:method/",
    name: "Access",
    component: Access,
  },
  {
    path: "/reset/",
    name: "Password Reset",
    component: PasswordReset,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
