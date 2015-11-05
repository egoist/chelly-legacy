<style scoped>
  .edit-area {
    position: fixed;
    left: 240px;
    right: 0;
    bottom: 0;
    top: 0;
    background-color: #fff;
    .edit-header {
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #d9d9d9;
      padding: 0 10px;
      .input-title {
        border: none;
        border-bottom: 1px solid transparent;
        border-radius: 0;
        height: 25px;
        line-height: 25px;
        padding: 0;
        font-size: 15px;
        width: 240px;
        &:focus {
          box-shadow: none;
          border-bottom-color: #e2e2e2;
        }
      }
      .edit-header-opts {
        float: right;
      }
    }
  }
  .write-here, .preview-here {
    width: 50%;
    height: calc(100% - 40px);
    float: left;
    padding: 10px;
    word-wrap: break-word;
  }
  .write-here {
    padding-right: 0;
    cursor: text;
    textarea {
      border: none;
      width: 100%;
      resize: none;
      font-size: 15px;
      height: 100%;
      &:focus {
        box-shadow: none;
        border: none;
      }
    }
    .CodeMirror {
      height: 100%;
      font-family: inherit;
    }
  }
  .preview-here {
    width: calc(50% - 1px);
    border-left: 1px solid #e3e3e3;
    overflow: auto;
  }
</style>
<style>
  .write-here {
    .CodeMirror-vscrollbar {
      cursor: default;
    }
  }
</style>

<template>
  <Sidebar
    :default-note="defaultNote"
    :mode.sync="mode"
    :current-saved.sync="currentSaved">
  </Sidebar>
  <section class="edit-area">
    <div class="edit-header">
      <input type="text" class="form-control input-title" v-model="note.title" @keydown.83="handleTitleSave" />
      <div class="edit-header-opts">
        <button type="button" @click="handleDeleteNote(this.note, $event)">delete</button>
        <button type="button">tag</button>
      </div>
    </div>
    <div class="write-here" v-el:write>
      <textarea v-el:textarea class="form-control" v-model="note.content">{{ note.content }}</textarea>
    </div>
    <div class="preview-here github2" v-el:preview>{{{ note.content | md }}}</div>

  </section>
</template>

<script>
  import CodeMirror from 'codemirror'
  import markdown from 'codemirror/mode/markdown/markdown'
  import md from '../helpers/md'
  import { url } from '../helpers/api'
  import { sidebarLoader } from '../helpers/loaders'
  import db from '../helpers/localdb'
  import keymapping from '../helpers/keymapping'
  import biu from '../helpers/biu'
  import notie from 'notie'
  export default {
    props: ['defaultNote', 'onUpdateSidebar', 'mode', 'currentSaved'],
    data () {
      return {
        note: this.defaultNote
      }
    },
    methods: {
      handleChange () {
        this.note.content = this.editor.getValue()
      },
      handleTitleSave (e) {
        if (e.metaKey || e.ctrlKey) {
          this.handleSave()
        }
      },
      handleDeleteNote (note = this.note, e) {
        const user = db.app.get('user')
        this.$http.post(url('note/remove'), {note: note, api_key: user.api_key, user_id: user.objectId}, data => {
          console.log(data)
        })
      },
      handleScroll () {
        const scroll = this.editor.getScrollInfo()
        const previewHeight = this.$els.preview.scrollHeight - this.$els.preview.offsetHeight
        const codeHeight = scroll.height - this.$els.write.offsetHeight
        const ratio = previewHeight / codeHeight
        const previewPostition = scroll.top * ratio

        this.$els.preview.scrollTop = previewPostition
      },
      handleSave () {
        sidebarLoader.start()
        const user = db.app.get('user')
        this.$http.post(url('save'), {type: this.mode, user_id: user.objectId, api_key: user.api_key, note: this.note}, data => {
          sidebarLoader.stop()
          if (data.code) {
            return notie('error', data.message)
          }
          notie('success', 'Saved!')
          this.note = data
          this.note.active = true
          this.currentSaved = true
          this.mode = 'update'
          db.lastNote.override(this.note, true)
          this.updateHistory(this.note)
          this.$broadcast('update.sidebar.active.note', this.note)
        })
      },
      updateHistory (note) {
        let history = db.history.get()
        if (history) {
          let exist = false
          history.forEach(db_note => {
            if (db_note.objectId === note.objectId) {
              exist = true
              return
            }
          })
          console.log(exist)
          if (exist) {
            return
          }
        }
        history = db.history.add(note).get()
        if (history.length > 20) {
          history = history.slice(1)
          db.history.override(history)
        }
      },
      update (note) {
        sidebarLoader.start()
        if (note.unsaved) {
          this.currentSaved = false
          this.note = note
          this.$els.textarea.value = note.content
          this.editor.setValue(note.content)
          this.mode = 'create'
          sidebarLoader.stop()
          return
        }
        this.fetchNote(note, note => {
          if (note.code) {
            sidebarLoader.stop()
            console.log(note)
            return notie('error', note.message)
          }
          this.note = note
          this.$els.textarea.value = note.content
          this.editor.setValue(note.content)
          this.mode = 'update'
          db.lastNote.override(note, true)
          sidebarLoader.stop()
        })
      },
      fetchNote (note, fn) {
        this.$http.post(url('note'), {note_id: note.objectId}, note => {
          fn(note)
        })
      },
      handleTyper () {
        this.currentSaved = false
      }
    },
    ready () {
      this.editor = CodeMirror.fromTextArea(this.$els.textarea, {
        mode: 'markdown',
        theme: 'default',
        lineNumbers: false,
        lineWrapping: true,
        smartIndent: false,
        matchBrackets: true,
      })
      this.editor.on('change', this.handleChange)
      this.editor.on('scroll', this.handleScroll)
      this.editor.on('keypress', this.handleTyper)
      CodeMirror.commands.save = this.handleSave

      this.$on('update.editor.note', this.update)
    },
    filters: {
      md
    },
    components: {
      Sidebar: require('./side-bar')
    }
  }
</script>
