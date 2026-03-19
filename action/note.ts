'use server'
import { createClient } from "@/auth/server"
import { handleError } from "@/lib/utils";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/auth/server";
import { v4 } from "uuid";

export async function createNote({id}: {id: string}) {
  try {
    const user = await getUser();
    if(!user) {
      throw new Error("User not authenticated");
    }
    const note = await prisma.note.create({
      data: {
        id,
        authorId: user?.id,
        text: "",
      }
    }) ;
    return {error: null, note};
  } catch (error) {
    handleError(error);
  }
}

export async function updateNote({id, text}: {id: string, text: string}) {
  const response = await prisma.note.update({
    where: {
      id: id
    },
    data:{
      text: text
    }
  })
  return response
}


export async function deleteNote({id}: {id: string}) {
  const res = await prisma.note.delete({
   where: {
    id: id
   },
  });
  return res
}

export async function getNotes() {
  const user = await getUser()
  if(!user) return null
  const notes = await prisma.note.findMany({
      where: {
        authorId: user.id
      },
      orderBy:{
        updatedAt: "desc"
      }
    });
  return notes
}

export async function getNote(id:string) {
  const user = await getUser()
  if(!user) return null
  const notes = await prisma.note.findFirst({
      where: {
        authorId: user.id,
        id: id
      },
      orderBy:{
        updatedAt: "desc"
      }
    });
  return notes
}


export async function getLatestNoteId(){
  const user = await getUser()
  if(!user) return null
  const latestNote = await prisma.note.findFirst({
      where: {
        authorId: user.id,
      },
      orderBy:{
        updatedAt: "desc"
      }
    });
  if(!latestNote){
    const noteId = v4()
    const response = await createNote({id: noteId})
    if(!response?.error) return noteId
  }
  return latestNote?.id
}