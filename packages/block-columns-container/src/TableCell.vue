<template>
  <td v-if="columnsCount !== 2 || index !== 2" :style="style">
    <slot />
  </td>
</template>

<script setup lang="ts">
import { z } from 'zod';
import { computed } from 'vue';
import { ColumnsContainerPropsDefaults, FIXED_WIDTHS_SCHEMA } from './index.vue';

type Props = {
  index: number,
  props: {
    fixedWidths: z.infer<typeof FIXED_WIDTHS_SCHEMA>;
    columnsCount: 2 | 3;
    columnsGap: number;
    contentAlignment: 'top' | 'middle' | 'bottom';
  }
}

const props = defineProps<Props>()

const contentAlignment = computed(() => props.props?.contentAlignment ?? ColumnsContainerPropsDefaults.contentAlignment)
const columnsCount = computed(() => props.props?.columnsCount ?? ColumnsContainerPropsDefaults.columnsCount)

const style = computed(() => {
  const width = props.props.fixedWidths?.[props.index]

  return {
    boxSizing: 'content-box' as const,
    verticalAlign: contentAlignment.value,
    paddingLeft: getPaddingBefore(props.index, props.props) + 'px',
    paddingRight: getPaddingAfter(props.index, props.props) + 'px',
    width: typeof width === 'number' ? width + 'px' : (typeof width === 'string' ? width : undefined),
  }
})

/** Functions */
function getPaddingBefore(index: number, { columnsGap, columnsCount }: Props['props']): number {
  if (index === 0) {
    return 0;
  }
  if (columnsCount === 2) {
    return columnsGap / 2;
  }
  if (index === 1) {
    return columnsGap / 3;
  }
  return (2 * columnsGap) / 3;
}

function getPaddingAfter(index: number, { columnsGap, columnsCount }: Props['props']): number {
  if (columnsCount === 2) {
    if (index === 0) {
      return columnsGap / 2;
    }
    return 0;
  }

  if (index === 0) {
    return (2 * columnsGap) / 3;
  }
  if (index === 1) {
    return columnsGap / 3;
  }
  return 0;
}

</script>
