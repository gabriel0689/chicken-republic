<template>
  <v-container>
    <v-row justify="center">
      <v-card flat color="transparent" class="my-4">
        <p class="text-center headline">Thank you for ordering from Chicken Republic</p>
        <p class="text-center title" v-if="firstName">{{ firstName }} your order is on its way</p>
        <p class="text-center title" v-if="!firstName">Your order is on its way</p>
      </v-card>
    </v-row>
    <v-row>
      <v-img
        class="my-4"
        max-height="200"
        contain
        :src="require('../assets/chicken-republic-logo-2.png')"
      ></v-img>
    </v-row>
    <v-row justify="center">
      <v-btn class="my-8 mx-2 primary" to="/home">Continue Shopping</v-btn>
      <v-btn class="my-8 primary" to="/orders">View all Orders</v-btn>
    </v-row>
  </v-container>
</template>

<script>
import { db } from "../db.js";
export default {
  name: "checkout",
  data: () => ({
    firstName: null
  }),
  mounted() {
    if (this.user) {
      const email = this.user.email;
      let docRef = db.collection("users").doc(email);
      docRef
        .get()
        .then(doc => {
          if (doc.exists) {
            // get users first name
            this.firstName = doc.data().firstName;
          } else {
            alert("No such document!");
          }
        })
        .catch(error => {
          alert("Error getting documents: ", error);
        });
    }
  },
  computed: {
    user() {
      return this.$store.state.user; // get user state
    }
  }
};
</script>