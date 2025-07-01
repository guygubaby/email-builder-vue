<template>
  <UFormField :label="label">
    <USelect
      :model-value="value"
      :items="options"
      class="w-full"
      @update:model-value="handleChange($event as string)"
    />
  </UFormField>
</template>

<script setup lang="ts">
import type { SelectItem } from '@nuxt/ui';
import { FONT_FAMILIES } from '@infocare/email-core';
import { ref } from 'vue';

const props = defineProps<{
  label: string;
  defaultValue: string | null;
}>()

const emit = defineEmits<{
  (e: 'change', args: string): void
}>()

const value = ref(props.defaultValue ?? 'inherit')

const options = FONT_FAMILIES.map<Extract<SelectItem, object>>((f) => ({
  label: f.label,
  value: f.key,
})).concat({
  label: 'Match email settings',
  value: 'inherit',
})

/** Functions */

function handleChange(newValue: string) {
  value.value = newValue;
  emit('change', newValue);
}
</script>
