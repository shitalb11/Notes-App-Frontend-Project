// Load notes from localStorage
let notes = JSON.parse(localStorage.getItem("notes")) || [];

const notesDiv = document.getElementById("notes");
const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const searchInput = document.getElementById("search");
const toggleViewBtn = document.getElementById("toggleView");

// Save notes to localStorage
function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

// Render notes
function renderNotes(filter = "") {
  notesDiv.innerHTML = "";

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(filter) ||
    note.content.toLowerCase().includes(filter)
  );

  filteredNotes.forEach(note => {
    const noteDiv = document.createElement("div");
    noteDiv.className = "note";

    noteDiv.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.content}</p>
      <button onclick="editNote(${note.id})">Edit</button>
      <button onclick="deleteNote(${note.id})">Delete</button>
    `;

    notesDiv.appendChild(noteDiv);
  });
}

// Add note
document.getElementById("addBtn").addEventListener("click", () => {
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();

  if (title === "" || content === "") {
    alert("Please fill all fields");
    return;
  }

  notes.push({
    id: Date.now(),
    title,
    content
  });

  saveNotes();
  renderNotes();

  // 🔥 Clear inputs after adding note
  titleInput.value = "";
  contentInput.value = "";
  titleInput.focus();
});

// Delete note
function deleteNote(id) {
  notes = notes.filter(note => note.id !== id);
  saveNotes();
  renderNotes(searchInput.value.toLowerCase());
}

// Edit note
function editNote(id) {
  const note = notes.find(note => note.id === id);

  titleInput.value = note.title;
  contentInput.value = note.content;

  deleteNote(id);
}

// Search notes
searchInput.addEventListener("input", e => {
  renderNotes(e.target.value.toLowerCase());
});

// Toggle Grid / List view
toggleViewBtn.addEventListener("click", () => {
  if (notesDiv.classList.contains("grid")) {
    notesDiv.classList.remove("grid");
    notesDiv.classList.add("list");
    toggleViewBtn.textContent = "Grid";
  } else {
    notesDiv.classList.remove("list");
    notesDiv.classList.add("grid");
    toggleViewBtn.textContent = "List";
  }
});

// Initial render
renderNotes();
