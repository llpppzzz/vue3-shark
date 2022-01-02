import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installComponents from './components'

const app = createApp(App)

installComponents(app)

app.use(store).use(router).mount('#app')
