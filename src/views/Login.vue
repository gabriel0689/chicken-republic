<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="10">
        <v-alert type="error" v-if="feedback">{{ feedback }}</v-alert>
      </v-col>

      <v-col cols="10">
        <v-alert type="success" v-if="success">{{ success }}</v-alert>
      </v-col>

      <v-col cols="10">
        <v-card flat color="transparent" class="display-1 mx-auto">Login</v-card>

        <v-form class="mx-auto my-4" @submit.prevent="signUp">
          <v-text-field v-model="email" label="E-mail" type="email"></v-text-field>

          <v-text-field v-model="password" label="Password" type="password"></v-text-field>

          <v-btn class="mr-4 primary" @click="login" :loading="loading">Login</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { db, fb } from "../db.js";
export default {
  name: "Login",
  data: () => ({
    feedback: null,
    success: null,
    email: null,
    password: null,
    loading: false
  }),

  methods: {
    login() {
      this.loading = true;
      if (this.email && this.password) {
        let ref = db.collection("users").doc(this.email);
        ref.get().then(doc => {
          if (!doc.exists) {
            this.feedback = "this email is not registered";
            this.loading = false;
          } else {
            fb.auth()
              .signInWithEmailAndPassword(this.email, this.password)
              .then(() => {
                this.loading = false;
                this.success = "You successfully logged in";
                this.$store.dispatch("loadUserAction");
                this.$router.replace({ name: "home" });
              })
              .catch(error => {
                // alert(error);
                this.loading = false;
                this.feedback = error.message;
              });
          }
        });
      } else {
        this.feedback = "You must enter all fields";
      }
    }
  }
};
</script>