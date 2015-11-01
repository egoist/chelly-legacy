import remote from 'remote'
import localdb from 'localdb'
import Vue from 'vue'
import VueRouter from 'vue-router'
import mkdirp from 'mkdirp'
import userHome from 'user-home'
import db from './helpers/localdb'

Vue.use(VueRouter)
// set Menu
import menuTemplate from './menuTemplate'
let Menu = remote.require('menu')
const menu = Menu.buildFromTemplate(menuTemplate)
Menu.setApplicationMenu(menu)

// create folder to store notes
if (!db.app.get('init')) {
  db.app.set('init', true)
  db.app.set('notes', 0)
}
if(!db.app.get('setDir')) {
  mkdirp.sync(userHome + '/.chelly')
  db.app.set('setDir', true)
}

// create routes
const router = new VueRouter()
router.map({
    '/': {
      component: db.app.get('user') ? require('./views/home') : require('./views/welcome')
    },
    '/new': {
      component: require('./views/new')
    }
})

router.start(require('./app'), '#app')
