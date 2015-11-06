import marked from 'marked'
import cheerio from 'cheerio'

export default (text) => {
  var renderer = new marked.Renderer()
  var complete = '<input type="checkbox" class="task-list-item-checkbox" checked="" disabled="">'
  var uncomplete = '<input type="checkbox" class="task-list-item-checkbox" disabled="">'

  renderer.list = function(body, ordered) {
    var type = ordered ? 'ol' : 'ul'
    var startType = type
    var $ = cheerio.load(body)
    if ($('li').find('input').length > 0) {
      startType = type + ' class="task-list-items"'
    }
    return '<' + startType + '>\n' + $.html()+ '</' + type + '>\n'
  }
  renderer.listitem = function(text) {
    if (/^\s*\[[x ]\]\s*/.test(text)) {
      var checkbox = /^\s*\[[xX]\]\s*/.test(text) ? complete : uncomplete
      text = text.replace(/^\s*\[ \]\s*/, checkbox).replace(/^\s*\[x\]\s*/, checkbox)
      return '<li class="task-list-item">' + text + '</li>'
    } else {
      return '<li>' + text + '</li>'
    }
  }
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    highlight: function(code) {
      return require('highlight.js').highlightAuto(code).value;
    }
  })
  return marked(text)
}
