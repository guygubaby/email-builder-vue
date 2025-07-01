<template>
  <EmailMarkdown v-if="props?.props?.markdown" :markdown="text" :style="style" />
  <div v-else :style="style">{{ text }}</div>
</template>

<script lang="ts">
import EmailMarkdown from './EmailMarkdown.vue';
import { COLOR_SCHEMA, FONT_FAMILY_NAMES, FONT_FAMILY_SCHEMA, PADDING_SCHEMA, getFontFamily, getPadding } from '@infocare/email-core';
import { z } from 'zod';
import { computed } from 'vue';

export const TextPropsSchema = z.object({
  style: z
    .object({
      color: COLOR_SCHEMA,
      backgroundColor: COLOR_SCHEMA,
      fontSize: z.number().gte(0).optional().nullable(),
      fontFamily: FONT_FAMILY_SCHEMA,
      fontWeight: z.enum(['bold', 'normal']).optional().nullable(),
      textAlign: z.enum(['left', 'center', 'right']).optional().nullable(),
      padding: PADDING_SCHEMA,
    })
    .optional()
    .nullable(),
  props: z
    .object({
      markdown: z.boolean().optional().nullable(),
      text: z.string().optional().nullable(),
    })
    .optional()
    .nullable(),
});

export type TextProps = {
  style?: {
    color?: string | null,
    backgroundColor?: string | null,
    fontSize?: number | null,
    fontFamily?: typeof FONT_FAMILY_NAMES[number] | null,
    fontWeight?: 'bold' | 'normal' | null,
    textAlign?: 'left' | 'center' | 'right' | null,
    padding?: {
      left: number,
      right: number,
      top: number,
      bottom: number,
    } | null,
  } | null,
  props?: {
    markdown?: boolean | null,
    text?: string | null,
  } | null,
}

const TextPropsDefaults = {
  text: ''
}
</script>

<script setup lang="ts">
const props = defineProps<TextProps>()

const style = computed(() => ({
  color: props.style?.color ?? undefined,
  backgroundColor: props.style?.backgroundColor ?? undefined,
  fontSize: props.style?.fontSize ? props.style?.fontSize + 'px' : undefined,
  // FIXME: type
  fontFamily: getFontFamily(props.style?.fontFamily),
  fontWeight: props.style?.fontWeight ?? undefined,
  // FIXME: text align type like HTMLAttributes
  textAlign: props.style?.textAlign ?? undefined,
  // FIXME: type
  padding: getPadding(props.style?.padding),
}))

const text = computed(() => props.props?.text ?? TextPropsDefaults.text)
</script>
