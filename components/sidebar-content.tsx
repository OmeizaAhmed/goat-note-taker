'use client';
import { Note } from "@/lib/generated/prisma/client";
import { SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect } from "react";
import { NotesContext } from "@/provider/notes-provider";
import { DeleteNote } from "./delete-note";

type Props = {
  notes: Note[]
}
export default function CustomSidebarContent({notes}: Props) {
  const {notes: notebook, setNotes} = useContext(NotesContext); 
  const searchParams = useSearchParams();
  const noteId = searchParams.get("id")

  useEffect(()=>{
    setNotes(notes)
  },[])
  return (
    <>
      <SidebarMenu>
        {notebook?.map((note =>(
          <SidebarMenuItem key={note.id} >
            <SidebarMenuButton isActive={note.id === noteId} className="py-4 group/item">
              <Link href={`?id=${note.id}`} className="truncate w-4/5">{note.text? note.text: "EMPTY NOTES"}</Link>
            <SidebarMenuAction asChild >
              <DeleteNote noteId={note.id}/>
            </SidebarMenuAction>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )))}
      </SidebarMenu>
    </>
  )
}