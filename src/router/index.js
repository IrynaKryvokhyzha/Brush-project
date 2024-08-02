import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    meta: {
      requireAuth: false,
    },
    component: HomeView,
  },
  {
    path: "/my-shop",
    name: "my-shop",
    meta: {
      requireAuth: false,
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "my-shop" */ "../views/MyShopView.vue"),
  },
  {
    path: "/about",
    name: "about",
    meta: {
      requireAuth: false,
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/contact-us",
    name: "contact-us",
    meta: {
      requireAuth: false,
    },
    component: () =>
      import(/* webpackChunkName: "contact-us" */ "../views/ContactUsView.vue"),
  },
  {
    path: "/sign-up",
    name: "sign-up",
    meta: {
      requireAuth: false,
    },
    component: () =>
      import(
        /* webpackChunkName: "sign-up" */ "../components/Login/SignUpPage"
      ),
  },
  {
    path: "/login",
    name: "login",
    meta: {
      requireAuth: false,
    },
    component: () =>
      import(/* webpackChunkName: "login" */ "../components/Login/LoginPage"),
  },
  {
    path: "/users",
    name: "users",
    meta: {
      requireAuth: true,
    },
    component: () =>
      import(/* webpackChunkName: "users" */ "../views/UsersView.vue"),
  },
  {
    path: "/my-shop/individual-brushes",
    name: "individual-brushes",
    meta: {
      requireAuth: false,
    },
    component: () =>
      import(
        /* webpackChunkName: "individual-brushes" */ "../components/My Shop/IndividualBrushes/BrushesList"
      ),
  },
  {
    path: "/my-shop/pro-create-set",
    name: "pro-create-set",
    meta: {
      requireAuth: false,
    },
    component: () =>
      import(
        /* webpackChunkName: "pro-create-set" */ "../components/My Shop/ProCreateSet/ProCreateSetList"
      ),
  },
  {
    path: "/my-shop/travel-kit",
    name: "travel-kit",
    meta: {
      requireAuth: false,
    },
    component: () =>
      import(
        /* webpackChunkName: "travel-kit" */ "../components/My Shop/TravelKit/TravelKitList"
      ),
  },
  {
    path: "/brush-editor/:brushId?",
    name: "brush-editor",
    meta: {
      requireAuth: false,
    },
    component: () =>
      import(
        /* webpackChunkName: "brush-editor" */ "@/components/My Shop/IndividualBrushes/BrushEditor.vue"
      ),
    // props: true,
  },
  {
    path: "/proCreateSet-editor/:setId?",
    name: "proCreateSet-editor",
    meta: {
      requireAuth: true,
    },
    component: () =>
      import(
        /* webpackChunkName: "proCreateSet-editor" */ "@/components/My Shop/ProCreateSet/ProCreateSetEditor.vue"
      ),
    props: true,
  },
  {
    path: "/travelKit-editor/:kitId?",
    name: "travelKit-editor",
    meta: {
      requireAuth: true,
    },
    component: () =>
      import(
        /* webpackChunkName: "travelKit-edito" */ "@/components/My Shop/TravelKit/TravelKitEditor"
      ),
    props: true,
  },
  {
    path: "/cart/:productId?",
    name: "cart",
    meta: {
      requireAuth: false,
    },
    component: () =>
      import(
        /* webpackChunkName: "cart" */ "@/components/cart/CartComponent.vue"
      ),
  },
  {
    path: "/brush-precautions",
    name: "brush-precautions",
    meta: {
      requireAuth: false,
    },
    component: () =>
      import(
        /* webpackChunkName: "brush-precautions" */ "@/components/BrushPrecautions.vue"
      ),
  },
  {
    path: "/return-policy",
    name: "return-policy",
    meta: {
      requireAuth: false,
    },
    component: () =>
      import(
        /* webpackChunkName: "return-policy" */ "@/components/ReturnPolicy.vue"
      ),
  },
  {
    path: "/my-account",
    name: "my-account",
    meta: {
      requireAuth: true,
    },
    component: () =>
      import(/* webpackChunkName: "my-account" */ "../views/MyAccount.vue"),
  },
  {
    path: "/payment",
    name: "payment",
    //  meta: {
    //    requireAuth: true,
    //  },
    component: () =>
      import(
        /* webpackChunkName: "payment" */ "@/components/PaymentComponent.vue"
      ),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "error",
    component: () =>
      import(/* webpackChunkName: "error" */ "../components/ErrorPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  if (to.meta?.requireAuth) {
    let isAuthenticated = store.state.auth.user;

    if (!isAuthenticated)
      isAuthenticated = await store.dispatch("auth/loginWithCredential");

    if (!isAuthenticated)
      return {
        name: "login",
      };
  }
});

export default router;
