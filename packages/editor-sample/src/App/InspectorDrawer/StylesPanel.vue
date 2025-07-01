<template>
  <UAlert v-if="!block" type="warning" title="Block not found" />
  <UAlert v-else-if="block.type !== 'EmailLayout'" type="warning" title='Expected "root" element to be of type "EmailLayout"' />
  <EmailLayoutSidebarPanel v-else :data="block.data" @update:data="handleUpdateData" />
</template>

<script setup lang="ts">
import { useInspectorDrawer } from '../../documents/editor/editor.store';
import { computed } from 'vue';
import EmailLayoutSidebarPanel from './ConfigurationPanel/input-panels/EmailLayoutSidebarPanel.vue';
import type { EmailLayoutProps } from '@infocare/email-builder/blocks/EmailLayout';

const inspectorDrawer = useInspectorDrawer()

const block = computed(() => inspectorDrawer.document.root)

/** Functions */

function handleUpdateData(data: Omit<EmailLayoutProps, 'document'>) {
  inspectorDrawer.setDocument({
    root: {
      type: 'EmailLayout',
      data,
    }
  })
}

</script>
