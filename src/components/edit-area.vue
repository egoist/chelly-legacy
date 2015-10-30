<style scoped>
  .edit-area {
    position: fixed;
    left: 240px;
    right: 0;
    bottom: 0;
    top: 0;
    background-color: #fff;
  }
  .write-here, .preview-here {
    width: 50%;
    height: 100%;
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
  }
</style>

<template>
  <section class="edit-area">
    <div class="write-here"><textarea v-el:textarea class="form-control" v-model="text">{{ text }}</textarea></div>
    <div class="preview-here github2" v-el:preview>{{{ text | md }}}</div>
  </section>
</template>

<script>
  import CodeMirror from 'codemirror'
  import markdown from 'codemirror/mode/markdown/markdown'
  import md from '../helpers/md'
  export default {
    data () {
      return {
        text: '# example'
      }
    },
    methods: {
      handleChange () {
        this.text = this.editor.getValue()
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
    },
    filters: {
      md: md
    }
  }
</script>
