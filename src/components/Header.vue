<template>
  <div :class="isHome ? 'header header-5' : 'header'">
    <div class="header-middle sticky-header">
      <div class="container-fluid">
        <div class="header-left">
          <button class="mobile-menu-toggler">
            <span class="sr-only">Toggle mobile menu</span>
            <i class="icon-bars"></i>
          </button>

          <a href="/" class="logo">
            <img
              :src="warehouse?.dark_logo_url"
              alt="Molla Logo"
              width="70"
              height="25"
            />
          </a>

          <nav class="main-nav">
            <ul class="menu">
              <li class="active">
                <a href="/" class="">Home</a>
              </li>
              <li>
                <router-link to="/shop" class="">Shop</router-link>
              </li>
              <li>
                <router-link to="/about" class="">About</router-link>
              </li>
            </ul>
          </nav>
        </div>

        <div class="header-right">
          <div class="header-search header-search-extended header-search-visible">
            <a href="#" class="search-toggle" role="button">
              <i class="icon-search"></i>
            </a>
            <form action="#" method="get">
              <div class="header-search-wrapper">
                <label for="q" class="sr-only">Search</label>
                <input
                  type="search"
                  class="form-control"
                  name="q"
                  id="q"
                  placeholder="Search product ..."
                  required
                />
                <button class="btn btn-primary" type="submit">
                  <i class="icon-search"></i>
                </button>
              </div>
            </form>
          </div>
          <div class="dropdown cart-dropdown">
            <CheckoutDrawer @openLoginModal="openLoginModal" />
          </div>
          <div>
            <a
              v-if="isLoggedIn"
              href="javascript:void(0)"
              @click="goToDashboard"
              data-toggle="modal"
              class="wishlist-link"
            >
              <i class="icon-user"></i>
            </a>
            <a
              v-else
              href="javascript:void(0)"
              @click="login"
              data-toggle="modal"
              class="wishlist-link"
            >
              Login
            </a>
          </div>

          <!-- Add CheckoutDrawer component -->

          <!-- <Login
            :modalVisible="loginModalVisible"
            @modalClosed="loginModalClosed"
          /> -->
        </div>
      </div>
    </div>
    <Login :modalVisible="isLoginModalVisible" @modalClosed="closeLoginModal" />
  </div>
</template>

<script>
import { defineComponent, onMounted, computed, ref, watch } from "vue";
import { useStore } from "vuex";
import common from "../common/composable/common";
import Login from "./Auth/Login.vue";
import CheckoutDrawer from "./Auth/CheckoutDrawer.vue"; // Import CheckoutDrawer component
import router from "@/router";
import { useRoute } from "vue-router";

export default defineComponent({
  components: {
    Login,
    CheckoutDrawer, // Register CheckoutDrawer component
  },
  setup() {
    const store = useStore();
    const { frontWarehouse, frontAppSetting } = common();
    const loginModalVisible = ref(false);

    // Get the current route
    const route = useRoute();

    // Determine which header to show based on the route path
    const isHome = ref(route.path === "/");

    // Watch for route changes to update the header conditionally
    watch(
      () => route.path,
      (newPath) => {
        isHome.value = newPath === "/";
      }
    );

    const isLoginModalVisible = ref(false);

    const isLoggedIn = computed(() => store.getters["front/isLoggedIn"]);

    const warehouse = ref([]);

    const openLoginModal = () => {
      loginModalVisible.value = true;
    };

    const closeLoginModal = () => {
      isLoginModalVisible.value = false;
    };

    const login = () => {
      if (isLoggedIn.value) {
        router.push({ name: "dashboard" });
      } else {
        isLoginModalVisible.value = true;
      }
    };

    const goToDashboard = () => {
      router.push({ name: "dashboard" });
    };

    // Fetch data on component mount
    onMounted(() => {
      axiosAdmin
        .get("front/homepage/flash-wordrobe-2z17xsaa")
        .then((response) => {
          warehouse.value = response.data.warehouse;
        })
        .catch((error) => {
          console.error("Failed to fetch homepage data:", error);
        });

      axiosAdmin
        .get("shop-categories")
        .then((response) => {
          categories.value = response.data.categories || [];
        })
        .catch((error) => {
          console.error("Failed to fetch categories:", error);
        });
    });

    return {
      frontAppSetting,
      openLoginModal,
      closeLoginModal,
      loginModalVisible,
      frontWarehouse,
      isLoggedIn: computed(() => store.getters["front/isLoggedIn"]),
      isLoginModalVisible,
      login,
      goToDashboard,
      warehouse,
      isHome,
    };
  },
});
</script>
