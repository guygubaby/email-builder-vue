<template>
  <div :style="wStyle">
    <table
      align="center"
      width="100%"
      cellPadding="0"
      border="0"
      :style="{ tableLayout: 'fixed', borderCollapse: 'collapse' }"
    >
      <tbody :style="{ width: '100%' }">
        <tr :style="{ width: '100%' }">
          <TableCell :index="0" :props="blockProps">
            <slot name="column-0" />
          </TableCell>
          <TableCell :index="1" :props="blockProps">
            <slot name="column-1" />
          </TableCell>
          <TableCell :index="2" :props="blockProps">
            <slot name="column-2" />
          </TableCell>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import TableCell from './TableCell.vue';
import { COLOR_SCHEMA, PADDING_SCHEMA, getPadding } from '@infocare/email-core';
import { z } from 'zod';
import { computed } from 'vue';

export const FIXED_WIDTHS_SCHEMA = z
  .tuple([z.union([z.number(), z.string()]).nullish(), z.union([z.number(), z.string()]).nullish(), z.union([z.number(), z.string()]).nullish()])
  .optional()
  .nullable();

export const ColumnsContainerPropsSchema = z.object({
  style: z
  .object({
    backgroundColor: COLOR_SCHEMA,
    padding: PADDING_SCHEMA,
  })
  .optional()
  .nullable(),
  props: z
  .object({
    fixedWidths: FIXED_WIDTHS_SCHEMA,
    columnsCount: z
    .union([z.literal(2), z.literal(3)])
    .optional()
    .nullable(),
    columnsGap: z.number().optional().nullable(),
    contentAlignment: z.enum(['top', 'middle', 'bottom']).optional().nullable(),
  })
  .optional()
  .nullable(),
});

export type ColumnsContainerProps = {
  style?: {
    backgroundColor?: string | null,
    padding?: {
      left: number,
      right: number,
      top: number,
      bottom: number,
    } | null,
  } | null,
  props?: {
    fixedWidths?: [number | string | null | undefined, number | string | null | undefined, number | string | null | undefined] | null,
    columnsCount?: 2 | 3 | null,
    columnsGap?: number | null,
    contentAlignment?: 'top' | 'middle' | 'bottom' | null,
  } | null,
}

export const ColumnsContainerPropsDefaults = {
  columnsCount: 2,
  columnsGap: 0,
  contentAlignment: 'middle',
} as const;
</script>

<script setup lang="ts">
const props = defineProps<ColumnsContainerProps>()

const wStyle = computed(() => ({
  backgroundColor: props.style?.backgroundColor ?? undefined,
  padding: getPadding(props.style?.padding),
}))

const blockProps = computed(() => ({
  columnsCount: props.props?.columnsCount ?? ColumnsContainerPropsDefaults.columnsCount,
  columnsGap: props.props?.columnsGap ?? ColumnsContainerPropsDefaults.columnsGap,
  contentAlignment: props.props?.contentAlignment ?? ColumnsContainerPropsDefaults.contentAlignment,
  fixedWidths: props.props?.fixedWidths,
}))

</script>
