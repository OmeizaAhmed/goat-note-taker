import NoteEditorContent from "@/components/note-editor";
import { Suspense } from "react";

// homepage boilerplate


export default function HomePage() {
  return (
    <Suspense fallback={<div className="flex flex-col flex-1 p-2 md:p-4">Loading...</div>}>
      <NoteEditorContent />
    </Suspense>
  );
}
