<template>
  <v-container>
    <v-btn icon @click="goBack">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
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
const router = useRouter()
const { data: product } = await useFetch(`/api/products/${route.params.id}`)
useHead(() => ({
  title: product.value ? `${product.value.name} - Product Details` : 'Product Details',
}))
function goBack() {
  router.push('/')
}
</script>