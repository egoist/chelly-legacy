<template>
  <Sidebar></Sidebar>
  <Editarea :text="defaultMarkdown"></Editarea>
</template>

<script>
  import guideMarkdown from '../helpers/guide'
  import db from '../helpers/localdb'
  export default {
    data () {
      let defaultMarkdown = db.app.get('user').notes === 0 ? guideMarkdown : ''
      const lastNote = db.app.get('lastNote')
      if (lastNote) {
        defaultMarkdown = lastNote.content
      }
      return {
        defaultMarkdown
      }
    },
    components: {
      Sidebar: require('../components/side-bar'),
      Editarea: require('../components/edit-area')
    }
  }
</script>
