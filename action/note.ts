'use server'
import { createClient } from "@/auth/server"
import { handleError } from "@/lib/utils";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/auth/server";

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
}


export async function deleteNote({id}: {id: string}) {}

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

