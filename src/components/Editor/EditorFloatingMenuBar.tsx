import React, { FC } from "react";
import { Editor } from "@tiptap/react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import StrikethroughSIcon from "@mui/icons-material/StrikethroughS";

interface Props {
  // Editor instance
  editor: Editor;
}

const EditorFloatingMenuBar: FC<Props> = (props) => {
  const { editor } = props;

  const handleChange = (event: React.MouseEvent, newFormats: [string]) => {
    newFormats.forEach((format: string) => {
      editor.chain().focus().toggleMark(format).run();
    });
  };

  return (
    <ToggleButtonGroup
      onChange={handleChange}
      sx={{
        backgroundColor: "white",
      }}
    >
      <ToggleButton value="bold" selected={editor.isActive("bold")}>
        <FormatBoldIcon />
      </ToggleButton>
      <ToggleButton value="italic" selected={editor.isActive("italic")}>
        <FormatItalicIcon />
      </ToggleButton>
      <ToggleButton value="strike" selected={editor.isActive("strike")}>
        <StrikethroughSIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default EditorFloatingMenuBar;
