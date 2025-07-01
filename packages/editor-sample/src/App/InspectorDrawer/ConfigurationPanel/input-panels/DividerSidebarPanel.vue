<template>
  <BaseSidebarPanel title="Divider block">
    <ColorInput
      label="Color"
      :default-value="lineColor"
      @change="handleUpdateData({ ...data, props: { ...data.props, lineColor: $event } })"
    />
    <SliderInput
      label="Height"
      icon-label="material-symbols:height"
      units="px"
      :step="1"
      :min="1"
      :max="24"
      :default-value="lineHeight"
      @change="handleUpdateData({ ...data, props: { ...data.props, lineHeight: $event } })"
    />
    <MultiStylePropertyPanel
      :names="['backgroundColor', 'padding']"
      :model-value="data.style"
      @update:model-value="handleUpdateData({ ...data, style: $event })"
    />
  </BaseSidebarPanel>
</template>

<script setup lang="ts">
import type { DividerProps } from '@infocare/email-block-divider';
import { DividerPropsDefaults, DividerPropsSchema  } from '@infocare/email-block-divider';
import ColorInput from './helpers/inputs/ColorInput/ColorInput.vue';
import SliderInput from './helpers/inputs/SliderInput.vue';
import BaseSidebarPanel from './helpers/BaseSidebarPanel.vue';
import MultiStylePropertyPanel from './helpers/style-inputs/MultiStylePropertyPanel.vue';
import { computed, ref } from 'vue';

type DividerSidebarPanelProps = {
  data: DividerProps
}

const props = defineProps<DividerSidebarPanelProps>()

const emit = defineEmits<{
  (e: 'update:data', args: DividerProps): void
}>()

/** Refs */

const errors = ref<Zod.ZodError | null>(null)

/** Computed */

const lineColor = computed(() => props.data.props?.lineColor ?? DividerPropsDefaults.lineColor)
const lineHeight = computed(() => props.data.props?.lineHeight ?? DividerPropsDefaults.lineHeight)

/** Functions */

function handleUpdateData(data: unknown) {
  const res = DividerPropsSchema.safeParse(data);

  if (res.success) {
    emit('update:data', res.data);
    errors.value = null;
  } else {
    errors.value = res.error;
  }
}
</script>
