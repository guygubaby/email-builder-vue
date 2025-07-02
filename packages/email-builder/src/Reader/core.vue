<template>
  <!-- FIXME: check all types -->
  <BuildBlockComponent :blocks="READER_DICTIONARY" v-bind="{ ...document[rootBlockId], document }" />
</template>

<script setup lang="ts">
import { BuildBlockComponent } from '@infocare/email-document-core';
import type { TReaderProps } from '..';
import { readerDictionaryRef } from '.';

defineProps<TReaderProps>()

// FIXME: use function buildblockconfigdictionary
const READER_DICTIONARY = readerDictionaryRef.value
</script>
