<template>
  <!-- FIXME: check all types -->
  <BuildBlockComponent :blocks="READER_DICTIONARY" v-bind="{ ...document[rootBlockId], document }" />
</template>

<script setup lang="ts">
import Avatar, { AvatarPropsSchema } from '@infocare/email-block-avatar';
import Button, { ButtonPropsSchema } from '@infocare/email-block-button';
import Divider, { DividerPropsSchema } from '@infocare/email-block-divider';
import Heading, { HeadingPropsSchema } from '@infocare/email-block-heading';
import Html, { HtmlPropsSchema } from '@infocare/email-block-html';
import Image, { ImagePropsSchema } from '@infocare/email-block-image';
import Spacer, { SpacerPropsSchema } from '@infocare/email-block-spacer';
import Text, { TextPropsSchema } from '@infocare/email-block-text';

import EmailLayoutReader, { EmailLayoutPropsSchema } from '../blocks/EmailLayout';
import ColumnsContainerReader, { ColumnsContainerPropsSchema } from '../blocks/ColumnsContainer';
import ContainerReader, { ContainerPropsSchema } from '../blocks/Container';

import { BuildBlockComponent } from '@infocare/email-document-core';
import type { TReaderProps } from '..';

defineProps<TReaderProps>()

// FIXME: use function buildblockconfigdictionary
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
