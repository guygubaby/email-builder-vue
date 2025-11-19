export { default as renderToStaticMarkup } from './renderers/renderToStaticMarkup';

import Reader from './Reader/core.vue';
import ReaderBlock from './Reader/ReaderBlock.vue';
import { buildReaderDictionary } from './Reader';

export type TReaderProps = {
  // FIXME: type
  // document: Record<string, z.infer<typeof ReaderBlockSchema>>;
  document: Record<string, any>;
  rootBlockId: string;
};

export type TReaderBlockProps = {
  // FIXME: type
  // document: Record<string, z.infer<typeof ReaderBlockSchema>>;
  document: Record<string, any>;
  id: string;
};

export { Reader, ReaderBlock, buildReaderDictionary };
