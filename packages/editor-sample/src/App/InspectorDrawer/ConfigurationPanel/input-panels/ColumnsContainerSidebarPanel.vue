<template>
  <BaseSidebarPanel title="Columns block">
    <RadioGroupInput
      label="Number of columns"
      :model-value="String(data.props?.columnsCount ?? 2)"
      :items="[{ label: '2', value: '2' }, { label: '3', value: '3' }, { label: '4', value: '4' }]"
      @update:model-value="handleColumnsCountChange($event)"
    />
    <ColumnWidthsInput
      :columns-count="data.props?.columnsCount ?? 2"
      :model-value="data.props?.fixedWidths"
      @update:model-value="handleUpdateData({ ...data, props: { ...data.props, fixedWidths: $event } })"
    />
    <SliderInput
      label="Column gap"
      icon-label="material-symbols:space-bar"
      units="px"
      :step="4"
      :min="0"
      :max="80"
      :default-value="data.props?.columnsGap ?? 0"
      @change="handleUpdateData({ ...data, props: { ...data.props, columnsGap: $event } })"
    />
    <RadioGroupInput
      label="Alignment"
      :model-value="data.props?.contentAlignment ?? 'middle'"
      :items="[
        { icon: 'material-symbols:vertical-align-top', value: 'top' },
        { icon: 'material-symbols:vertical-align-center', value: 'middle' },
        { icon: 'material-symbols:vertical-align-bottom', value: 'bottom' }
      ]"
      @update:model-value="handleUpdateData({ ...data, props: { ...data.props, contentAlignment: $event } })"
    />

    <MultiStylePropertyPanel
      :names="['backgroundColor', 'padding']"
      :model-value="data.style"
      @update:model-value="handleUpdateData({ ...data, style: $event })"
    />
  </BaseSidebarPanel>
</template>

<script setup lang="ts">
import BaseSidebarPanel from './helpers/BaseSidebarPanel.vue';
import RadioGroupInput from './helpers/inputs/RadioGroupInput.vue';
import ColumnWidthsInput from './helpers/inputs/ColumnWidthsInput.vue';
import type { ColumnsContainerProps } from '../../../../documents/blocks/ColumnsContainer/ColumnsContainerPropsSchema'
import ColumnsContainerPropsSchema from '../../../../documents/blocks/ColumnsContainer/ColumnsContainerPropsSchema'
import SliderInput from './helpers/inputs/SliderInput.vue';
import MultiStylePropertyPanel from './helpers/style-inputs/MultiStylePropertyPanel.vue';
import { ref } from 'vue';

type ColumnsContainerSidebarPanelProps = {
  data: ColumnsContainerProps;
}

const { data } = defineProps<ColumnsContainerSidebarPanelProps>()

const emit = defineEmits<{
  (e: 'update:data', args: ColumnsContainerProps): void
}>()

/** Refs */

const errors = ref<Zod.ZodError | null>(null)

/** Functions */

const EMPTY_COLUMNS = [
  { childrenIds: [] as string[] },
  { childrenIds: [] as string[] },
  { childrenIds: [] as string[] },
  { childrenIds: [] as string[] },
];

function handleColumnsCountChange(val: string) {
  const count = val === '2' ? 2 : val === '3' ? 3 : 4;
  let columns = data.props?.columns ?? EMPTY_COLUMNS;
  let fixedWidths = data.props?.fixedWidths;
  if (count === 4) {
    if (columns.length < 4) {
      columns = [...columns, ...Array.from({ length: 4 - columns.length }, () => ({ childrenIds: [] as string[] }))];
    }
    if (fixedWidths && fixedWidths.length < 4) {
      fixedWidths = [...fixedWidths, ...Array(4 - fixedWidths.length).fill(null)] as typeof fixedWidths;
    }
  }
  handleUpdateData({ ...data, props: { ...data.props, columnsCount: count, columns, ...(fixedWidths && { fixedWidths }) } });
}

function handleUpdateData(payload: unknown) {
  const res = ColumnsContainerPropsSchema.safeParse(payload);

  if (res.success) {
    emit('update:data', res.data);
    errors.value = null;
  } else {
    errors.value = res.error;
  }
}
</script>
