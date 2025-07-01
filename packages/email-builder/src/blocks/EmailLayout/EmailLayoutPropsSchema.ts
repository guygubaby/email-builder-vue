import { COLOR_SCHEMA, FONT_FAMILY_NAMES, FONT_FAMILY_SCHEMA } from '@infocare/email-core';
import { z } from 'zod';

export const EmailLayoutPropsSchema = z.object({
  backdropColor: COLOR_SCHEMA,
  borderColor: COLOR_SCHEMA,
  borderRadius: z.number().optional().nullable(),
  canvasColor: COLOR_SCHEMA,
  textColor: COLOR_SCHEMA,
  fontFamily: FONT_FAMILY_SCHEMA,
  childrenIds: z.array(z.string()).optional().nullable(),
});

// export type EmailLayoutProps = z.infer<typeof EmailLayoutPropsSchema>;
export type EmailLayoutProps = {
// FIXME: type
  document: Record<string, any>; // required to render the ContainerColumn's children
  backdropColor?: string | null;
  borderColor?: string | null;
  borderRadius?: number | null;
  canvasColor?: string | null;
  textColor?: string | null;
  fontFamily?: typeof FONT_FAMILY_NAMES[number] | null;
  childrenIds?: string[] | null;
};
