import { CheckCircle2, Circle } from "lucide-react";
import GroupMemberListItem, { MemberShape } from "./GroupMemberListItem";

interface MembersBulkListItemProps {
  chosenMembers: number[];
  onChosenMembersChange: (chosenMembers: number[]) => void;
  member: MemberShape;
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
          userId={member.userId}
          nick={member.nick}
          name={member.name}
          avatar={member.avatar}
          role={member.role}
          ehre={member.ehre}
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
