import remote from 'remote'
import React from 'react'
import Router, {Location, Locations, Link, NotFound} from 'react-router-component'
import localdb from 'localdb'

// set Menu
import menuTemplate from './lib/js/menuTemplate'
let Menu = remote.require('menu')
const menu = Menu.buildFromTemplate(menuTemplate)
Menu.setApplicationMenu(menu)

// config localStorage database
let Config = new localdb('Config', 'Object')
Config.set('init', true)
console.log(Config.get())

class ChooseFolder extends React.Component {
  componentDidMount () {
    const input = React.findDOMNode(this.refs.input)
    const folder = React.findDOMNode(this.refs.folder)

    input.setAttribute('webkitdirectory', '')
    const marginTop = - ( folder.clientHeight / 2 )
    folder.style.marginTop = marginTop + 'px'
  }
  openChooser () {
    const input = React.findDOMNode(this.refs.input)
    input.click()
  }
  changeFolder (e) {
    Config.set('folder', e.target.value)
  }
  render () {
    return (
      <div className="choose-folder" ref="folder" onClick={this.openChooser.bind(this)}>
        现在就选择一个目录存储你的笔记！
        <br />
        <div className="choose-icon"><span className="octicon octicon-plus"></span></div>
        <input style={{display:'none'}} ref="input" type="file" onChange={this.changeFolder.bind(this)} />
      </div>
    )
  }
}

class Home extends React.Component {
  render () {
    if (!Config.get().folder) {
      return <ChooseFolder />
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
