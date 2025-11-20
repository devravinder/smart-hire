import openFile from "@/lib/openFile.js";
import { uploadFile } from "@/services/fileService.js";
import { Paperclip, Send } from "lucide-react";
import mime from "mime/lite";
import { useState, type MouseEventHandler } from "react";
import { Button } from "@/components/ui/button.js";
import { cn } from "@/lib/utils.js";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const allowedTypes = [
  mime.getType(".md"),
  mime.getType(".pdf"),
  mime.getType(".txt"),
];

export function ChatInput({ onSendMessage, disabled }: ChatInputProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSendMessage(input.trim());
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleFileClick: MouseEventHandler = async (event) => {
    console.log("File upload clicked");
    event.stopPropagation();
    const files = await openFile({
      multiple: false,
      accept: allowedTypes.join(","),
    });

    const file = files[0];
    const { data, error } = await uploadFile(file);
    console.log({ data, error });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        className={cn(
          "flex items-end gap-2 rounded-lg border bg-sidebar p-2 transition-colors",
          disabled && "opacity-50"
        )}
      >
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={handleFileClick}
          disabled={disabled}
          className="shrink-0 h-9 w-9"
        >
          <Paperclip className="h-5 w-5" />
        </Button>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type here..."
          disabled={disabled}
          rows={1}
          className="flex-1 resize-none bg-transparent px-2 py-2 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed min-h-[36px] max-h-[200px]"
        />

        <Button
          type="submit"
          size="icon"
          disabled={!input.trim() || disabled}
          className="shrink-0 h-9 w-9"
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </form>
  );
}
