sequenceDiagram
participant browser
participant server

    Note left of browser: User submits the form

    Note right of browser: The browser starts executing the JavaScript code that:
    Note right of browser: 1. Pushes the new note content to the note list
    Note right of browser: 2. Removes the previous list of note
    Note right of browser: 3. Redraws the notes list to show the new note as well

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa (content-type: application/json;)

activate server

    Note left of server: The server creates a new note object but doesn't save it to the database

    server-->>browser: 201 Created (Response Type JSON) {message: "note created"}
    deactivate server

    Note right of browser: User sees updated notes
