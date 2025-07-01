<template>
  <div :style="wStyle">
    <slot />
  </div>
</template>

<script lang="ts">
import { COLOR_SCHEMA, PADDING_SCHEMA, getPadding } from '@infocare/email-core';
import { z } from 'zod';
import { computed } from 'vue';

export const ContainerPropsSchema = z.object({
  style: z
  .object({
    backgroundColor: COLOR_SCHEMA,
    borderColor: COLOR_SCHEMA,
    borderRadius: z.number().optional().nullable(),
    padding: PADDING_SCHEMA,
  })
  .optional()
  .nullable(),
});

export type ContainerProps = {
  style?: {
    backgroundColor?: string | null,
    borderColor?: string | null,
    borderRadius?: number | null,
    padding?: {
      left: number,
      right: number,
      top: number,
      bottom: number,
    } | null,
  } | null,
}
</script>

<script setup lang="ts">
const props = defineProps<ContainerProps>()

const wStyle = computed(() => ({
  backgroundColor: props.style?.backgroundColor ?? undefined,
  border: getBorder(props.style),
  borderRadius: props.style?.borderRadius ? props.style.borderRadius + 'px' : undefined,
  padding: getPadding(props.style?.padding),
}))

function getBorder(style: ContainerProps['style']) {
  if (!style || !style.borderColor) {
    return undefined;
  }
  return `1px solid ${style.borderColor}`;
}

</script>
