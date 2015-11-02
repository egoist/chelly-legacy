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
    .sidebar-notes {
      overflow: auto;
      height: calc(100% - 40px)
    }
    .sidebar-note {
      padding: 8px 10px;
      font-size: 14px;
      cursor: pointer;
      &:hover {
        background-color: #f0f0f0;
      }
      &.active {
        color: #fff;
        background-color: #398df0;
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
        <input type="text" class="form-control global-notes-search"/>
      </div>
      <div class="grid-4 with-padding" style="padding-left: 0; text-align: right;">
        <button type="button" class="btn new-btn">New</button>
      </div>

    </header>
    <div v-show="notes.length === 0" class="inner">Loading...</div>
    <div class="sidebar-notes">
      <template v-for="note in notes" track-by="objectId">
        <div class="sidebar-note" @click="activateNote(note, $event)" :class="{'active': note.active}">
          {{ note.title }}
        </div>
      </template>
    </div>
    <div class="sidebar-loader loader"></div>
  </div>
</template>

<script>
  import db from '../helpers/localdb'
  import { url } from '../helpers/api'
  import { $$, domEach } from '../helpers/dom'
  import { sidebarLoader } from '../helpers/loaders'
  export default {
    props: ['onUpdateEditarea', 'defaultNote'],
    data () {
      return {
        notes: []
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
          this.notes = notes
        })
      },
      activateNote (note, e) {
        domEach($$('.sidebar-note'), el => el.classList.remove('active'))
        e.target.classList.add('active')
        this.defaultNote = note
        this.onUpdateEditarea(note)
      },
      update (note) {
        this.defaultNote = note
        this.notes = this.notes.map(current_note => {
          if (current_note.objectId === note.objectId) {
            return note
          }
          return current_note
        })
      },
      updateHistory (note) {
        const exist = db.history.get().forEach(db_note => {
          if (db_note.objectId === note.objectId) {
            return true
          }
        })
        if (exist) {
          return
        }
        let history = db.history.add(note).get()
        if (history.length > 10) {
          history = history.slice(1)
          db.history.override(history)
        }
      }
    },
    ready () {
      this.fetchNotes()
      this.$on('update.sidebar.current', this.update)
    }
  }
</script>
