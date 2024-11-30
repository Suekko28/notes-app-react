import React from "react";
import NotesItem from "./NotesItem";

function NotesList({ notes, onDelete, onArchive }) {
  if (notes.length === 0) {
    return <p className="text-center text-gray-500 mb-6">Tidak ada catatan</p>;
  }
  return (
    <div className="notes-list flex flex-wrap">
      {notes.map((note) => (
        <div className="w-full lg:1/2 xl:w-1/3" key={note.id}>
          <NotesItem
            key={note.id}
            id={note.id}
            onDelete={onDelete}
            onArchive={onArchive}
            {...note}
          />
        </div>
      ))}
    </div>
  );
}

export default NotesList;
