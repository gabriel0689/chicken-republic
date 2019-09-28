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

                <v-card flat color="transparent" class="display-1 mx-auto">Sign Up</v-card>

                <v-form class="mx-auto my-4" @submit.prevent="signUp">

                    <v-text-field v-model="firstName" label="First Name"></v-text-field>

                    <v-text-field v-model="lastName" label="Last Name"></v-text-field>

                    <v-text-field v-model="phoneNumber" type="number" label="Phone Number"></v-text-field>

                    <v-textarea auto-grow v-model="address" label="Address"></v-textarea>

                    <v-text-field v-model="zipCode" type="number" label="Zip Code"></v-text-field>

                    <v-text-field v-model="email" label="E-mail"></v-text-field>

                    <v-text-field v-model="password" label="Password"></v-text-field>

                    <v-checkbox v-model="checkbox" label="I agree to the terms and conditions?"></v-checkbox>

                    <v-btn :disabled="!checkbox" class="mr-4 primary" @click="signUp">Sign Up</v-btn>
                </v-form>
            </v-col>
            
        </v-row>
    </v-container>
</template>

<script>
    import slugify from "slugify"
    import {db, fb} from '../db.js'
    export default {
    name: "SignUp",
    data: () => ({
        slug: null,
        feedback: null,
        success: null,
        //   username: null,
        email: null,
        password: null,
        checkbox: false,
        firstName: null,
        lastName: null,
        address: null,
        phoneNumber: null,
        zipCode: null
    }),

    methods: {
        signUp() {
            if (this.firstName && this.email && this.password) {
                // this.slug = slugify(this.username, {
                //     replacement: '-',
                //     remove: /[$*_+~.()'"!\-:@]/g,
                //     lower: true
                // }); 
                let ref = db.collection("users").doc(this.email)
                ref.get().then(doc => {
                    if(doc.exists) {
                        this.feedback = "this email is already taken"
                    } else {
                        fb.auth().createUserWithEmailAndPassword(this.email, this.password)
                        .then(cred => {
                            ref.set({
                                email: this.email,
                                user_id: cred.user.uid,
                                firstName: this.firstName,
                                lastName: this.lastName,
                                address: this.address,
                                phoneNumber: this.phoneNumber,
                                zipCode: this.zipCode
                            })
                        }).then(() => {
                            this.$router.push({ name: "home" })
                        })
                        .catch(error => {
                            console.log(error);
                            this.feedback = error.message;
                        })
                        this.success = "this username is avaliable"
                    }
                })
                console.log(this.slug)
            } else {
                this.feedback = "You must enter all fields"
            }
        }
    }
  }
</script>