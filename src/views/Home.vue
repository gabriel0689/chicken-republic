<template>
  <v-container class="px-8 py-8">
    <v-row>
      <v-card flat color="transparent" v-if="firstName">Welcome Back, {{ firstName }}</v-card>
    </v-row>
  </v-container>
</template>

<script>
import {db, fb} from "../db.js"
export default {
  name: "home",
  props: {currentUser: Object},
  data: () => ({
    firstName: null
  }),
  mounted() {
    console.log(this.currentUser);
    if (this.currentUser) {
      const email = this.currentUser.currentUser.email;
      db.collection("users")
      .doc(email).get()
      .then(snapshot => {
        this.firstName = snapshot.data().firstName;
      })
      .catch(error => {
        console.log(error);
        // this.feedback = error.message;
      })  
    }
  }
};
</script>
