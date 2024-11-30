import React from "react";
import { showFormattedDate } from "../utils/data"; // Impor fungsi untuk memformat tanggal

function NotesBody({ title, body, createdAt }) {
  return (
    <div className="notes-body space-y-3">
      <h3 className="notes-title font-bold">{title}</h3>
      <h6 className="notes-create text-xs">{showFormattedDate(createdAt)}</h6>
      <p className="notes-description text-gray-500">{body}</p>
    </div>
  );
}

export default NotesBody;
