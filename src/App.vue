<template>
  <v-app>
    <AppBar />
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
// import { db, fb } from "./db.js";
import AppBar from "./components/AppBar";

export default {
  name: "App",
  components: {
    AppBar
  },
  created() {
    this.$store.dispatch("loadMenuAction");
    this.$store.dispatch("loadUserAction");
  }
};
</script>