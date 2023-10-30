import { FC, useRef, useEffect, useCallback } from "react";
import EditorJS from "@editorjs/editorjs";
import styled from "styled-components";
import { DEFAULT_INITIAL_DATA, isEditorsText } from "./editor-constant";

export interface ITextEditorProps {
  holder?: string;
  content?: string;
  onChange: (content: string) => void;
  isInvalid?: boolean;
  type?: string;
}

export const ChangeEditorStyle = styled.div`
  .ce-toolbar__actions {
    .ce-toolbar__settings-btn,
    .ce-toolbar__plus {
      color: #000;
    }
  }
`;

const TextEditor: FC<ITextEditorProps> = ({
  holder = "editorjs",
  content,
  onChange,
  isInvalid,
  type,
}) => {
  const ejInstance = useRef<EditorJS | null>(null);

  const initEditor = useCallback(() => {
    const initContent =
      !content || !isEditorsText(content)
        ? DEFAULT_INITIAL_DATA
        : JSON.parse(content);

    const editor = new EditorJS({
      holder,
      onReady: () => {
        ejInstance.current = editor;
      },
      data: initContent,
      inlineToolbar: true,
      onChange: async () => {
        try {
          if (!ejInstance) return;

          const newContent = await editor.saver.save();

          onChange(JSON.stringify(newContent));
        } catch (error) {
          console.log(error);
        }
      },
    });
  }, [content, holder]);

  useEffect(() => {
    if (ejInstance.current === null) {
      initEditor();
    }

    return () => {
      ejInstance?.current?.destroy();
      ejInstance.current = null;
    };
  }, [content]);

  return (
    <ChangeEditorStyle
      id={holder}
      style={{
        height: "100%",
        overflowY: "auto",
        borderRadius: "10px",
        border: isInvalid ? "1px solid #A92020" : "1px solid #221f1f24",
        maxWidth: "100%",
        paddingLeft: "20px",
        paddingRight: "20px",
      }}
    ></ChangeEditorStyle>
  );
};

export default TextEditor;
