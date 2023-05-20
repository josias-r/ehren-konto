"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import QrCode from "./QrCode";
import { useRouter } from "next/navigation";

interface QrSheetProps {
  linkId: string;
}

function QrSheet({ linkId }: QrSheetProps) {
  const router = useRouter();
  return (
    <Sheet open onOpenChange={() => router.back()}>
      <SheetContent
        headerChildren={
          <SheetHeader>
            <SheetTitle>This is your code</SheetTitle>
            <SheetDescription>
              Share this code with your friends to invite them to Ehre.
            </SheetDescription>
          </SheetHeader>
        }
      >
        <QrCode linkId={linkId} />
      </SheetContent>
    </Sheet>
  );
}

export default QrSheet;
