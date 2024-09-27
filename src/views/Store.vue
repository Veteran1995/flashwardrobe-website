<template>
  <FullScreenLoading v-if="isLoading" />
  <div
    class="page-header text-center"
    style="background-image: url('assets/images/page-header-bg.jpg')"
  >
    <div class="container">
      <h1 class="page-title">List<span>Shop</span></h1>
    </div>
    <!-- End .container -->
  </div>
  <div class="page-content">
    <div class="container">
      <div class="row">
        <div class="col-lg-9">
          <div class="toolbox">
            <div class="toolbox-left">
              <div class="toolbox-info">
                Showing
                <span
                  >{{ paginatedProductCards.length }} of
                  {{ filteredProductCount }}</span
                >
                Products
              </div>
            </div>

            <div class="toolbox-right">
              <div class="toolbox-sort">
                <label for="sortby">Sort by:</label>
                <div class="select-custom">
                  <select
                    v-model="sortBy"
                    name="sortby"
                    id="sortby"
                    class="form-control"
                  >
                    <option value="popularity">Most Popular</option>
                    <option value="rating">Most Rated</option>
                    <option value="date">Date</option>
                  </select>
                </div>
              </div>
              <!-- ... existing layout buttons ... -->
            </div>
          </div>

          <div class="products mb-3" v-if="paginatedProductCards.length">
            <ProductCard
              v-for="product in paginatedProductCards"
              :key="product.xid"
              :product="product"
            />
          </div>

          <nav aria-label="Page navigation">
            <ul class="pagination">
              <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <a
                  class="page-link page-link-prev"
                  href="#"
                  @click.prevent="previousPage"
                  aria-label="Previous"
                >
                  <span aria-hidden="true"
                    ><i class="icon-long-arrow-left"></i></span
                  >Prev
                </a>
              </li>
              <li
                class="page-item"
                v-for="page in totalPages"
                :key="page"
                :class="{ active: page === currentPage }"
              >
                <a class="page-link" href="#" @click.prevent="goToPage(page)">{{
                  page
                }}</a>
              </li>
              <li class="page-item-total">of {{ totalPages }}</li>
              <li
                class="page-item"
                :class="{ disabled: currentPage === totalPages }"
              >
                <a
                  class="page-link page-link-next"
                  href="#"
                  @click.prevent="nextPage"
                  aria-label="Next"
                >
                  Next<span aria-hidden="true"
                    ><i class="icon-long-arrow-right"></i
                  ></span>
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <aside class="col-lg-3 order-lg-first">
          <div class="sidebar sidebar-shop">
            <div class="widget widget-clean">
              <label>Filters:</label>
              <a
                href="#"
                @click.prevent="clearFilters"
                class="sidebar-filter-clear"
                >Clean All</a
              >
            </div>

            <div class="widget widget-collapsible">
              <h3 class="widget-title">
                <a
                  data-toggle="collapse"
                  href="#widget-1"
                  role="button"
                  aria-expanded="true"
                  aria-controls="widget-1"
                >
                  Category
                </a>
              </h3>
              <div class="collapse show" id="widget-1">
                <div class="widget-body">
                  <div class="filter-items filter-items-count">
                    <div
                      v-for="category in categories"
                      :key="category.xid"
                      class="filter-item"
                    >
                      <div class="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          class="custom-control-input"
                          :id="'cat-' + category.id"
                          :checked="selectedCategories.includes(category.id)"
                          @change="toggleCategory(category.id)"
                        />
                        <label
                          class="custom-control-label"
                          :for="'cat-' + category.id"
                          >{{ category.name }}</label
                        >
                      </div>
                      <span class="item-count">{{
                        category.products_count
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from "vue";
import ProductCard from "@/components/ProductCard.vue";
import FullScreenLoading from "@/components/FullScreenLoading.vue";

export default defineComponent({
  components: {
    ProductCard,
    FullScreenLoading,
  },
  setup() {
    const frontProductCards = ref([]);
    const categories = ref([]);
    const selectedCategories = ref([]);
    const sortBy = ref("popularity");
    const currentPage = ref(1);
    const productsPerPage = ref(3);
    const isLoading = ref(true); // Initialize isLoading to true

    onMounted(async () => {
      try {
        isLoading.value = true;

        const [flashProducts, categoriesResponse] = await Promise.all([
          axiosFront.get("front/homepage/flash-wordrobe-2z17xsaa"),
          axiosFront.get("shop-categories"),
        ]);

        frontProductCards.value = flashProducts.data.front_product_cards;
        categories.value = categoriesResponse.message.categories;
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle errors gracefully, e.g., display an error message to the user
      } finally {
        isLoading.value = false;
      }
    });

    const toggleCategory = (categoryId) => {
      const index = selectedCategories.value.indexOf(categoryId);
      if (index === -1) {
        selectedCategories.value.push(categoryId);
      } else {
        selectedCategories.value.splice(index, 1);
      }
    };

    const filteredProductCards = computed(() => {
      let filtered = frontProductCards.value.flatMap(
        (card) => card.products_details
      );

      if (selectedCategories.value.length > 0) {
        filtered = filtered.filter((product) =>
          selectedCategories.value.includes(product.category_id)
        );
      }

      switch (sortBy.value) {
        case "rating":
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        case "date":
          filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
          break;
        default:
          filtered.sort((a, b) => b.popularity - a.popularity);
          break;
      }

      return filtered;
    });

    const filteredProductCount = computed(
      () => filteredProductCards.value.length
    );

    const totalPages = computed(() =>
      Math.ceil(filteredProductCount.value / productsPerPage.value)
    );

    const paginatedProductCards = computed(() => {
      const start = (currentPage.value - 1) * productsPerPage.value;
      return filteredProductCards.value.slice(
        start,
        start + productsPerPage.value
      );
    });

    const clearFilters = () => {
      selectedCategories.value = [];
    };

    const previousPage = () => {
      if (currentPage.value > 1) {
        currentPage.value -= 1;
      }
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value += 1;
      }
    };

    const goToPage = (page) => {
      currentPage.value = page;
    };

    return {
      frontProductCards,
      categories,
      selectedCategories,
      sortBy,
      currentPage,
      totalPages,
      filteredProductCards,
      filteredProductCount,
      paginatedProductCards,
      clearFilters,
      toggleCategory,
      previousPage,
      nextPage,
      goToPage,
      isLoading,
    };
  },
});
</script>
