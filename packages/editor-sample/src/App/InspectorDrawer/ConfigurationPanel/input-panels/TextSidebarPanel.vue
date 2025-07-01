<template>
  <BaseSidebarPanel title="Text block">
    <UFormField label="Text">
      <UTextarea
        :rows="5"
        :model-value="data.props?.text ?? ''"
        @update:model-value="handleUpdateData({ ...data, props: { ...data.props, text: $event as string } })"
        class="w-full"
      />
    </UFormField>

    <BooleanInput
      label="Markdown"
      :model-value="data.props?.markdown ?? false"
      @update:model-value="handleUpdateData({ ...data, props: { ...data.props, markdown: $event } })"
    />

    <MultiStylePropertyPanel
      :names="['color', 'backgroundColor', 'fontFamily', 'fontSize', 'fontWeight', 'textAlign', 'padding']"
      :model-value="data.style"
      @update:model-value="handleUpdateData({ ...data, style: $event })"
    />
  </BaseSidebarPanel>
</template>

<script setup lang="ts">
import BaseSidebarPanel from './helpers/BaseSidebarPanel.vue';
import MultiStylePropertyPanel from './helpers/style-inputs/MultiStylePropertyPanel.vue';
import BooleanInput from './helpers/inputs/BooleanInput.vue';
import type { TextProps } from '@infocare/email-block-text';
import { TextPropsSchema } from '@infocare/email-block-text';
import { ref } from 'vue';

type TextSidebarPanelProps = {
  data: TextProps
}

defineProps<TextSidebarPanelProps>()

const emit = defineEmits<{
  (e: 'update:data', args: TextProps): void
}>()

/** Refs */

const errors = ref<Zod.ZodError | null>(null)

/** Functions */

function handleUpdateData(data: unknown) {
  const res = TextPropsSchema.safeParse(data);

  if (res.success) {
    emit('update:data', res.data);
    errors.value = null;
  } else {
    errors.value = res.error;
  }
}
</script>
