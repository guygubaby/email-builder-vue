<template>
  <BaseSidebarPanel title="Avatar block">
    <SliderInput
      label="Size"
      icon-label="material-symbols:aspect-ratio"
      units="px"
      :step="3"
      :min="32"
      :max="256"
      :default-value="size"
      @change="handleUpdateData({ ...data, props: { ...data.props, size: $event } })"
    />
    <RadioGroupInput
      label="Shape"
      :model-value="shape"
      :items="[{ label: 'Circle', value: 'circle' }, { label: 'Square', value: 'square' }, { label: 'Rounded', value: 'rounded' }]"
      @update:model-value="handleUpdateData({ ...data, props: { ...data.props, shape: $event } })"
    />
    <UFormField label="Image URL">
      <UInput
        :model-value="imageUrl"
        @update:model-value="handleUpdateData({ ...data, props: { ...data.props, imageUrl: $event as string } })"
        class="w-full"
      />
    </UFormField>
    <UFormField label="Alt text">
      <UInput
        :model-value="alt"
        @update:model-value="handleUpdateData({ ...data, props: { ...data.props, alt: $event as string } })"
        class="w-full"
      />
    </UFormField>
    <MultiStylePropertyPanel
      :names="['textAlign', 'padding']"
      :model-value="data.style"
      @update:model-value="handleUpdateData({ ...data, style: $event })"
    />
  </BaseSidebarPanel>
</template>

<script setup lang="ts">
import SliderInput from './helpers/inputs/SliderInput.vue';
import BaseSidebarPanel from './helpers/BaseSidebarPanel.vue';
import MultiStylePropertyPanel from './helpers/style-inputs/MultiStylePropertyPanel.vue';
import RadioGroupInput from './helpers/inputs/RadioGroupInput.vue';
import type { AvatarProps } from '@infocare/email-block-avatar';
import { AvatarPropsDefaults, AvatarPropsSchema } from '@infocare/email-block-avatar';
import { ref, computed } from 'vue';

type AvatarSidebarPanelProps = {
  data: AvatarProps;
}

const props = defineProps<AvatarSidebarPanelProps>()
const emit = defineEmits<{
  (e: 'update:data', args: AvatarProps): void
}>()

/** Refs */

const errors = ref<Zod.ZodError | null>(null)

/** Computed */

const size = computed(() => props.data.props?.size ?? AvatarPropsDefaults.size)
const imageUrl = computed(() => props.data.props?.imageUrl ?? AvatarPropsDefaults.imageUrl)
const alt = computed(() => props.data.props?.alt ?? AvatarPropsDefaults.alt)
const shape = computed(() => props.data.props?.shape ?? AvatarPropsDefaults.shape)

/** Functions */

function handleUpdateData(data: AvatarProps) {
  const res = AvatarPropsSchema.safeParse(data);

  if (res.success) {
    emit('update:data', res.data);
    errors.value = null;
  } else {
    errors.value = res.error;
  }
}
</script>
