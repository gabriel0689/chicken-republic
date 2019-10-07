<template>
  <v-container class="px-8 py-8">
    <v-row justify="center">
        <v-card flat color="transparent" class="display-1">
        Your Cart
        </v-card>
    </v-row>
    <v-row v-for="item in cart" :key="item.name">
        <v-col cols="6" offset="2">
            <v-row justify="start">
                <v-card flat color="transparent" max-width="300px">
                    <v-card-text>
                        <p class="title">{{ item.name }}</p>
                        <v-icon small="" class="d-inline">mdi-close</v-icon>
                        <v-btn small text @click="removeItem(item)">Remove</v-btn>
                    </v-card-text>
                </v-card>
            </v-row>
        </v-col>

        <v-col cols="3">
            <v-row justify="center">
                <v-card flat color="transparent" max-width="300px">
                    <v-card-text>
                        <p class="title text-center">{{ item.price }}</p>

                        <v-icon color="primary large" @click="increaseQuantity(item)">
                            mdi-plus-box-outline
                        </v-icon>

                        <p class="d-inline body-1 mx-1" color="#000000" :cart="item.quantity">
                            {{ item.quantity }}
                        </p>

                        <v-icon color="primary large" @click="decreaseQuantity(item)">
                            mdi-minus-box-outline
                        </v-icon>
                    </v-card-text>
                </v-card>
            </v-row>
        </v-col>
        
    </v-row>
    <v-divider></v-divider>
    <v-row>
        <v-col cols="6" offset="2">
            <v-row justify="start">
                <v-card flat color="transparent" max-width="300px">
                    <v-card-text>
                        <p class="title">Order Total</p>
                    </v-card-text>
                </v-card>
            </v-row>
        </v-col>
        <v-col cols="3">
            <v-row justify="start">
                <v-card flat color="transparent" max-width="300px">
                    <v-card-text>
                        <p class="title">{{ total }}</p>
                    </v-card-text>
                </v-card>
            </v-row>
        </v-col>
    </v-row>
    <v-row justify="center">
        <v-col cols="7" v-if="currentUser">
            <v-expansion-panels>
                <v-expansion-panel>
                <v-expansion-panel-header><v-checkbox v-model="checkbox"></v-checkbox> Use my address</v-expansion-panel-header>
                <v-expansion-panel-content>
                    <p class="body-1"> Name: {{ firstName }} {{ lastName }} </p>
                    <p class="body-1"> Address: {{ address }} </p>
                    <p class="body-1"> Phone Address: {{ phoneNumber }} </p>
                </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-col>
    </v-row>
    <v-row justify="center">
        <v-btn class="my-8 primary" @click="submitOrder">Confirm Order</v-btn>
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
    total: 0,
    lastName: null,
    firstName: null,
    address: null,
    phoneNumber: null,
    zipCode: null,
    checkbox: false,
  }),
  mounted() {
    // console.table(this.cart);
    this.cart.forEach(menuItem => {
        this.total += menuItem.price * menuItem.quantity;
    });
    const email = this.currentUser.email;
    let docRef = db.collection("users").doc(email);
    docRef.get().then(doc => {
        if (doc.exists) {
            // console.log("Document Data", doc.data());
            this.address = doc.data().address;
            this.phoneNumber = doc.data().phoneNumber;
            this.lastName = doc.data().lastName;
            this.firstName = doc.data().firstName;
        } else {
            console.log("No such document!");
        }
    }).catch(error => {
        console.log("Error getting documents: ", error);
    })
  },
  methods: {
    increaseQuantity(item) {
        // console.log(item.quantity)
        if (this.cart.includes(item)) {
            item.quantity++;
            this.$emit("addToCart", this.cart)
        }
    },
    decreaseQuantity(item) {
        if (this.cart.includes(item)) {
            item.quantity--;
            this.$emit("addToCart", this.cart)
        }    
    },
    removeItem(item) {
        this.cart = this.cart.filter(items => items !== item);
        // this.cart.splice(index, 1);
        this.$emit("addToCart", this.cart)
    },
    submitOrder() {
        db.collection("users").doc(this.currentUser.email)
        .collection("orders").add({
            orderDate: new Date(),
            total: this.total,
            items: this.cart
        })
        this.$router.push({ name: "checkout" })
    }
  }
};
</script>
