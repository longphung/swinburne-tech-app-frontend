import React, { FC } from "react";
import { Editor } from "@tiptap/react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatStrikethroughIcon from "@mui/icons-material/FormatStrikethrough";

interface Props {
  // Editor instance
  editor: Editor;
}

const EditorFloatingMenuBar: FC<Props> = (props) => {
  const { editor } = props;
  const [formats, setFormats] = React.useState(() => []);

  const handleFormat = (event: React.MouseEvent, newFormats: any) => {
    setFormats(newFormats);
    newFormats.forEach((format: string) => {
      editor.chain().focus().toggleMark(format).run();
    });
  };

  return (
    <ToggleButtonGroup
      value={formats}
      onChange={handleFormat}
      sx={{
        backgroundColor: "white",
      }}
    >
      <ToggleButton value="bold">
        <FormatBoldIcon />
      </ToggleButton>
      <ToggleButton value="italic">
        <FormatItalicIcon />
      </ToggleButton>
      <ToggleButton value="strike">
        <FormatStrikethroughIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default EditorFloatingMenuBar;
