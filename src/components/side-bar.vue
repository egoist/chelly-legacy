<style scoped>
  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: 240px;
    box-shadow: inset -1px 0 #e3e3e3;
    background-color: #fff;
    .sidebar-header {
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #d9d9d9;
    }
    .sidebar-main {
      height: calc(100% - 40px);
    }
    .sidebar-notes-wrapper, .sidebar-history-wrapper {
      position: relative;
    }
    .sidebar-history {
      height: 140px;
      overflow: hidden;
    }
    .sidebar-notes-wrapper {
      height: calc(100% - 200px);
      &.full-height {
        height: calc(100% - 30px);
      }
    }
    .global-notes-search, .new-btn {
      height: 25px;
      line-height: 25px;
      padding: 0;
      display: inline-block;
      width: 100%;
      text-align: center;
      font-size: 15px;
      border-color: #d4d4d4;
    }
    .new-btn {
      font-size: 12px;
      background-color: #5BAAEC;
      border-color: #5BAAEC;
      color: #fff;
    }
    .global-notes-search {
      text-align: left;
      position: relative;
      top: 1px;
      padding: 0 8px;
      &:focus {
        border-color: #35b5f4;
      }
    }
    .sidebar-heading {
      font-size: 11px;
      font-weight: bold;
      padding: 0 10px;
      height: 20px;
      line-height: 20px;
      color: #778087;
    }
    .sidebar-notes {
      height: 100%;
    }
    .sidebar-note {
      padding: 0 10px;
      height: 28px;
      line-height: 28px;
      font-size: 12px;
      cursor: pointer;
      &:hover {
        background-color: #f0f0f0;
      }
      &.active {
        color: #fff;
        background-color: #398df0;
        .octicon {
          color: #fff;
        }
      }
      .octicon {
        color: #767676;
        float: left;
        margin-top: 5px;
      }
      .note-title {
        white-space: nowrap;
        position: relative;
        left: 5px;
        text-overflow: ellipsis;
        max-width: calc(100% - 20px);
        overflow: hidden;
        display: block;
      }
    }
    .sidebar-loader {
      position: fixed;
      bottom: 0;
      left: 0;
    }
    .sep10 {
      height: 10px;
    }
  }
</style>

<template>
  <EditorOverlay v-if="history.length < 5 && showOverlay || forceShowOverlay"></EditorOverlay>
  <div class="sidebar">
    <header class="sidebar-header">
      <div class="grid-8 with-padding">
        <input type="text" class="form-control global-notes-search" v-model="search_keyword"/>
      </div>
      <div class="grid-4 with-padding" style="padding-left: 0; text-align: right;">
        <button type="button" class="btn new-btn" @click="applyEmptyNote">New</button>
      </div>

    </header>
    <div class="sidebar-main">
      <div class="sep10" v-show="history && history.length > 4"></div>
      <div class="sidebar-heading" v-show="history && history.length > 4">Recent</div>
      <div v-show="history && history.length === 0" class="inner sidebar-notes-loading">Loading...</div>
      <div class="sidebar-history-wrapper" v-show="history && history.length > 4">
        <div class="sidebar-history">
          <template v-for="note in history">
            <div class="sidebar-note" @click="activateNote(note, $event)" :class="{'active': ($index === 0 && activeSection === 'recent') || note.unsaved}">
              <span class="octicon octicon-file-text"></span><span class="note-title">{{ note.title }}</span>
            </div>
          </template>
        </div>
      </div>
      <div class="sep10"></div>
      <div class="sidebar-heading" v-show="notes && notes.length > 0">Notes</div>
      <div v-show="notes.length === 0" class="inner sidebar-notes-loading">Loading...</div>
      <div class="sidebar-notes-wrapper" v-show="notes && notes.length > 0" :class="{'full-height': history.length < 5}">
        <div class="sidebar-notes">
          <template v-for="note in notes | filterBy search_keyword in 'title'" track-by="objectId">
            <div class="sidebar-note" @click="activateNote(note, $event)" :class="{'active': note.active && activeSection === 'notes', 'default-cursor': note.unsaved}">
              <span class="octicon" :class="{'octicon-diff-modified': note.unsaved, 'octicon-file-text': !note.unsaved}"></span><span class="note-title">{{ note.title }}</span>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="sidebar-loader loader"></div>
  </div>
</template>

<script>
  import db from '../helpers/localdb'
  import { url } from '../helpers/api'
  import { $, $$, domEach } from '../helpers/dom'
  import { sidebarLoader } from '../helpers/loaders'
  import emptyNote from '../helpers/empty'
  import notie from 'notie'
  import Ps from 'perfect-scrollbar'
  export default {
    props: ['onUpdateEditarea', 'defaultNote', 'mode', 'currentSaved'],
    data () {
      return {
        search_keyword: '',
        notes: [],
        history: [],
        activeSection: 'notes',
        inited: false,
        showOverlay: true,
        forceShowOverlay: false
      }
    },
    methods: {
      fetchNotes () {
        sidebarLoader.start()
        const user = db.app.get('user')
        this.$http.post(url(`user/${user.username}/notes/all`), {api_key: user.api_key, user_id: user.objectId}, notes => {
          sidebarLoader.stop()
          if (notes.code) {
            return notie('error', notes.message)
          }
          if (notes && notes.length > 0) {
            notes.forEach(note => {
              if (note.objectId === this.defaultNote.objectId) {
                note.active = true
              }
            })
          }
          if (notes.length > 0) {
            this.notes = notes.map(n => {
              n.active = false
              return n
            })
          } else {
            this.notes = [this.defaultNote]
          }
          setTimeout(() => {
            Ps.initialize($('.sidebar-notes'))
          }, 200)
        })
      },
      applyEmptyNote () {
        if (!this.currentSaved) {
          this.deleteNote()
        }
        this.activeSection = 'notes'
        domEach($$('.sidebar-note'), el => el.classList.remove('active'))
        const note = Object.assign({}, emptyNote)
        this.notes.unshift(note)
        this.$dispatch('update.editor.note', note)
        this.showOverlay = false
      },
      activateNote (note, e) {
        if (note.unsaved) {
          return
        }
        if (!this.currentSaved && !this.showOverlay) {
          if (this.deleteNote(e)) {
            return
          }
        }
        this.currentSaved = true
        const timeout = this.search_keyword ? 100 : 0
        this.search_keyword = ''
        const target = e.currentTarget
        if (target.parentNode.classList.contains('sidebar-notes')) {
          this.activeSection = 'notes'
        } else {
          this.activeSection = 'recent'
        }
        setTimeout(() => {
          domEach($$('.sidebar-note'), el => el.classList.remove('active'))
          target.classList.add('active')
          this.defaultNote = note
          this.$dispatch('update.editor.note', note)
        }, timeout)
        this.forceShowOverlay = false
        this.showOverlay = false
      },
      deleteNote (e, note = this.notes.filter(note => note.unsaved)) {
        if (confirm('Leave without saving the note?')) {
          note = note[0]
          if (e) {
            this.currentSaved = true
          }
          if (note && !note.objectId) {
            e && e.currentTarget.click()
            this.notes.shift(0)
            return true
          } else {
            return false
          }
        } else {
          return true
        }
      },
      deleteUntitled () {
        this.notes.shift(0)
        this.currentSaved = true
        this.forceShowOverlay = true
      },
      update (note) {
        this.defaultNote = note
        function update (where) {
          return where.map(current_note => {
            if (current_note.unsaved) {
              return note
            }
            if (current_note.objectId === note.objectId) {
              return note
            }
            return current_note
          })
        }
        this.history = update(this.history)
        this.notes = update(this.notes)
        Ps.update($('.sidebar-notes'))
      },
      updateSidebarHistory () {
        const user = db.app.get('user')
        this.$http.post(url('user/history'), {user_id: user.objectId, api_key: user.api_key}, data => {
          if (data.code) {
            return notie('error', data.message)
          }
          this.history = data
          if (data.length > 4 && !this.inited) {
            this.activeSection = 'recent'
            this.inited = true
          }
          setTimeout(() => {
            Ps.initialize($('.sidebar-history'))
          }, 200)
        })
      }
    },
    ready () {
      this.fetchNotes()
      this.updateSidebarHistory()
      this.$on('update.sidebar.active.note', this.update)
      this.$on('update.sidebar.history', this.updateSidebarHistory)
      this.$on('delete.untitled', this.deleteUntitled)
    },
    components: {
      editoroverlay: require('./editor-overlay')
    }
  }
</script>
