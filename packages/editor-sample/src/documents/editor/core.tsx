import { z } from 'zod';

import Heading, { HeadingPropsSchema } from '@infocare/email-block-heading';
import Text, { TextPropsSchema } from '@infocare/email-block-text';
import Button, { ButtonPropsSchema } from '@infocare/email-block-button';
import Image, { ImagePropsSchema } from '@infocare/email-block-image';
import Avatar, { AvatarPropsSchema } from '@infocare/email-block-avatar';
import Divider, { DividerPropsSchema } from '@infocare/email-block-divider';
import Spacer, { SpacerPropsSchema } from '@infocare/email-block-spacer';
import Html, { HtmlPropsSchema } from '@infocare/email-block-html';

import { buildBlockConfigurationDictionary, buildBlockConfigurationSchema } from '@infocare/email-document-core/builders';

import ColumnsContainerEditor from '../blocks/ColumnsContainer/ColumnsContainerEditor.vue'
import ColumnsContainerPropsSchema from '../blocks/ColumnsContainer/ColumnsContainerPropsSchema'
import ContainerEditor from '../blocks/Container/ContainerEditor.vue'
import ContainerPropsSchema from '../blocks/Container/ContainerPropsSchema'
import EmailLayoutEditor from '../blocks/EmailLayout/EmailLayoutEditor.vue';
import EmailLayoutPropsSchema from '../blocks/EmailLayout/EmailLayoutPropsSchema';
import EditorBlockWrapper from '../blocks/helpers/block-wrappers/EditorBlockWrapper.vue';

export const EDITOR_DICTIONARY = buildBlockConfigurationDictionary({
  Avatar: {
    schema: AvatarPropsSchema,
    Component: (props) => (
      <EditorBlockWrapper>
        <Avatar {...props} />
      </EditorBlockWrapper>
    ),
  },
  Button: {
    schema: ButtonPropsSchema,
    Component: (props) => (
      <EditorBlockWrapper>
        <Button {...props} />
      </EditorBlockWrapper>
    ),
  },
  Container: {
    schema: ContainerPropsSchema,
    Component: (props) => (
      <EditorBlockWrapper>
        <ContainerEditor {...props} />
      </EditorBlockWrapper>
    ),
  },
  ColumnsContainer: {
    schema: ColumnsContainerPropsSchema,
    Component: (props) => (
      <EditorBlockWrapper>
        <ColumnsContainerEditor {...props} />
      </EditorBlockWrapper>
    ),
  },
  Heading: {
    schema: HeadingPropsSchema,
    Component: (props) => (
      <EditorBlockWrapper>
        <Heading {...props} />
      </EditorBlockWrapper>
    ),
  },
  Html: {
    schema: HtmlPropsSchema,
    Component: (props) => (
      <EditorBlockWrapper>
        <Html {...props} />
      </EditorBlockWrapper>
    ),
  },
  Image: {
    schema: ImagePropsSchema,
    Component: (data) => {
      const props = {
        ...data,
        props: {
          ...data.props,
          url: data.props?.url ?? 'https://placehold.co/600x400@2x/F8F8F8/CCC?text=Your%20image',
        },
      };
      return (
        <EditorBlockWrapper>
          <Image {...props} />
        </EditorBlockWrapper>
      );
    },
  },
  Text: {
    schema: TextPropsSchema,
    Component: (props) => (
      <EditorBlockWrapper>
        <Text {...props} />
      </EditorBlockWrapper>
    ),
  },
  EmailLayout: {
    schema: EmailLayoutPropsSchema,
    Component: (p) => <EmailLayoutEditor {...p} />,
  },
  Spacer: {
    schema: SpacerPropsSchema,
    Component: (props) => (
      <EditorBlockWrapper>
        <Spacer {...props} />
      </EditorBlockWrapper>
    ),
  },
  Divider: {
    schema: DividerPropsSchema,
    Component: (props) => (
      <EditorBlockWrapper>
        <Divider {...props} />
      </EditorBlockWrapper>
    ),
  },
});

export const EditorBlockSchema = buildBlockConfigurationSchema(EDITOR_DICTIONARY)
export const EditorConfigurationSchema = z.record(EditorBlockSchema)

export type TEditorBlock = z.infer<typeof EditorBlockSchema>
export type TEditorConfiguration = Record<string, TEditorBlock>
