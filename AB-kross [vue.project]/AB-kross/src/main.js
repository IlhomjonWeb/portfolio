
import { createApp } from 'vue'
import './assets/style.css'
import { createRouter, createWebHistory } from 'vue-router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import Home from './pages/Home.vue'
import Favorites from './pages/Favorites.vue'
import App from './App.vue'

const app = createApp(App)

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/favorites', name: 'Favorites', component: Favorites },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})
app.use(router)
app.use(autoAnimatePlugin)
app.mount('#app')
