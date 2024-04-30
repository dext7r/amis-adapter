<script>
import { setThemeConfig } from 'amis-editor-core'
import { setDefaultTheme } from 'amis'
import themeConfig from 'amis-theme-editor-helper/lib/systemTheme/cxd'
import { Editor } from 'amis-editor'
import { ReactInVue } from 'vuera'
// import '../assets/style.scss'
import 'amis/sdk/sdk.js'
import 'amis/lib/themes/default.css'
import 'amis/lib/helper.css'
import 'amis/sdk/iconfont.css'
import 'amis-editor-core/lib/style.css'

setDefaultTheme('cxd')
setThemeConfig(themeConfig)

export default {
  name: 'AmisEditor',
  components: {
    AmisEditorSdk: ReactInVue(Editor),
  },
  props: {
    isPreview: {
      type: Boolean,
      default: false,
    },
    isMobile: {
      type: Boolean,
      default: false,
    },
    showCustomRenderersPanel: {
      type: Boolean,
      default: false,
    },
    theme: {
      type: String,
      default: 'cxd',
    },
    className: {
      type: String,
      default: 'ang',
    },
    value: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      schema: {},
    }
  },
  mounted() {
    this.schema = this.value
  },
  methods: {
    setSchema(obj) {
      this.schema = obj
    },
    getSchema() {
      return this.schema
    },
    onChange(e) {
      this.schema = e
      // eslint-disable-next-line vue/require-explicit-emits
      this.$emit('change', e)
    },
    onSave(e) {
      // eslint-disable-next-line no-console
      console.log(e)
      // eslint-disable-next-line vue/require-explicit-emits
      this.$emit('onSave', e)
    },
    onPreview(e) {
      // eslint-disable-next-line no-console
      console.log(e)
      // eslint-disable-next-line vue/require-explicit-emits
      this.$emit('onPreview', e)
    },
  },
}
</script>

<template>
  <div class="amis">
    <AmisEditorSdk
      id="editorName"
      :theme="theme"
      :class-name="className"
      :preview="isPreview"
      :is-mobile="isMobile"
      :value="schema"
      :plugins="plugins"
      :show-custom-renderers-panel="showCustomRenderersPanel"
      @on-change="onChange"
      @on-preview="onPreview"
      @on-save="onSave"
    />
  </div>
</template>
