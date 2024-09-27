import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { useStore } from "vuex";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: HomeView,
      name: "homepage",
      meta: {
        menuKey: "homepage",
      },
    },
    {
      path: "/shop/checkout",
      component: () => import("../views/Checkout.vue"),
      name: "checkout",
      meta: {
        isFrontStore: true,
        requireAuth: true,
        menuKey: "orders",
      },
    },
    {
      path: "/shop/dashboard",
      component: () => import("../views/Dashboard.vue"),
      name: "dashboard",
      meta: {
        isFrontStore: true,
        requireAuth: true,
        menuKey: "dashboard",
      },
    },
    {
      path: "/shop/checkout/sucess",
      component: () => import("../views/CheckoutSuccess.vue"),
      name: "checkout.success",
      meta: {
        isFrontStore: true,
        requireAuth: true,
        menuKey: "checkoutSucess",
      },
    },
    {
      path: "/shop/cart",
      component: () => import("../views/Cart.vue"),
      name: "cart",
      meta: {
        isFrontStore: true,
        menuKey: "orders",
      },
    },
    {
      path: "/shop",
      component: () => import("../views/Store.vue"),
      name: "shop",
      meta: {
        isFrontStore: true,
        menuKey: "store",
      },
    },
    {
      path: "/shop/product/:slug",
      component: () => import("../views/ProductDetail.vue"),
      name: "detail",
      props: (route) => ({ product: JSON.parse(route.query.product) }), // Deserialize the product
      meta: {
        isFrontStore: true,
        menuKey: "detail",
      },
    },
    {
      path: "/about",
      component: () => import("../views/About.vue"),
      name: "about",
      meta: {
        isFrontStore: true,
        menuKey: "about",
      },
    },
    {
      path: "/:catchAll(.*)", // Catch all undefined routes
      component: () => import("../views/NotFound.vue"), // Create a NotFound component
      name: "not-found",
    },
    // You can add more routes here...
  ],
});

// Global navigation guard to check authentication
router.beforeEach((to, from, next) => {
  const store = useStore();
  const isLoggedIn = store.getters["front/isLoggedIn"]; // Assuming you have a getter for authentication status

  if (to.meta.requireAuth && !isLoggedIn) {
    // If the route requires authentication and the user is not authenticated
    next({ name: "homepage" }); // Redirect to homepage or a login page, adjust according to your needs
  } else {
    next(); // Proceed to the route if authenticated or if no auth required
  }
});

export default router;
