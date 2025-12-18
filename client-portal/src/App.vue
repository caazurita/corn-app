<script setup lang="ts">
import CornCard from './components/CornCard.vue'
import { onMounted, ref } from 'vue'

const cornTypes = [
  { label: 'Sweet Corn', name: 'sweetCorn', price: 2.5 },
  { label: 'Red Corn', name: 'redCorn', price: 2.5 },
  { label: 'Blue Corn', name: 'blueCorn', price: 3.0 },
  { label: 'Butter Corn', name: 'butterCorn', price: 3.5 },
]

interface Sale {
  type: string
  sold: number
  quantity: number
}
const sales = ref<Sale[]>([])
const loading = ref<Record<string, boolean>>({})
const successMessage = ref('')
const errorMessage = ref('')

function showSuccess(msg: string) {
  successMessage.value = msg
  setTimeout(() => (successMessage.value = ''), 3000)
}

function showError(msg: string) {
  errorMessage.value = msg
  setTimeout(() => (errorMessage.value = ''), 3000)
}

async function buyCorn(cornName: string) {
  loading.value[cornName] = true
  const label = cornTypes.find(corn => corn.name === cornName)?.label || 'Corn'

  try {
    await delay(2000)
    const response = await fetch('http://localhost:3000/api/v1/sale/createSale', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'corn', type: cornName, quantity: 1 })
    })
    if (response?.status === 429) {
      showError(`Failed to buy ${label}. Please wait 1 minute before buying again.`)
      loading.value[cornName] = false
      return

    }
    loading.value[cornName] = false
    showSuccess(`🌽 ${label} bought successfully!`)
    getCornSales()
  } catch (error) {
    loading.value[cornName] = false
    showError(`Failed to buy ${label}. Please try again.`)
  } finally {
    loading.value[cornName] = false
  }

}
function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
async function getCornSales() {
  const response = await fetch('http://localhost:3000/api/v1/sale/getTotalSales')
  const data = await response.json()
  sales.value = data?.data || []
}
onMounted(() => {
  getCornSales()
})
</script>

<template>
  <div class="">
    <h1 class="text-2xl font-bold  mb-8 items-center justify-center flex p-4">Corn Shop 🌽</h1>
    <div class="flex items-center justify-center">
      <div class="grid grid-cols-2 gap-4">
        <CornCard v-for="corn in cornTypes" :key="corn.name" :name="corn.label" :price="corn.price"
          :sold="sales.find(sale => sale.type === corn.name)?.sold || 0" :loading="loading[corn.name] || false"
          @buy="buyCorn(corn.name)" />
      </div>
    </div>
    <div class="fixed top-4 right-4 space-y-2">
      <div v-if="successMessage" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
        role="alert">
        {{ successMessage }}
      </div>

      <div v-if="errorMessage" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert">
        <span class="block sm:inline">{{ errorMessage }}</span>
      </div>
    </div>
  </div>

</template>
