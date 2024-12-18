<template>
    <div>
        <h1 class="text-3xl font-bold mb-8">Mening Sevimlilarim</h1>
        <CardList :items="favorites" is-favorites />
    </div>
</template>

<script setup>
import CardList from '../components/CardList.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';
const favorites = ref([])
onMounted(async () => {
    try {
        const { data } = await axios.get('https://e1374a6e373fe87f.mokky.dev/favorites?_relations=items')
        favorites.value = data.map((obj) => obj.item)
    } catch (err) {
        console.log(err)
    }
})
</script>
