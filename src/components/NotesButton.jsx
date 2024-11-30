import React from "react";

function NotesButton({ onDelete, onArchive, id }) {
  return (
    <div className="notes-button space-x-6 p-2">
      <button className="button_delete" onClick={() => onDelete(id)}>
        <i
          className="fa-solid fa-trash p-2 bg-red-500 rounded"
          style={{ color: "white" }}
        ></i>{" "}
      </button>
      <button className="button_archive" onClick={() => onArchive(id)}>
        <i
          className="fa-solid fa-box-archive p-2 bg-yellow-500 rounded"
          style={{ color: "white" }}
        ></i>{" "}
      </button>
    </div>
  );
}

export default NotesButton;
