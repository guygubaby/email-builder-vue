import { z } from 'zod';

import { ColumnsContainerPropsSchema as BaseColumnsContainerPropsSchema } from '@infocare/email-block-columns-container';
import type { ColumnsContainerProps as BaseColumnsContainerProps } from '@infocare/email-block-columns-container';

const BasePropsShape = BaseColumnsContainerPropsSchema.shape.props.unwrap().unwrap().shape;

const ColumnsContainerPropsSchema = z.object({
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

export type ColumnsContainerProps = Omit<BaseColumnsContainerProps, 'props'> & {
  props?: Extract<BaseColumnsContainerProps['props'], object> & {
    columns: [
      { childrenIds: string[] },
      { childrenIds: string[] },
      { childrenIds: string[] }
    ];
  }
  | null;
}

export default ColumnsContainerPropsSchema;
