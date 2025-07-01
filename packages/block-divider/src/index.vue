<template>
  <div :style="st">
    <hr
      :style="{
        width: '100%',
        border: 'none',
        borderTop: `${borderTopWidth}px solid ${borderTopColor}`,
        margin: '0',
      }"
    >
  </div>
</template>

<script lang="ts">
import { COLOR_SCHEMA, PADDING_SCHEMA, getPadding } from '@infocare/email-core';
import { z } from 'zod';
import { computed } from 'vue';

export const DividerPropsSchema = z.object({
  style: z
  .object({
    backgroundColor: COLOR_SCHEMA,
    padding: PADDING_SCHEMA,
  })
  .optional()
  .nullable(),
  props: z
  .object({
    lineColor: COLOR_SCHEMA,
    lineHeight: z.number().optional().nullable(),
  })
  .optional()
  .nullable(),
});

export type DividerProps = {
  style?: {
    backgroundColor?: string | null,
    padding?: {
      left: number,
      right: number,
      top: number,
      bottom: number,
    } | null,
  } | null,
  props?: {
    lineColor?: string | null,
    lineHeight?: number | null,
  } | null,
}

export const DividerPropsDefaults = {
  lineHeight: 1,
  lineColor: '#333333',
};
</script>

<script setup lang="ts">
const props = defineProps<DividerProps>()

const borderTopWidth = computed(() => props.props?.lineHeight ?? DividerPropsDefaults.lineHeight)
const borderTopColor = computed(() => props.props?.lineColor ?? DividerPropsDefaults.lineColor)

const st = computed(() => ({
  padding: getPadding(props.style?.padding),
  backgroundColor: props.style?.backgroundColor ?? undefined,
}))
</script>
