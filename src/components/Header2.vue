<template>
  <header class="header">
    <div class="sticky-wrapper" style="">
      <div class="header-middle sticky-header">
        <div class="container">
          <div class="header-left">
            <button class="mobile-menu-toggler">
              <span class="sr-only">Toggle mobile menu</span>
              <i class="icon-bars"></i>
            </button>

            <a href="index.html" class="logo">
              <img
                :src="warehouse.dark_logo_url"
                alt="Molla Logo"
                width="105"
                height="25"
              />
            </a>

            <nav class="main-nav">
              <ul class="menu">
                <li class="active">
                  <router-link to="/" class="">Home</router-link>
                </li>
                <li>
                  <router-link to="/shop" class="">Shop</router-link>
                </li>
                <li>
                  <router-link to="/about" class="">About</router-link>
                </li>
              </ul>
              <!-- End .menu -->
            </nav>
            <!-- End .main-nav -->
          </div>
          <!-- End .header-left -->

          <div class="header-right">
            <div class="header-search">
              <a href="#" class="search-toggle" role="button" title="Search"
                ><i class="icon-search"></i
              ></a>
              <form action="#" method="get">
                <div class="header-search-wrapper">
                  <label for="q" class="sr-only">Search</label>
                  <input
                    type="search"
                    class="form-control"
                    name="q"
                    id="q"
                    placeholder="Search in..."
                    required=""
                  />
                </div>
                <!-- End .header-search-wrapper -->
              </form>
            </div>
            <!-- End .header-search -->
            <div class="dropdown cart-dropdown">
              <CheckoutDrawer @openLoginModal="openLoginModal" />
            </div>
            <!-- End .compare-dropdown -->

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
            <!-- End .cart-dropdown -->
          </div>
          <!-- End .header-right -->
        </div>
        <!-- End .container -->
      </div>
      <Login
        :modalVisible="isLoginModalVisible"
        @modalClosed="closeLoginModal"
      />
    </div>
    <!-- End .header-middle -->
  </header>
</template>
<script>
import { defineComponent, onMounted, computed, ref } from "vue";
import { useStore } from "vuex";
import common from "../common/composable/common";
import Login from "./Auth/Login.vue";
import CheckoutDrawer from "./Auth/CheckoutDrawer.vue"; // Import CheckoutDrawer component
import router from "@/router";

export default defineComponent({
  components: {
    Login,
    CheckoutDrawer, // Register CheckoutDrawer component
  },
  setup() {
    const store = useStore();
    const { frontWarehouse, frontAppSetting } = common();
    const searchValue = ref("");
    const loginModalVisible = ref(false);
    const frontSettings = ref({});
    const featuredProducts = ref([]);
    const frontProductCards = ref([]);

    const isLoginModalVisible = ref(false);

    const isLoggedIn = computed(() => store.getters["front/isLoggedIn"]);

    const currency = ref({});
    const categories = ref([]);
    const newProducts = ref([]);
    const trendyProducts = ref([]);
    const warehouse = ref([]);

    const openLoginModal = () => {
      loginModalVisible.value = true;
    };

    const loginModalClosed = () => {
      loginModalVisible.value = false;
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
          currency.value = response.data.currency;
          frontSettings.value = response.data.front_settings || {};
          frontProductCards.value = response.data.front_product_cards || [];
          warehouse.value = response.data.warehouse;
          console.log(warehouse.value);
          featuredProducts.value =
            frontSettings.value.featured_products_details || [];
          newProducts.value = frontProductCards.value.filter(
            (e) => e.title === "New Arrival"
          );
          trendyProducts.value = frontProductCards.value.filter(
            (e) => e.title === "Feature Products"
          );
        })
        .catch((error) => {
          console.error("Failed to fetch homepage data:", error);
        });

      axiosAdmin
        .get("shop-categories")
        .then((response) => {
          categories.value = response.data.categories || [];
          console.log(categories.value);
        })
        .catch((error) => {
          console.error("Failed to fetch categories:", error);
        });
    });

    return {
      frontAppSetting,
      searchValue,
      openLoginModal,
      loginModalClosed,
      loginModalVisible,
      frontWarehouse,
      isLoggedIn: computed(() => store.getters["front/isLoggedIn"]),
      isLoginModalVisible,
      closeLoginModal,
      login,
      goToDashboard,
      warehouse,
    };
  },
});
</script>
