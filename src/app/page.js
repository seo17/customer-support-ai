import Chat from "@/components/ChatBox";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <div className="bg-secondary w-screen h-screen md:px-5 md:py-8 flex flex-row items-center justify-center ">
        <Chat />
      </div>
    </main>
  );
}
