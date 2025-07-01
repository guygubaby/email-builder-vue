<template>
  <component :is="instance" v-if="instance" v-bind="{ ...data, document }" />
</template>

<script setup lang="ts">
import type { TReaderBlockProps } from '..';
import { computed } from 'vue';

import Avatar, { AvatarPropsSchema } from '@infocare/email-block-avatar';
import Button, { ButtonPropsSchema } from '@infocare/email-block-button';
import Divider, { DividerPropsSchema } from '@infocare/email-block-divider';
import Heading, { HeadingPropsSchema } from '@infocare/email-block-heading';
import Html, { HtmlPropsSchema } from '@infocare/email-block-html';
import Image, { ImagePropsSchema } from '@infocare/email-block-image';
import Spacer, { SpacerPropsSchema } from '@infocare/email-block-spacer';
import Text, { TextPropsSchema } from '@infocare/email-block-text';

import EmailLayoutReader, { EmailLayoutPropsSchema } from '../blocks/EmailLayout';
import ColumnsContainerReader , { ColumnsContainerPropsSchema } from '../blocks/ColumnsContainer';
import ContainerReader, { ContainerPropsSchema } from '../blocks/Container';

const props = defineProps<TReaderBlockProps>();

const instance = computed(() => {
  const block = props.document[props.id];

  if (!block) return undefined;

  // @ts-expect-error Element implicitly has an 'any'
  // FIXME: create function which converts into key: value
  return READER_DICTIONARY[block.type].Component;
})

const data = computed(() => {
  const block = props.document[props.id];

  if (!block) return undefined;

  return block.data;
});

const READER_DICTIONARY = {
  ColumnsContainer: {
    schema: ColumnsContainerPropsSchema,
    Component: ColumnsContainerReader,
  },
  Container: {
    schema: ContainerPropsSchema,
    Component: ContainerReader,
  },
  EmailLayout: {
    schema: EmailLayoutPropsSchema,
    Component: EmailLayoutReader,
  },
  Avatar: {
    schema: AvatarPropsSchema,
    Component: Avatar,
  },
  Button: {
    schema: ButtonPropsSchema,
    Component: Button,
  },
  Divider: {
    schema: DividerPropsSchema,
    Component: Divider,
  },
  Heading: {
    schema: HeadingPropsSchema,
    Component: Heading,
  },
  Html: {
    schema: HtmlPropsSchema,
    Component: Html,
  },
  Image: {
    schema: ImagePropsSchema,
    Component: Image,
  },
  Spacer: {
    schema: SpacerPropsSchema,
    Component: Spacer,
  },
  Text: {
    schema: TextPropsSchema,
    Component: Text,
  },
};
</script>
