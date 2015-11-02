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
        padding: 0;
        font-size: 15px;
        &:focus {
          box-shadow: none;
        }
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
    border-left: 1px solid #d0d0d0;
    overflow: auto;
    padding-bottom: 150px;
  }
</style>

<template>
  <section class="edit-area">
    <div class="edit-header">
      <input type="text" class="form-control input-title" v-model="note.title" @keydown.83="handleTitleSave" />
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
  export default {
    props: ['defaultNote', 'onUpdateSidebar', 'mode'],
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
        const note = this.note
        note.content = this.editor.getValue()
        this.$http.post(url('save'), {type: this.mode, user_id: user.objectId, api_key: user.api_key, note: note}, data => {
          sidebarLoader.stop()
          if (data.code) {
            return biu({
              type: 'error',
              message: data.message,
              autoHide: true
            })
          }
          this.note = data
          this.note.active = true
          this.mode = 'update'
          this.onUpdateSidebar(this.note)
        })
      },
      update (note, fn) {
        sidebarLoader.start()
        this.fetchNote(note, note => {
          sidebarLoader.stop()
          if (note.code) {
            return biu({
              type: 'error',
              message: note.message,
              autoHide: true
            })
          }
          this.note = note
          this.$els.textarea.value = note.content
          this.editor.setValue(note.content)
          this.mode = 'update'
          db.lastNote.override(note, true)
        })
      },
      fetchNote (note, fn) {
        this.$http.post(url('note'), {note_id: note.objectId}, note => {
          fn(note)
        })
      }
    },
    ready () {
      this.editor = CodeMirror.fromTextArea(this.$els.textarea, {
        mode: 'markdown',
        theme: "default",
        lineNumbers: false,
        lineWrapping: true,
        smartIndent: false,
        matchBrackets: true,
      })
      this.editor.on('change', this.handleChange)
      this.editor.on('scroll', this.handleScroll)
      CodeMirror.commands.save = this.handleSave

      this.$on('update.editor', this.update)
    },
    filters: {
      md
    }
  }
</script>
