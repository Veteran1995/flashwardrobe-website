<template>
  <div class="intro-slider-container mb-0">
    <div
      class="intro-slider owl-carousel owl-theme owl-nav-inside owl-light"
      data-toggle="owl"
      data-owl-options='{"nav": false, "dots": false}'
    >
      <div
        class="intro-slide"
        style="background-image: url(/assets/images/demos/demo-5/slider/slide-1.jpg)"
      >
        <div class="container intro-content text-center">
          <h3 class="intro-subtitle text-white">Don’t Miss</h3>
          <!-- End .h3 intro-subtitle -->
          <h1 class="intro-title text-white">Mystery Deals</h1>
          <!-- End .intro-title -->
          <div class="intro-text text-white">Online Only</div>
          <!-- End .intro-text -->
          <a href="category.html" class="btn btn-primary">Discover NOW</a>
        </div>
        <!-- End .intro-content -->
      </div>
      <!-- End .intro-slide -->

      <div
        class="intro-slide"
        style="background-image: url(/assets/images/demos/demo-5/slider/slide-2.jpg)"
      >
        <div class="container intro-content text-center">
          <h3 class="intro-subtitle text-white">Limited time only</h3>
          <!-- End .h3 intro-subtitle -->
          <h1 class="intro-title text-white">Treat your self</h1>
          <!-- End .intro-title -->
          <div class="intro-text text-white">Up to 50% off</div>
          <!-- End .intro-text -->
          <a href="category.html" class="btn btn-primary">Shop NOW</a>
        </div>
        <!-- End .intro-content -->
      </div>
      <!-- End .intro-slide -->
    </div>
    <!-- End .intro-slider owl-carousel owl-theme -->

    <span class="slider-loader text-white"></span
    ><!-- End .slider-loader -->
  </div>
</template>
<script>
import { ref, onMounted, watch } from "vue";

export default {
  props: ["slides"],
  components: {},
  setup(props) {
    onMounted(() => {});

    return {};
  },
};
</script>
