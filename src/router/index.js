import Login from "../pages/Login.vue";
import Chat from "../pages/Chat.vue";
import {createRouter, createWebHistory} from "vue-router";
import store from "../store";

const routes = [
    {
        path: "/",
        name: "Login",
        component: Login
    },
    {
       // path: "/chat/:nickname",
        path: "/chat",
        name: "Chat",
        component: Chat,
        //props: true,
        beforeEnter: (to, from, next) => {
            if(store.getters.getActiveUser){
                next();
            } else {
                next("/");
            }
        }
    },
    {
        path: "/:catchAll(.*)",
        name: "Not Found",
        component: Login
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router