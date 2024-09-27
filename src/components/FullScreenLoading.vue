<template>
  <div class="full-screen-loading" v-if="isLoading">
    <div class="loading-spinner">
      <div class="spinner"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FullScreenLoading",
  data() {
    return {
      isLoading: true,
    };
  },
  methods: {
    show() {
      this.isLoading = true;
    },
    hide() {
      this.isLoading = false;
    },
  },
};
</script>

<style scoped>
.full-screen-loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading-spinner {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
}

.spinner {
  /* Your spinner styles here */
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 2s linear infinite;
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
