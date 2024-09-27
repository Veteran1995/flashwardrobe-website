<template>
  <!-- Button to trigger modal -->
  <button @click="showModal" class="view-order-button">
    <i style="font-size: 20px" class="icon-eye"></i>
  </button>

  <!-- Custom Modal Implementation -->
  <div v-if="visible" class="modal-overlay">
    <div class="modal-content" style="width: 70%">
      <div class="modal-header">
        <span>{{ order.invoice_number }}</span>
        <button @click="closeModal" class="modal-close-button">&times;</button>
      </div>
      <div class="modal-body">
        <OrderDetails :order="order" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import OrderDetails from "./OrderDetails.vue";

export default defineComponent({
  props: ["order"],
  components: {
    OrderDetails,
  },
  setup() {
    const visible = ref(false);

    const showModal = () => {
      visible.value = true;
    };

    const closeModal = () => {
      visible.value = false;
    };

    return {
      visible,
      showModal,
      closeModal,
    };
  },
});
</script>

<style scoped>
/* Basic Button Styling */
.view-order-button {
  background-color: transparent;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
}

.view-order-button i {
  margin-right: 5px;
}

/* Modal Overlay Styling */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* Modal Content Styling */
.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  max-width: 90%;
  position: relative;
}

/* Modal Header */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e5e5e5;
  margin-bottom: 15px;
}

/* Close Button */
.modal-close-button {
  background: none;
  border: none;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
}

/* Modal Body */
.modal-body {
  max-height: 70vh;
  overflow-y: auto;
}
</style>
