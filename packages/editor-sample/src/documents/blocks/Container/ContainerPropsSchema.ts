import { z } from 'zod';

import { ContainerPropsSchema as BaseContainerPropsSchema } from '@infocare/email-block-container';
import type { ContainerProps as BaseContainerProps } from '@infocare/email-block-container';

const ContainerPropsSchema = z.object({
  style: BaseContainerPropsSchema.shape.style,
  props: z
    .object({
      childrenIds: z.array(z.string()).optional().nullable(),
    })
    .optional()
    .nullable(),
});

export default ContainerPropsSchema;

export type ContainerProps = BaseContainerProps & {
  props?: {
    childrenIds?: string[] | null,
  } | null;
}
