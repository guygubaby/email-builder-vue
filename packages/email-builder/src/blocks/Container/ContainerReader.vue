<template>
  <BaseContainer :style="style">
    <ReaderBlock v-for="childId in childrenIds" :key="childId" :id="childId" :document="document" />
  </BaseContainer>
</template>

<script setup lang="ts">
import BaseContainer from '@infocare/email-block-container';
import ReaderBlock from '../../Reader/ReaderBlock.vue';
import { ContainerProps } from './ContainerPropsSchema';
import { computed } from 'vue';

const props = defineProps<ContainerProps>()

const childrenIds = computed(() => props.props?.childrenIds ?? [])
</script>
