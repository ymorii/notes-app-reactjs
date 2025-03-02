import React, { useState } from "react";
import { getInitialData, showFormattedDate } from "./utils/index";

function App() {
  // Data awal (initial data)
  const initialData = getInitialData();

  // State component untuk menyimpan data catatan
  const [notes, setNotes] = useState(initialData);

  // State component untuk menyimpan data pencarian
  const [searchTerm, setSearchTerm] = useState("");

  // State component untuk menyimpan data input judul catatan
  const [title, setTitle] = useState("");

  // State component untuk menyimpan data input isi catatan
  const [body, setBody] = useState("");

  // State component untuk menyimpan data arsip
  const [archivedNotes, setArchivedNotes] = useState([]);

  // Fungsi untuk menampilkan daftar catatan yang sesuai dengan pencarian
  const filteredNotes = notes.filter((note) => {
    const titleLower = note.title.toLowerCase();
    const bodyLower = note.body.toLowerCase();
    const searchTermLower = searchTerm.toLowerCase();
    return (
      titleLower.includes(searchTermLower) ||
      bodyLower.includes(searchTermLower)
    );
  });

  // Fungsi untuk menambahkan catatan baru
  const handleAddNote = () => {
    if (!title || !body) return;

    const newNote = {
      id: Date.now(),
      title: title,
      body: body,
      archived: false,
      createdAt: new Date().toISOString(),
    };

    setNotes([...notes, newNote]);
    setTitle("");
    setBody("");
  };

  // Fungsi untuk menghapus catatan
  const handleDeleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
    setArchivedNotes(archivedNotes.filter((note) => note.id !== id));
  };

  // Fungsi untuk mengarsipkan catatan
  const handleArchiveNote = (id) => {
    const noteToArchive = notes.find((note) => note.id === id);
    setNotes(notes.filter((note) => note.id !== id));
    setArchivedNotes([...archivedNotes, noteToArchive]);
  };

  // Fungsi untuk memindahkan catatan dari arsip ke daftar catatan
  const handleMoveNote = (id) => {
    const noteToMove = archivedNotes.find((note) => note.id === id);
    setArchivedNotes(archivedNotes.filter((note) => note.id !== id));
    setNotes([...notes, noteToMove]);
  };

  // Fungsi untuk menampilkan daftar catatan
  const noteList = filteredNotes.map((note) => (
    <div key={note.id} className="note">
      <h2>{note.title}</h2>
      <p>{showFormattedDate(note.createdAt)}</p>
      <p>{note.body}</p>
      <div className="note-actions">
        <button onClick={() => handleArchiveNote(note.id)}>Arsipkan</button>
        <button onClick={() => handleDeleteNote(note.id)}>Hapus</button>
      </div>
    </div>
  ));

  // Fungsi untuk menampilkan daftar catatan yang sudah diarsip
  const archivedNoteList = archivedNotes.map((note) => (
    <div key={note.id} className="note">
      <h2>{note.title}</h2>
      <p>{showFormattedDate(note.createdAt)}</p>
      <p>{note.body}</p>
      <div className="note-actions">
        <button onClick={() => handleMoveNote(note.id)}>Pindahkan</button>
        <button onClick={() => handleDeleteNote(note.id)}>Hapus</button>
      </div>
    </div>
  ));

  // Fungsi untuk menangani perubahan pada input judul catatan
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  // Fungsi untuk menangani perubahan pada input isi catatan
  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };

  // Fungsi untuk menangani perubahan pada input pencarian
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <h1>Notes App</h1>
      <input
        type="text"
        placeholder="Cari catatan..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className="note-form">
        <input
          type="text"
          placeholder="Judul catatan"
          value={title}
          onChange={handleTitleChange}
        />
        <textarea
          placeholder="Isi catatan"
          value={body}
          onChange={handleBodyChange}
        ></textarea>
        <button onClick={handleAddNote} disabled={!title || !body}>
          Tambah Catatan
        </button>
      </div>
      <div className="note-list">{noteList}</div>
      <h2>Catatan yang Diarsip</h2>
      <div className="note-list">{archivedNoteList}</div>
    </div>
  );
}

export default App;
