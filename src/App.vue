<template>
  <v-app>
    <AppBar />
    <v-content>
      <router-view />
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import AppBar from "./components/AppBar";
import Footer from "./components/Footer";

export default {
  name: "App",
  components: {
    AppBar,
    Footer
  },
  created() {
    this.$store.dispatch("loadMenuAction"); // get menu state
    this.$store.dispatch("loadUserAction"); // get user state
    this.$store.dispatch("loadOrdersAction"); // get all orders state
    this.$store.dispatch("loadMyOrdersAction"); // get user's orders state
  },
  updated() {
    this.$store.dispatch("loadUserAction");
  }
};
</script>