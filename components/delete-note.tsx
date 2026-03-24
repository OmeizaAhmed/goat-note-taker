"use-client"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Trash2 } from "lucide-react"
import { deleteNote } from "@/action/note"
import { useContext } from "react"
import { NotesContext } from "@/provider/notes-provider"
import { useSidebar } from "./ui/sidebar"

export function DeleteNote({noteId}:{noteId: string}) {
  const {notes, setNotes} = useContext(NotesContext);
  const {setOpenMobile} = useSidebar();

  async function handleDelete() {
    const res = await deleteNote({id:noteId});
    if(!res) toast.error("Error deleting note")
    else {
      toast.success("Note deleted successfully")
      const rmNotes = notes.filter(note => note.id !== noteId)
      setNotes(rmNotes)
      setOpenMobile(false)
    }
  }


  return (
    <AlertDialog >
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="size-7 md:invisible group-hover/item:visible" ><Trash2 className="size-3!"/></Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            note from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDelete()} asChild><Button variant="destructive">Delete</Button></AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
