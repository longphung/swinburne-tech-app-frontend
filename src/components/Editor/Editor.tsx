import React, { FC } from "react";
import { BubbleMenu, EditorContent, FloatingMenu, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import EditorMenuBar from "@/components/Editor/EditorMenuBar";
import EditorFloatingMenuBar from "@/components/Editor/EditorFloatingMenuBar";

const Editor: FC = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: `
      <p>
        Try to select <em>this text</em> to see what we call the bubble menu.
      </p>
      <p>
        Neat, isn’t it? Add an empty paragraph to see the floating menu.
      </p>
    `,
  });

  return (
    <>
      {editor && <EditorMenuBar editor={editor} />}

      {editor && (
        <BubbleMenu className="bubble-menu" tippyOptions={{ duration: 100 }} editor={editor}>
          <EditorFloatingMenuBar editor={editor} />
        </BubbleMenu>
      )}

      {editor && (
        <FloatingMenu className="floating-menu" tippyOptions={{ duration: 100 }} editor={editor}>
          <EditorFloatingMenuBar editor={editor} />
        </FloatingMenu>
      )}

      <EditorContent editor={editor} />
    </>
  );
};

export default Editor;
