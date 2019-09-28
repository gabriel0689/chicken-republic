import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { fb } from "./db";
require("firebase/firestore");

Vue.config.productionTip = false;

let app = null; // waiting for firebase auth to initialize before creating a vue instance

fb.auth().onAuthStateChanged(() => {
  if (!app) {
    // initialize app if not already created
    app = new Vue({
      router,
      vuetify,
      render: h => h(App)
    }).$mount("#app");
  }
});
