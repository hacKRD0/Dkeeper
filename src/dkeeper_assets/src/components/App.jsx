import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { dkeeper } from "../../../declarations/dkeeper";

function App() {
    const [notes, setNotes] = useState([]);

    function addNote(inputNote) {
        setNotes((prevNotes) => {
            // console.log(inputNote.title + " " + inputNote.content)
            dkeeper.createNote(inputNote.title, inputNote.content);
            return [inputNote, ...prevNotes];
        });
    }

    useEffect(() => {
        console.log("Working");
        fetchData();
    }, []);

    async function fetchData() {
        const notesArray = await dkeeper.readNotes();
        setNotes(notesArray);
    }

    function deleteNote(id) {
        dkeeper.removeNote(id);
        setNotes(
            notes.filter((note, index) => {
                return index !== id;
            })
        );
    }

    return (
        <div>
            <Header />
            <CreateArea add={addNote} />
            {notes.map((note, index) => (
                <Note
                    key={index}
                    id={index}
                    title={note.title}
                    content={note.content}
                    onDelete={deleteNote}
                />
            ))}
            <Footer />
        </div>
    );
}

export default App;
