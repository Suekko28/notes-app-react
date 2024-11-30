import React from "react";
import { getInitialData } from "../utils/data";
import NotesInput from "./NotesInput";
import NotesList from "./NotesList";
import NotesNavbar from "./NotesNavbar";

class NotesApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeNotes: getInitialData()
        .filter((note) => !note.archived)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
      archivedNotes: getInitialData()
        .filter((note) => note.archived)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
      searchKeyword: "",
    };

    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onArchiveHandler = this.onArchiveHandler.bind(this);
    this.onAddNotesHandler = this.onAddNotesHandler.bind(this);
    this.onSearchHandler = this.onSearchHandler.bind(this);
  }

  onDeleteHandler(id) {
    this.setState((prevState) => ({
      activeNotes: prevState.activeNotes.filter((note) => note.id !== id),
      archivedNotes: prevState.archivedNotes.filter((note) => note.id !== id),
    }));
  }

  onArchiveHandler(id) {
    this.setState((prevState) => {
      const isArchived = prevState.archivedNotes.some((note) => note.id === id);

      if (isArchived) {
        const noteToUnarchive = prevState.archivedNotes.find(
          (note) => note.id === id
        );
        return {
          archivedNotes: prevState.archivedNotes
            .filter((note) => note.id !== id)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
          activeNotes: [
            ...prevState.activeNotes,
            { ...noteToUnarchive, archived: false },
          ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
        };
      } else {
        const noteToArchive = prevState.activeNotes.find(
          (note) => note.id === id
        );
        return {
          activeNotes: prevState.activeNotes
            .filter((note) => note.id !== id)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
          archivedNotes: [
            ...prevState.archivedNotes,
            { ...noteToArchive, archived: true },
          ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
        };
      }
    });
  }

  onAddNotesHandler({ title, body }) {
    this.setState((prevState) => ({
      activeNotes: [
        ...prevState.activeNotes,
        {
          id: +new Date(),
          title,
          body,
          createdAt: Date(),
          archived: false,
        },
      ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    }));
  }

  onSearchHandler(keyword) {
    this.setState({ searchKeyword: keyword });
  }

  render() {
    const { activeNotes, archivedNotes, searchKeyword } = this.state;

    const filteredActiveNotes = activeNotes.filter((note) =>
      note.title.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    const filteredArchivedNotes = archivedNotes.filter((note) =>
      note.title.toLowerCase().includes(searchKeyword.toLowerCase())
    );

    return (
      <div className="notes-app container mx-auto py-32 p-6 md:py-32 md:px-32 sm:py-32 ">
        <NotesInput addNotes={this.onAddNotesHandler} />
        <NotesNavbar onSearch={this.onSearchHandler} />
        <h1 className="text-center font-bold text-xl mb-6 mt-6">
          Catatan Aktif
        </h1>
        <NotesList
          notes={filteredActiveNotes}
          onDelete={this.onDeleteHandler}
          onArchive={this.onArchiveHandler}
        />
        <h1 className="text-center font-bold text-xl mb-6">Arsip</h1>
        <NotesList
          notes={filteredArchivedNotes}
          onDelete={this.onDeleteHandler}
          onArchive={this.onArchiveHandler}
        />
      </div>
    );
  }
}

export default NotesApp;
