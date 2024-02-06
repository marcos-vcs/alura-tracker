import { createApp } from 'vue'
import App from './App.vue'
import '@fortawesome/fontawesome-free/css/all.css'
import i18n from '../i18n';
import roteador from './rotas';
import { key, store } from './store';

import './assets/css/global.css'

const app = createApp(App);
app.use(roteador);
app.use(store, key);
app.use(i18n);
app.mount('#app')
