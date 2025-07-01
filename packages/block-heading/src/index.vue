<template>
  <component :is="level" :style="style">
    {{ text }}
  </component>
</template>

<script lang="ts">
import { z } from 'zod';
import type { FONT_FAMILY_NAMES } from '@infocare/email-core';
import { COLOR_SCHEMA, FONT_FAMILY_SCHEMA, PADDING_SCHEMA, getFontFamily, getFontSize, getPadding } from '@infocare/email-core';
import { computed } from 'vue';

export const HeadingPropsSchema = z.object({
  props: z
    .object({
      text: z.string().optional().nullable(),
      level: z.enum(['h1', 'h2', 'h3']).optional().nullable(),
    })
    .optional() .nullable(),
  style: z
    .object({
      color: COLOR_SCHEMA,
      backgroundColor: COLOR_SCHEMA,
      fontFamily: FONT_FAMILY_SCHEMA,
      fontWeight: z.enum(['bold', 'normal']).optional().nullable(),
      textAlign: z.enum(['left', 'center', 'right']).optional().nullable(),
      padding: PADDING_SCHEMA,
    })
    .optional()
    .nullable(),
});

export type HeadingProps = {
  props?: {
    text?: string | null,
    level?: 'h1' | 'h2' | 'h3' | null
  } | null;
  style?: {
    color?: string | null,
    backgroundColor?: string | null,
    fontFamily?: typeof FONT_FAMILY_NAMES[number] | null,
    fontWeight?: 'bold' | 'normal' | null,
    textAlign?: 'left' | 'center' | 'right' | null,
    padding?: {
      left: number,
      right: number,
      top: number,
      bottom: number,
    } | null,
  } | null;
}

export const HeadingPropsDefaults = {
  level: 'h2',
  text: ''
} as const
</script>

<script setup lang="ts">
const props = defineProps<HeadingProps>()

const level = computed(() =>  props.props?.level ?? HeadingPropsDefaults.level)
const text = computed(() => props.props?.text ?? HeadingPropsDefaults.text)
const style = computed(() => {
  return {
    color: props.style?.color ?? undefined,
    backgroundColor: props.style?.backgroundColor ?? undefined,
    fontWeight: props.style?.fontWeight ?? 'bold',
    textAlign: props.style?.textAlign ?? undefined,
    margin: 0,
    fontFamily: getFontFamily(props.style?.fontFamily),
    fontSize: getFontSize(level.value),
    padding: getPadding(props.style?.padding),
  }
})
</script>
