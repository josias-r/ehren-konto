"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import DeleteGroupAlert from "./DeleteGroupAlert";
import { Delete } from "lucide-react";

interface DeleteGroupButtonProps {
  groupId: number;
}

function DeleteGroupButton({ groupId }: DeleteGroupButtonProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Button variant="destructive" onClick={() => setModalOpen(true)}>
        <Delete className="mr-2" size="1rem" />
        Delete group
      </Button>
      <DeleteGroupAlert
        open={modalOpen}
        onOpenChange={setModalOpen}
        groupId={groupId}
      />
    </>
  );
}

export default DeleteGroupButton;
