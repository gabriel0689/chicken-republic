<template>
  <v-app>
    <AppBar :currentUser="{currentUser}"/>
    <v-content>
      <router-view :currentUser="{currentUser}"/>
    </v-content>
  </v-app>
</template>

<script>
import { fb } from "./db.js"
import AppBar from "./components/AppBar";

export default {
  name: "App",
  components: {
    AppBar
  },
  data: () => ({
    currentUser: {}
  }),
  created() {
    this.currentUser = fb.auth().currentUser;
    // console.log(this.user)
  }
};
</script>
