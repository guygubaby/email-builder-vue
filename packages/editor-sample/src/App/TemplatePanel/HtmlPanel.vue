<template>
  <HighlightedCodePanel type="html" :value="code" />
</template>

<script setup lang="ts">
import HighlightedCodePanel from './helper/HighlightedCodePanel.vue'
import { useInspectorDrawer } from '../../documents/editor/editor.store'
import { ref, watch } from 'vue';
import { renderToStaticMarkup } from '@infocare/email-builder'

const inspectorDrawer = useInspectorDrawer()

const code = ref<string>('')

watch(() => inspectorDrawer.document, async (document) => {
  const html = await renderToStaticMarkup(document, { rootBlockId: 'root' })

  code.value = html
}, { immediate: true })
</script>

