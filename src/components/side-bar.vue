<style scoped>
  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: 240px;
    box-shadow: inset -1px 0 #e3e3e3;
    background-color: #fff;
    padding-bottom: 4px;
    .sidebar-header {
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #d9d9d9;
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
      padding: 3px 10px;
      color: #778087;
      margin-top: 10px;
    }
    .sidebar-notes {
      overflow: auto;
      height: calc(100% - 40px)
    }
    .sidebar-note {
      padding: 5px 10px;
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
      }
      .note-title {
        margin-left: 5px;
      }
    }
    .sidebar-loader {
      position: fixed;
      bottom: 0;
      left: 0;
    }
  }
</style>

<template>
  <div class="sidebar">
    <header class="sidebar-header">
      <div class="grid-8 with-padding">
        <input type="text" class="form-control global-notes-search" v-model="search_keyword"/>
      </div>
      <div class="grid-4 with-padding" style="padding-left: 0; text-align: right;">
        <button type="button" class="btn new-btn" @click="applyEmptyNote">New</button>
      </div>

    </header>
    <div class="sidebar-history" v-show="history && history.length > 0">
      <div class="sidebar-heading">Recent</div>
      <template v-for="note in history">
        <div class="sidebar-note" @click="activateNote(note, $event)" :class="{'active': $index === 0}">{{ note.title }}</div>
      </template>
    </div>
    <div v-show="notes.length === 0" class="inner sidebar-notes-loading">Loading...</div>
    <div class="sidebar-notes" v-show="notes && notes.length > 0">
      <div class="sidebar-heading">Notes</div>
      <template v-for="note in notes | filterBy search_keyword in 'title'" track-by="objectId">
        <div class="sidebar-note" @click="activateNote(note, $event)" :class="{'active': (note.active && note.unsaved) || note.updated}">
          <span class="octicon octicon-file-text"></span><span class="note-title">{{ note.title }}</span>
        </div>
      </template>
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
  export default {
    props: ['onUpdateEditarea', 'defaultNote', 'mode', 'currentSaved'],
    data () {
      return {
        search_keyword: '',
        notes: [],
        history: [],
        activeSection: 'recent'
      }
    },
    methods: {
      fetchNotes () {
        sidebarLoader.start()
        const user = db.app.get('user')
        this.$http.post(url(`user/${user.username}/notes/all`), {api_key: user.api_key, user_id: user.objectId}, notes => {
          sidebarLoader.stop()
          if (notes && notes.length > 0) {
            notes.forEach(note => {
              if (note.objectId === this.defaultNote.objectId) {
                note.active = true
              }
            })
          }
          if (notes.length > 0) {
            this.notes = notes
          } else {
            this.notes = [this.defaultNote]
          }

        })
      },
      applyEmptyNote () {
        if (!this.currentSaved) {
          this.deleteNote()
          return
        }
        domEach($$('.sidebar-note'), el => el.classList.remove('active'))
        const note = Object.create(emptyNote)
        this.notes.unshift(note)
        this.$dispatch('update.editor.note', note)
      },
      activateNote (note, e) {
        console.log(this.currentSaved)
        if (!this.currentSaved) {
          if (this.deleteNote(e)) {
            return
          }
        }
        const timeout = this.search_keyword ? 100 : 0
        this.search_keyword = ''
        const target = e.currentTarget
        setTimeout(() => {
          domEach($$('.sidebar-note'), el => el.classList.remove('active'))
          target.classList.add('active')
          this.defaultNote = note
          this.$dispatch('update.editor.note', note)
        }, timeout)

      },
      deleteNote (e, note = this.notes.filter(note => note.unsaved)) {
        if (confirm('Leave without saving the note?')) {
          this.currentSaved = true
          note = note[0]
          if (note && !note.objectId) {
            e.currentTarget.click()
            this.notes.shift(0)
            return true
          } else {
            return false
          }
        } else {
          return true
        }
      },
      update (note) {
        this.defaultNote = note
        this.notes = this.notes.map(current_note => {
          if (current_note.unsaved) {
            return note
          }
          if (current_note.objectId === note.objectId) {
            return note
          }
          return current_note
        })
      },
      updateSidebarHistory () {
        const history = db.history.get()
        this.history = (history && history.reverse()) || []
      }
    },
    ready () {
      this.fetchNotes()
      this.updateSidebarHistory()
      this.$on('update.sidebar.active.note', this.update)
    }
  }
</script>
