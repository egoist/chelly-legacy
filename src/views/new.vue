<style>
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
  <Editarea
    :default-note="defaultNote"
    :mode.sync="mode"
    :current-saved.sync="currentSaved">
  </Editarea>
</template>

<script>
  import emptyNote from '../helpers/empty'
  import db from '../helpers/localdb'
  export default {
    data () {
      let mode = 'create'
      let defaultNote = Object.assign({}, emptyNote)
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
    components: {
      Editarea: require('../components/edit-area')
    }
  }
</script>
