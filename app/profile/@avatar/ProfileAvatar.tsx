"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import getInitialsFromName from "../../../lib/user/getInitialsFromName";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import { useTransition } from "react";
import { logoutUser } from "../../../lib/user/actions";
import { useRouter } from "next/navigation";

interface ProfileAvatarProps {
  name: string;
  avatar: string | null;
}

function ProfileAvatar({ name, avatar }: ProfileAvatarProps) {
  const initials = getInitialsFromName(name);
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="px-1">
          <Avatar>
            {avatar && <AvatarImage src={avatar} />}
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          disabled={isPending}
          onClick={() => {
            startTransition(async () => {
              await logoutUser();
              router.push("/login");
            });
          }}
        >
          <LogOut className="w-4 h-4 mr-2" />
          <span>Log out</span>
        </DropdownMenuItem>
        {/* <CopyInviteLinkDropdownItem /> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProfileAvatar;
