<template>
  <div v-if="!props.props?.contents" :style="cssStyle" />
  <!-- eslint-disable-next-line vue/no-v-html -->
  <div v-else v-html="props.props.contents" :style="cssStyle" class="revert-browser-styles" />
</template>

<script lang="ts">
import type { FONT_FAMILY_NAMES} from '@infocare/email-core';
import { COLOR_SCHEMA, FONT_FAMILY_SCHEMA, PADDING_SCHEMA, getFontFamily, getPadding } from '@infocare/email-core';
import { z } from 'zod';
import { computed } from 'vue';

export const HtmlPropsSchema = z.object({
  style: z
  .object({
    color: COLOR_SCHEMA,
    backgroundColor: COLOR_SCHEMA,
    fontFamily: FONT_FAMILY_SCHEMA,
    fontSize: z.number().min(0).optional().nullable(),
    textAlign: z.enum(['left', 'right', 'center']).optional().nullable(),
    padding: PADDING_SCHEMA,
  })
  .optional()
  .nullable(),
  props: z
  .object({
    contents: z.string().optional().nullable(),
  })
  .optional()
  .nullable(),
});

export type HtmlProps = {
  style?: {
    color?: string | null,
    backgroundColor?: string | null,
    fontFamily?: typeof FONT_FAMILY_NAMES[number] | null,
    fontSize?: number | null,
    textAlign?: 'left' | 'center' | 'right' | null,
    padding?: {
      left: number,
      right: number,
      top: number,
      bottom: number,
    } | null,
  } | null,
  props?: {
    contents?: string | null,
  } | null,
}
</script>

<script setup lang="ts">
const props = defineProps<HtmlProps>()

const cssStyle = computed(() => ({
  color: props.style?.color ?? undefined,
  backgroundColor: props.style?.backgroundColor ?? undefined,
  fontFamily: getFontFamily(props.style?.fontFamily),
  fontSize: props.style?.fontSize ? props.style?.fontSize + 'px' : undefined,
  textAlign: props.style?.textAlign ?? undefined,
  padding: getPadding(props.style?.padding),
}))

</script>
