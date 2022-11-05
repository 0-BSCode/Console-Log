import { useState, useEffect } from "react";
import { BubbleMenu, EditorContent, useEditor } from "@tiptap/react";
import {
  HStack,
  Menu,
  VStack,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Image,
} from "@chakra-ui/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import { FiBold, FiDownload, FiItalic, FiSlash } from "react-icons/fi";
import ActionButton from "./actionButton";
import { PartialNote } from "types/note";

interface Props {
  value: string;
  onChange: (newValue: string) => void;
  disabled: boolean;
  placeholder: string;
}

const TextEditor = ({ value, onChange, disabled, placeholder }: Props) => {
  const editor = useEditor({
    extensions: [StarterKit, Highlight.configure({ multicolor: true })],
    content: value || `<p>${placeholder}</p>`,
  });

  useEffect(() => {
    if (editor) {
      editor.setEditable(disabled);
    }
  }, [disabled, editor]);

  useEffect(() => {
    if (editor) {
      editor.off("update");
      editor.on("update", ({ editor }) => onChange(editor.getHTML()));
    }
  }, [editor, onChange]);

  return (
    <VStack w={"full"}>
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <HStack spacing={2} bgColor={"purple.400"} p={2} borderRadius={"lg"}>
            <ActionButton
              isActive={editor.isActive("bold")}
              label={"Bolden text"}
              icon={<FiBold />}
              onClick={() => editor.chain().focus().toggleBold().run()}
            />
            <ActionButton
              isActive={editor.isActive("italic")}
              label={"Italicize text"}
              icon={<FiItalic />}
              onClick={() => editor.chain().focus().toggleItalic().run()}
            />
            <ActionButton
              isActive={editor.isActive("strike")}
              label={"Strikethrough text"}
              icon={<FiSlash />}
              onClick={() => editor.chain().focus().toggleStrike().run()}
            />
            {/* <Menu>
              <MenuButton as={Button} rightIcon={<FiDownload />}>
                Your Cats
              </MenuButton>
              <MenuList>
                <MenuItem minH="48px" w={"fit-content"}>
                  <ActionButton
                    isActive={editor.isActive("highlight")}
                    label={"Highlight text"}
                    icon={<FiSlash />}
                    onClick={() =>
                      editor
                        .chain()
                        .focus()
                        .toggleHighlight({ color: "#ffc078" })
                        .run()
                    }
                    bgColor={"ffc078"}
                  />
                </MenuItem>
                <MenuItem minH="40px">
                  <ActionButton
                    isActive={editor.isActive("strike")}
                    label={"Strikethrough text"}
                    icon={<FiSlash />}
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                  />
                </MenuItem>
              </MenuList>
            </Menu> */}
          </HStack>
        </BubbleMenu>
      )}
      <EditorContent
        editor={editor}
        style={{ width: "100%", padding: "10px" }}
      />
    </VStack>
  );
};

TextEditor.defaultProps = {
  disabled: true,
  placeholder: "Place your thoughts here!",
};

export default TextEditor;
