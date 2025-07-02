<template>
  <component :is="instance" v-if="instance" v-bind="{ ...data, document }" />
</template>

<script setup lang="ts">
import type { TReaderBlockProps } from '..';
import { computed } from 'vue';
import { readerDictionaryRef } from '.';

const props = defineProps<TReaderBlockProps>();

const instance = computed(() => {
  const block = props.document[props.id];

  if (!block) return undefined;

  // FIXME: create function which converts into key: value
  return readerDictionaryRef.value[block.type].Component;
})

const data = computed(() => {
  const block = props.document[props.id];

  if (!block) return undefined;

  return block.data;
});
</script>
