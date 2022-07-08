import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import Login from "@/views/Login";
import PageNotFound from "@/views/PageNotFound";

const routes = [
    {
        path: '/:cid/:hcode/t/:token',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: PageNotFound
    },

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
