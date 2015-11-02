const $ = document.querySelector.bind(document)

class Biu {
  constructor (opts) {
    this.opts = opts
    this.init()
  }
  init () {
    if ($('.biu')) {
      this.hide($('.biu'))
    }
    const instance = Date.now()
    const div = document.createElement('div')
    div.className = `biu biu-${this.opts.type} biu-${instance} clearfix`
    div.innerHTML = `
    <div class="biu-content">
      ${this.opts.text}
    </div>
    <span class="biu-close biu-close-${instance}">X</span>
    `
    this.biu = div
    document.body.appendChild(this.biu)
    setTimeout(() => {
      this.show()
    }, 100)
    if (this.opts.autoHide) {
      setTimeout(() => {
        this.hide(this.biu)
      }, 3000)
    }
    $(`.biu-close-${instance}`).addEventListener('click', () => {
      this.hide(this.biu)
    })
  }
  show () {
    this.biu.classList.add('biu-visible')
  }
  hide (el = this.biu) {
    el.classList.remove('biu-visible')
    setTimeout(() => {
      el.remove()
    }, 100)
  }
}

export default (opts) => {
  return new Biu(opts)
}
