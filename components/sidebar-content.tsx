'use client';
import { Note } from "@/lib/generated/prisma/client";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect } from "react";
import { NotesContext } from "@/provider/notes-provider";

type Props = {
  notes: Note[]
}
export default function CustomSidebarContent({notes}: Props) {
  const {notes: notebook, setNotes} = useContext(NotesContext);
  

  
  console.log(notes, notebook);
  const searchParams = useSearchParams();
  const noteId = searchParams.get("id")

  useEffect(()=>{
    setNotes(notes)
  },[])
  return (
    <>
      <SidebarMenu>
        {notes?.map((note =>(
          <SidebarMenuItem >
            <SidebarMenuButton isActive={note.id === noteId}>
              <Link href={`?id=${note.id}`} className="truncate">{note.text? note.text: "EMPTY NOTES"}</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )))}
      </SidebarMenu>
    </>
  )
}