<template>
    <div
        class="relative border border-slate-100 rounded-3xl p-8 cursor-pointer transition hover:-translate-y-2 hover:shadow-xl bg-white">
        <img v-if="onClickFavourite" @click="onClickFavourite" :src="!isFavorite ? '/like-1.svg' : 'like-2.svg'"
            alt="Like" class="absolute top-8 left-8">
        <img :src="imageUrl" alt="Nike">
        <p class="mt-2">{{ title }}</p>
        <div class="flex justify-between mt-5">
            <div class="flex flex-col">
                <span class="text-slate-400">Narx:</span>
                <span class="font-bold">{{ price }} so'm .</span>
            </div>
            <img v-if="onClickAdd" @click="onClickAdd" :src="!isAdded ? '/plus.svg' : '/checked.svg'" alt="">
        </div>
    </div>
</template>

<script setup>
defineProps({
    id: Number,
    imageUrl: String,
    title: String,
    price: Number,
    isFavorite: Boolean,
    isAdded: Boolean,
    onClickFavourite: Function,
    onClickAdd: Function,
})
</script>