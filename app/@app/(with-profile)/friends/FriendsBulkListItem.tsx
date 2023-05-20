"use client";

import { CheckCircle2, Circle } from "lucide-react";
import FriendListItem from "./FriendListItem";

interface FriendsBulkListItemProps {
  chosenFriends: string[];
  onChosenFriendsChange: (chosenFriends: string[]) => void;
  friend: {
    userId: string;
    name: string;
    nick: string;
    avatar: string | null;
    groups: {
      groupId: number;
      name: string;
    }[];
  };
}

function FriendsBulkListItem({
  chosenFriends,
  onChosenFriendsChange,
  friend,
}: FriendsBulkListItemProps) {
  return (
    <div
      className="flex gap-8 items-center cursor-pointer"
      onClick={() => {
        if (chosenFriends.includes(friend.userId)) {
          onChosenFriendsChange(
            chosenFriends.filter((id) => id !== friend.userId)
          );
        } else {
          onChosenFriendsChange([...chosenFriends, friend.userId]);
        }
      }}
    >
      <div className="flex-grow flex-shrink-1 w-full">
        <FriendListItem
          userId={friend.userId}
          nick={friend.nick}
          name={friend.name}
          avatar={friend.avatar}
          groups={friend.groups}
        />
      </div>
      <div className="flex-grow flex-shrink-0">
        {chosenFriends.includes(friend.userId) ? (
          <CheckCircle2 className="2-4 h-4" />
        ) : (
          <Circle className="2-4 h-4 text-muted-foreground" />
        )}
      </div>
    </div>
  );
}

export default FriendsBulkListItem;
