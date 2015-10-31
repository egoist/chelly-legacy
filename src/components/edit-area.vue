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
  }
</style>

<template>
  <section class="edit-area">
    <div class="edit-header">
      <input type="text" class="form-control input-title" v-model="title" />
    </div>
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
        title: 'Untitled',
        text: '# example'
      }
    },
    methods: {
      handleChange () {
        this.text = this.editor.getValue()
      },
      handleScroll () {
        this.$els.preview.scrollTop = this.editor.doc.scrollTop
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
    },
    filters: {
      md
    }
  }
</script>
