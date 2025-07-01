<template>
  <div :style="sectionStyle">
    <img v-if="!linkHref" v-bind="imgAttrs">
    <a v-else :href="linkHref" :style="{ textDecoration: 'none' }" target="_blank">
      <img v-bind="imgAttrs">
    </a>
  </div>
</template>

<script lang="ts">
import { PADDING_SCHEMA, getPadding } from '@infocare/email-core';
import { z } from 'zod';
import { computed } from 'vue';

export const ImagePropsSchema = z.object({
  style: z
  .object({
    padding: PADDING_SCHEMA,
    backgroundColor: z
    .string()
    .regex(/^#[0-9a-fA-F]{6}$/)
    .optional()
    .nullable(),
    textAlign: z.enum(['center', 'left', 'right']).optional().nullable(),
  })
  .optional()
  .nullable(),
  props: z
  .object({
    width: z.number().optional().nullable(),
    height: z.number().optional().nullable(),
    url: z.string().optional().nullable(),
    alt: z.string().optional().nullable(),
    linkHref: z.string().optional().nullable(),
    contentAlignment: z.enum(['top', 'middle', 'bottom']).optional().nullable(),
  })
  .optional()
  .nullable(),
});

export type ImageProps = {
  style?: {
    padding?: {
      left: number,
      right: number,
      top: number,
      bottom: number,
    } | null,
    backgroundColor?: string | null,
    textAlign?: 'center' | 'left' | 'right' | null,
  } | null,
  props?: {
    width?: number | null,
    height?: number | null,
    url?: string | null,
    alt?: string | null,
    linkHref?: string | null,
    contentAlignment?: 'top' | 'middle' | 'bottom' | null,
  } | null,
}
</script>

<script setup lang="ts">
const props = defineProps<ImageProps>()

const imgAttrs = computed(() => ({
  alt: props.props?.alt ?? '',
  src: props.props?.url ?? '',
  width: width.value,
  height: height.value,
  style: {
    width: typeof width.value === 'number' ? width.value + 'px' : undefined,
    height: typeof height.value === 'number' ? height.value + 'px' : undefined,
    outline: 'none',
    border: 'none',
    textDecoration: 'none',
    verticalAlign: props.props?.contentAlignment ?? 'middle',
    display: 'inline-block',
    maxWidth: '100%',
  }
}))

const sectionStyle = computed(() => ({
  padding: getPadding(props.style?.padding),
  backgroundColor: props.style?.backgroundColor ?? undefined,
  textAlign: props.style?.textAlign ?? undefined,
}))

const linkHref = computed(() => props.props?.linkHref ?? null)
const width = computed(() => props.props?.width ?? undefined)
const height = computed(() => props.props?.height ?? undefined)
</script>
