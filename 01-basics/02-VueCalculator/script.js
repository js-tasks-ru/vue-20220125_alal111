import { createApp } from './vendor/vue.esm-browser.js';

// Создайте Vue приложение
const vm = createApp({
    data(){
        return{
            sign: null,
            first: null,
            second: null
        }
    },
    computed: {
        result(){
            switch (this.sign) {
                case 'sum':
                    return this.first + this.second;
                case 'subtract':
                    return this.first - this.second;
                case 'multiply':
                    return this.first * this.second;
                case 'divide':
                    return this.first / this.second;
            }
        }
    }
}).mount('#app')
