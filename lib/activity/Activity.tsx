"use client";

import {
  ActivityColor,
  getActivityGradient,
} from "@/lib/activity/utilities/activity-colors";
import ActivityContainer from "./ActivityContainer";
import { Emoji, EmojiStyle } from "emoji-picker-react";
import { useEffect, useState } from "react";

export type ActivityShape = {
  activityId: number;
  emoji: string;
  color: ActivityColor;
  name: string;
  from: Date;
  participants: { userId: number; confirmed: boolean }[];
};

interface ActivityProps extends ActivityShape {}

function Activity({ color, emoji }: ActivityProps) {
  const gradient = getActivityGradient(color);

  // otherwise getting SSR errors from next
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="w-full">
      <ActivityContainer
        className="flex"
        style={{
          background: gradient,
        }}
      >
        <span className="m-auto">
          {mounted && (
            <Emoji unified={emoji} emojiStyle={EmojiStyle.APPLE} size={22} />
          )}
        </span>
      </ActivityContainer>
      {/* <p className="text-xs text-muted-foreground text-center">in 9 days</p> */}
    </div>
  );
}

export default Activity;
