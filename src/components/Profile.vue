<template>
  <div class="mt-30 mb-30">
    <form action="#">
      <label>Full Name *</label>
      <input
        v-model="formData.name"
        type="text"
        class="form-control"
        required=""
      />
      <small class="form-text"
        >This will be how your name will be displayed in the account section and
        in reviews</small
      >

      <label>Email address *</label>
      <input
        v-model="formData.email"
        type="email"
        class="form-control"
        required=""
      />

      <label>Phone</label>
      <input v-model="formData.phone" type="text" class="form-control" />

      <div class="row">
        <div class="col-sm-6">
          <label>New password (leave blank to leave unchanged)</label>
          <input
            v-model="formData.password"
            type="password"
            class="form-control"
          />
        </div>
        <!-- End .col-sm-6 -->

        <div class="col-sm-6">
          <UploadFront
            :formData="formData"
            folder="user"
            imageField="profile_image"
            @onFileUploaded="
              (file) => {
                formData.profile_image = file.file;
                formData.profile_image_url = file.file_url;
              }
            "
          />
        </div>
        <!-- End .col-sm-6 -->
      </div>

      <label>Billing Address</label>
      <input v-model="formData.address" type="text" class="form-control" />

      <label>Billing Address</label>
      <input
        v-model="formData.shipping_address"
        type="text"
        class="form-control mb-2"
      />

      <button type="button" @click="onSubmit" class="btn btn-outline-primary-2">
        <span>SAVE CHANGES</span>
        <i class="icon-long-arrow-right"></i>
      </button>
    </form>
  </div>
</template>

<script>
import { onMounted, reactive, computed, ref, createVNode } from "vue";
import {
  EyeOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  SaveOutlined,
} from "@ant-design/icons-vue";
import { notification } from "ant-design-vue";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
import processRequestFront from "../common/plugins/processRequestFront";
import UploadFront from "../common/core/ui/file/UploadFront.vue";

export default {
  components: {
    EyeOutlined,
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    ExclamationCircleOutlined,
    SaveOutlined,

    UploadFront,
  },
  setup() {
    const { t } = useI18n();
    const store = useStore();
    const formData = ref({});
    const rules = ref({});
    const currencies = ref({});
    const user = store.state.front.user;

    const formImage = ref({
      image: "",
      image_url: "",
    });

    onMounted(() => {
      formData.value = {
        name: user.name,
        email: user.email,
        password: "",
        phone: user.phone,
        address: user.address,
        shipping_address: user.shipping_address,
        city: user.city,
        state: user.state,
        country: user.country,
        zipcode: user.zipcode,
        profile_image: user.profile_image,
        profile_image_url: user.profile_image_url,
      };
    });

    const onSubmit = () => {
      processRequestFront({
        url: "front/profile",
        data: formData.value,
        success: (res) => {
          store.commit("front/updateUser", res.user);

          // Toastr Notificaiton
          notification.success({
            placement: "bottomRight",
            message: t("common.success"),
            description: t("user.profile_updated"),
          });

          rules.value = {};
        },
        error: (errorRules) => {
          rules.value = errorRules;
          message.error(t("common.fix_errors"));
        },
      });
    };

    return {
      formData,
      rules,
      formImage,
      currencies,
      onSubmit,
    };
  },
};
</script>
