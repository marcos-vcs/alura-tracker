import { createApp } from 'vue'
import App from './App.vue'
import '@fortawesome/fontawesome-free/css/all.css'
import i18n from '../i18n';
import roteador from './rotas';

const app = createApp(App);
app.use(roteador);
app.use(i18n);
app.mount('#app')
