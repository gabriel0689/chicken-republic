<template>
    <v-container>
        <v-row justify="center">

            <v-col cols="7">
                <v-alert type="error" v-if="feedback">{{ feedback }}</v-alert>
            </v-col>

            <v-col cols="7">
                <v-alert type="success" v-if="success">{{ success }}</v-alert>
            </v-col>

            <v-col cols="7">

                <v-card flat color="transparent" class="display-1 mx-auto">Login</v-card>

                <v-form class="mx-auto my-4" @submit.prevent="signUp">

                    <v-text-field v-model="email" label="E-mail" type="email"></v-text-field>

                    <v-text-field v-model="password" label="Password" type="password"></v-text-field>

                    <v-btn class="mr-4 primary" @click="login">Login</v-btn>
                </v-form>
            </v-col>
            
        </v-row>
    </v-container>
</template>

<script>
    import {db, fb} from "../db.js"
    export default {
    name: "Login",
    data: () => ({
        feedback: null,
        success: null,
        email: null,
        password: null
    }),

    methods: {
        login() {
            if (this.email && this.password) {
                let ref = db.collection("users").doc(this.email)
                ref.get().then(doc => {
                    if(!doc.exists) {
                        this.feedback = "this email is not registered";
                    } else {
                        fb.auth().signInWithEmailAndPassword(this.email, this.password)
                        .then(() => {
                            this.$router.replace({ name: "home" });
                        })
                        .catch(error => {
                            console.log(error);
                            this.feedback = error.message;
                        })
                        this.success = "You successfully logged in";
                    }
                })
            } else {
                this.feedback = "You must enter all fields";
            }
        }
    }
  }
</script>