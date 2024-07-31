import { BlockNoteView, useCreateBlockNote } from '@blocknote/react';
import React, { useEffect } from 'react';

const HtmlConvert = ({ html }: { html: string }) => {
  const editor = useCreateBlockNote();
  const initialHTML = html || '';
  useEffect(() => {
    async function loadInitialHTML() {
      const blocks = await editor.tryParseHTMLToBlocks(initialHTML);
      editor.replaceBlocks(editor.document, blocks);
    }
    loadInitialHTML();
  }, [html]);

  return (
    <div className='h-[1000px]'>
      <BlockNoteView editor={editor} editable={false} />
    </div>
  );
};

export default HtmlConvert;
