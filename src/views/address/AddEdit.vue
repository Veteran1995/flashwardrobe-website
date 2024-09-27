<template>
  <!-- Modal Backdrop -->
  <div
    v-if="addEditVisible"
    class="modal-backdrop fade show"
    style="opacity: 0.5"
  ></div>

  <!-- Modal Content -->
  <div
    v-if="addEditVisible"
    class="modal fade show"
    id="signin-modal"
    tabindex="-1"
    role="dialog"
    style="display: block; padding-right: 15px"
    aria-modal="true"
  >
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-body">
          <button
            type="button"
            class="close"
            @click="onClose"
            aria-label="Close"
          >
            <span aria-hidden="true"><i class="icon-close"></i></span>
          </button>
          <form @submit.prevent="onSubmit" class="modal-form">
            <!-- Name -->
            <div class="form-group">
              <label for="name">{{ $t("user.name") }}</label>
              <input
                type="text"
                id="name"
                v-model="address.name"
                class="form-control"
                :placeholder="
                  $t('common.placeholder_default_text', [$t('user.name')])
                "
                :class="{ 'input-error': rules.name }"
              />
              <span v-if="rules.name" class="error-message">{{
                rules.name.message
              }}</span>
            </div>

            <!-- Email and Phone -->
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="email">{{ $t("user.email") }}</label>
                <input
                  type="email"
                  id="email"
                  v-model="address.email"
                  class="form-control"
                  :placeholder="
                    $t('common.placeholder_default_text', [$t('user.email')])
                  "
                  :class="{ 'input-error': rules.email }"
                />
                <span v-if="rules.email" class="error-message">{{
                  rules.email.message
                }}</span>
              </div>

              <div class="form-group col-md-6">
                <label for="phone">{{ $t("user.phone") }}</label>
                <input
                  type="text"
                  id="phone"
                  v-model="address.phone"
                  class="form-control"
                  :placeholder="
                    $t('common.placeholder_default_text', [$t('user.phone')])
                  "
                  :class="{ 'input-error': rules.phone }"
                />
                <span v-if="rules.phone" class="error-message">{{
                  rules.phone.message
                }}</span>
              </div>
            </div>

            <!-- Billing Address -->
            <div class="form-group">
              <label for="address">{{ $t("user.billing_address") }}</label>
              <textarea
                id="address"
                v-model="address.address"
                class="form-control"
                rows="3"
                :placeholder="
                  $t('common.placeholder_default_text', [
                    $t('user.billing_address'),
                  ])
                "
                :class="{ 'input-error': rules.address }"
              ></textarea>
              <span v-if="rules.address" class="error-message">{{
                rules.address.message
              }}</span>
            </div>

            <!-- Shipping Address -->
            <div class="form-group">
              <label for="shipping_address">{{
                $t("user.shipping_address")
              }}</label>
              <textarea
                id="shipping_address"
                v-model="address.shipping_address"
                class="form-control"
                rows="3"
                :placeholder="
                  $t('common.placeholder_default_text', [
                    $t('user.shipping_address'),
                  ])
                "
                :class="{ 'input-error': rules.shipping_address }"
              ></textarea>
              <span v-if="rules.shipping_address" class="error-message">{{
                rules.shipping_address.message
              }}</span>
            </div>

            <!-- City and State -->
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="city">City</label>
                <input
                  type="text"
                  id="city"
                  v-model="address.city"
                  class="form-control"
                  placeholder="Enter City"
                  :class="{ 'input-error': rules.city }"
                />
                <span v-if="rules.city" class="error-message">{{
                  rules.city.message
                }}</span>
              </div>

              <div class="form-group col-md-6">
                <label for="state">State</label>
                <input
                  type="text"
                  id="state"
                  v-model="address.state"
                  class="form-control"
                  placeholder="Enter State"
                  :class="{ 'input-error': rules.state }"
                />
                <span v-if="rules.state" class="error-message">{{
                  rules.state.message
                }}</span>
              </div>
            </div>

            <!-- Country and Zipcode -->
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="country">Country</label>
                <input
                  type="text"
                  id="country"
                  v-model="address.country"
                  class="form-control"
                  placeholder="Enter Country"
                  :class="{ 'input-error': rules.country }"
                />
                <span v-if="rules.country" class="error-message">{{
                  rules.country.message
                }}</span>
              </div>

              <div class="form-group col-md-6">
                <label for="zipcode">ZipCode</label>
                <input
                  type="number"
                  id="zipcode"
                  v-model="address.zipcode"
                  class="form-control"
                  placeholder="Enter ZipCode"
                  :class="{ 'input-error': rules.zipcode }"
                />
                <span v-if="rules.zipcode" class="error-message">{{
                  rules.zipcode.message
                }}</span>
              </div>
            </div>

            <!-- Modal Footer -->
            <div class="modal-footer">
              <button type="submit" class="btn btn-primary">
                <i class="icon-save"></i> Save
              </button>
              <button type="button" class="btn btn-secondary" @click="onClose">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, onMounted, watch } from "vue";
import { useI18n } from "vue-i18n";
import processRequestFront from "../../common/plugins/processRequestFront";

export default {
  props: ["formData", "addEditVisible", "addEditId"],
  emits: ["addEditSuccess"],

  setup(props, { emit }) {
    const visible = ref(props.addEditVisible);
    const address = ref(props.formData);
    const rules = ref({});
    const { t } = useI18n();

    onMounted(() => {
      visible.value = props.addEditVisible;
      address.value = props.formData;
    });

    const onSubmit = () => {
      let url = "front/self/address";
      if (props.addEditId != null) {
        url = `front/self/address/${props.addEditId}`;
      }

      processRequestFront({
        url,
        data: address.value,
        success: (res) => {
          notification.success({
            placement: "bottomRight",
            message: t("common.success"),
            description: t("front.address_saved"),
          });

          emit("addEditSuccess");
          rules.value = {};
          visible.value = false;
        },
        error: (errorRules) => {
          rules.value = errorRules;
          message.error(t("common.fix_errors"));
        },
      });
    };

    const onClose = () => {
      visible.value = false;
    };

    watch(
      () => props.addEditVisible,
      (newVal) => {
        visible.value = newVal;
        address.value = props.formData;
      }
    );

    return {
      address,
      rules,
      visible,
      onSubmit,
      onClose,
    };
  },
};
</script>
<style scoped>
.modal-dialog {
  max-width: 50%;
  margin: 1.75rem auto;
}

.modal-content {
  max-height: calc(100vh - 2rem); /* Make sure content is scrollable */
  overflow-y: auto;
}

.modal-body {
  padding: 2rem;
}
</style>
