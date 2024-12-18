<template>
    <div class="grid grid-cols-4 gap-5" v-auto-animate>
        <Card v-for="item in items" :key="item.id" :imageUrl="item.imageUrl" :title="item.title" :price="item.price"
            :id="item.id" :onClickFavourite="isFavorites ? null : () => emit('addToFavorite', item)"
            :isFavorite="item.isFavorite" :onClickAdd="isFavorites ? null : () => emit('addToCart', item)"
            :isAdded="item.isAdded" />
    </div>
</template>
<script setup>

import Card from './Card.vue';
defineProps({
    items: Array,
    isFavorites: Boolean
})
const emit = defineEmits(["addToFavorite", "addToCart"])
</script>