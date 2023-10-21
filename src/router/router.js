import { createRouter, createWebHistory } from "vue-router";
import MainPage from "@/pages/MainPage.vue";
import PostPage from "@/pages/PostPage.vue";
import SinglePost from "@/pages/SinglePost.vue";

const routes = [
  {
    path: "/",
    component: MainPage,
  },
  {
    path: "/posts",
    component: PostPage,
  },
  {
    path: "/posts/:id",
    component: SinglePost,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
