"use client";

import {
  ActivityColor,
  getActivityGradient,
} from "@/lib/activity/utilities/activity-colors";
import ActivityContainer from "./ActivityContainer";
import { Emoji, EmojiStyle } from "emoji-picker-react";
import { useEffect, useState } from "react";
import { CheckCircle, Clock2 } from "lucide-react";

export type ActivityShape = {
  activityId: number;
  emoji: string;
  color: ActivityColor;
  name: string;
  from: Date;
  participants: { userId: string; confirmed: boolean; name: string }[];
};

interface ActivityProps extends Pick<ActivityShape, "color" | "emoji"> {
  isParticipating: "confirmed" | "unconfirmed" | false;
}

function Activity({ color, emoji, isParticipating }: ActivityProps) {
  const gradient = getActivityGradient(color);

  // otherwise getting SSR errors from next
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="w-full relative">
      <ActivityContainer
        className="flex"
        style={{
          background: gradient,
        }}
      >
        {isParticipating && (
          <div className="absolute top-0 left-0 w-full h-full flex  bg-gradient-to-br from-transparent to-black/40 rounded pointer-events-none">
            {isParticipating === "confirmed" ? (
              <CheckCircle size="0.7rem" className="m-auto mb-1 mr-1" />
            ) : (
              <Clock2 size="0.7rem" className="m-auto mb-1 mr-1" />
            )}
          </div>
        )}
        <span className="m-auto">
          {mounted && (
            <Emoji unified={emoji} emojiStyle={EmojiStyle.APPLE} size={22} />
          )}
        </span>
      </ActivityContainer>
    </div>
  );
}

export default Activity;
