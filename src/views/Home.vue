<template>
  <v-container class="px-8 py-8">
    <v-card flat color="transparent" v-if="firstName">
      Welcome Back, {{ firstName }}
    </v-card>
    <v-row justify="center">
      <p class="my-2 mx-2 display-1">Meals</p> 
    </v-row>
    <v-row class="my-4" justify="center">
      <v-card max-width="300" v-for="meal in meals" :key="meal.name" class="mx-2 my-2">

        <v-img class="white--text" height="200px" :src="meal.image"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)">
          <v-card-title class="align-end fill-height">{{ meal.name }}</v-card-title>
        </v-img>

        <v-card-text>
          <span class="text--primary">
            <span>{{ meal.info }}</span><br>
          </span>
        </v-card-text>

        <v-card-actions>
          <v-btn text color="primary" @click="addToCart(meal)">Add to Cart</v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
    <v-row justify="center">
      <p class="my-2 mx-2 display-1">Sides</p> 
    </v-row>
    <v-row class="my-4" justify="center">
      <v-card max-width="300" v-for="side in sides" :key="side.info" class="mx-2 my-2">

        <v-img class="white--text" height="200px" :src="side.image"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)">
          <v-card-title class="align-end fill-height">{{ side.name }}</v-card-title>
        </v-img>

        <v-card-text>
          <span class="text--primary">
            <span>{{ side.info }}</span><br>
          </span>
        </v-card-text>

        <v-card-actions>
          <v-btn text color="primary" @click="addToCart(side)">Add to Cart</v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
    <v-row justify="center">
      <p class="my-2 mx-2 display-1">Drinks</p> 
    </v-row>
    <v-row class="my-4" justify="center">
      <v-card max-width="300" v-for="drink in drinks" :key="drink.menuItemId" class="mx-2 my-2">

        <v-img class="white--text" height="200px" :src="drink.image"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)">
          <v-card-title class="align-end fill-height">{{ drink.name }}</v-card-title>
        </v-img>

        <v-card-text>
          <span class="text--primary">
            <span>{{ drink.info }}</span><br>
          </span>
        </v-card-text>

        <v-card-actions>
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
      <v-btn color="primary" text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import {db, fb} from "../db.js"
export default {
  name: "home",
  props: {
    currentUser: Object,
    cart: Array
  },
  data: () => ({
    firstName: null,
    menu : [],
    meals: [],
    sides: [],
    drinks: [],
    // cart: [],
    snackbar: false,
    text: 'Item added to cart.',
    timeout: 2000
  }),
  mounted() {
    // console.log(this.currentUser); get the users email
    if (this.currentUser) {
      const email = this.currentUser.email;
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
    // get the menu
    let menuRef = db.collection("menu");
    menuRef.get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        // console.log(doc.id, " => ", doc.data());
        this.menu.push(doc.data());
        // console.log(this.menu);
     });
    // filter the menu into categories
    this.meals = this.menu.filter(item =>  item.category == "meal" );
    // console.log(this.meals);
    this.sides = this.menu.filter(item =>  item.category == "side" );
    // console.log(this.meals);
    this.drinks = this.menu.filter(item =>  item.category == "drink" );
    // console.log(this.meals);
    })
    .catch(error => {
      console.log("Error getting documents: ", error);
    });
  },
  methods: {
    addToCart(meal) {
      
      if (this.cart.includes(meal)) {
        meal.quantity++;
      } else {
        meal.quantity = 1; 
        this.cart.push(meal);  
      }
      this.snackbar = true;
      // console.log(this.cart.length + " items in cart.");
      // console.log(this.cart);

      this.$emit("addToCart", this.cart)
    }
  }
};
</script>
