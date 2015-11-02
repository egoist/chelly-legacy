import remote from 'remote'
import localdb from 'localdb'
import Vue from 'vue'
import VueRouter from 'vue-router'
import db from './helpers/localdb'

Vue.use(VueRouter)
if (location.href.indexOf('index.hot.html') > -1) {
  Vue.config.debug = true
  window.db = db
}
Vue.use(require('vue-resource'))
// set Menu
import menuTemplate from './menuTemplate'
let Menu = remote.require('menu')
const menu = Menu.buildFromTemplate(menuTemplate)
Menu.setApplicationMenu(menu)

// create folder to store notes
if (!db.app.get('init')) {
  db.app.set('init', true)
}
if (db.app.get('user')) {
  location.hash = 'new'
}
// create routes
const router = new VueRouter()
router.map({
    '/': {
      component: require('./views/welcome')
    },
    '/new': {
      component:  require('./views/new')
    }
})

router.start(require('./app'), '#app')
