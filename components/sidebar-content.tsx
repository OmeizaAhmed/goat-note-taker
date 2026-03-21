'use client';
import { Note } from "@/lib/generated/prisma/client";
import { SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState, useMemo } from "react";
import { NotesContext } from "@/provider/notes-provider";
import { DeleteNote } from "./delete-note";
import { Input } from "./ui/input";
import Fuse from "fuse.js";

type Props = {
  notes: Note[]
}
export default function CustomSidebarContent({notes}: Props) {
  const {notes: notebook, setNotes} = useContext(NotesContext); 
  const searchParams = useSearchParams();
  const noteId = searchParams.get("id")

  const [ searchValue, setSearchValue] = useState('');

  const fuse = useMemo(()=>{
    return new Fuse(notebook, {keys: ['text']})
  }, [notebook])

  const result = useMemo(() =>{
      if(!searchValue) return notebook
      const r = fuse.search(searchValue).map(i => i.item)
      if(!r.length) return notebook
      return r
    }, [fuse, searchValue, notebook])

  

  useEffect(()=>{
    setNotes(notes)
  },[])
  return (
    <>
      
      <Input placeholder="Search notes..." className="mb-4" type="search" onChange={e => setSearchValue(e.target.value)} value={searchValue}/>
      <SidebarMenu>
        {result?.map((note =>(
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