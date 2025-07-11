<template>
    <v-app>
    <v-container>
        <v-card>
        <v-card-title>
            Product List
        </v-card-title>
        <v-data-table
            :headers="headers"
            :items="products"
            :items-per-page="5"
            :loading="loading"
            item-key="id"
            class="elevation-1"
        >
            <template #item.total_amount="{ item }">
            {{ formatCurrency(item.price * item.quantity) }}
            </template>

            <template #item.actions="{ item }">
            <v-icon
                small
                class="mr-2"
                color="blue"
                @click="openEditDialog(item)"
            >
                mdi-pencil
            </v-icon>
            <v-icon small color="red" @click="deleteProduct(Number(item.id))">mdi-delete</v-icon>
            </template>

            <template #item.name="{ item }">
            <NuxtLink :to="`/products/${item.id}`" class="text-decoration-none">
                {{ item.name }}
            </NuxtLink>
            </template>
        </v-data-table>
        </v-card>

        <v-dialog v-model="editDialog" max-width="500px">
        <v-card>
            <v-card-title>Edit Product</v-card-title>
            <v-card-text>
            <v-form>
                <v-text-field
                label="Name"
                v-model="editedProduct!.name"
                required
                />
                <v-text-field
                label="Price"
                type="number"
                v-model="editedProduct!.price"
                required
                />
                <v-text-field
                label="Quantity"
                type="number"
                v-model="editedProduct!.quantity"
                required
                />
            </v-form>
            </v-card-text>
            <v-card-actions>
            <v-spacer />
            <v-btn text @click="() => (editDialog = false)">Cancel</v-btn>
            <v-btn color="primary" @click="saveEdit">Save</v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
    </v-container>
  </v-app>
</template>

<style scoped>
.text-decoration-none {
  text-decoration: none;
}
.v-data-table thead tr th {
  color: black !important;
  font-weight: bold;
}
</style>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useHead } from '#imports'
import type { Product } from '../types/product'

const headers = [
    { title: 'Id', key: 'id' },
    { title: 'Name', key: 'name' },
    { title: 'Actions', key: 'actions', sortable: false },
]

useHead({ title: 'Product List' })

const products = ref<Product[]>([])
const loading = ref(false)
const editDialog = ref(false)
const editedProduct = ref<Partial<Product> | null>(null)

const fetchProducts = async () => {
  loading.value = true
  products.value = await $fetch<Product[]>('/api/products/getProducts')
  loading.value = false
}

onMounted(() => {
  fetchProducts()
})

function openEditDialog(product: Product) {
  editedProduct.value = { ...product }
  editDialog.value = true
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
}

async function saveEdit() {
  if (!editedProduct.value) return
  await $fetch('/api/products/updateProducts', {
    method: 'PUT',
    body: editedProduct.value,
  })
  editDialog.value = false
  await fetchProducts()
}

async function deleteProduct(id: number) {
  if (!confirm('Are you sure you want to delete this product?')) return
  await $fetch(`/api/products/deleteProducts?id=${id}`, { method: 'DELETE' })
  await fetchProducts()
}
</script>
