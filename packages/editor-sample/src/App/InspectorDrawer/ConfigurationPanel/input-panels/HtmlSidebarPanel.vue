<template>
  <BaseSidebarPanel title="Html block">
    <UFormField label="Content">
      <UTextarea
        :rows="5"
        :model-value="data.props?.contents ?? ''"
        @update:model-value="handleUpdateData({ ...data, props: { ...data.props, contents: $event as string } })"
        class="w-full"
      />
    </UFormField>
    <MultiStylePropertyPanel
      :names="['color', 'backgroundColor', 'fontFamily', 'fontSize', 'textAlign', 'padding']"
      :model-value="data.style"
      @update:model-value="handleUpdateData({ ...data, style: $event })"
    />
  </BaseSidebarPanel>
</template>

<script setup lang="ts">
import BaseSidebarPanel from './helpers/BaseSidebarPanel.vue';
import MultiStylePropertyPanel from './helpers/style-inputs/MultiStylePropertyPanel.vue';
import type { HtmlProps} from '@infocare/email-block-html';
import { HtmlPropsSchema } from '@infocare/email-block-html';
import { ref } from 'vue';

type HtmlSidebarPanelProps = {
  data: HtmlProps
}

defineProps<HtmlSidebarPanelProps>()

const emit = defineEmits<{
  (e: 'update:data', args: HtmlProps): void
}>()

/** Refs */

const errors = ref<Zod.ZodError | null>(null)

/** Functions */

function handleUpdateData(data: unknown) {
  const res = HtmlPropsSchema.safeParse(data);

  if (res.success) {
    emit('update:data', res.data);
    errors.value = null;
  } else {
    errors.value = res.error;
  }
}
</script>
