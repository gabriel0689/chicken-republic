<template>
    <v-container class="px-8 py-8">
    <v-simple-table>
        <template v-slot:default>
        <thead>
            <tr>
            <th class="text-left">Name</th>
            <!-- <th class="text-left">No of Items</th> -->
            <th class="text-left">Phone Number</th>
            <th class="text-left">Order Date</th>
            <th class="text-left">Order Total</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="order in orders" :key="order.total">
            <td>{{ order.firstName }} {{ order.lastName }}</td>
            <!-- <td>{{ order.items }}</td> -->
            <td>{{ order.phoneNumber }}</td>
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
    name: "admin",
    computed: {
        orders() {
            return this.$store.state.orders;
        },
    }
  }
</script>