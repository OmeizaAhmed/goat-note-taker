'use client';
import { createNote, getNote, updateNote } from "@/action/note";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { v4 } from "uuid";
import { useContext, useEffect, useState, useRef } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { NotesContext } from "@/provider/notes-provider";

// homepage boilerplate
export default function HomePage() {
  const [noteText, setNote] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const { notes } = useContext(NotesContext);
  const didMount = useRef(false)
  const hasFetch = useRef(false)


  async function handleAddNote() {
    const res = await createNote({ id: v4() });
    if(res?.error) {
      toast.error("Failed to create note");
      return;
    }
    toast.success("Note created successfully");
    router.push(`?id=${res?.note.id}`);

    console.log(res);
  }

  async function handleUpdateNote() {
    console.log("Updating note with content:", noteText);
    // Here you would call your API to update the note in the database
  
    const noteId = searchParams.get("id");
    if(!noteId) return
    const res = updateNote({id: noteId, text: noteText})

    if(!res) toast.error("Error Saving Note")
    
  }

  useEffect(() => {
   if(didMount.current && hasFetch.current) {
      const debounce = setTimeout(() => {
      handleUpdateNote();
    }, 1000);
    
    return () => clearTimeout(debounce);
  } else{
    didMount.current = true;
  }
  }, [noteText]);

  useEffect(() => {
    async function getCurrentNote(){
    const noteId = searchParams.get("id");
    if(noteId) {
      console.log("Fetching note with id:", noteId);
      const currentNote = await getNote(noteId);
      if(currentNote == null){
        router.replace("/")
        return
      }
      console.log(currentNote)
      setNote(currentNote?.text)
      hasFetch.current = true

    }
    console.log(notes)
  }
  getCurrentNote()
   
  }, [searchParams]);

  return (
  <div className="flex flex-col flex-1 p-2 md:p-4 gap-2 md:gap-4">
    <div className="flex gap-3 justify-end"><Button>Ask AI</Button><Button onClick={handleAddNote}>Add new Note</Button></div>
    {/* make textarea fill the rest of the page height, but not overflow  */}

    <Textarea className="flex-1 min-h-0 w-fullmax-w-4xl resize-none p-3 md:p-6 text-lg md:text-base" placeholder="Write your note..." value={noteText} onChange={(e) => setNote(e.target.value)} />
  </div>);
}
