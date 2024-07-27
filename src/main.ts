import { createApp } from 'vue';
import App from './App.vue';
import './styles/reset.css';
import router from './router';
import pinia from './store';
const app = createApp(App);
app.use(router);
app.use(pinia);
app.mount('#app');
