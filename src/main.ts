import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
import { githubStore } from './stores/github.store'

createApp(App).mount('#app')

githubStore.fetchRepositories();
