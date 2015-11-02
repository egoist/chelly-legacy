import { $ } from './dom'

const sidebarLoader = {
  start () {
    $('.sidebar-loader').classList.add('shown')
  },
  stop () {
    $('.sidebar-loader').classList.remove('shown')
  }
}

export default {
  sidebarLoader
}
