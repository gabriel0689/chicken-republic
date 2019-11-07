<template>
  <div>
    <v-card flat color="transparent" class="px-4 py-4 d-none d-lg-flex d-xl-none">
      <span class="px-3">
        <v-icon>mdi-alarm</v-icon>Openings Times: Mon-Fri, 8:30 - 18:00. Saturday, 10:30 - 18:00
      </span>
      <span class="px-3">
        <v-icon>mdi-thumb-up</v-icon>PAY ON DELIVERY: PoS or Cash
      </span>
      <span class="px-3">
        <v-icon>mdi-thumb-up</v-icon>30 MINS DELIVERY, AVALIABLE IN: Lagos, Abuja
      </span>
    </v-card>
    <v-container class="px-8 py-4">
      <v-card flat color="transparent" v-if="firstName">Welcome, {{ firstName }}</v-card>
      <v-row justify="center">
        <p class="my-2 mx-2 display-1">Meals</p>
      </v-row>
      <v-row class="my-4" justify="center">
        <v-card max-width="300" v-for="meal in meals" :key="meal.name" class="mx-2 my-2">
          <v-img
            class="white--text"
            height="200px"
            :src="meal.image"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          >
            <v-card-title class="align-end fill-height">{{ meal.name }}</v-card-title>
          </v-img>

          <v-card-actions>
            <v-btn text>&#8358;{{ meal.price }}</v-btn>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="addToCart(meal)">Add to Cart</v-btn>
          </v-card-actions>
        </v-card>
      </v-row>
      <v-row justify="center">
        <p class="my-2 mx-2 display-1">Sides</p>
      </v-row>
      <v-row class="my-4" justify="center">
        <v-card max-width="300" v-for="side in sides" :key="side.info" class="mx-2 my-2">
          <v-img
            class="white--text"
            height="200px"
            :src="side.image"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          >
            <v-card-title class="align-end fill-height">{{ side.name }}</v-card-title>
          </v-img>

          <v-card-actions>
            <v-btn text>&#8358;{{ side.price }}</v-btn>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="addToCart(side)">Add to Cart</v-btn>
          </v-card-actions>
        </v-card>
      </v-row>
      <v-row justify="center">
        <p class="my-2 mx-2 display-1">Drinks</p>
      </v-row>
      <v-row class="my-4" justify="center">
        <v-card max-width="300" v-for="drink in drinks" :key="drink.menuItemId" class="mx-2 my-2">
          <v-img
            class="white--text"
            height="200px"
            :src="drink.image"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          >
            <v-card-title class="align-end fill-height">{{ drink.name }}</v-card-title>
          </v-img>

          <v-card-actions>
            <v-btn text>&#8358;{{ drink.price }}</v-btn>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="addToCart(drink)">Add to Cart</v-btn>
          </v-card-actions>
        </v-card>
      </v-row>

      <v-btn fab large right fixed bottom color="secondary" to="/cart">
        <v-badge top right overlap class="align-self-center" color="primary">
          <template v-slot:badge>
            <span v-if="cart.length > 0">{{ cart.length }}</span>
          </template>
          <v-icon>mdi-cart</v-icon>
        </v-badge>
      </v-btn>

      <v-snackbar v-model="snackbar" :timeout="timeout">
        {{ text }}
        <v-btn color="primary" text @click="snackbar = false">Close</v-btn>
      </v-snackbar>
    </v-container>
  </div>
</template>

<script>
import { db } from "../db.js";
export default {
  name: "home",
  data: () => ({
    firstName: null,
    snackbar: false,
    text: "Item added to cart.",
    timeout: 2000
  }),
  mounted() {
    if (this.user) {
      const email = this.user.email;
      db.collection("users")
        .doc(email)
        .get()
        .then(snapshot => {
          this.firstName = snapshot.data().firstName;
        })
        .catch(error => {
          alert(error);
          // this.feedback = error.message;
        });
    }
  },
  methods: {
    addToCart(item) {
      this.$store.dispatch("addToCartAction", item);
      this.snackbar = true;
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    menu() {
      return this.$store.state.menu;
    },
    cart() {
      return this.$store.state.cart;
    },
    meals() {
      return this.$store.getters.meals;
    },
    sides() {
      return this.$store.getters.sides;
    },
    drinks() {
      return this.$store.getters.drinks;
    }
  }
};
</script>
