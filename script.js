let currentNoteId = null;

async function fetchNotes() {
    const res = await fetch('/api/notes');
    const notes = await res.json();
    const notesList = document.getElementById("notesList");
    notesList.innerHTML = "";
    notes.forEach(note => {
        const li = document.createElement("li");
        li.textContent = note.title || "Untitled Note";
        li.onclick = () => loadNote(note);
        notesList.appendChild(li);
    });
}

function loadNote(note) {
    currentNoteId = note._id;
    document.getElementById("noteTitle").value = note.title;
    document.getElementById("noteContent").value = note.content;
}

async function saveNote() {
    const title = document.getElementById("noteTitle").value;
    const content = document.getElementById("noteContent").value;
    const payload = { title, content };
    const url = currentNoteId ? '/api/notes/' + currentNoteId : '/api/notes';
    const method = currentNoteId ? 'PUT' : 'POST';

    await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    currentNoteId = null;
    document.getElementById("noteTitle").value = "";
    document.getElementById("noteContent").value = "";
    fetchNotes();
}

document.getElementById("saveNoteBtn").addEventListener("click", saveNote);
document.getElementById("newNoteBtn").addEventListener("click", () => {
    currentNoteId = null;
    document.getElementById("noteTitle").value = "";
    document.getElementById("noteContent").value = "";
});

fetchNotes();