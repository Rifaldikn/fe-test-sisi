// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "",
    redirect: "/atk-request",
  },

  {
    path: "/atk-request",
    name: "AtkRequest",
    component: () => import("@/views/atk/AtkRequestMainpage.vue"),
    meta: {
      title: "Atk Request",
      needAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
