import Vue from 'vue'
import App from './App.vue'

new Vue({
    render: (h) => h(App),
}).$mount('#app')

console.log('NODE_DEV', process.env.NODE_DEV)