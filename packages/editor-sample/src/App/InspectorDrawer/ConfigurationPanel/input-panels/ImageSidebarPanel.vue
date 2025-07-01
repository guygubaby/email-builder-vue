<template>
  <BaseSidebarPanel title="Image block">
    <UFormField label="Source URL">
      <UInput
        :model-value="data.props?.url ?? ''"
        @update:model-value="(e) => {
          const event = (e as string).trim();
          const url = event.length === 0 ? null : event;
          handleUpdateData({ ...data, props: { ...data.props, url } })
        }"
        class="w-full"
      />
    </UFormField>

    <UFormField label="Alt text">
      <UInput
        :model-value="data.props?.alt ?? ''"
        @update:model-value="handleUpdateData({ ...data, props: { ...data.props, alt: $event as string } })"
        class="w-full"
      />
    </UFormField>

    <UFormField label="Click through URL">
      <UInput
        :model-value="data.props?.linkHref ?? ''"
        @update:model-value="(e) => {
          const event = (e as string).trim();
          const linkHref = event.length === 0 ? null : event;
          handleUpdateData({ ...data, props: { ...data.props, linkHref } })
        }"
        class="w-full"
      />
    </UFormField>

    <div class="flex gap-2">
      <TextDimensionInput
        label="Width"
        :model-value="data.props?.width"
        @change="handleUpdateData({ ...data, props: { ...data.props, width: $event } })"
      />
      <TextDimensionInput
        label="Height"
        :model-value="data.props?.height"
        @change="handleUpdateData({ ...data, props: { ...data.props, height: $event } })"
      />
    </div>

    <RadioGroupInput
      label="Alignment"
      :model-value="data.props?.contentAlignment ?? 'middle'"
      :items="[
        { icon: 'material-symbols:vertical-align-top', value: 'top' },
        { icon: 'material-symbols:vertical-align-center', value: 'center' },
        { icon: 'material-symbols:vertical-align-bottom', value: 'bottom' }
      ]"
      @update:model-value="handleUpdateData({ ...data, props: { ...data.props, contentAlignment: $event } })"
    />

    <MultiStylePropertyPanel
      :names="['backgroundColor', 'textAlign', 'padding']"
      :model-value="data.style"
      @update:model-value="handleUpdateData({ ...data, style: $event })"
    />
  </BaseSidebarPanel>
</template>

<script setup lang="ts">
import BaseSidebarPanel from './helpers/BaseSidebarPanel.vue';
import MultiStylePropertyPanel from './helpers/style-inputs/MultiStylePropertyPanel.vue';
import RadioGroupInput from './helpers/inputs/RadioGroupInput.vue';
import TextDimensionInput from './helpers/inputs/TextDimensionInput.vue';
import type { ImageProps } from '@infocare/email-block-image';
import { ImagePropsSchema } from '@infocare/email-block-image';
import { ref } from 'vue';

type ImageSidebarPanelProps = {
  data: ImageProps
}

defineProps<ImageSidebarPanelProps>()

const emit = defineEmits<{
  (e: 'update:data', args: ImageProps): void
}>()

/** Refs */

const errors = ref<Zod.ZodError | null>(null)

/** Functions */

function handleUpdateData(data: unknown) {
  const res = ImagePropsSchema.safeParse(data);

  if (res.success) {
    emit('update:data', res.data);
    errors.value = null;
  } else {
    errors.value = res.error;
  }
}
</script>
