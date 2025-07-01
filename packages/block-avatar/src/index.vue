<template>
  <div :style="sectionStyle">
    <img
      :alt="alt"
      :src="imageUrl"
      :height="size"
      :width="size"
      :style="{
        outline: 'none',
        border: 'none',
        textDecoration: 'none',
        objectFit: 'cover',
        height: size + 'px',
        width: size + 'px',
        maxWidth: '100%',
        display: 'inline-block',
        verticalAlign: 'middle',
        textAlign: 'center',
        borderRadius: getBorderRadius(shape, size),
      }"
    >
  </div>
</template>

<script lang="ts">
import { getPadding, PADDING_SCHEMA } from '@infocare/email-core';
import { computed } from 'vue';
import { z } from 'zod';

export const AvatarPropsDefaults = {
  size: 64,
  imageUrl: '',
  alt: '',
  shape: 'square',
} as const;

export const AvatarPropsSchema = z.object({
  style: z
  .object({
    textAlign: z.enum(['left', 'center', 'right']).optional().nullable(),
    padding: PADDING_SCHEMA,
  })
  .optional()
  .nullable(),
  props: z
  .object({
    size: z.number().gt(0).optional().nullable(),
    shape: z.enum(['circle', 'square', 'rounded']).optional().nullable(),
    imageUrl: z.string().optional().nullable(),
    alt: z.string().optional().nullable(),
  })
  .optional()
  .nullable(),
});

export type AvatarProps = {
  style?: {
    textAlign?: 'left' | 'center' | 'right' | null,
    padding?: {
      left: number,
      right: number,
      top: number,
      bottom: number,
    } | null,
  } | null,
  props?: {
    size?: number | null,
    shape?: 'circle' | 'square' | 'rounded' | null,
    imageUrl?: string | null,
    alt?: string | null,
  } | null,
}

</script>

<script setup lang="ts">
function getBorderRadius(shape: 'circle' | 'square' | 'rounded', size: number): string | undefined {
  switch (shape) {
    case 'rounded':
      return (size * 0.125) + 'px';
    case 'circle':
      return size + 'px';
    case 'square':
    default:
      return undefined;
  }
}

const props = defineProps<AvatarProps>()

const size = computed(() => props.props?.size ?? AvatarPropsDefaults.size)
const imageUrl = computed(() => props.props?.imageUrl ?? AvatarPropsDefaults.imageUrl)
const alt = computed(() => props.props?.alt ?? AvatarPropsDefaults.alt)
const shape = computed(() => props.props?.shape ?? AvatarPropsDefaults.shape)

const sectionStyle = computed(() => ({
  textAlign: props.style?.textAlign ?? undefined,
  padding: getPadding(props.style?.padding),
}))
</script>
