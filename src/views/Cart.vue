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
                        <v-btn small text>Remove</v-btn>
                    </v-card-text>
                </v-card>
            </v-row>
        </v-col>

        <v-col cols="3">
            <v-row justify="center">
                <v-card flat color="transparent" max-width="300px">
                    <v-card-text>
                        <p class="title text-center">{{ item.price }}</p>

                        <v-icon color="primary large" @click="increaseQuantity(item)">mdi-plus-box-outline</v-icon>

                        <p class="d-inline body-1 mx-1" color="#000000" :cart="item.quantity">{{ item.quantity }}</p>

                        <v-icon color="primary large" @click="decreaseQuantity(item)">mdi-minus-box-outline</v-icon>
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
        <v-btn class="my-8 primary">Confirm Order</v-btn>
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
    total: 0
  }),
  mounted() {
    // console.table(this.cart);
    this.cart.forEach(menuItem => {
        this.total += menuItem.price * menuItem.quantity;
    });
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
    }
  }
};
</script>
