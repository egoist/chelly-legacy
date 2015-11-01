<template>
  <Sidebar></Sidebar>
  <Editarea :text="guideMarkdown"></Editarea>
</template>

<script>
  import guideMarkdown from '../helpers/guide.js'
  export default {
    data () {
      return {
        guideMarkdown
      }
    },
    components: {
      Sidebar: require('../components/side-bar'),
      Editarea: require('../components/edit-area')
    }
  }
</script>
