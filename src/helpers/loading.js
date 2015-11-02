import { $ } from './dom'

const sidebarLoading = {
  start () {
    $('.sidebar-loading').classList.add('shown')
  },
  stop () {
    $('.sidebar-loading').classList.remove('shown')
  }
}

export default {
  sidebarLoading
}
