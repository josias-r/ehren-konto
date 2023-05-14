"use client";

import EmojiPickerReact, {
  EmojiStyle,
  SkinTones,
  Theme,
  Categories,
  EmojiClickData,
  Emoji,
  SuggestionMode,
  SkinTonePickerLocation,
} from "emoji-picker-react";
import { useState } from "react";
import {
  Popover,
  PopoverContentNoPortal,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";

interface EmojiPickerProps {
  id?: string;
  required?: boolean;
  className?: string;

  /** passing null or a date tells this component that is should be controlled */
  value?: string | null;
  onChange?: (newDate?: string) => void;
}

function EmojiPicker({
  id,
  className,
  required,
  onChange,
  value,
}: EmojiPickerProps) {
  const [open, setOpen] = useState(false);

  const [uncontrolledSelectedEmoji, setUncontrolledSelectedEmoji] =
    useState<string>();

  const selectedEmoji =
    value === undefined ? uncontrolledSelectedEmoji : value || undefined;

  return (
    <Sheet
      onOpenChange={(newOpen) => {
        setOpen(newOpen);
      }}
      open={open}
    >
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "relative w-[280px] justify-start text-left font-normal",
            !selectedEmoji && "text-muted-foreground",
            className
          )}
        >
          <Emoji
            unified={selectedEmoji || ""}
            emojiStyle={EmojiStyle.APPLE}
            size={22}
          />
          <input
            className="absolute  inset-0 opacity-0"
            required={required}
            id={id}
            value={selectedEmoji || ""}
            onChange={() => {}}
          />
        </Button>
      </SheetTrigger>
      <SheetContent position="bottom" size={"content"}>
        <div className="mx-auto max-w-md mb-8">
          <SheetHeader>
            <SheetTitle>Pick emoji</SheetTitle>
          </SheetHeader>
        </div>
        <div className="mx-auto max-w-md mb-8">
          <EmojiPickerReact
            width={"100%"}
            onEmojiClick={(emojiData) => {
              setUncontrolledSelectedEmoji(emojiData.unified);
              onChange?.(emojiData.unified);
              setOpen(false);
            }}
            autoFocusSearch={false}
            theme={Theme.DARK}
            emojiStyle={EmojiStyle.APPLE}
            lazyLoadEmojis
            // searchDisabled
            // skinTonePickerLocation={SkinTonePickerLocation.PREVIEW}
            // height={350}
            // width="50%"
            // emojiVersion="0.6"
            // lazyLoadEmojis={true}
            // previewConfig={{
            //   defaultCaption: "Pick one!",
            //   defaultEmoji: "1f92a" // 🤪
            // }}
            suggestedEmojisMode={SuggestionMode.RECENT}
            // skinTonesDisabled
            // searchPlaceHolder="Filter"
            // defaultSkinTone={SkinTones.MEDIUM}
            // emojiStyle={EmojiStyle.NATIVE}
            // categories={[
            //   {
            //     name: "Fun and Games",
            //     category: Categories.ACTIVITIES
            //   },
            //   {
            //     name: "Smiles & Emotions",
            //     category: Categories.SMILEYS_PEOPLE
            //   },
            //   {
            //     name: "Flags",
            //     category: Categories.FLAGS
            //   },
            //   {
            //     name: "Yum Yum",
            //     category: Categories.FOOD_DRINK
            //   }
            // ]}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default EmojiPicker;
