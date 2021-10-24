import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/rank",
    name: "Rank",
    component: () => import("@/views/Rank.vue"),
  },
  {
    path: "/detail/:code",
    name: "Detail",
    component: () => import("@/views/Detail.vue"),
  },
  {
    path: "/networth",
    name: "Networth",
    component: () => import("@/views/Networth.vue"),
  },
  {
    path: "/position/:code",
    name: "Position",
    component: () => import("@/views/Position.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
