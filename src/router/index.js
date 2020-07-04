import Vue from "vue";
import VueRouter from "vue-router";
import vCalculator from "../components/v-calculator";
import vWarm from "../components/v-warm";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "v-calculator",
    component: vCalculator
  },
  {
    path: "/warm",
    name: "v-warm",
    component: vWarm
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
