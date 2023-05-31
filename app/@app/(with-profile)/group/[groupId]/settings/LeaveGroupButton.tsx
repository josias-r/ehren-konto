"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LeaveGroupAlert from "./LeaveGroupAlert";
import { DoorOpen } from "lucide-react";

interface LeaveGroupButtonProps {
  groupId: number;
}

function LeaveGroupButton({ groupId }: LeaveGroupButtonProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const router = useRouter();
  return (
    <>
      <Button variant="destructive" onClick={() => setModalOpen(true)}>
        <DoorOpen className="mr-2" size="1rem" />
        Leave group
      </Button>
      <LeaveGroupAlert
        open={modalOpen}
        onOpenChange={setModalOpen}
        groupId={groupId}
        onDone={() => router.replace(`/groups/${groupId}`)}
      />
    </>
  );
}

export default LeaveGroupButton;
