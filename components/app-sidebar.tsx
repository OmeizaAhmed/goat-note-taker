import { getUser } from "@/auth/server"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { Note } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import CustomSidebarContent from "./sidebar-content";
import { Input } from "./ui/input";

export async function AppSidebar() {
  const user = await getUser();
  let notes: Note[] = [];
  if(user?.id) {

    notes = await prisma.note.findMany({
      where: {
        authorId: user.id
      },
      orderBy:{
        updatedAt: "desc"
      }
    });
  }

  return (
    <Sidebar className="bg-background">
      <SidebarContent className="p-2 md:p-4">
        <SidebarGroup />
          <SidebarGroupLabel className="mt-2 mb-2 font-bold">
            {
              user ? <h2 className="text-lg">Your Notes</h2> : <p>Please <Link href="/login" className="underline">login</Link> to see your notes</p>
            }
          </SidebarGroupLabel>
          <Input placeholder="Search notes..." className="mb-4" type="search"/>
          { user? <CustomSidebarContent notes={notes} /> : null }
        <SidebarGroup />
      </SidebarContent>
    </Sidebar>
  )
}