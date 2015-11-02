const checkDOMType = (dom, type) => {
  return Object.prototype.toString.call(dom) === '[object ' + type + ']'
}

const domEach = (els, fn) => {
  if (checkDOMType(els, 'NodeList') || checkDOMType(els, 'Array')) {
    Array.prototype.forEach.call(els, fn)
  } else {
    fn(els)
  }
}

export default {
  $: document.querySelector.bind(document),
  $$: document.querySelectorAll.bind(document),
  checkDOMType,
  domEach
}
