import Vue from "vue";
import Vuex from "vuex";
import { db, fb } from "../db.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    menu: [],
    cart: [],
    orders: []
  },
  mutations: {
    loadMenu(state) {
      let prepMenu = [];
      db.collection("menu")
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            prepMenu.push(doc.data());
          });
        });
      state.menu = prepMenu;
    },
    loadOrders(state) {
      let orders = [];
      let ordersRef = db.collection("orders").orderBy("orderDate", "desc");
      ordersRef.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          orders.push(doc.data());
        });
      });
      orders.forEach(order => {
        order.orderDate = order.orderDate.toDate();
      });
      state.orders = orders;
    },
    loadUser(state) {
      state.user = fb.auth().currentUser;
    },
    addToCart(state, item) {
      if (state.cart.includes(item)) {
        item.quantity++;
      } else {
        item.quantity = 1;
        state.cart.push(item);
      }
    },
    removeItem(state, item) {
      state.cart = state.cart.filter(items => items !== item);
    },
    increaseQuantity(state, item) {
      let index = state.cart.findIndex(items => items.name == item.name);
      const cartItem = state.cart.find(menuItem => menuItem === item);
      cartItem.quantity++;
      Vue.set(state.cart, index, cartItem);
    },
    decreaseQuantity(state, item) {
      let index = state.cart.findIndex(items => items.name == item.name);
      const cartItem = state.cart.find(menuItem => menuItem === item);
      cartItem.quantity--;
      Vue.set(state.cart, index, cartItem);
    }
  },
  actions: {
    loadMenuAction(context) {
      context.commit("loadMenu");
    },
    loadUserAction(context) {
      context.commit("loadUser");
    },
    loadOrdersAction(context) {
      context.commit("loadOrders");
    },
    addToCartAction(context, item) {
      context.commit("addToCart", item);
    },
    removeItemAction(context, item) {
      context.commit("removeItem", item);
    },
    increaseQuantityAction(context, item) {
      context.commit("increaseQuantity", item);
    },
    decreaseQuantityAction(context, item) {
      context.commit("decreaseQuantity", item);
    }
  },
  getters: {
    meals(state) {
      return state.menu.filter(item => item.category === "meal");
    },
    sides(state) {
      return state.menu.filter(item => item.category === "side");
    },
    drinks(state) {
      return state.menu.filter(item => item.category === "drink");
    },
    total(state) {
      let total = 0;
      state.cart.forEach(item => {
        total += item.price * item.quantity;
      });
      return total;
    }
  },
  modules: {}
});
