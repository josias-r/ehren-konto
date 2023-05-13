import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface GroupItemProps {
  name: string;
  role: string;
  amount: number;
  avatar: { url: string; fallback: string };
}

function GroupItem({ name, role, amount, avatar }: GroupItemProps) {
  return (
    <div className="flex">
      <Avatar className="mr-4">
        <AvatarImage src={avatar.url} />
        <AvatarFallback>{avatar.fallback}</AvatarFallback>
      </Avatar>
      <div className="flex justify-between w-full items-center">
        <div className="text-sm">
          <p>{name}</p>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
        <div
          className={`ml-auto font-medium ${amount <= 0 ? "text-red-600" : ""}`}
        >
          {amount}
        </div>
      </div>
    </div>
  );
}

export default GroupItem;
