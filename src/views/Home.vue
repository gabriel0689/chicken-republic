<template>
  <v-container class="px-8 py-8">
    <v-row>
      <v-card flat color="transparent" v-if="firstName">Welcome Back, {{ firstName }}</v-card>
    </v-row>
  </v-container>
</template>

<script>
import {db, fb} from '../db.js'
export default {
  data: () => ({
    firstName: null
  }),
  mounted() {
    // db.collection("users")
    // .doc("lfu527K7iJuij8bqBUiy")
    // .get().then(snapshot => {
    //   this.user = snapshot.data().name;
    // })

    const userEmail = fb.auth().currentUser.email;
    db.collection("users")
    .doc(userEmail).get()
    .then(snapshot => {
      this.firstName = snapshot.data().firstName;
    })
    .catch(error => {
      console.log(error);
      // this.feedback = error.message;
    })
    console.log(userEmail);

  }
};
</script>
