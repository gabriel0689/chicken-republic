<template>
  <div>
    <v-app-bar
      color="#d43027"
      dark
    >
      <v-btn icon text to="/" color="primary">
      <v-img class="mx-2"
        :src="require('../assets/chicken-republic-logo.jpeg')"
        max-height="40" max-width="40" contain></v-img>
      </v-btn>

      <v-toolbar-title>Chicken Republic</v-toolbar-title>

      <div class="flex-grow-1"></div>

      <v-btn text small v-if="currentUser.currentUser" @click="logOut">Log Out</v-btn>

      <v-btn text small v-if="!currentUser.currentUser" to="/login">Log In</v-btn>

      <v-btn text small to="/signup" v-if="!currentUser.currentUser">Sign Up</v-btn>

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
      .catch( error => {
        // An error happened.
        console.log(error.message);
      });
    }
  }
};
</script>
