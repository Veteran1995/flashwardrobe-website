<template>
  <div class="loading-spinner" v-if="isLoading">
    <div class="spinner"></div>
  </div>
</template>

<script>
export default {
  name: "LoadingButton",
  props: ["isLoading"],
  data() {
    return {
      // isLoading: false, // Remove this, as it's already a prop
    };
  },
  methods: {
    toggleLoading() {
      this.isLoading = !this.isLoading;
      // Emit an event if needed
      this.$emit("loading-toggled", this.isLoading);
    },
  },
};
</script>

<style scoped>
.loading-spinner {
  width: 20px;
  height: 20px;
  margin-left: 5px;
}

.spinner {
  /* Your spinner styles here */
  width: 100%;
  height: 100%;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
