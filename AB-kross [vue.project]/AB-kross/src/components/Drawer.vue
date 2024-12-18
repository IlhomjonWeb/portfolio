<template>
    <div>
        <div class="fixed h-full w-full bg-black z-10 opacity-70"></div>
        <div class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-8">
            <DrawerHead />
            <div v-if="!totalPrice || orderId" class="flex h-full items-center">
                <InfoBlock v-if="!totalPrice && !orderId" title="savat bo'sh"
                    description="buyurtma berish uchun kamida bitta juft krossovka qo'shing."
                    image-url="/package-icon.png" />
                <InfoBlock v-if="orderId" title="Buyurtma berilgan"
                    :description="`# ${orderId} buyurtmangiz tez orada kurer orqali yetkaziladi.`"
                    image-url="/order-success-icon.png" />
            </div>
            <CartListItem v-if="totalPrice" />
            <div v-if="totalPrice" class="flex flex-col gap-4 mt-7">
                <div class="flex gap-2">
                    <span>Jami:</span>
                    <div class="flex-1 border-b border-dashed"></div>
                    <b>{{ totalPrice }} ₽</b>
                </div>
                <div class="flex gap-2">
                    <span>Soliq 5%</span>
                    <div class="flex-1 border-b border-dashed"></div>
                    <b>{{ vatPrice }} ₽</b>
                </div>
                <button :disabled="buttonDisabled" @click="createOrder"
                    class="transition bg-lime-500 w-full rounded-xl py-3 text-white hover:bg-lime-600 mt-4 active:bg-lime-700 mt-5 disabled:bg-slate-300">
                    Buyurtma bering
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref, computed, inject } from 'vue'
import CartListItem from './CartListItem.vue';
import DrawerHead from './DrawerHead.vue';
import InfoBlock from './InfoBlock.vue';
const props = defineProps({
    totalPrice: Number,
    vatPrice: Number,
})
const { cart, closeDrawer } = inject('cart')
const isCreating = ref(false)
const orderId = ref(null)
const createOrder = async () => {
    try {
        isCreating.value = true
        const { data } = await axios.post(`https://e1374a6e373fe87f.mokky.dev/orders`, {
            items: cart.value,
            totalPrice: props.totalPrice.value
        })
        cart.value = []
        orderId.value = data.id
    } catch (err) {
        console.log(err)
    } finally {
        isCreating.value = false
    }
}
const cartIsEmpty = computed(() => cart.value.length === 0)
const buttonDisabled = computed(() => isCreating.value || cartIsEmpty.value)
</script>