<template>
  <v-container class="px-8 py-8">
    <v-row justify="center">
      <v-card flat color="transparent" class="display-1 mx-auto">Your Orders</v-card>
    </v-row>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Items</th>
            <th class="text-left">Order Date</th>
            <th class="text-left">Order Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.total">
            <td>
              <div v-for="items in order" :key="items.name">
                <div v-for="meal in items" :key="meal.name">
                  <span>{{ meal.name }} {{ meal.quantity }}</span>
                </div>
              </div>
            </td>
            <td>{{ order.orderDate.toDate().toLocaleDateString() }}</td>
            <td>&#8358; {{ order.total }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script>
export default {
  name: "orders",
  computed: {
    orders() {
      return this.$store.state.myOrders; // get user's orders
    }
  },
  created() {
    this.$store.dispatch("loadMyOrdersAction"); // get user's orders state
  }
};
</script>