import Link from "next/link";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import { ModeToggle } from "@/components/theme-toogle";
import LogoutBtn from "./logout-btn";
import { getUser } from "@/auth/server";
import { SidebarTrigger } from "./ui/sidebar";

export default async function Header() {
  let user = await getUser();
  return (
    <header className="flex h-24 w-full items-center justify-between px-3 sm:px-6 shadow-lg shadow-accent">
      <div className="flex items-center gap-2">
      <SidebarTrigger/>
      <Link href="/" className="flex h-full items-center gap-2">
        <Image
          src="/the-kidd.avif"
          alt="Goat Notes"
          width={60}
          height={60}
          className="rounded-full"
          priority
        />
        <h1 className="text-xl md:text-2xl font-bold leading-6 flex flex-col pb-1">
          Goat <span>Notes</span>
        </h1>
        
      </Link>
      </div>
      <div className="flex gap-4 items-center h-full">{
        user? <LogoutBtn />: <>
        
        <Button asChild variant="outline">
          <Link href="/signup">Sign Up</Link>
        </Button>
          
        <Button asChild variant="outline" className="hidden sm:inline-flex bg-accent"> 
          <Link href="/login">Login</Link>
        </Button>
      
        </>}
        <ModeToggle />
        </div>

    </header>
  );
}
