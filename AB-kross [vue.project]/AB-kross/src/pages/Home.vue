<template>
    <div>
        <div class="flex justify-between mb-10 items-center">
            <h2 class="text-3xl font-bold ">Barcha Krossovkalar</h2>
            <div class="flex gap-4">
                <select @change="onChangeSelect" class="py-1 px-3 border rounded-md">
                    <option value="name">Nomi bilan</option>
                    <option value="price">Narx bo'yicha (Arzon)</option>
                    <option value="-price">Narx bo'yicha (Qimat)</option>
                </select>
                <div class="relative">
                    <img src="/search.svg" class="absolute left-4 top-2.5">
                    <input @input="onChangeSearchInput" type="text" placeholder="Qidrish..."
                        class="border rounded-md py-1.5 pl-11 pr-4 outline-none focus:border-gray-400">
                </div>
            </div>
        </div>
        <CardList :items="items" @add-to-Favorite="addToFavorite" @add-to-cart="onClickAddPlus" />
    </div>
</template>

<script setup>
import { reactive, watch, ref, onMounted } from 'vue'
import axios from 'axios';
import { inject } from 'vue';
import CardList from '../components/CardList.vue';
const { cart, addToCart, removeFromCart } = inject('cart')
const items = ref([])
const filters = reactive({
    sortBy: 'title',
    searchQuery: ''
})

const onClickAddPlus = (item) => {
    if (!item.isAdded) {
        addToCart(item)
    } else {
        removeFromCart(item)
    }
}

const onChangeSelect = (event) => {
    filters.sortBy = event.target.value
}

const onChangeSearchInput = (event) => {
    filters.searchQuery = event.target.value
}

const addToFavorite = async (item) => {
    try {
        if (!item.isFavorite) {
            const obj = {
                item_id: item.id,
            };
            item.isFavorite = true
            const { data } = await axios.post(`https://e1374a6e373fe87f.mokky.dev/favorites`, obj)
            item.favoriteId = data.id
        } else {
            item.isFavorite = false;
            await axios.delete(`https://e1374a6e373fe87f.mokky.dev/favorites/${item.favoriteId}`)
            item.favoriteId = null
        }

    } catch (err) {
        console.log(err)
    }
}
const fetchFavorites = async () => {
    try {
        const { data: favorites } = await axios.get(`https://e1374a6e373fe87f.mokky.dev/favorites`)
        items.value = items.value.map(item => {
            const favorite = favorites.find(favorite => favorite.item_id === item.id)
            if (!favorite) {
                return item
            }
            return {
                ...item,
                isFavorite: true,
                favoriteId: favorite.id,
            }
        })

    } catch (err) {
        console.log(err)
    }
}
const fetchItems = async () => {
    try {
        const params = {
            sortBy: filters.sortBy
        }

        if (filters.searchQuery) {
            params.title = `*${filters.searchQuery}*`
        }

        const { data } = await axios.get(`https://e1374a6e373fe87f.mokky.dev/items`, {
            params
        })

        items.value = data.map((obj) => ({
            ...obj,
            isFavorite: false,
            favoriteId: null,
            isAdded: false
        }))

    } catch (err) {
        console.log(err)
    }
}
onMounted(async () => {
    const localCart = localStorage.getItem('cart');
    cart.value = localCart ? JSON.parse(localCart) : [];
    await fetchItems();
    await fetchFavorites();
    items.value = items.value.map((item) => ({
        ...item,
        isAdded: cart.value.some((CartItem) => CartItem.id === item.id)
    }))
})
watch(cart, () => {
    items.value = items.value.map((item) => ({
        ...item,
        isAdded: false
    }))
})
watch(filters, fetchItems)

</script>
