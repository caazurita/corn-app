<script setup lang="ts">
defineProps<{
    name: string
    price: number
    sold: number
    loading: boolean
}>()

defineEmits<{
    (e: 'buy'): void
}>()
</script>
<template>
    <div class="bg-white p-6 rounded-xl shadow text-center">
        <h2 class="text-xl font-bold mb-2">{{ name }}</h2>

        <p>Price: <b>${{ price }}</b></p>
        <p class="mb-4">Sold: <b>{{ sold }}</b></p>

        <button @click="$emit('buy')" :disabled="loading" class="px-4 py-2 rounded text-white transition" :class="loading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-yellow-500 hover:bg-yellow-600 cursor-pointer'">
            {{ loading ? 'Buying...' : 'Buy Corn' }}
        </button>
    </div>
</template>
