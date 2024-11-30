import React from "react";
import NotesBody from "./NotesBody";
import NotesButton from "./NotesButton";

function NotesItem({ onDelete, onArchive, title, id, createdAt, body }) {
  return (
    <div className="notes-item m-3 border rounded-xl p-3">
      <NotesBody title={title} body={body} createdAt={createdAt} />
      <NotesButton id={id} onArchive={onArchive} onDelete={onDelete} />
    </div>
  );
}

export default NotesItem;
