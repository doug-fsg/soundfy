import Vue from "vue";
import VueRouter from "vue-router";
import List from "../views/List.vue";
import Form from "../views/Form.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import NewLabel from "@/views/Label.vue";
//import Multitrack from "../views/Multitrack.vue";
import Multitrack from "@/views/Multitrack.vue";
import Editar from "@/views/Editar.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/new-label",
    name: "newLabel",
    component: NewLabel
  },
  {
    path: "/track",
    name: "multitrack",
    component: Multitrack
  },
  {
    path: "/edit",
    name: "edit",
    component: Editar
  },
  {
    path: "/",
    name: "list",
    component: List
  },
  {
    path: "/form",
    name: "form",
    component: Form
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/register",
    name: "register",
    component: Register
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (
    to.name !== "login" &&
    to.name !== "register" &&
    !localStorage.getItem("authUser")
  ) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
