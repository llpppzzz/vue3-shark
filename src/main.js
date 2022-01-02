import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import installComponents from './components'
import installElementPlus from "@/plugins/elementPlus";

const app = createApp(App)

// installComponents(app)
installElementPlus(app)

app.use(store).use(router).mount('#app')
