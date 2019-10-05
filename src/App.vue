<template>
  <v-app>
    <AppBar :currentUser="currentUser"/>
    <v-content>
      <router-view :currentUser="currentUser" :cart="cart" v-on:addToCart="updateCart($event)"/>
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
    currentUser: {},
    cart: []
  }),
  created() {
    this.currentUser = fb.auth().currentUser;
    // console.log(this.user)
  },
  methods: {
    updateCart(updatedCart) {
      this.cart = updatedCart;
      // console.log(this.cart.length + " items in cart.");
      // console.table(this.cart);
    }
  },
  updated() {
    // console.log("root component updated")
  }
};
</script>
