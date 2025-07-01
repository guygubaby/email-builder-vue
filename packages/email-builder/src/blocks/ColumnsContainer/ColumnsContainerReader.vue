<template>
  <BaseColumnsContainer :props="restProps" :style="style">
    <template #column-0>
      <ReaderEditorChildrenIds :children-ids="columns?.[0]?.childrenIds" :document="document" />
    </template>
    <template #column-1>
      <ReaderEditorChildrenIds :children-ids="columns?.[1]?.childrenIds" :document="document" />
    </template>
    <template #column-2>
      <ReaderEditorChildrenIds :children-ids="columns?.[2]?.childrenIds" :document="document" />
    </template>
  </BaseColumnsContainer>
</template>

<script setup lang="ts">
import BaseColumnsContainer from '@infocare/email-block-columns-container';
import ReaderEditorChildrenIds from '../../helpers/ReaderEditorChildrenIds.vue';
import type { ColumnsContainerProps } from './ColumnsContainerPropsSchema';
import { computed } from 'vue';

const props = defineProps<ColumnsContainerProps>()

/** Computed */

const columns = computed(() => props.props?.columns)
const restProps = computed(() => {
  const { columns: _, ...rest } = props.props ?? {}

  return rest
})
</script>
