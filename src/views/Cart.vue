<template>
  <v-container class="px-8 py-8">
    <v-row justify="center">
        <v-card flat color="transparent" class="display-1">
        Your Cart
        </v-card>
    </v-row>
    <v-row v-for="item in cart" :key="item.name">
        <v-col cols="8">
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

        <v-col cols="4">
            <v-row justify="center">
                <v-card flat color="transparent" max-width="300px">
                    <v-card-text>
                        <p class="title text-center">&#8358; {{ item.price }}</p>

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
        <v-col cols="9">
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
    <v-row justify="center" v-if="user">
        <v-col cols="112">
            <v-expansion-panels>
                <v-expansion-panel>
                <v-expansion-panel-header>Your address</v-expansion-panel-header>
                <v-expansion-panel-content>
                    <p class="body-1"> Name: {{ firstName }} {{ lastName }} </p>
                    <p class="body-1"> Address: {{ address }} </p>
                    <p class="body-1"> Phone Address: {{ phoneNumber }} </p>
                </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-col>
    </v-row>
    <v-row justify="center" v-if="!user">
        <v-col cols="12">
            <v-card flat color="transparent" class="headline">Please enter your delivery details</v-card>
            <v-form class="mx-auto my-4" @submit.prevent="submitOrder">

                <v-text-field v-model="firstName" label="First Name"></v-text-field>

                <v-text-field v-model="lastName" label="Last Name"></v-text-field>

                <v-text-field v-model="phoneNumber" type="number" label="Phone Number"></v-text-field>

                <v-textarea auto-grow v-model="address" label="Address"></v-textarea>

                <v-text-field v-model="zipCode" type="number" label="Zip Code"></v-text-field>

            </v-form>
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
  data: () => ({
    lastName: null,
    firstName: null,
    address: null,
    phoneNumber: null,
    zipCode: null,
    checkbox: false,
  }),
  computed: {
    cart() {
      return this.$store.state.cart;
    },
    user() {
      return this.$store.state.user;
    },
    total() {
      return this.$store.getters.total;
    }
  },
  mounted() {
      if(this.user) {
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
                alert.log("No such document!");
            }
        }).catch(error => {
            alert.log("Error getting documents: ", error);
        })
      }
  },
  methods: {
    increaseQuantity(item) {
        this.$store.dispatch("increaseQuantityAction", item);
    },
    decreaseQuantity(item) {
        this.$store.dispatch("decreaseQuantityAction", item);   
    },
    removeItem(item) {
        this.$store.dispatch("removeItemAction", item);
    },
    submitOrder() {
        if (this.user) {
            db.collection("users").doc(this.currentUser.email)
            .collection("orders").add({
                orderDate: new Date(),
                total: this.total,
                items: this.cart
            })
        } else {
            db.collection("orders").add({
                orderDate: new Date(),
                total: this.total,
                items: this.cart,
                lastName: this.lastName,
                firstName: this.firstName,
                address: this.address,
                phoneNumber: this.phoneNumber,
                zipCode: this.zipCode,
            })
        }
        this.$router.push({ name: "checkout" })
    }
  }
};
</script>
