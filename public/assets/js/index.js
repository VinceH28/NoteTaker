const $noteTitle = $(".note-title");
const $noteText = $(".note-textarea");
const $saveNoteBtn = $(".save-note");
const $newNoteBtn = $(".new-note");
const $noteList = $(".list-container .list-group");

//activeNote to keep track of note in textarea
let activeNote = {};

//Function to get all notes from the db
const getNotes = () => {
  return $.ajax({
    url: "/api/notes",
    method: "GET",
  });
};

// Function to save notes to the db
const saveNote = (note) => {
  return $.ajax({
    url: "/api/notes",
    data: note,
    method: "POST",
  });
};

// A function for deleting a note from the db
const deleteNote = (id) => {
  return $.ajax({
    url: "api/notes/" + id,
    method: "DELETE",
  });
};

//Render empty input if theres or if theres activeNote, display it
const renderActiveNote = () => {
    $saveNoteBtn.hide();

    if(activeNote.id) {
        $noteTitle.attr("readonly", true);
        $noteText.attr("readonly", true);
        $noteTitle.val(activeNote.title);
        $noteTitle.val(activeNote.text);
    } else {
        $noteTitle.attr("readonly", false);
        $noteText.attr("readonly", true);
        $noteTitle.val("");
        $noteText.val("");
    }
};

//Note data froom input save to the db and update view
const handleNoteSave = function() {
    const newNote = {
        title: $noteTilte.val(),
        text: $noteText.val(),
    };

    saveNote(newNote).then(() => {
        getAndRenderNotes();
        renderActiveNote();
    });
};

//Delete clicked note
const handleNoteDelete = function (event) {
    event.stopPropagation();
    const note = $(this).parent(".list-group-item").data();

    if (activeNote.id === note.id) {
        activeNote = {};
    }

    deleteNote(note.id).then(() => {
        getAndRenderNotes();
        renderActiveNote();
    });
};

//Set activeNote and display it
const handleNoteView = function () {
    activeNote = $(this).data();
    renderActiveNote();
};

//Set activeNote to object and allows user to enter new note

const handleNoteView = function () {
    activeNote = $(this).data();
    renderActiveNote();
};