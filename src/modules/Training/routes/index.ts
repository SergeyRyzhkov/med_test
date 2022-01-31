const routes = [
  {
    name: "training",
    path: "/training",
    component: () => lazyLoad(import("@/modules/Training/pages/TrainingListPage.vue")),
  },
  {
    name: "training-card",
    path: "/training/:slug",
    props: true,
    component: () => lazyLoad(import("@/modules/Training/pages/TrainingPage.vue")),
  },
];

export default routes;

const lazyLoad = (promise) => {
  return promise.then((m) => m.default || m);
};
