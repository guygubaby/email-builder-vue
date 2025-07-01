<template>
  <BaseContainer :style="style">
    <EditorChildrenIds
      :children-ids="props?.childrenIds ?? []"
      @change="handleUpdateChildrenIds"
    />
  </BaseContainer>
</template>

<script setup lang="ts">
import BaseContainer from '@infocare/email-block-container';
import EditorChildrenIds from '../helpers/EditorChildrenIds.vue';
import type { EditorChildrenChange } from '../helpers/EditorChildrenIds.vue';
import type { ContainerProps } from './ContainerPropsSchema';
import { currentBlockIdSymbol } from '../../editor/EditorBlock.vue';
import { useInspectorDrawer } from '../../editor/editor.store';
import { inject } from 'vue';

defineProps<ContainerProps>()

const inspectorDrawer = useInspectorDrawer();

/** Injections */

const currentBlockId = inject(currentBlockIdSymbol) as string;

/** Functions */

function handleUpdateChildrenIds({ block, blockId, childrenIds }: EditorChildrenChange) {
  const document = inspectorDrawer.document;

  inspectorDrawer.setDocument({
    [blockId]: block,
    [currentBlockId]: {
      type: 'Container',
      data: {
        ...document[currentBlockId].data,
        props: { childrenIds }
      }
    }
  })

  inspectorDrawer.setSelectedBlockId(blockId)
}
</script>
