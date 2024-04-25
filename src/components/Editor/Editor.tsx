import React, { FC, useEffect, useImperativeHandle } from "react";
import { TextAlign } from "@tiptap/extension-text-align";
import ImageResize from "tiptap-extension-resize-image";
import { Editor as EditorType } from "@tiptap/react";
import { BubbleMenu, EditorContent, FloatingMenu, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";

import EditorMenuBar from "@/components/Editor/EditorMenuBar";
import EditorFloatingMenuBar from "@/components/Editor/EditorFloatingMenuBar";

const Editor: FC = React.forwardRef<EditorType | null, { initialContent?: string; editable?: boolean }>(
  (props, ref) => {
    const { initialContent = "", editable = true } = props;
    const editor = useEditor({
      editable,
      extensions: [
        StarterKit,
        TextAlign.configure({
          types: ["heading", "paragraph"],
        }),
        ImageResize,
      ],
      content: initialContent,
    });

    useImperativeHandle(ref, () => editor as EditorType, [editor]);

    useEffect(() => {
      if (!editor) {
        return;
      }
      editor?.setEditable(editable);
    }, [editor, editable]);

    if (!editor) {
      return null;
    }

    return (
      <>
        {editor && editable && <EditorMenuBar editor={editor} />}

        {editor && editable && (
          <BubbleMenu className="bubble-menu" tippyOptions={{ duration: 100 }} editor={editor}>
            <EditorFloatingMenuBar editor={editor} />
          </BubbleMenu>
        )}

        {editor && editable && (
          <FloatingMenu className="floating-menu" tippyOptions={{ duration: 100 }} editor={editor}>
            <EditorFloatingMenuBar editor={editor} />
          </FloatingMenu>
        )}

        <EditorContent editor={editor} />
      </>
    );
  },
);

Editor.displayName = "Editor";

export default Editor;
