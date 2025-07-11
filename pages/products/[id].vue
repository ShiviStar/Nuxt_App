<template>
  <v-container>
  <v-card>
    <v-card-title>{{ product?.name }}</v-card-title>
    <v-card-text>
      <p>Price: {{ product?.price }}</p>
      <p>Quantity: {{ product?.quantity }}</p>
      <p>Total: {{ product?.total_amount }}</p>
    </v-card-text>
  </v-card>
  </v-container>
</template>

<script setup lang="ts">
const route = useRoute()
const { data: product } = await useFetch(`/api/products/${route.params.id}`)
useHead(() => ({
  title: product.value ? `${product.value.name} - Product Details` : 'Product Details',
}))
</script>