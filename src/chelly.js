import remote from 'remote'
import React from 'react'
import { render } from 'react-dom'
import localdb from 'localdb'

// set Menu
import menuTemplate from './menuTemplate'
let Menu = remote.require('menu')
const menu = Menu.buildFromTemplate(menuTemplate)
Menu.setApplicationMenu(menu)

// config localStorage database
let Config = new localdb('Config', 'Object')
Config.set('init', true)

import routes from './routes'
render(routes, document.getElementById('app'))
