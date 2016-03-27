import Vue from 'vue'
import VueRouter from 'vue-router'
import app from './app'
import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter()

router.map(routes)

router.start(app, 'app')
