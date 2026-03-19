'use client'
import { createContext, useContext, useEffect, useState} from "react"
import { Note } from "@/lib/generated/prisma/client";
import { getUserClient } from "@/action/user";
import { prisma } from "@/lib/prisma";
import { getNotes } from "@/action/note";

export const NotesContext = createContext({ notes: [] as Note[], setNotes: (notes: Note[]) => {} });


export default function NotesProvider({children}: {children: React.ReactNode}) {
  const [notes, setNotes] = useState<Note[]>([]);

  return (
    <NotesContext.Provider value={{ notes, setNotes }}>
      {children}
    </NotesContext.Provider>
  )
}

