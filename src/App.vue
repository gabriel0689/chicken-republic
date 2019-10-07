<template>
  <v-app>
    <AppBar :currentUser="currentUser"/>
    <v-content>
      <router-view 
        :currentUser="currentUser" 
        :cart="cart"
        :menu="menu" 
        :meals="meals"
        :sides="sides"
        :drinks="drinks"
        @addToCart="updateCart($event)"
      />
    </v-content>
  </v-app>
</template>

<script>
import { db, fb } from "./db.js"
import AppBar from "./components/AppBar";

export default {
  name: "App",
  components: {
    AppBar
  },
  data: () => ({
    currentUser: {},
    cart: [],
    menu: [],
    meals: [],
    sides: [],
    drinks: []
  }),
  created() {
    this.currentUser = fb.auth().currentUser;
    // console.log(this.user)
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
    updateCart(updatedCart) {
      this.cart = updatedCart;
      // console.log(this.cart.length + " items in cart.");
      console.table(this.cart);
    }
  },
  updated() {
    // console.log("root component updated")
  }
};
</script>
