"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ClipboardJS from "clipboard";
import Image from "next/image";
import QRCodeStyling from "qr-code-styling";
import { useEffect, useRef, useState } from "react";

interface QrCodeProps {
  linkId: string;
}

const size = 300;

const qrCode = new QRCodeStyling({
  width: size,
  height: size,
  image: "/Ehre.svg",
  dotsOptions: {
    color: "#030711",
    type: "rounded",
  },
  cornersSquareOptions: {
    type: "dot",
    gradient: {
      type: "linear",
      rotation: 0,
      colorStops: [
        { offset: 0, color: "#a1511b" },
        { offset: 1, color: "#750624" },
      ],
    },
  },
  backgroundOptions: {
    color: "#f0f0f0",
  },
  imageOptions: {
    crossOrigin: "anonymous",
    margin: 0,
  },
});

function QrCode({ linkId }: QrCodeProps) {
  const inviteUrl = `${document.location.origin}/invite/${linkId}`;

  const [tooltipOpen, setTooltipOpen] = useState(false);

  const [qrUrl, setQrUrl] = useState<string>();
  const inputRef = useRef<HTMLInputElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const asyncWrapper = async () => {
      qrCode.update({
        data: `${document.location.origin}/invite/${linkId}}`,
      });
      const qrData = (await qrCode.getRawData("jpeg")) as Blob;
      const generatedQrUrl = URL.createObjectURL(qrData);
      setQrUrl(generatedQrUrl);

      if (!btnRef.current) {
        return console.error("btnRef is null");
      }

      new ClipboardJS(btnRef.current, {});
    };
    asyncWrapper();
  }, [linkId]);

  return (
    <div className="grid gap-10">
      {qrUrl && (
        <Image
          src={qrUrl}
          alt="Invite link QR code"
          width={size}
          height={size}
          className="p-4 bg-[#f0f0f0] rounded block mx-auto"
        />
      )}
      {!qrUrl && (
        <Image
          className="block mx-auto rounded-lg overflow-hidden border-2 border-white"
          src="/abstract-empty-state-illustration.png"
          width={size}
          height={size}
          alt="Empty state illustration"
        />
      )}
      <Tooltip open={tooltipOpen}>
        <TooltipTrigger asChild>
          <div className="flex mx-auto">
            <Input
              ref={inputRef}
              id="invite-link-input"
              className="rounded-r-none max-w-[10rem]"
              value={inviteUrl}
            />
            <Button
              ref={btnRef}
              data-clipboard-target="#invite-link-input"
              className="whitespace-nowrap rounded-l-none"
              onClick={() => {
                setTooltipOpen(true);
                setTimeout(() => {
                  setTooltipOpen(false);
                }, 1000);
              }}
            >
              Copy
            </Button>
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom">Copied!</TooltipContent>
      </Tooltip>
    </div>
  );
}

export default QrCode;
