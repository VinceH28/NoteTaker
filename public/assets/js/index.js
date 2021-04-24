const $noteTitle = $(".note-title");
const $noteText = $(".note-textarea");
const $saveNoteBtn = $(".save-note");
const $newNoteBtn = $(".new-note");
const $noteList = $(".list-container .list-group");

//userNote to keep track of note in textarea
let userNote = {};

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

//Render empty input if theres or if theres userNote, display it
const renderUserNote = () => {
    $saveNoteBtn.hide();

    if(userNote.id) {
        $noteTitle.attr("readonly", true);
        $noteText.attr("readonly", true);
        $noteTitle.val(userNote.title);
        $noteTitle.val(userNote.text);
    } else {
        $noteTitle.attr("readonly", false);
        $noteText.attr("readonly", false);
        $noteTitle.val("");
        $noteText.val("");
    }
};

//Note data froom input save to the db and update view
const handleNoteSave = function() {
    const newNote = {
        title: $noteTitle.val(),
        text: $noteText.val(),
    };

    saveNote(newNote).then(() => {
        findThenRenderNotes();
        renderUserNote();
    });
};

//Delete clicked note
const handleNoteDelete = function (event) {
    event.stopPropagation();

    const note = $(this).parent(".list-group-item").data();

    if (userNote.id === note.id) {
        userNote = {};
    }

    deleteNote(note.id).then(() => {
        findThenRenderNotes();
        renderUserNote();
    });
};

//Set userNote and display it
const handleNoteView = function () {
    userNote = $(this).data();
    renderUserNote();
};

//Set userNote to object and allows user to enter new note
const handleNewNoteView = function () {
    userNote = {}
    renderUserNote();
};

//Hide the Save button when note's tilte/text are empty
//OR else show it

const handleRenderSaveBtn = function () {
    if (!$noteTitle.val().trim() || !$noteText.val().trim()) {
        $saveNoteBtn.hide();
    } else {
        $saveNoteBtn.show();
    }
};

// Display's the list of note titles
const renderNoteList = (notes) => {
    $noteList.empty();
    
    const noteListItems = [];

    //Return JQUERY object for li with text & delete button
    // unless withDeleteButton argument is false
    const renderLine = (text, withDeleteButton = true) => {
    const $li = $("<li class='list-group-item'>");
    const $span = $("<span>").text(text);
    $li.append($span);

    if (withDeleteButton) {
        const $delBtn = $(
            "<i class='fas fa-trash-alt float-right text-danger delete-note'>"
        );
        $li.append($delBtn);
        }
        return $li;
    };
    if (notes.length === 0) {
        noteListItems.push(renderLine("No save Notes", false));
        } 

        note.forEach((note) => {
            const $li = renderLine(note.title).date(note);
            noteListItem.push($li);
        });

            $noteList.append(noteListItems);
    };

    //Notes from db gets renders to Sidebar
    const findThenRenderNotes = () => {
        return getNotes().then(renderNoteList);        
    };
        
    $saveNoteBtn.on("click", handleNoteSave);
    $noteList.on("click", ".list-group-item", handleNoteView);
    $newNoteBtn.on("click", handleNewNoteView);
    $noteList.on("click", ".delete-note", handleNoteDelete);
    $noteTitle.on("keyup", handleRenderSaveBtn);
    $noteText.on("keyup", handleRenderSaveBtn);

    // Gets and renders the initial list of notes
    findThenRenderNote();