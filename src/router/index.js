import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Chat from '@/components/Chat'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/chat',
            name: 'Chat',
            component: Chat,
            props: true,
            beforeEnter: (to, from, next) => {
                if (to.params.name) return next();
                next({ name: 'Home' });
            }
        }
    ]
})