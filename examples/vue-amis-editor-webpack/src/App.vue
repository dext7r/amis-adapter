<script>
import AmisEditor from './components/AmisEditor'

export default {
  name: 'App',
  components: { AmisEditor },
  data() {
    return {
      editor: null,
      isPreview: true,
      isMobile: false,
      showCustomRenderersPanel: true,
      schema: {
        type: 'page',
        id: 'u:d3b02ff7a8d0',
        aside: [],
        body: [
          {
            type: 'tpl',
            tpl: 'vue-amis-sdk@2.1.0',
            inline: true,
            wrapperComponent: 'h1',
            id: 'u:0f5cb1ec6c87',
          },
        ],
      },
    }
  },
  mounted() {
  },
  methods: {
    onChange(e) {
      // eslint-disable-next-line no-console
      console.log(e)
    },
  },
}
</script>

<template>
  <div id="app">
    <AmisEditor
      id="editorName"
      class="editor-widget"
      theme="cxd"
      class-name="is-fixed"
      :preview="isPreview"
      :is-mobile="isMobile"
      :value="schema"
      :show-custom-renderers-panel="showCustomRenderersPanel"
      @on-change="onChange"
    />
  </div>
</template>

<style scoped>
#app {
  width: 100%;
  height: 100%;
}
</style>
