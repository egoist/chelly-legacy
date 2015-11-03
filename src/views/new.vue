<style scoped>
  .sidebar-loading {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    background-color: #fff;
    width: 240px;
    display: none;
  }
  .shown {
    display: block;
    animation: fadeInAndOut 1s infinite
  }

  @keyframes fadeInAndOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
</style>

<template>
  <Sidebar
    :on-update-editarea="handleUpdateEditarea"
    :default-note="defaultNote"
    :mode.sync="mode"
    :current-saved.sync="currentSaved">
  </Sidebar>
  <Editarea
    :on-update-sidebar="handleUpdateSidebar"
    :default-note="defaultNote"
    :mode.sync="mode"
    :current-saved.sync="currentSaved">
  </Editarea>
</template>

<script>
  import guideMarkdown from '../helpers/guide'
  import db from '../helpers/localdb'
  export default {
    data () {
      let mode = 'create'
      let defaultNote = guideMarkdown
      let currentSaved = false
      const lastNote = db.lastNote.get()
      if (lastNote) {
        defaultNote = lastNote
        mode = 'update'
        currentSaved = true
      }
      return {
        defaultNote,
        mode,
        currentSaved
      }
    },
    methods: {
      handleUpdateEditarea (note) {
        this.$broadcast('update.editor', note)
      },
      handleUpdateSidebar (note) {
        this.$broadcast('update.sidebar.current', note)
      }
    },
    components: {
      Sidebar: require('../components/side-bar'),
      Editarea: require('../components/edit-area')
    }
  }
</script>
