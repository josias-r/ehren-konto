import { CheckCircle2, Circle } from "lucide-react";

import { GroupMembers } from "@/app/@app/(with-profile)/group/[groupId]/members/getGroupWithMembers";
import GroupMemberListItem from "@/app/@app/(with-profile)/groups/GroupMemberListItem";

interface MembersBulkListItemProps {
  chosenMembers: string[];
  onChosenMembersChange: (chosenMembers: string[]) => void;
  member: NonNullable<GroupMembers>[number];
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
        if (chosenMembers.includes(member.userId)) {
          onChosenMembersChange(
            chosenMembers.filter((id) => id !== member.userId)
          );
        } else {
          onChosenMembersChange([...chosenMembers, member.userId]);
        }
      }}
    >
      <div className="flex-grow flex-shrink-1 w-full">
        <GroupMemberListItem
          name={member.name}
          nick={member.nick}
          userId={member.userId}
          avatar={member.avatar}
          ehre={member.ehre}
          role={member.role}
        />
      </div>
      <div className="flex-grow flex-shrink-0">
        {chosenMembers.includes(member.userId) ? (
          <CheckCircle2 className="2-4 h-4" />
        ) : (
          <Circle className="2-4 h-4 text-muted-foreground" />
        )}
      </div>
    </div>
  );
}

export default MembersBulkListItem;
