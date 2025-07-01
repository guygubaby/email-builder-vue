import { z } from 'zod';

export const FONT_FAMILIES = [
  {
    key: 'NOTO_SANS',
    label: 'Noto sans',
    value: 'Noto Sans, sans-serif',
  },
  {
    key: 'MODERN_SANS',
    label: 'Modern sans',
    value: '"Helvetica Neue", "Arial Nova", "Nimbus Sans", Arial, sans-serif',
  },
  {
    key: 'BOOK_SANS',
    label: 'Book sans',
    value: 'Optima, Candara, "Noto Sans", source-sans-pro, sans-serif',
  },
  {
    key: 'ORGANIC_SANS',
    label: 'Organic sans',
    value: 'Seravek, "Gill Sans Nova", Ubuntu, Calibri, "DejaVu Sans", source-sans-pro, sans-serif',
  },
  {
    key: 'GEOMETRIC_SANS',
    label: 'Geometric sans',
    value: 'Avenir, "Avenir Next LT Pro", Montserrat, Corbel, "URW Gothic", source-sans-pro, sans-serif',
  },
  {
    key: 'HEAVY_SANS',
    label: 'Heavy sans',
    value:
      'Bahnschrift, "DIN Alternate", "Franklin Gothic Medium", "Nimbus Sans Narrow", sans-serif-condensed, sans-serif',
  },
  {
    key: 'ROUNDED_SANS',
    label: 'Rounded sans',
    value:
      'ui-rounded, "Hiragino Maru Gothic ProN", Quicksand, Comfortaa, Manjari, "Arial Rounded MT Bold", Calibri, source-sans-pro, sans-serif',
  },
  {
    key: 'MODERN_SERIF',
    label: 'Modern serif',
    value: 'Charter, "Bitstream Charter", "Sitka Text", Cambria, serif',
  },
  {
    key: 'BOOK_SERIF',
    label: 'Book serif',
    value: '"Iowan Old Style", "Palatino Linotype", "URW Palladio L", P052, serif',
  },
  {
    key: 'MONOSPACE',
    label: 'Monospace',
    value: '"Nimbus Mono PS", "Courier New", "Cutive Mono", monospace',
  },
] as const;

export const FONT_FAMILY_NAMES = [
  'NOTO_SANS',
  'MODERN_SANS',
  'BOOK_SANS',
  'ORGANIC_SANS',
  'GEOMETRIC_SANS',
  'HEAVY_SANS',
  'ROUNDED_SANS',
  'MODERN_SERIF',
  'BOOK_SERIF',
  'MONOSPACE',
] as const

export const PADDING_SCHEMA = z
  .object({
    top: z.number(),
    bottom: z.number(),
    right: z.number(),
    left: z.number(),
  })
  .optional()
  .nullable();

export const COLOR_SCHEMA = z
  .string()
  .regex(/^#[0-9a-fA-F]{6}$/)
  .nullable()
  .optional();

export const FONT_FAMILY_SCHEMA = z
  .enum(FONT_FAMILY_NAMES)
  .nullable()
  .optional();

export function getFontFamily(fontFamily: z.infer<typeof FONT_FAMILY_SCHEMA>) {
  return FONT_FAMILIES.find((f) => f.key === fontFamily)?.value;
}

export const getPadding = (padding: z.infer<typeof PADDING_SCHEMA>) =>
  padding ? `${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px` : undefined;

export function getFontSize(level: 'h1' | 'h2' | 'h3') {
  switch (level) {
    case 'h1':
      return 32 + 'px';
    case 'h2':
      return 24 + 'px';
    case 'h3':
      return 20 + 'px';
  }
}
