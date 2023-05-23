import Image from "next/image";
import Link from "next/link";

interface InviteLinkWrapperProps {
  children: React.ReactNode;
}

function InviteLinkWrapper({ children }: InviteLinkWrapperProps) {
  return (
    <main className="p-4 h-full max-w-xs mx-auto flex flex-col w-full items-center justify-stretch gap-4">
      <div className="flex-grow flex-shrink-0 w-full flex">
        <div className="m-auto w-full">{children}</div>
      </div>
      <div className="flex flex-shrink-0 items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Ehre logo"
            width={45}
            height={45}
            className="block"
          />
          <div className="px-4">
            <strong>Ehre</strong>
          </div>
        </Link>
      </div>
    </main>
  );
}

export default InviteLinkWrapper;
