import { z } from 'zod';

import { ColumnsContainerPropsSchema as BaseColumnsContainerPropsSchema } from '@infocare/email-block-columns-container';
import type { ColumnsContainerProps as BaseColumnsContainerProps } from '@infocare/email-block-columns-container';

const BasePropsShape = BaseColumnsContainerPropsSchema.shape.props.unwrap().unwrap().shape;

export const ColumnsContainerPropsSchema = z.object({
  style: BaseColumnsContainerPropsSchema.shape.style,
  props: z
    .object({
      ...BasePropsShape,
      columns: z.tuple([
        z.object({ childrenIds: z.array(z.string()) }),
        z.object({ childrenIds: z.array(z.string()) }),
        z.object({ childrenIds: z.array(z.string()) }),
      ]),
    })
    .optional()
    .nullable(),
});

// export type ColumnsContainerProps = z.infer<typeof ColumnsContainerPropsSchema>;
export type ColumnsContainerProps = Omit<BaseColumnsContainerProps, 'props'> & {
  // FIXME: type
  document: Record<string, any>; // needed to render the children
  props?: BaseColumnsContainerProps['props'] & {
    columns: [
      { childrenIds: string[] },
      { childrenIds: string[] },
      { childrenIds: string[] },
    ];
  } | null;
};
