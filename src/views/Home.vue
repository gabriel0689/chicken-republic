<template>
  <v-container class="px-8 py-8">
    <v-card flat color="transparent" v-if="firstName">Welcome Back, {{ firstName }}</v-card>
    <v-row justify="center">
      <p class="my-2 mx-2 display-1">Meals</p> 
      <!-- <v-icon class="mr-80" color="primary" x-large>mdi-room-service</v-icon> -->
    </v-row>
    <v-row class="my-4">
      <v-card max-width="280" v-for="item in meals" :key="item.menuItemId" class="mx-2 my-2">

        <v-img class="white--text" height="200px" :src="item.image"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)">
          <v-card-title class="align-end fill-height">{{ item.name }}</v-card-title>
        </v-img>

        <v-card-text>
          <span class="text--primary">
            <span>{{ item.info }}</span><br>
          </span>
        </v-card-text>

        <v-card-actions>
          <v-btn text color="primary">Add to Cart</v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
    <v-row justify="center">
      <p class="my-2 mx-2 display-1">Sides</p> 
      <!-- <v-icon class="mr-80" color="primary" x-large>mdi-room-service</v-icon> -->
    </v-row>
    <v-row class="my-4">
      <v-card max-width="280" v-for="item in sides" :key="item.menuItemId" class="mx-2 my-2">

        <v-img class="white--text" height="200px" :src="item.image"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)">
          <v-card-title class="align-end fill-height">{{ item.name }}</v-card-title>
        </v-img>

        <v-card-text>
          <span class="text--primary">
            <span>{{ item.info }}</span><br>
          </span>
        </v-card-text>

        <v-card-actions>
          <v-btn text color="primary">Add to Cart</v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
    <v-row justify="center">
      <p class="my-2 mx-2 display-1">Drinks</p> 
      <!-- <v-icon class="mr-80" color="primary" x-large>mdi-room-service</v-icon> -->
    </v-row>
    <v-row class="my-4">
      <v-card max-width="280" v-for="item in drinks" :key="item.menuItemId" class="mx-2 my-2">

        <v-img class="white--text" height="200px" :src="item.image"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)">
          <v-card-title class="align-end fill-height">{{ item.name }}</v-card-title>
        </v-img>

        <v-card-text>
          <span class="text--primary">
            <span>{{ item.info }}</span><br>
          </span>
        </v-card-text>

        <v-card-actions>
          <v-btn text color="primary">Add to Cart</v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import {db, fb} from "../db.js"
export default {
  name: "home",
  props: {currentUser: Object},
  data: () => ({
    firstName: null,
    menu : [],
    meals: [],
    sides: [],
    drinks: []
  }),
  mounted() {
    // console.log(this.currentUser); get the users email
    if (this.currentUser) {
      const email = this.currentUser.currentUser.email;
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
  }
};
</script>
