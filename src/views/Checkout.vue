<template>
    <v-container>
        <v-row justify="center">
            
            <v-card flat color="transparent" v-if="firstName" class="my-4">
                <p class="text-center display-1">Thank you for ordering from Chicken Republic</p>
                <p class="text-center title">{{ firstName }} your order is on its way</p>
            </v-card>

        </v-row>
    </v-container>
</template>

<script>
import {db, fb} from "../db.js"
export default {
  name: "cart",
  props: {
    currentUser: Object,
    cart: Array
  },
  data: () => ({
      firstName: null
  }),
  mounted() {
    const email = this.currentUser.email;
    let docRef = db.collection("users").doc(email);
    docRef.get().then(doc => {
        if (doc.exists) {
            // console.log("Document Data", doc.data());
            this.firstName = doc.data().firstName;
        } else {
            console.log("No such document!");
        }
    }).catch(error => {
        console.log("Error getting documents: ", error);
    })
  },
  methods: {
    
  }
};
</script>