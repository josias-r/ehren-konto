import Transaction from "@/components/Transaction";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";

// &:before {
//   background-color: rgba(255,255,255,0.3);
//   backdrop-filter: blur(10px) saturate(100%) contrast(45%) brightness(130%);
//   -webkit-backdrop-filter: blur(10px) saturate(100%) contrast(45%) brightness(130%);
//   content: "";
//   height: 100%;
//   position: absolute;
//   width: 100%;
// }

export default function Home() {
  return (
    <main className="relative">
      <section className="h-[30rem] overflow-hidden relative">
        <div
          className="max-w-md h-[12rem] w-[20rem] mx-auto relative overflow-hidden rounded-lg z-10 top-[12vh]
          border-2 border-white/50
          before:bg-white/5 before:backdrop-blur-md before:h-full before:w-full before:saturate-100 before:contrast-50 before:brightness-100 before:absolute
        "
        >
          <Image
            src="/Ehre-bright.svg"
            alt="Ehre logo"
            width={60}
            height={40}
            className="absolute right-2 top-2"
          />
        </div>
        <Image
          className="absolute inset-0 h-[35rem] w-[35rem] rotate-45 object-contain left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
          src="/color-erruption.png"
          alt="gradient background image"
          width={1000}
          height={1000}
        />
      </section>
      <section className="mx-auto p-8 max-w-md">
        <Card>
          <CardHeader>
            History
            <p className="text-sm text-muted-foreground">
              History of earned honor-points
            </p>
          </CardHeader>
          <CardContent>
            <Transaction
              name="Josias Ribi"
              email="josias.ribi@gmail.com"
              amount={1}
              avatar={{
                url: "https://avatars.githubusercontent.com/u/1024025?v=4",
                fallback: "JR",
              }}
            />
            <Transaction
              name="Manuel Kauderer"
              email="manuel.kauderer@gmx.ch"
              amount={1}
              avatar={{
                url: "https://avatars.githubusercontent.com/u/1024035?v=4",
                fallback: "MK",
              }}
            />
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
