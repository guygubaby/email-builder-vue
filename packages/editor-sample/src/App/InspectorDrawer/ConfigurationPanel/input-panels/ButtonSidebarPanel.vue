<template>
  <BaseSidebarPanel title="Button block">
    <UFormField label="Text">
      <UInput :model-value="text" @update:model-value="handleUpdateData({ ...data, props: { ...data.props, text: $event as string } })" class="w-full" />
    </UFormField>
    <UFormField label="Url">
      <UInput :model-value="url" @update:model-value="handleUpdateData({ ...data, props: { ...data.props, url: $event as string } })" class="w-full" />
    </UFormField>
    <RadioGroupInput
      label="Width"
      :model-value="fullWidth ? 'FULL_WIDTH' : 'AUTO'"
      :items="[{ label: 'Full', value: 'FULL_WIDTH' }, { label: 'Auto', value: 'AUTO' }]"
      @update:model-value="handleUpdateData({ ...data, props: { ...data.props, fullWidth: $event === 'FULL_WIDTH' } })"
    />
    <RadioGroupInput
      label="Size"
      :model-value="size"
      :items="[{ label: 'Xs', value: 'x-small' }, { label: 'Sm', value: 'small' }, { label: 'Md', value: 'medium' }, { label: 'Lg', value: 'large' }]"
      @update:model-value="handleUpdateData({ ...data, props: { ...data.props, size: $event } })"
    />
    <RadioGroupInput
      label="Style"
      :model-value="buttonStyle"
      :items="[{ label: 'Rectangle', value: 'rectangle' }, { label: 'Rounded', value: 'rounded' }, { label: 'Pill', value: 'pill' }]"
      @update:model-value="handleUpdateData({ ...data, props: { ...data.props, buttonStyle: $event } })"
    />
    <ColorInput
      label="Text color"
      :default-value="buttonTextColor"
      @change="handleUpdateData({ ...data, props: { ...data.props, buttonTextColor: $event } })"
    />
    <ColorInput
      label="Button color"
      :default-value="buttonBackgroundColor"
      @change="handleUpdateData({ ...data, props: { ...data.props, buttonBackgroundColor: $event } })"
    />
    <MultiStylePropertyPanel
      :names="['backgroundColor', 'fontFamily', 'fontSize', 'fontWeight', 'textAlign', 'padding']"
      :model-value="data.style"
      @update:model-value="handleUpdateData({ ...data, style: $event })"
    />
  </BaseSidebarPanel>
</template>

<script setup lang="ts">
import BaseSidebarPanel from './helpers/BaseSidebarPanel.vue';
import MultiStylePropertyPanel from './helpers/style-inputs/MultiStylePropertyPanel.vue';
import ColorInput from './helpers/inputs/ColorInput/ColorInput.vue';
import RadioGroupInput from './helpers/inputs/RadioGroupInput.vue';
import type { ButtonProps } from '@infocare/email-block-button';
import { ButtonPropsSchema, ButtonPropsDefaults } from '@infocare/email-block-button';
import { computed, ref } from 'vue';

type ButtonSidebarPanelProps = {
  data: ButtonProps;
}

const props = defineProps<ButtonSidebarPanelProps>()

const emit = defineEmits<{
  (e: 'update:data', args: ButtonProps): void
}>()

/** Refs */

const errors = ref<Zod.ZodError | null>(null)

/** Computed */

const text = computed(() => props.data.props?.text ?? ButtonPropsDefaults.text)
const url = computed(() => props.data.props?.url ?? ButtonPropsDefaults.url)
const fullWidth = computed(() => props.data.props?.fullWidth ?? ButtonPropsDefaults.fullWidth)
const size = computed(() => props.data.props?.size ?? ButtonPropsDefaults.size)
const buttonStyle = computed(() => props.data.props?.buttonStyle ?? ButtonPropsDefaults.buttonStyle)
const buttonTextColor = computed(() => props.data.props?.buttonTextColor ?? ButtonPropsDefaults.buttonTextColor)
const buttonBackgroundColor = computed(() => props.data.props?.buttonBackgroundColor ?? ButtonPropsDefaults.buttonBackgroundColor)

/** Functions */

function handleUpdateData(data: ButtonProps) {
  const res = ButtonPropsSchema.safeParse(data);

  if (res.success) {
    emit('update:data', res.data);
    errors.value = null;
  } else {
    errors.value = res.error;
  }
}
</script>
