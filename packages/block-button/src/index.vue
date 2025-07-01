<template>
  <div :style="wrapperStyle">
    <a :href="url" :style="linkStyle" target="_blank">
      <!-- eslint-disable-next-line vue/no-v-html -->
      <span v-html="firstSpan" />
      <span> {{ text }}</span>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <span v-html="lastSpan" />
    </a>
  </div>
</template>

<script lang="ts">
import type { FONT_FAMILY_NAMES } from '@infocare/email-core';
import { COLOR_SCHEMA, FONT_FAMILY_SCHEMA, PADDING_SCHEMA, getFontFamily, getPadding } from '@infocare/email-core';
import { z } from 'zod';
import { computed } from 'vue';
import type { CSSProperties } from 'vue';

export type ButtonProps = {
  style?: {
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
    buttonBackgroundColor?: string | null,
    buttonStyle?: 'rectangle' | 'pill' | 'rounded' | null,
    buttonTextColor?: string | null,
    fullWidth?: boolean | null,
    size?: 'x-small' | 'small' | 'large' | 'medium' | null,
    text?: string | null,
    url?: string | null,
  } | null,
}

export const ButtonPropsDefaults = {
  text: '',
  url: '',
  fullWidth: false,
  size: 'medium',
  buttonStyle: 'rounded',
  buttonTextColor: '#FFFFFF',
  buttonBackgroundColor: '#999999',
} as const;

export const ButtonPropsSchema = z.object({
  style: z
  .object({
    backgroundColor: COLOR_SCHEMA,
    fontSize: z.number().min(0).optional().nullable(),
    fontFamily: FONT_FAMILY_SCHEMA,
    fontWeight: z.enum(['bold', 'normal']).optional().nullable(),
    textAlign: z.enum(['left', 'center', 'right']).optional().nullable(),
    padding: PADDING_SCHEMA,
  })
  .optional()
  .nullable(),
  props: z
  .object({
    buttonBackgroundColor: COLOR_SCHEMA,
    buttonStyle: z.enum(['rectangle', 'pill', 'rounded']).optional().nullable(),
    buttonTextColor: COLOR_SCHEMA,
    fullWidth: z.boolean().optional().nullable(),
    size: z.enum(['x-small', 'small', 'large', 'medium']).optional().nullable(),
    text: z.string().optional().nullable(),
    url: z.string().optional().nullable(),
  })
  .optional()
  .nullable(),
});
</script>

<script setup lang="ts">

const props = defineProps<ButtonProps>()

const text = computed(() => props.props?.text ?? ButtonPropsDefaults.text)
const url = computed(() => props.props?.url ?? ButtonPropsDefaults.url)
const fullWidth = computed(() => props.props?.fullWidth ?? ButtonPropsDefaults.fullWidth)
const buttonTextColor = computed(() => props.props?.buttonTextColor ?? ButtonPropsDefaults.buttonTextColor)
const buttonBackgroundColor = computed(() => props.props?.buttonBackgroundColor ?? ButtonPropsDefaults.buttonBackgroundColor)
const padding = computed(() => getButtonSizePadding(props.props))
const textRaise = computed(() => (padding.value[1] * 2 * 3) / 4)

const firstSpan = computed(() =>  `<!--[if mso]><i style="letter-spacing: ${padding.value[1]}px;mso-font-width:-100%;mso-text-raise:${textRaise.value}" hidden>&nbsp;</i><![endif]-->`)
const lastSpan = computed(() =>  `<!--[if mso]><i style="letter-spacing: ${padding.value[1]}px;mso-font-width:-100%" hidden>&nbsp;</i><![endif]-->`)

const wrapperStyle = computed(() => ({
  backgroundColor: props.style?.backgroundColor ?? undefined,
  textAlign: props.style?.textAlign ?? undefined,
  padding: getPadding(props.style?.padding),
}))

const linkStyle = computed<CSSProperties>(() => ({
  color: buttonTextColor.value,
  fontSize: (props.style?.fontSize ?? 16) + 'px',
  // FIXME: type
  fontFamily: getFontFamily(props.style?.fontFamily),
  fontWeight: props.style?.fontWeight ?? 'bold',
  backgroundColor: buttonBackgroundColor.value,
  borderRadius: getRoundedCorners(props.props),
  display: fullWidth.value ? 'block' : 'inline-block',
  padding: `${padding.value[0]}px ${padding.value[1]}px`,
  textDecoration: 'none',
}))

function getRoundedCorners(props: ButtonProps['props']) {
  const buttonStyle = props?.buttonStyle ?? ButtonPropsDefaults.buttonStyle;

  switch (buttonStyle) {
    case 'rectangle':
      return undefined;
    case 'pill':
      return 64 + 'px';
    case 'rounded':
    default:
      return 4 + 'px';
  }
}

function getButtonSizePadding(props: ButtonProps['props']) {
  const size = props?.size ?? ButtonPropsDefaults.size;
  switch (size) {
    case 'x-small':
      return [4, 8] as const;
    case 'small':
      return [8, 12] as const;
    case 'large':
      return [16, 32] as const;
    case 'medium':
    default:
      return [12, 20] as const;
  }
}

</script>
