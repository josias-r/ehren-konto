import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import getInitialsFromName from "../../@app/(with-profile)/(profile)/getInitialsFromName";

interface InviteUserAvatarProps {
  name: string;
  avatar: string | null;
}

function InviteUserAvatar({ avatar, name }: InviteUserAvatarProps) {
  const initials = getInitialsFromName(name);
  return (
    <div className="flex justify-center">
      <Avatar className="mr-4">
        {avatar && <AvatarImage src={avatar} />}
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div className="flex justify-between items-center">
        <div className="text-sm">
          <div>
            <span>{name}</span>
          </div>
          <div className="text-sm text-muted-foreground">wants to connect</div>
        </div>
      </div>
    </div>
  );
}

export default InviteUserAvatar;
