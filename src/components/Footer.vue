<template>
  <footer class="footer footer-2">
    <div class="footer-middle border-0">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 col-lg-6">
            <div class="widget widget-about">
              <img
                :src="warehouse.dark_logo_url"
                class="footer-logo"
                alt="Footer Logo"
                width="105"
                height="25"
              />
              <p>
                {{ frontSettings.footer_company_description }}
              </p>

              <div class="widget-about-info">
                <div class="row">
                  <div class="col-sm-6 col-md-4">
                    <span class="widget-about-title">Got Question? Call us 24/7</span>
                    <a href="tel:123456789">+0123 456 789</a>
                  </div>
                  <!-- End .col-sm-6 -->
                  <div class="col-sm-6 col-md-8">
                    <span class="widget-about-title">Payment Method</span>
                    <figure class="footer-payments">
                      <img
                        src="/assets/images/payments.png"
                        alt="Payment methods"
                        width="272"
                        height="20"
                      />
                    </figure>
                    <!-- End .footer-payments -->
                  </div>
                  <!-- End .col-sm-6 -->
                </div>
                <!-- End .row -->
              </div>
              <!-- End .widget-about-info -->
            </div>
            <!-- End .widget about-widget -->
          </div>
          <!-- End .col-sm-12 col-lg-3 -->

          <div class="col-sm-4 col-lg-2">
            <div class="widget">
              <h4 class="widget-title">Information</h4>
              <!-- End .widget-title -->

              <ul class="widget-list">
                <li><a href="about.html">About Molla</a></li>
                <li><a href="#">How to shop on Molla</a></li>
                <li><a href="faq.html">FAQ</a></li>
                <li><a href="contact.html">Contact us</a></li>
                <li><a href="login.html">Log in</a></li>
              </ul>
              <!-- End .widget-list -->
            </div>
            <!-- End .widget -->
          </div>
          <!-- End .col-sm-4 col-lg-3 -->

          <div class="col-sm-4 col-lg-2">
            <div class="widget">
              <h4 class="widget-title">Customer Service</h4>
              <!-- End .widget-title -->

              <ul class="widget-list">
                <li><a href="#">Payment Methods</a></li>
                <li><a href="#">Money-back guarantee!</a></li>
                <li><a href="#">Returns</a></li>
                <li><a href="#">Shipping</a></li>
                <li><a href="#">Terms and conditions</a></li>
                <li><a href="#">Privacy Policy</a></li>
              </ul>
              <!-- End .widget-list -->
            </div>
            <!-- End .widget -->
          </div>
          <!-- End .col-sm-4 col-lg-3 -->

          <div class="col-sm-4 col-lg-2">
            <div class="widget">
              <h4 class="widget-title">My Account</h4>
              <!-- End .widget-title -->

              <ul class="widget-list">
                <li><a href="#">Sign In</a></li>
                <li><a href="cart.html">View Cart</a></li>
                <li><a href="#">My Wishlist</a></li>
                <li><a href="#">Track My Order</a></li>
                <li><a href="#">Help</a></li>
              </ul>
              <!-- End .widget-list -->
            </div>
            <!-- End .widget -->
          </div>
          <!-- End .col-sm-64 col-lg-3 -->
        </div>
        <!-- End .row -->
      </div>
      <!-- End .container -->
    </div>
    <!-- End .footer-middle -->

    <div class="footer-bottom">
      <div class="container">
        <p class="footer-copyright">Copyright © 2019 Molla Store. All Rights Reserved.</p>
        <!-- End .footer-copyright -->
        <ul class="footer-menu">
          <li><a href="#">Terms Of Use</a></li>
          <li><a href="#">Privacy Policy</a></li>
        </ul>
        <!-- End .footer-menu -->
        <div class="social-icons social-icons-color">
          <span class="social-label">Social Media</span>
          <a href="#" class="social-icon social-facebook" title="Facebook" target="_blank"
            ><i class="icon-facebook-f"></i
          ></a>
          <a href="#" class="social-icon social-twitter" title="Twitter" target="_blank"
            ><i class="icon-twitter"></i
          ></a>
          <a
            href="#"
            class="social-icon social-instagram"
            title="Instagram"
            target="_blank"
            ><i class="icon-instagram"></i
          ></a>
          <a href="#" class="social-icon social-youtube" title="Youtube" target="_blank"
            ><i class="icon-youtube"></i
          ></a>
          <a
            href="#"
            class="social-icon social-pinterest"
            title="Pinterest"
            target="_blank"
            ><i class="icon-pinterest"></i
          ></a>
        </div>
        <!-- End .soial-icons -->
      </div>
      <!-- End .container -->
    </div>
    <!-- End .footer-bottom -->
  </footer>
  <!-- End .footer -->
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
    // const { frontWarehouse, frontAppSetting } = common();
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
          // console.log(warehouse.value);
          // console.log(frontSettings.value);
          featuredProducts.value = frontSettings.value.featured_products_details || [];
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
          // console.log(categories.value);
        })
        .catch((error) => {
          console.error("Failed to fetch categories:", error);
        });
    });

    return {
      frontSettings,
      searchValue,
      openLoginModal,
      loginModalClosed,
      loginModalVisible,
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
