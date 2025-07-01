import { z } from 'zod';

import { ContainerPropsSchema as BaseContainerPropsSchema } from '@infocare/email-block-container';
import type { ContainerProps as BaseContainerProps } from '@infocare/email-block-container';

export const ContainerPropsSchema = z.object({
  style: BaseContainerPropsSchema.shape.style,
  props: z
    .object({
      childrenIds: z.array(z.string()).optional().nullable(),
    })
    .optional()
    .nullable(),
});

// export type ContainerProps = z.infer<typeof ContainerPropsSchema>;
export type ContainerProps = BaseContainerProps & {
  // FIXME: type
  document: Record<string, any>; // required to render the ContainerColumn's children
  props?: {
    childrenIds?: string[] | null;
  } | null;
}
