<template>
  <div>
    <ul>
      <li v-for="item in userAddresses" :key="item.xid" class="address-item">
        <div class="address-actions">
          <button @click="editAddress(item)" class="btn-link">Edit</button>
          <button @click="deleteAddress(item.xid)" class="btn-link">
            Delete
          </button>
        </div>
        <div class="address-content">
          <label>
            <input
              type="radio"
              name="addressCheckbox"
              :value="item.xid"
              v-model="selectedAddress"
              @change="addressSelected"
            />
            {{ item.name }}
          </label>
          <p>
            {{ buildAddress(item) }}<br />
            {{ $t("user.phone") }}: {{ item.phone }}
          </p>
        </div>
      </li>
    </ul>
    <button class="btn-link" @click="addAddress">Add New Address</button>
    <!-- AddEdit component placeholder -->
    <AddEdit
      :addEditVisible="addEditVisible"
      :formData="addEditAddress"
      :addEditId="addEditId"
      @addEditSuccess="addEditSuccess"
    />
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, createVNode } from "vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { Modal, notification } from "ant-design-vue";
import AddEdit from "./AddEdit.vue";
import { buildAddress } from "../../common/scripts/functions";
import axiosFront from "@/common/plugins/axiosFront";

export default defineComponent({
  props: [],
  emits: ["onAddressSelection"],
  components: {
    AddEdit,
  },
  setup(props, { emit }) {
    const selectedAddress = ref(null);
    const userAddresses = ref([]);
    const store = useStore();
    const { t } = useI18n();
    const user = store.state.front.user;
    const indexUrl =
      "front/self/address?fields=id,xid,name,email,phone,address,shipping_address,city,state,country,zipcode";
    const addEditVisible = ref(false);
    const addEditAddress = ref({});
    const addEditId = ref(null);

    onMounted(() => {
      getUserAddress();
      selectedAddress.value = props.selectedAddress;
      console.log(selectedAddress.value);
    });

    const getUserAddress = () => {
      axiosFront.get(indexUrl).then((response) => {
        userAddresses.value = response.data;
      });
    };

    const addAddress = () => {
      addEditAddress.value = {
        name: user.name,
        phone: user.phone,
        email: user.email,
        address: user.address,
        shipping_address: user.shipping_address,
        city: user.city,
        state: user.state,
        country: user.country,
        zipcode: user.zipcode,
      };
      addEditId.value = null;
      addEditVisible.value = true;
    };

    const editAddress = (address) => {
      addEditAddress.value = {
        name: address.name,
        email: address.email,
        phone: address.phone,
        address: address.address,
        shipping_address: address.shipping_address,
        city: address.city,
        state: address.state,
        country: address.country,
        zipcode: address.zipcode,
        _method: "PUT",
      };
      addEditId.value = address.xid;
      addEditVisible.value = true;
    };

    const addressSelected = () => {
      emit("onAddressSelection", selectedAddress.value);
    };

    const addEditSuccess = () => {
      getUserAddress();
    };

    const deleteAddress = (userAddressId) => {
      Modal.confirm({
        title: "Delete" + "?",
        icon: createVNode(ExclamationCircleOutlined),
        content: "Are you sure you want to delete",
        centered: true,
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        onOk() {
          axiosFront
            .delete(`front/self/address/${userAddressId}`)
            .then((response) => {
              getUserAddress();

              notification.success({
                message: "Success",
                description: "Address Deleted",
                placement: "bottomRight",
              });
            });
        },
        onCancel() {},
      });
    };

    return {
      userAddresses,
      addAddress,
      editAddress,
      selectedAddress,
      addressSelected,

      buildAddress,
      addEditVisible,
      addEditAddress,
      addEditId,
      addEditSuccess,
      deleteAddress,
    };
  },
});
</script>

<style scoped>
.address-item {
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
}

.address-actions {
  float: right;
}

.btn-link {
  background: none;
  border: none;
  color: #007bff;
  text-decoration: none;
  cursor: pointer;
}

.address-content label {
  font-weight: bold;
}

.address-content p {
  margin: 5px 0 0;
  font-size: 0.9em;
  color: #555;
}
</style>
