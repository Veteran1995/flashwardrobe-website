<script setup>
import Header from "./components/Header.vue";
import MobileMenu from "./components/MobileMenu.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <div class="page-wrapper">
    <Header />
    <main class="main">
      <RouterView />
    </main>
    <Footer />
  </div>
  <MobileMenu />
</template>
