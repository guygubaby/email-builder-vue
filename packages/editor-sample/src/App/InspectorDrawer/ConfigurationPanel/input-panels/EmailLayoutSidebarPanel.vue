<template>
  <BaseSidebarPanel title="Global">
    <ColorInput
      label="Backdrop color"
      :default-value="props.data.backdropColor ?? '#F5F5F5'"
      @change="handleUpdateData({ ...props.data, backdropColor: $event })"
      />
    <ColorInput
      label="Canvas color"
      :default-value="props.data.canvasColor ?? '#FFFFFF'"
      @change="handleUpdateData({ ...props.data, canvasColor: $event })"
      />
    <NullableColorInput
      label="Canvas border color"
      :default-value="props.data.borderColor ?? null"
      @change="handleUpdateData({ ...props.data, borderColor: $event })"
      />
    <UFormField>
      <SliderInput
        label="Canvas border radius"
        icon-label="material-symbols:rounded-corner"
        units="px"
        :default-value="props.data.borderRadius ?? 0"
        :min="0"
        :max="48"
        :step="4"
        @change="handleUpdateData({ ...props.data, borderRadius: $event })"
      />
    </UFormField>
    <NullableFontFamily
      label="Font family"
      default-value="MODERN_SANS"
      @change="handleUpdateData({ ...props.data, fontFamily: $event })"
    />
    <ColorInput
      label="Text color"
      :default-value="props.data.textColor ?? '#262626'"
      @change="handleUpdateData({ ...props.data, textColor: $event })"
    />
  </BaseSidebarPanel>
</template>

<script setup lang="ts">
import type { EmailLayoutProps } from '@infocare/email-builder/blocks/EmailLayout';
import { EmailLayoutPropsSchema } from '@infocare/email-builder/blocks/EmailLayout';
import BaseSidebarPanel from './helpers/BaseSidebarPanel.vue';
import NullableFontFamily from './helpers/inputs/NullableFontFamily.vue';
import ColorInput from './helpers/inputs/ColorInput/ColorInput.vue';
import NullableColorInput from './helpers/inputs/ColorInput/NullableColorInput.vue';
import SliderInput from './helpers/inputs/SliderInput.vue';
import { ref } from 'vue';

type EmailLayoutSidebarFieldsProps = {
  data: Omit<EmailLayoutProps, 'document'>;
}

const props = defineProps<EmailLayoutSidebarFieldsProps>()
const emit = defineEmits<{
  (e: 'update:data', args: EmailLayoutSidebarFieldsProps['data']): void
}>()

/** Refs */

const errors = ref<Zod.ZodError | null>(null)

/** Functions */

function handleUpdateData(data: unknown) {
  const res = EmailLayoutPropsSchema.safeParse(data);

  if (res.success) {
    emit('update:data', res.data);
    errors.value = null;
  } else {
    errors.value = res.error;
  }
}


</script>
