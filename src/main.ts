import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';

import { createPinia } from 'pinia';
const store = createPinia();

createApp(App).use(store).use(router).mount('#app');
