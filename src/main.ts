import { createApp } from 'vue'
import App from './App.vue'
import Plugin from './plugins/strapi';

const app = createApp(App);
app.use(Plugin, {
  url: 'http://localhost:1337',
  entities: []
})
app.mount('#app')
