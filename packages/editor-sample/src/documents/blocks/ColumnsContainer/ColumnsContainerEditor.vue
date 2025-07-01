<template>
  <BaseColumnsContainer
    :props="restProps"
    :style="style"
  >
    <template #column-0>
      <EditorChildrenIds :children-ids="columns?.[0]?.childrenIds" @change="handleUpdateColumns(0, $event)" />
    </template>
    <template #column-1>
      <EditorChildrenIds :children-ids="columns?.[1]?.childrenIds" @change="handleUpdateColumns(1, $event)" />
    </template>
    <template #column-2>
      <EditorChildrenIds :children-ids="columns?.[2]?.childrenIds" @change="handleUpdateColumns(2, $event)" />
    </template>
  </BaseColumnsContainer>
</template>

<script setup lang="ts">
import BaseColumnsContainer from '@infocare/email-block-columns-container';
import ColumnsContainerPropsSchema from './ColumnsContainerPropsSchema';
import type { ColumnsContainerProps } from './ColumnsContainerPropsSchema';
import { currentBlockIdSymbol } from '../../editor/EditorBlock.vue';
import { useInspectorDrawer } from '../../editor/editor.store';
import type { EditorChildrenChange } from '../helpers/EditorChildrenIds.vue';
import EditorChildrenIds from '../helpers/EditorChildrenIds.vue';
import { computed, inject } from 'vue';

const props = defineProps<ColumnsContainerProps>()

const EMPTY_COLUMNS = [{ childrenIds: [] }, { childrenIds: [] }, { childrenIds: [] }]

const inspectorDrawer = useInspectorDrawer()

/** Injections */

const currentBlockId = inject(currentBlockIdSymbol)!

/** Computed */

const columns = computed(() => props.props?.columns)
const restProps = computed(() => {
  const { columns: _, ...rest } = props.props ?? {}

  return rest
})
const columnsValue = computed(() => props.props?.columns ?? EMPTY_COLUMNS)

/** Functions */

function handleUpdateColumns(columnIndex: 0 | 1 | 2, { block, blockId, childrenIds }: EditorChildrenChange) {
  const nColumns = [...columnsValue.value]

  nColumns[columnIndex] = { childrenIds }

  inspectorDrawer.setDocument({
    [blockId]: block,
    [currentBlockId]: {
      type: 'ColumnsContainer',
      data: ColumnsContainerPropsSchema.parse({
        style: props.style,
        props: {
          ...restProps.value,
          columns: nColumns,
        }
      })
    }
  })
}
</script>
