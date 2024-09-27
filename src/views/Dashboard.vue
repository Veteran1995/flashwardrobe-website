<template>
  <FullScreenLoading v-if="isLoading" />
  <div
    class="page-header text-center"
    style="background-image: url('/assets/images/page-header-bg.jpg')"
  >
    <div class="container">
      <h1 class="page-title">My Account<span>Shop</span></h1>
    </div>
  </div>

  <nav aria-label="breadcrumb" class="breadcrumb-nav mb-3">
    <div class="container">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="index.html">Home</a></li>
        <li class="breadcrumb-item"><a href="#">Shop</a></li>
        <li class="breadcrumb-item active" aria-current="page">My Account</li>
      </ol>
    </div>
  </nav>

  <div class="page-content">
    <div class="dashboard">
      <div class="container">
        <div class="row">
          <aside class="col-md-4 col-lg-2">
            <ul
              class="nav nav-dashboard flex-column mb-3 mb-md-0"
              role="tablist"
            >
              <li class="nav-item active">
                <a
                  class="nav-link active"
                  id="tab-dashboard-link"
                  data-toggle="tab"
                  href="#tab-dashboard"
                  role="tab"
                  aria-controls="tab-dashboard"
                  aria-selected="true"
                  >Dashboard</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  id="tab-orders-link"
                  data-toggle="tab"
                  href="#tab-orders"
                  role="tab"
                  aria-controls="tab-orders"
                  aria-selected="false"
                  >Orders</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  id="tab-account-link"
                  data-toggle="tab"
                  href="#tab-account"
                  role="tab"
                  aria-controls="tab-account"
                  aria-selected="false"
                  >Account Details</a
                >
              </li>
              <li class="nav-item">
                <a class="nav-link" href="javascript:void(0);" @click="logout"
                  >Log Out</a
                >
              </li>
            </ul>
          </aside>

          <div class="col-md-12 col-lg-10">
            <div class="tab-content">
              <div
                class="tab-pane fade active show"
                id="tab-dashboard"
                role="tabpanel"
                aria-labelledby="tab-dashboard-link"
              >
                <!-- Dashboard Orders Overview -->
                <div class="card card-primary">
                  <div class="card-body">
                    <div class="row justify-content-center">
                      <div
                        class="dashboard-items d-flex justify-content-between align-items-center"
                      >
                        <div class="dashboard-item col-lg-3 col-sm-6">
                          <div class="icon-box icon-box-left icon-box-circle">
                            <span class="icon-box-icon">
                              <i class="icon-info-circle"></i>
                            </span>
                            <div class="icon-box-content">
                              <h3 class="icon-box-title">Total Orders</h3>
                              <p>{{ states.totalOrders }}</p>
                            </div>
                          </div>
                        </div>

                        <div class="dashboard-item col-lg-3 col-sm-6">
                          <div class="icon-box icon-box-left icon-box-circle">
                            <span class="icon-box-icon">
                              <i class="icon-star-o"></i>
                            </span>
                            <div class="icon-box-content">
                              <h3 class="icon-box-title">Pending Orders</h3>
                              <p>{{ states.pendingOrders }}</p>
                            </div>
                          </div>
                        </div>

                        <div class="dashboard-item col-lg-3 col-sm-6">
                          <div class="icon-box icon-box-left icon-box-circle">
                            <span class="icon-box-icon">
                              <i class="icon-star-o"></i>
                            </span>
                            <div class="icon-box-content">
                              <h3 class="icon-box-title">Processing Orders</h3>
                              <p>{{ states.processingOrders }}</p>
                            </div>
                          </div>
                        </div>

                        <div class="dashboard-item col-lg-3 col-sm-6">
                          <div class="icon-box icon-box-left icon-box-circle">
                            <span class="icon-box-icon">
                              <i class="icon-star-o"></i>
                            </span>
                            <div class="icon-box-content">
                              <h3 class="icon-box-title">Completed Orders</h3>
                              <p>{{ states.completedOrders }}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <OrderTable :data="recentOrders" @reloadOrders="fetchOrders" />
                <!-- End Orders Table -->
              </div>
              <!-- .End .tab-pane -->
              <div
                class="tab-pane fade active show"
                id="tab-orders"
                role="tabpanel"
                aria-labelledby="tab-orders-link"
              >
                <!-- Dashboard Orders Overview -->
                <div class="card card-primary">
                  <div class="card-body">
                    <!-- Tabs Navigation -->
                    <ul class="nav nav-pills" id="tabs-5" role="tablist">
                      <li class="nav-item">
                        <a
                          class="nav-link"
                          :class="{ active: activeTab === 'all' }"
                          @click="setActiveTab('all')"
                          role="tab"
                          >All Orders</a
                        >
                      </li>
                      <li class="nav-item">
                        <a
                          class="nav-link"
                          :class="{ active: activeTab === 'paid' }"
                          @click="setActiveTab('paid')"
                          role="tab"
                          >Paid</a
                        >
                      </li>
                      <li class="nav-item">
                        <a
                          class="nav-link"
                          :class="{ active: activeTab === 'unpaid' }"
                          @click="setActiveTab('unpaid')"
                          role="tab"
                          >Unpaid</a
                        >
                      </li>
                    </ul>

                    <!-- Tabs Content -->
                    <div class="tab-content" id="tab-content-5">
                      <div class="tab-pane fade show active" role="tabpanel">
                        <Orders
                          :data="filteredOrders"
                          @reloadOrders="fetchOrders"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <!-- End Orders Table -->
              </div>
              <div
                class="tab-pane fade active show"
                id="tab-account"
                role="tabpanel"
                aria-labelledby="tab-account-link"
              >
                <Profile />
              </div>
              <!-- Additional Tab Contents Here... -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from "vue";
import OrderTable from "../components/OrderTable.vue";
import Orders from "../components/Orders.vue";
import Profile from "@/components/Profile.vue";
import common from "../common/composable/common";
import apiFront from "../common/composable/apiFront";
import { useStore } from "vuex";
import FullScreenLoading from "@/components/FullScreenLoading.vue"; // Import the component

export default defineComponent({
  components: {
    OrderTable,
    Orders,
    Profile,
    FullScreenLoading,
  },
  setup() {
    const { frontWarehouse } = common();
    const store = useStore();
    const { addEditRequestFront, loading, rules } = apiFront();
    const states = ref({
      totalOrders: 0,
      pendingOrders: 0,
      processingOrders: 0,
      completedOrders: 0,
    });
    const recentOrders = ref([]);
    const isLoading = ref(true); // Initialize isLoading to true

    const activeTab = ref("all"); // Default tab
    const filteredOrders = computed(() => {
      if (activeTab.value === "paid") {
        return recentOrders.value.filter(
          (order) => order.payment_status === "paid"
        );
      } else if (activeTab.value === "unpaid") {
        return recentOrders.value.filter(
          (order) => order.payment_status === "unpaid"
        );
      }
      return recentOrders.value; // 'all' tab
    });

    const setActiveTab = (tab) => {
      activeTab.value = tab;
      fetchOrders(); // Refetch orders when tab changes
    };

    const logout = () => {
      store.dispatch("front/logout");
    };

    onMounted(() => {
      fetchOrders();
    });

    const fetchOrders = () => {
      isLoading.value = true; // Set loading to true before the request
      addEditRequestFront({
        url: "front/self/dashboard",
        data: {},
        success: (response) => {
          states.value = {
            totalOrders: response.totalOrders,
            pendingOrders: response.pendingOrders,
            processingOrders: response.processingOrders,
            completedOrders: response.completedOrders,
          };
          recentOrders.value = response.recentOrders;
          isLoading.value = false; // Set loading to false after receiving data
        },
        error: (error) => {
          // Handle errors
          isLoading.value = false; // Hide loading indicator in case of errors
        },
      });
    };

    return {
      states,
      recentOrders,
      fetchOrders,
      frontWarehouse,
      activeTab,
      filteredOrders,
      fetchOrders,
      setActiveTab,
      logout,
      isLoading,
    };
  },
});
</script>

<style scoped>
.card {
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-body {
  padding: 20px;
}

.dashboard-items {
  margin-bottom: 20px;
}

.dashboard-item {
  padding: 10px;
}

.icon-box {
  display: flex;
  align-items: center;
}

.icon-box-icon {
  font-size: 2rem;
  color: #ffffff;
  margin-right: 10px;
}

.icon-box-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0;
}

.table-custom th {
  background-color: #c66;
  color: white;
  padding-left: 5px;
}

.table-custom td {
  padding: 10px;
  text-align: center;
}
</style>
