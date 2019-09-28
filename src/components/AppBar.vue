<template>
  <div>
    <v-app-bar
      color="#d43027"
      dark
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-img class="mx-2"
        :src="require('../assets/chicken-republic-logo.jpeg')"
        max-height="40" max-width="40" contain></v-img>

      <v-toolbar-title><v-btn text transparent to="//">Chicken Republic</v-btn></v-toolbar-title>

      <div class="flex-grow-1"></div>

      <v-btn text small v-if="currentUser.currentUser" @click="logOut">Log Out</v-btn>

      <v-btn text small v-if="!currentUser.currentUser" to="/login">Log In</v-btn>

      <v-btn text small to="/signup" v-if="!currentUser.currentUser">Sign Up</v-btn>

      <v-btn icon small class="d-none d-sm-flex mr-4">
        <v-icon>mdi-cart</v-icon>
      </v-btn>

    </v-app-bar>
  </div>
</template>

<script>
import { fb } from "../db.js"
export default {
  name: "AppBar",
  props: {currentUser: Object},
  methods: {
    logOut() {
      fb.auth().signOut().then(function() {
        // Sign-out successful.
      })
      .then(() => {
        this.$router.push({ name: "login" })
      })
      .catch(function(error) {
        // An error happened.
        console.log(error.message);
      });
    }
  }
};
</script>