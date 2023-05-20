import { CheckCircle2, Circle } from "lucide-react";

import { GroupMembers } from "@/app/groups/members/[groupId]/getGroupWithMembers";
import GroupMemberListItem from "@/lib/group/GroupMemberListItem";

interface MembersBulkListItemProps {
  chosenMembers: string[];
  onChosenMembersChange: (chosenMembers: string[]) => void;
  member: NonNullable<GroupMembers>["GroupMembers"][number];
}

function MembersBulkListItem({
  chosenMembers,
  onChosenMembersChange,
  member,
}: MembersBulkListItemProps) {
  return (
    <div
      className="flex gap-8 items-center cursor-pointer"
      onClick={() => {
        if (chosenMembers.includes(member.User.userId)) {
          onChosenMembersChange(
            chosenMembers.filter((id) => id !== member.User.userId)
          );
        } else {
          onChosenMembersChange([...chosenMembers, member.User.userId]);
        }
      }}
    >
      <div className="flex-grow flex-shrink-1 w-full">
        <GroupMemberListItem
          name={member.User.name}
          nick={member.User.nick}
          userId={member.User.userId}
          avatar={member.User.avatar}
          ehre={member.ehre}
          role={member.role}
        />
      </div>
      <div className="flex-grow flex-shrink-0">
        {chosenMembers.includes(member.User.userId) ? (
          <CheckCircle2 className="2-4 h-4" />
        ) : (
          <Circle className="2-4 h-4 text-muted-foreground" />
        )}
      </div>
    </div>
  );
}

export default MembersBulkListItem;
