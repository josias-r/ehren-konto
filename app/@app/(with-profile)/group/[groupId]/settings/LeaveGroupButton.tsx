"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import LeaveGroupAlert from "./LeaveGroupAlert";
import { DoorOpen } from "lucide-react";

interface LeaveGroupButtonProps {
  groupId: number;
}

function LeaveGroupButton({ groupId }: LeaveGroupButtonProps) {
  const [modalOpen, setModalOpen] = useState(false);

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
      />
    </>
  );
}

export default LeaveGroupButton;
