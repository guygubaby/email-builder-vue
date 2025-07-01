<template>
  <BaseSidebarPanel title="Heading block">
    <UFormField label="Content">
      <UTextarea
        :rows="3"
        :model-value="data.props?.text ?? HeadingPropsDefaults.text"
        @update:model-value="handleUpdateData({ ...data, props: { ...data.props, text: $event as string } })"
        class="w-full"
      />
    </UFormField>
    <RadioGroupInput
      label="Level"
      :model-value="data.props?.level ?? HeadingPropsDefaults.level"
      :items="[{ label: 'H1', value: 'h1' }, { label: 'H2', value: 'h2' }, { label: 'H3', value: 'h3' }]"
      @update:model-value="handleUpdateData({ ...data, props: { ...data.props, level: $event } })"
    />
    <MultiStylePropertyPanel
      :names="['color', 'backgroundColor', 'fontFamily', 'fontWeight', 'textAlign', 'padding']"
      :model-value="data.style"
      @update:model-value="handleUpdateData({ ...data, style: $event })"
    />
  </BaseSidebarPanel>
</template>

<script setup lang="ts">
import BaseSidebarPanel from './helpers/BaseSidebarPanel.vue';
import MultiStylePropertyPanel from './helpers/style-inputs/MultiStylePropertyPanel.vue';
import RadioGroupInput from './helpers/inputs/RadioGroupInput.vue';
import type { HeadingProps} from '@infocare/email-block-heading';
import { HeadingPropsSchema, HeadingPropsDefaults } from '@infocare/email-block-heading';
import { ref } from 'vue';

type HeadingSidebarPanelProps = {
  data: HeadingProps
}

defineProps<HeadingSidebarPanelProps>()

const emit = defineEmits<{
  (e: 'update:data', args: HeadingProps): void
}>()

/** Refs */

const errors = ref<Zod.ZodError | null>(null)

/** Functions */

function handleUpdateData(data: unknown) {
  const res = HeadingPropsSchema.safeParse(data);

  if (res.success) {
    emit('update:data', res.data);
    errors.value = null;
  } else {
    errors.value = res.error;
  }
}
</script>
