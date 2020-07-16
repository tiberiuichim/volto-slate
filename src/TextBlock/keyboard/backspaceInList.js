import { Transforms } from 'slate';
import { settings } from '~/config';
import {
  isCursorInList,
  isCursorAtListBlockStart,
  deconstructToVoltoBlocks,
} from 'volto-slate/utils';

export function backspaceInList({ editor, event }) {
  if (!isCursorInList(editor)) return false;

  if (isCursorAtListBlockStart(editor)) {
    console.log('at block start', editor.children);
    const { slate } = settings;

    Transforms.liftNodes(editor, {
      match: (n) => n.type === slate.listItemType,
    });

    Transforms.setNodes(editor, { type: slate.defaultBlockType });

    deconstructToVoltoBlocks(editor).then(() => {
      const props = editor.getBlockProps();
      // Unfortunately, until Volto's on* methods don't have Promise support,
      // we have to use a setTimeout with a bigger value, to be able to
      // properly select the proper block
      setTimeout(() => {
        props.onSelectBlock(props.id);
      }, 100);
    });
    return true;
  }
  console.log('else', editor.children);
}
