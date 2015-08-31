import remote from 'remote'
import React from 'react'
import Router, {Location, Locations, Link, NotFound} from 'react-router-component'

// set Menu
import menuTemplate from './menuTemplate'
let Menu = remote.require('menu')
const menu = Menu.buildFromTemplate(menuTemplate)
Menu.setApplicationMenu(menu)


class Home extends React.Component {
  render () {
    if (false) {
      return <div className="emptyState">Empty</div>
    }
    return <div>
      <Sidebar/>
    </div>
  }
}

class FourOhFour extends React.Component {
  render () {
    return <b>Not Found!</b>;
  }
}

class Search extends React.Component {
  render () {
    return <div className="search-form">
      <input type="text"/>
    </div>
  }
}

class Sidebar extends React.Component {
  render () {
    return <div className="sidebar">
      <div className="sidebar-header">
        <Search/>
      </div>
    </div>
  }
}

class App extends React.Component {
  render () {
    return <Locations path={this.props.initialPath}>
      <Location path="/" handler={Home} />
      <NotFound handler={FourOhFour} />
    </Locations>
  }
}

React.render(<App initialPath='/' />, document.body)
