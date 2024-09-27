<template>
  <div>
    <!-- Modal Backdrop -->
    <div
      v-if="visible"
      class="modal-backdrop fade show"
      style="opacity: 0.5"
    ></div>

    <!-- Modal Content -->
    <div
      v-if="visible"
      class="modal fade show"
      id="signin-modal"
      tabindex="-1"
      role="dialog"
      style="display: block; padding-right: 15px"
      aria-modal="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <button
              type="button"
              class="close"
              @click="closeModal"
              aria-label="Close"
            >
              <span aria-hidden="true"><i class="icon-close"></i></span>
            </button>
            <div class="form-box">
              <div class="form-tab">
                <ul class="nav nav-pills nav-fill" role="tablist">
                  <li class="nav-item">
                    <a
                      class="nav-link active"
                      id="signin-tab"
                      data-toggle="tab"
                      href="#signin"
                      role="tab"
                      aria-controls="signin"
                      aria-selected="true"
                      >Sign In</a
                    >
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      id="register-tab"
                      data-toggle="tab"
                      href="#register"
                      role="tab"
                      aria-controls="register"
                      aria-selected="false"
                      >Register</a
                    >
                  </li>
                </ul>
                <div class="tab-content" id="tab-content-5">
                  <!-- Sign In Tab -->
                  <div
                    class="tab-pane fade show active"
                    id="signin"
                    role="tabpanel"
                    aria-labelledby="signin-tab"
                  >
                    <form @submit.prevent="onLogin">
                      <div class="form-group">
                        <label for="signin-email"
                          >Username or email address *</label
                        >
                        <input
                          type="text"
                          class="form-control"
                          id="signin-email"
                          v-model="credentials.email"
                          required
                        />
                      </div>
                      <div class="form-group">
                        <label for="signin-password">Password *</label>
                        <input
                          type="password"
                          class="form-control"
                          id="signin-password"
                          v-model="credentials.password"
                          required
                        />
                      </div>
                      <div class="form-footer">
                        <button type="submit" class="btn btn-outline-primary-2">
                          <span>LOG IN</span>
                          <i class="icon-long-arrow-right"></i>
                        </button>
                        <div class="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            class="custom-control-input"
                            id="signin-remember"
                          />
                          <label
                            class="custom-control-label"
                            for="signin-remember"
                            >Remember Me</label
                          >
                        </div>
                        <a href="#" class="forgot-link"
                          >Forgot Your Password?</a
                        >
                      </div>
                    </form>
                  </div>
                  <!-- Register Tab -->
                  <div
                    class="tab-pane fade"
                    id="register"
                    role="tabpanel"
                    aria-labelledby="register-tab"
                  >
                    <form @submit.prevent="onSignup">
                      <div class="form-group">
                        <label for="register-name">Your Name *</label>
                        <input
                          type="text"
                          class="form-control"
                          id="register-name"
                          v-model="signupCredentials.name"
                          required
                        />
                      </div>
                      <div class="form-group">
                        <label for="register-phone">Phone Number *</label>
                        <input
                          type="tel"
                          class="form-control"
                          id="register-phone"
                          v-model="signupCredentials.phone"
                          required
                        />
                      </div>
                      <div class="form-group">
                        <label for="register-email">Your email address *</label>
                        <input
                          type="email"
                          class="form-control"
                          id="register-email"
                          v-model="signupCredentials.email"
                          required
                        />
                      </div>
                      <div class="form-group">
                        <label for="register-password">Password *</label>
                        <input
                          type="password"
                          class="form-control"
                          id="register-password"
                          v-model="signupCredentials.password"
                          required
                        />
                      </div>
                      <div class="form-footer">
                        <button type="submit" class="btn btn-outline-primary-2">
                          <span>SIGN UP</span>
                          <i class="icon-long-arrow-right"></i>
                        </button>
                        <div class="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            class="custom-control-input"
                            id="register-policy"
                            required
                          />
                          <label
                            class="custom-control-label"
                            for="register-policy"
                            >I agree to the
                            <a href="#">privacy policy</a> *</label
                          >
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, watch, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import common from "../../common/composable/common";
import apiFront from "../../common/composable/apiFront";

export default defineComponent({
  props: {
    modalVisible: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["modalClosed"],
  setup(props, { emit }) {
    const store = useStore();
    const router = useRouter();
    const { t } = useI18n();
    const visible = ref(props.modalVisible);
    const errorMessage = ref("");
    const signupSuccess = ref(false);

    const credentials = ref({
      email: null,
      password: null,
    });

    const signupCredentials = ref({
      name: null,
      phone: null,
      email: null,
      password: null,
    });

    const { addEditRequestFront, loading, rules } = apiFront();
    const { frontWarehouse } = common();

    // Watch for changes in the modalVisible prop and update internal visibility
    watch(
      () => props.modalVisible,
      (newVal) => {
        visible.value = newVal;
      }
    );

    // Handle closing of the modal
    const closeModal = () => {
      visible.value = false;
      emit("modalClosed");
    };

    const onLogin = () => {
      errorMessage.value = "";

      addEditRequestFront({
        url: "front/login",
        data: credentials.value,
        // successMessage: t("front.logged_in_successfully"),
        success: (res) => {
          store.commit("front/updateUser", res.user);
          store.commit("front/updateToken", res.token);
          store.commit("front/updateExpires", res.expires_in);

          visible.value = false;

          router.push({
            name: "homepage",
          });
        },
        error: (errorRules) => {
          if (errorRules.error_message) {
            errorMessage.value = errorRules.error_message;
          }
        },
      });
    };

    const onSignup = () => {
      errorMessage.value = "";

      addEditRequestFront({
        url: "front/signup",
        data: signupCredentials.value,
        successMessage: t("front.register_successfully"),
        success: (res) => {
          signupSuccess.value = true;
        },
        error: (errorRules) => {
          if (errorRules.error_message) {
            errorMessage.value = errorRules.error_message;
          }
        },
      });
    };

    return {
      visible,
      credentials,
      signupCredentials,
      errorMessage,
      loading,
      rules,
      frontWarehouse,
      closeModal,
      onLogin,
      onSignup,
      signupSuccess,
      user: computed(() => store.state.front.user),
      isLoggedIn: computed(() => store.getters["front/isLoggedIn"]),
    };
  },
});
</script>
