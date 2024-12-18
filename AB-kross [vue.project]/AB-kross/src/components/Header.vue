<template>
    <header class="flex justify-between border-b border-slate-200 px-10 py-8">
        <router-link to="/">
            <div class="flex items-center gap-4">
                <img src="/logo.png" alt="Logo" class="w-10" />
                <div>
                    <h2 class="text-xl font-bold uppercase">AB-kross</h2>
                    <p class="text-slate-400">Eng yaxshi krossovkalar do'koni</p>
                </div>
            </div>
        </router-link>
        <ul class="flex items-center gap-10">
            <li @click="() => emit('openDrawer')"
                class="flex items-center gap-3 text-gray-500 hover:text-black cursor-pointer">
                <img src="/cart.svg" alt="Cart">
                <b>{{ totalPrice }} so'm</b>
            </li>
            <router-link to="/favorites">
                <li class="flex items-center gap-3 text-gray-500 hover:text-black cursor-pointer">
                    <img src="/heart.svg" alt="Cart">
                    <b>Buyurtma</b>
                </li>
            </router-link>
            <li class="flex items-center gap-3 text-gray-500 hover:text-black cursor-pointer">
                <img src="/profile.svg" alt="Cart">
                <b>Profil</b>
            </li>
        </ul>
    </header>
</template>

<script setup>
defineProps({
    totalPrice: Number
})
const emit = defineEmits(['openDrawer'])
</script>
