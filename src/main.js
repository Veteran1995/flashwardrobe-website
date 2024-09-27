import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./main/store";
import { setupI18n, loadLocaleMessages } from "./common/i18n";
import print from "vue3-print-nb";

// Uncomment this line if you want to use PerfectScrollbar
// import PerfectScrollbar from "vue3-perfect-scrollbar";
// import "vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css";

if (store.getters["auth/isLoggedIn"]) {
  store.dispatch("auth/updateUser");
}

store.dispatch("auth/updateGlobalSetting");
store.dispatch("auth/updateApp");
store.dispatch("auth/updateAllLangs");
store.dispatch("auth/updateAllWarehouses");
store.commit("auth/updateActiveModules", window.config.modules);
store.dispatch("auth/updateVisibleSubscriptionModules");

async function initializeApp() {
  const app = createApp(App);

  const i18n = setupI18n({
    legacy: false,
    globalInjection: true,
    locale: store.state.auth.lang,
    warnHtmlMessage: false,
  });

  // Load locale messages
  // await loadLocaleMessages(i18n, store.state.auth.lang);

  app.config.devtools = true;
  app.config.debug = true;

  // Apply plugins
  app.use(i18n);
  // Uncomment the next line if you want to use PerfectScrollbar
  // app.use(PerfectScrollbar);
  app.use(store);
  app.use(print);
  app.use(router);

  window.i18n = i18n;

  router.isReady().then(() => {
    const currentRoute = router.currentRoute.value;
    if (currentRoute && currentRoute.meta.isFrontStore) {
      store.commit("front/updateWarehouseSlug", currentRoute.params.warehouse);
      store.commit(
        "front/updateWarehouseCurrency",
        window.config.warehouseCurrency
      );
      store.commit("front/updateApp", window.config.frontStoreSettings);
    }
    app.mount("#app");
  });
}

initializeApp();
